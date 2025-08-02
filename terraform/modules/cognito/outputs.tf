output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.social_media_pool.id
}

output "cognito_user_pool_client_id" {
  value = aws_cognito_user_pool_client.social-media-pool-client.id
}
