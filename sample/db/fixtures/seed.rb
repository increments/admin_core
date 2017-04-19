User.seed(:name) do |s|
  s.name = 'yaotti'
end

yaotti = User.find_by(name: 'yaotti')

Tweet.seed do |s|
  s.user = yaotti
  s.body = "Hello world"
end

Tweet.seed do |s|
  s.user = yaotti
  s.body = "I'm CEO, Bitch!"
end
