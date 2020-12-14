Rails.application.routes.draw do
  root 'form#index'
  get '/success', to: 'form#success'
  post '/validate', to: 'form#validate'
  post '/send', to: 'form#send_user_data'
end
