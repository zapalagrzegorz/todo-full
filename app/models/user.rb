# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string
#  session_token   :string
#

class User < ApplicationRecord
  # This makes it so we can validate our password length, without storing it in the DB
  attr_reader :password

  validates :username, presence: true, uniqueness: true
  validates :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  # This allows us to run methods before running validations
  # In this case, we need to have a session_token when a user is first created
  after_initialize :ensure_session_token

  has_many :todos

  has_many :steps,
           through: :todos,
           source: :steps

  # Class method for finding a user ONLY if we have the correct username and password
  def self.find_by_credentials(user_params)
    user = User.find_by(username: user_params[:username])
    user && user.is_password?(user_params[:password]) ? user : nil
  end

  def password=(password)
    # Set temporary instance variable so that we can validate length
    @password = password
    # Create a password_digest so that we do not have to store the plain-text password in our DB
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    # Use BCrypt's built-in method for checking if the password provided is the user's password
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def ensure_session_token
    # Generate the initial session_token so that we pass the validation
    # This method runs right after the model is initialized, before any validations are run
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    # When a user logs out, we want to scramble their session_token so that bad people cannot use the old one
    self.session_token = SecureRandom.urlsafe_base64
    save
    self.session_token
  end
end
