module AdminCore
  # Base of any errors raised by AdminCore.
  class Error < StandardError
  end

  class ResourceManagerAlreadyRegistered < Error
  end

  class ResourceFieldAlreadyRegistered < Error
  end

  class ResourceFieldNotFound < Error
  end

  class InvalidResourceFieldDefinition < Error
  end
end
