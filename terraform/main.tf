####################################
# Provider
####################################
terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "4.45.0"
    }
    github = {  
        source = "hashicorp/github"
        version = "~> 6.3.0" # Check for the latest version
    }
  }
  required_version = ">=1.5.0"
}

provider "aws" {
  alias = "acm"
  region = var.aws_region
  default_tags {
    tags = {
      env = var.deploy_env
      product = var.product
      productversion = var.product_version
      customer = var.customer_name
      revenue = var.revenue_type
      requestor = var.requestor_name
      managedby = "Terraform"
    }
  }
}

provider "github" {
  token = var.pipeline_token
  owner = var.github_owner
}

########################################################################
# data: Fetch AWS account ID using aws_caller_identity
########################################################################
data "aws_caller_identity" "current" {}


########################################################################
# aws s3 bucket : This is for deploy static web page 
########################################################################
resource "aws_s3_bucket" "static_web_page" {
  bucket = "${var.stack_name}-${data.aws_caller_identity.current.account_id}-${var.product}-ui"
}

resource "aws_s3_bucket_public_access_block" "static_web_page_public_access_block" {
  bucket = aws_s3_bucket.static_web_page.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_logging" "example" {
  bucket = aws_s3_bucket.static_web_page.id

  target_bucket = aws_s3_bucket.static_web_page.id
  target_prefix = "webpage-access-logs/"
}

resource "aws_s3_bucket_versioning" "static_web_page_versioning" {
  bucket = aws_s3_bucket.static_web_page.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "static_web_page_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.static_web_page.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_ownership_controls" "static_web_page_access_ownership_controls" {
  bucket = aws_s3_bucket.static_web_page.id

  rule {
      object_ownership = "BucketOwnerPreferred"
  }
}

########################################################################
# aws Cloud Front : This is for aws cloudfront distribution 
########################################################################
resource "aws_cloudfront_distribution" "cf_distribution" {
    origin {
        domain_name = aws_s3_bucket.static_web_page.bucket_domain_name
        origin_id =  "${var.product}-ui-s3origin"
        s3_origin_config {
            origin_access_identity = ""
        }
        origin_access_control_id = aws_cloudfront_origin_access_control.origin_access_control.id
    }

    enabled             = true
    is_ipv6_enabled     = true
    #aliases             = ["${var.stack_name}-${var.deploy_env}.amazon.com"]
    comment             = "CDN for ${var.product}"  
    default_root_object = "index.html"

    default_cache_behavior {
        allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
        cached_methods = ["GET", "HEAD"]
        target_origin_id = "${var.product}-ui-s3origin"
        response_headers_policy_id = var.is_policy_enabled ? aws_cloudfront_response_headers_policy.security_headers_policy[0].id : null 
        #cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
        #origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf" # CORS-S3Origin
        #response_headers_policy_id = "67f7725c-6f97-4210-82d7-5512b31e9d03" # SecurityHeadersPolicy

        forwarded_values {
            query_string = false

            cookies {
                forward = "none"
            }
        }

        function_association {
          event_type = "viewer-request"
          function_arn = aws_cloudfront_function.static_site.arn
        }

        viewer_protocol_policy = "redirect-to-https"
        min_ttl = var.cache_ttl.min
        default_ttl = var.cache_ttl.default
        max_ttl = var.cache_ttl.max
    }

    price_class = "PriceClass_All"

    logging_config {
        include_cookies = false
        bucket = aws_s3_bucket.static_web_page.bucket_domain_name
        prefix = "webpage-access-logs"
   }

    viewer_certificate {
        cloudfront_default_certificate = true
        #acm_certificate_arn       = aws_acm_certificate.cert.arn
        #ssl_support_method        = "sni-only"
        minimum_protocol_version  = "TLSv1.2_2021"
    }

    custom_error_response {
      error_caching_min_ttl = 300
      error_code = 404
      response_code = 404
      response_page_path = var.html_404
    }

    custom_error_response {
      error_caching_min_ttl = 300
      error_code = 403
      response_code = 200
      response_page_path = var.html_403
    }

    restrictions {
      geo_restriction {
        restriction_type = var.block_ofac_countries ? "blocklist" : "none"
        locations = var.block_ofac_countries ? var.ofac_countries : []
      }
    }

}

resource "aws_cloudfront_origin_access_control" "origin_access_control" {
    name                              = var.stack_name
    description                       = "Default Origin Access Control"
    origin_access_control_origin_type = "s3"
    signing_behavior                  = "always"
    signing_protocol                  = "sigv4"
}

########################################################################
# aws CloudFront: This is distribution response headers policy 
########################################################################
resource "aws_cloudfront_response_headers_policy" "security_headers_policy" {
  count = var.is_policy_enabled ? 1 : 0
  name = "${var.stack_name}-${var.product}-${var.deploy_env}-security-headers-policy"
  comment = "${var.stack_name}-${var.product}-${var.deploy_env}-security-headers-policy"
  
  custom_headers_config {
    items {
      header = "Cache-Control"
      override = true
      value = var.cache-control
    }
    items {
      header = "Pragma"
      override = true
      value = "no-cache"
    }
  }

  security_headers_config {
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "SAMEORIGIN"
      override = true   
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override = true
    }
    xss_protection {
      mode_block = true
      protection = true
      override = true
    }
    strict_transport_security {
      access_control_max_age_sec = var.access_control_max_age_sec
      override = true
    }
    content_security_policy {
      content_security_policy = var.content_security_policy
      override = true
    }
  }

}

