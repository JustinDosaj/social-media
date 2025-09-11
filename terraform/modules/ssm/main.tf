resource "aws_ssm_parameter" "cognito_user_pool_id" {
  name  = "/social-media/${var.environment}/cognito_user_pool_id"
  type  = "String"
  value = var.cognito_user_pool_id
}

resource "aws_ssm_parameter" "cognito_client_id" {
  name  = "/social-media/${var.environment}/cognito_client_id"
  type  = "String"
  value = var.cognito_client_id
}

resource "aws_ssm_parameter" "cognito_region" {
  name  = "/social-media/${var.environment}/cognito_region"
  type  = "String"
  value = var.region
}