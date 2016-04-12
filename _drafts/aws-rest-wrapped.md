---
layout: post
title: AWS REST wrapped around WCF - Front to Back
---

Last post I talked about reasons for using <a href="https://aws.amazon.com/api-gateway">AWS API Gateway</a> to create REST services.  In this post, I'd like to walk through the steps I took to get this up and running.  In order to cover all the things, I'm going to paint a high level picture, with links providing places to find more details.

First, setting things up in AWS.  The basic structure there is:

* APIs ("Dev", "Prd", "Sandbox" each get their own API)
	* Resources (represent entities, eg "Reservation", "Account", etc.  Contains source endpoints, mappings, security, etc)
	* Stages (deployment/snapshot of resource, we prefix with version, eg "myResource/v1/<id>")




I used <a href="http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-from-example.html">Amazon's documentation</a> to get started.