########################################################################
# aws CloudFront function
########################################################################
resource "aws_cloudfront_function" "static_site" {
  name    = "${replace(var.stack_name, ".", "_")}_index_rewrite"
  runtime = "cloudfront-js-1.0"
  comment = "index.html rewrite for S3 origin"
  publish = true
  code    = templatefile("${path.module}/function.js.tftpl", {
    domain = var.stack_name, subdomains = var.subdomains
  })
}

########################################################################
# aws s3 bucket policy: This is provide the access policy 
########################################################################
resource "aws_s3_bucket_policy" "bucket_policy" {
    bucket = aws_s3_bucket.static_web_page.id
    
    policy = data.aws_iam_policy_document.read_static_web_page_bucket.json
}

data "aws_iam_policy_document" "read_static_web_page_bucket" {
  statement {
    sid    = "PolicyForCloudFrontPrivateContent"
    effect = "Allow"

    actions = [
      "s3:GetObject*"
    ]

    resources = [
      "${aws_s3_bucket.static_web_page.arn}/*"
    ]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values = [
        "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${aws_cloudfront_distribution.cf_distribution.id}"
      ]
    }
  }
} 

########################################################################
# AWS Certificate Manager: generate a certification. 
########################################################################
resource "aws_acm_certificate" "cert" {
  domain_name       = "${var.stack_name}-${var.deploy_env}.amazon.com"
  validation_method = "DNS"

  subject_alternative_names = [
    "*.${var.stack_name}-${var.deploy_env}.amazon.com"
  ]

  tags = {
    Name = "${var.stack_name}-${var.deploy_env}-cert"
  }
}


########################################################################
# Gitub Action secret: set github action secret for CloudFront Distribution Id. 
########################################################################
resource "github_actions_environment_secret" "cloudfront_distribution_id" {
  repository      = var.deploy_repo
  environment     = var.deploy_env
  secret_name     = "CLOUDFRONT_DISTRIBUTION_ID"
  plaintext_value = aws_cloudfront_distribution.cf_distribution.id
}

resource "github_actions_environment_secret" "static_web_page_id" {
  repository      = var.deploy_repo
  environment     = var.deploy_env
  secret_name     = "S3_BUCKET_NAME"
  plaintext_value = aws_s3_bucket.static_web_page.id
}