class Api::SessionsController < ApplicationController
  # before_action :redirect_if_logged_in, except: :destroy

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      # Log them in and redirect them if we find them
      # debugger
      login!(@user)
      render 'api/users/show'
    else
      @user = User.new
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def destroy
    logout!
    render json: { message: 'Logout sucessfully' }
  end
end
