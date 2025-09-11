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