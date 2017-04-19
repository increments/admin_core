module AdminCore
  module Generators
    class ResourceManagerGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      class_option :module_name, type: :string,
                                 default: AdminCore::Configuration::DEFAULT_MODULE_NAME,
                                 desc: 'Module which contains resource manager, controllers, etc.',
                                 aliases: :m

      def generate_resource_manager_file
        template('resource_manager.rb.erb', "app/models/#{configuration.route_name_prefix}/#{file_name}.rb")
      end

      def register_resource_manager
        File.open('config/initializers/admin_core.rb', 'a') do |file|
          file.puts("AdminCore.register_resource_manager(#{configuration.module_name}::#{class_name})")
        end
        puts '     updated  config/initializers/admin_core.rb'
      end

      private

      class Attribute
        READONLY_ATTRIBUTE_NAMES = %w[id created_at updated_at].freeze

        FIELD_MAPPING = Hash.new { |_, k| k }.merge(
          datetime: :date_time,
          integer: :number,
          time: :date_time
        )

        FILTER_MAPPING = Hash.new { |_, k| k }.merge(
          text: :string
        )

        attr_reader :name

        def initialize(resource_class, name)
          @resource_class = resource_class
          @name = name
        end

        def define_field
          if field_implemented?
            "define_field :#{name}, :#{field_type}"
          else
            "# define_field :#{name}, :#{field_type}"
          end
        end

        def define_and_register_filter
          "define_and_register_filter :#{name}, :#{filter_type}"
        end

        def register_name
          field_implemented? ? ":#{name}," : "# :#{name},"
        end

        def form?
          READONLY_ATTRIBUTE_NAMES.exclude?(name)
        end

        def field_implemented?
          AdminCore.resolve_resource_field(field_type)
          true
        rescue AdminCore::ResourceFieldNotFound
          false
        end

        def filter_implemented?
          %i[boolean number string].include?(filter_type)
        end

        # @return [Boolean]
        def redundant?
          case field_type
          when :string
            redundant_string?
          when :number
            redundant_number?
          else
            false
          end
        end

        private

        attr_reader :resource_class

        def redundant_string?
          name.to_s.end_with?('_type') && resource_class.reflections[name.to_s[0...-4]]
        end

        def redundant_number?
          name.to_s.end_with?('_id') && resource_class.reflections[name.to_s[0...-3]]
        end

        # @return [Symbol]
        def field_type
          FIELD_MAPPING[attribute_type]
        end

        # @return [Symbol]
        def filter_type
          FILTER_MAPPING[attribute_type]
        end

        # @return [Symbol]
        def attribute_type
          return :enum if enum_type?
          return association_type if association_type?
          resource_class.column_for_attribute(name).type
        end

        def enum_type?
          enum_attribute_names.include?(name)
        end

        def association_type?
          resource_class.reflections.key?(name)
        end

        # @return [Symbol]
        def association_type
          reflection = resource_class.reflections[name]
          if reflection.has_one?
            :has_one
          elsif reflection.collection?
            :has_many
          elsif reflection.polymorphic?
            :polymorphic
          else
            :belongs_to
          end
        end

        # @return [Array<String>]
        def enum_attribute_names
          @enum_attribute_names ||= resource_class.try(:defined_enums).try(:keys) || []
        end
      end

      def configuration
        @configuration ||= AdminCore::Configuration.new.tap do |config|
          config.module_name = options[:module_name].camelize
        end
      end

      # @return [Array<Attribute>]
      def attributes
        @attributes ||= attribute_names.map(&method(:build_attribute)).reject(&:redundant?)
      end

      # @return [Array<String>]
      def attribute_names
        resource_class.attribute_names + resource_class.reflections.keys
      end

      def resource_class
        @resource_class ||= Object.const_get(class_name)
      end

      def build_attribute(attribute_name)
        Attribute.new(resource_class, attribute_name)
      end
    end
  end
end
