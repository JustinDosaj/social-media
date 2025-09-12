resource "aws_dynamodb_table" "terraform_locks" {
  name         = "${var.environment}-social-media-tf-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockId"

  attribute {
    name = "LockId"
    type = "S"
  }

  tags = {
    Name        = "${var.environment}-terraform-locks"
    Project     = "social-media"
    Environment = "${var.environment}"
  }
}