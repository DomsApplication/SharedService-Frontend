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

variable "cache_ttl" {
  description = "Cloudfront default cache ttl values"
  type = object({
    min = number
    default = number
    max = number 
  })
  default = {
    min = 0
    default = 3600
    max = 86400
  }
}

variable "block_ofac_countries" {
  description = "Whether or not block OFAC sanctioned countries"
  type = bool
  default = false
}

variable "ofac_countries" {
    description = "OFAC countires list"
    type = list
    default = ["BY", "CU", "IR", "KP", "RU", "SY", "US", "CA", "GB", "DE", "IN"]
  
}

variable "html_404" {
  description = "Pathto 404 HTML page"
  type = string
  default = "/404.html"
}

variable "html_403" {
  description = "Pathto 403 HTML page"
  type = string
  default = "/index.html"
}