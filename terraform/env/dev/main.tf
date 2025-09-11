provider "aws" {
  region  = var.region
  profile = var.aws-profile

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "social-media"
    }
  }
}


module "cognito_module" {
  source      = "../../modules/cognito"
  environment = var.environment
}

module "ssm_module" {
  source               = "../../modules/ssm"
  environment          = var.environment
  region               = var.region
  cognito_user_pool_id = module.cognito_module.cognito_user_pool_id
  cognito_client_id    = module.cognito_module.cognito_client_id
}