aws_region          = "ap-south-1"

stack_name          = "shavika"
deploy_env          = "dev"
product             = "doms"
product_version     = "1.0.0"
customer_name       = "development"
revenue_type        = "non-rev"
requestor_name      = "mahesha"

content_security_policy = "default-src 'self' *.auth0.com/, *.amazon.com/ https://fonts.googleapis.com/ https://fonts.gstatic.com/ https://cdn.jsdelivr/net/ 'unsafe-inline' 'unsafe-eval' blob: data:;"

cache_ttl = {
    min = 0
    default = 14400
    max = 86400
}
