output "static_web_page_bukcet_arn" {
  value = module.static_website.static_web_page_bukcet_arn
  description = "The ARN of the S3 bucket for the application"
}

output "static_web_page_bukcet_name" {
  value = module.static_website.static_web_page_bukcet_name
  description = "The name of the S3 bucket for the application"
}

output "static_web_page_bukcet_regional_domain_name" {
  value = module.static_website.static_web_page_bukcet_regional_domain_name
  description = "The regional domain name of the S3 bucket for the application"
}

output "static_web_page_access_logging_bucket_arn" {
  value = module.static_website.static_web_page_access_logging_bucket_arn
  description = "The ARN of the S3 bucket for logging"
}

output "static_web_page_access_logging_bucket_name" {
  value = module.static_website.static_web_page_access_logging_bucket_name
  description = "The name of the S3 bucket for logging"
}

output "static_web_page_access_logging_bucket_regional_domain_name" {
  value = module.static_website.static_web_page_access_logging_bucket_regional_domain_name
  description = "The regional domain name of the S3 bucket for logging"
}

output "cf_distribution_name" {
  value       = module.static_website.cf_distribution_name
  description = "CloudFront distribution name"
}

output "cf_distribution_domain_name" {
  value       = module.static_website.cf_distribution_domain_name
  description = "CloudFront distribution domain name"
}
