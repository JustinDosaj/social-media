data "aws_iam_policy_document" "ssm_read" {
    statement {
        actions = ["ssm:GetParameter", "ssm:GetParametersByPath"]
        resources = ["arn:aws:ssm:${var.region}:${data.aws_caller_identity.current.account_id}:parameter/social-media/${var.environment}/*"]
    }
}