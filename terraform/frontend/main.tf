####################################
# Provider
####################################
terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "4.45.0"
    }
  }
  required_version = ">= 1.5.0"
}

provider "aws" {
  region = var.aws_region
}

####################################
# Module for static website
####################################
module "static_website" {
  source = "resources"

    stack_name = var.stack_name
    env = var.deploy_env
    product = var.product
    productversion = var.product_version
    customer = var.customer_name
    revenue = var.revenue_type
    requestor = var.requestor_name

    pipeline_token = var.pipeline_token
    dns_name = "${var.stack_name}-${var.deploy_env}.amazon.com"

    cache_ttl = {
        min = var.cache_ttl_min
        default = var.cache_ttl_default
        max = var.cache_ttl_max
    }

}

