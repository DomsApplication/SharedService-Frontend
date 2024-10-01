output "static_web_page_bukcet_arn" {
  value = aws_s3_bucket.static_web_page.arn
  description = "The ARN of the S3 bucket for the application"
}

output "static_web_page_bukcet_name" {
  value = aws_s3_bucket.static_web_page.id
  description = "The name of the S3 bucket for the application"
}

output "static_web_page_bukcet_regional_domain_name" {
  value = aws_s3_bucket.static_web_page.bucket_domain_name
  description = "The regional domain name of the S3 bucket for the application"
}

output "static_web_page_access_logging_bucket_arn" {
  value = aws_s3_bucket.static_web_page_access_logging.arn
  description = "The ARN of the S3 bucket for logging"
}

output "static_web_page_access_logging_bucket_name" {
  value = aws_s3_bucket.static_web_page_access_logging.id
  description = "The name of the S3 bucket for logging"
}

output "static_web_page_access_logging_bucket_regional_domain_name" {
  value = aws_s3_bucket.static_web_page_access_logging.bucket_domain_name
  description = "The regional domain name of the S3 bucket for logging"
}

output "cf_distribution_name" {
  value       = aws_cloudfront_distribution.cf_distribution.id
  description = "CloudFront distribution name"
}

output "cf_distribution_domain_name" {
  value       = aws_cloudfront_distribution.cf_distribution.domain_name
  description = "CloudFront distribution domain name"
}
