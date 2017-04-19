require_relative 'matchers'

module AdminCore
  module RSpec
    module ResourceFieldSpecHelper
      extend ActiveSupport::Concern
      include AdminCore::RSpec::Matchers

      included do
        shared_context 'with resource field instance' do |create_resource:, name:, options:, page:|
          let(:resource_field) do
            described_class.new(create_resource.call, name.to_sym, options, page)
          end
        end

        shared_examples_for 'AdminCore::ResourceField' do |create_resource:, name:, options: {}|
          describe '.type' do
            subject do
              described_class.type
            end

            it { should be_a Symbol }
          end

          describe '.permitted_field_name_of' do
            subject do
              described_class.permitted_field_name_of(name.to_sym)
            end

            it { should be_a Symbol }
          end

          describe '#to_hash' do
            %i[index new show edit].each do |page|
              context "when page is #{page}" do
                include_context 'with resource field instance',
                                create_resource: create_resource,
                                name: name,
                                options: options,
                                page: page

                subject do
                  resource_field.to_hash.as_json
                end

                it { should have_shape_of_ResourceField }
              end
            end
          end
        end
      end
    end
  end
end
