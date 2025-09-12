resource "aws_s3_bucket" "terraform_state" {
  bucket = "${var.environment}-social-media-tf-states"

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


resource "aws_s3_bucket_ownership_controls" "terraform_state_ownership_controls" {
  bucket = aws_s3_bucket.terraform_state.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}


resource "aws_s3_bucket_acl" "terraform_state_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.terraform_state_ownership_controls]

  bucket = aws_s3_bucket.terraform_state.id
  acl    = "private"
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