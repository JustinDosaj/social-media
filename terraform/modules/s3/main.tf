resource "aws_s3_bucket" "terraform_state" {
    bucket = "${var.environment}-social-media-tf-states"

    tags = {
        Environment = "${var.environment}"
        Name = "${var.environment}-social-media-tf-states"
        Project = "social-media"
    }
}

resource "aws_s3_bucket_versioning" "terraform_state_versioning" {
    bucket = aws_s3_bucket.terraform_state.id
    
    versioning_configuration {
      status = "Enabled"
    }
}


resource "aws_s3_bucket_ownership_controls" "terraform_state_ownership_controls" {
    bucket = aws_s3_bucket.terraform_state.id
    rule {
        object_ownership = "BucketOwnerPreferred"
    }
}


resource "aws_s3_bucket_acl" "terraform_state_acl" {
    depends_on = [aws_s3_bucket_ownership_controls.terraform_state_ownership_controls]

    bucket = aws_s3_bucket.terraform_state.id
    acl = "private"
}

# terraform {
#     backend "s3" {
#         bucket = "${var.environemnt}-social-media-tf-states"
#         key = "${var.environment}/social-media/terraform.tfstate"
#         region = "${var.environemnt}"
#         dynamodb_table = "${var.environment}-social-media-tf-locks"
#         encrypt = true
#     }
# }