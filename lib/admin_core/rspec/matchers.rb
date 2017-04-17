module AdminCore
  module RSpec
    module Matchers
      extend RSpec::Matchers::DSL

      matcher :have_shape_of_ResourceField do |type_value: nil, value_type: nil|
        match do |actual|
          expect(actual).to match(
            'displayName' => be_a(String),
            'name' => be_a(String),
            'type' => type_value ? type_value : be_a(String),
            'value' => be_a(value_type ? value_type : Object)
          )
        end
      end
    end
  end
end
