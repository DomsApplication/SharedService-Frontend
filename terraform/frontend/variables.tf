variable "aws_region" {
    description = "AWS region"
    type = string
    default = "ap-south-1"
}

variable "stack_name" {
  description = "The stack name of the project"
  type = string
  default = "shavika"
}

variable "deploy_env" {
    description = "deployment environment"
    type = string
    default = "dev"
}

variable "product" {
    description = "project name tag"
    type = string
    default = "DOMS" 
}

variable "product_version" {
  description = "product verison tag"
  type = string
  default = "1.0.0"
}

variable "customer_name" {
  description = "customer name tag"
  type = string
  default = "epd"
}

variable "revenue_type" {
    description = "revenue type tag"
    type = string
    default = "non-rev" 
}

variable "requestor_name" {
    description = "requestor name tag"
    type = string
    default = ""
}

variable "pipeline_token" {
  description = "Github token passed in from CI workflow"
  type = string
  default = ""
}

variable "cache_ttl_min" {
  description = "Cloudfront default cache ttl min values"
  type = number
}

variable "cache_ttl_default" {
  description = "Cloudfront default cache ttl default values"
  type = number
}

variable "cache_ttl_max" {
  description = "Cloudfront default cache ttl max values"
  type = number
}
