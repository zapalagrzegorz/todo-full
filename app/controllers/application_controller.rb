class ApplicationController < ActionController::Base
  skip_forgery_protection
  # protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  private

  def current_user
    # Check for session_token
    return nil unless session[:session_token]

    # debugger
    # Return the user associated with the session_token (if token is valid)
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def login!(user)
    # session[:session_token] = user.reset_session_token!
    # byebug
    session[:session_token] = user.session_token
    @current_user = user
  end

  def logout!
    current_user.try(:reset_session_token!)
    session[:session_token] = nil
  end

  def deny_access_if_not_logged_in
    # byebug
    # debugger
    render json: ['You must be logged in to do that'], status: :unauthorized unless logged_in?
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
