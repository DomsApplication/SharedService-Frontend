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
        source = "integrations/github"
        version = "5.23.0"
    }
  }
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
  owner = "Shavika"
}


########################################################################
# aws s3 bucket : This is for deploy static web page 
########################################################################
resource "aws_s3_bucket" "static_web_page" {
  bucket = "${var.stack_name}-${var.aws_account_id}-${var.product}-ui"
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

  target_bucket = aws_s3_bucket.static_web_page_access_logging.id
  target_prefix = "${aws_s3_bucket.static_web_page.id}-access-logs/"
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

########################################################################
# aws s3 bucket : This is for access log for the static web pages application UI 
########################################################################
resource "aws_s3_bucket" "static_web_page_access_logging" {
  bucket = "${var.stack_name}-${var.aws_account_id}-${var.product}-ui-logs"

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket_public_access_block" "static_web_page_access_logging_public_access_block" {
  bucket = aws_s3_bucket.static_web_page_access_logging.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "static_web_page_access_logging_versioning" {
  bucket = aws_s3_bucket.static_web_page_access_logging.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "static_web_page_access_logging_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.static_web_page_access_logging.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_ownership_controls" "static_web_page_access_ownership_controls" {
  bucket = aws_s3_bucket.static_web_page_access_logging.id

  rule {
      object_ownership = "BucketOwnerPreferred"
  }
}


########################################################################
# aws s3 bucket : This is for aws cloudfront distribution 
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
    aliases             = [var.dns_name]
    comment             = "CDN for ${var.product}"  
    default_root_object = "index.html"

    default_cache_behavior {
        allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
        cached_methods = ["GET", "HEAD"]
        target_origin_id = "${var.product}-ui-s3origin"
        cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
        origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf" # CORS-S3Origin
        response_headers_policy_id = "67f7725c-6f97-4210-82d7-5512b31e9d03" # SecurityHeadersPolicy

        forwarded_values {
            query_string = false

            cookies {
                forward = "none"
            }
        }

        viewer_protocol_policy = "redirect-to-https"
        min_ttl = var.cache_ttl.min
        default_ttl = var.cache_ttl.default
        max_ttl = var.cache_ttl.max
    }

    price_class = "PriceClass_All"

    logging_config {
        include_cookies = false
        bucket          = aws_s3_bucket.static_web_page_access_logging.bucket_domain_name
        prefix          = "${aws_s3_bucket.static_web_page.id}-access-logs"
   }

    viewer_certificate {
        cloudfront_default_certificate = true
        minimum_protocol_version        = "TLSv1.2_2021"
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
        "arn:aws:cloudfront::${var.aws_account_id}:distribution/${aws_cloudfront_distribution.cf_distribution.id}"
      ]
    }
  }
} 