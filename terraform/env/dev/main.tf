terraform {
  backend "s3" {
    bucket         = "dev-social-media-tf-states"
    key            = "dev/social-media/terraform.tfstate"
    region         = "us-west-1"
    dynamodb_table = "dev-social-media-tf-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.region

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