module AdminCore
  # Base of any errors raised by AdminCore.
  class Error < StandardError
  end

  class ResourceManagerAlreadyRegistered < Error
  end

  class ResourceFieldAlreadyRegistered < Error
  end

  class ResourceFilterAlreadyRegistered < Error
  end

  class ResourceFieldNotFound < Error
  end

  class ResourceFilterNotFound < Error
  end

  class InvalidResourceFieldDefinition < Error
  end
end
