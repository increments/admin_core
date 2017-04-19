module AdminCore
  module Version
    MAJOR = 0
    MINOR = 0
    PATCH = 3

    def self.to_s
      [MAJOR, MINOR, PATCH].join('.')
    end
  end
end
