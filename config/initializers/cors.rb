Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3001'
    resource '*', headers: :any, methods: %i[get post patch delete]
  end
end
