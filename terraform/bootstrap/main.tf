provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "${var.environment}-social-media-tf-states"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Environment = "${var.environment}"
    Name        = "${var.environment}-social-media-tf-states"
    Project     = "social-media"
  }
}

resource "aws_s3_bucket_versioning" "terraform_state_versioning" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}


# Enable server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_encryption" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Block public access
resource "aws_s3_bucket_public_access_block" "terraform_state_pab" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "${var.environment}-social-media-tf-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name        = "${var.environment}-terraform-locks"
    Project     = "social-media"
    Environment = "${var.environment}"
  }
}