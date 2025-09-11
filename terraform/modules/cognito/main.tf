resource "aws_cognito_user_pool" "social_media_pool" {
  name = "${var.environment}-social-media-pool"

  auto_verified_attributes = ["email"]
  alias_attributes         = ["email"]

  schema {
    name                = "email"
    attribute_data_type = "String"
    required            = true
  }

  password_policy {
    minimum_length    = 8
    require_lowercase = false
    require_numbers   = false
    require_symbols   = false
    require_uppercase = false
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }
}

resource "aws_cognito_user_pool_client" "social-media-pool-client" {
  name         = "${var.environment}-social-media-pool-client"
  user_pool_id = aws_cognito_user_pool.social_media_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH"
  ]

  supported_identity_providers = ["COGNITO"]
  callback_urls                = ["your-app://callback"]
  logout_urls                  = ["your-app://logout"]
  allowed_oauth_flows          = ["code"]
  allowed_oauth_scopes         = ["email", "openid", "profile"]
  generate_secret              = false
}
