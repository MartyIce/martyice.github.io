---
layout: post
title: AWS REST wrapped around WCF - Front to Back
---

Last post I described the reasons for using <a href="https://aws.amazon.com/api-gateway">AWS API Gateway</a> for creating REST services.  In this post, I'd like to walk through the steps we took to get this up and running.  In order to cover all the things, I'm going to paint a high level picture, with links providing places to find more details.

First, setting things up in AWS.  The basic layout for a REST API in the AWS Api Gateway is:

* APIs ("Dev", "Prd", "Sandbox" each get their own API)
	* Resources - these represent entities exposed by the REST API, eg "Reservation", "Account", etc.  Resources define source endpoints, mappings, security, etc.
	* Stages - these contain deployment/snapshots of a Resource, essentially once your Resource has been completely defined, it's deployed into the wild as a Stage.  We used the convention of including a version in the Stage path (eg "myResource/v1/<id>")
	* Custom Authorizers - these provide a variety of access control mechanisms to your REST endpoints, such as OAuth or SAML.
	* Models - these can be used to define the payload of the various REST endpoints, and are mainly used by mapping templates (more on mapping templates in a minute, they essentially allow you to transform inputs/outputs from the AWS REST layer to your internal layer).  Honestly, we didn't use these much - we simply created the templates without relying on Models.

Amazon provides great documentation around this whole thing, including this informative <a href="http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-from-example.html">walkthrough</a>.  There are a variety of other wikis/blogs out there that illustrate this process, just search google.

With all the above setup, you basically have two options for your "internal" services:

1) Provide endpoints that AWS will invoke when the REST endpoints are invoked (this is the route we are using).
2) Use <a href="https://aws.amazon.com/lambda/">AWS Lambda</a> functions.  These are essentially "dynamic" services you create entirely within AWS, and look pretty powerful.  We already had web services we wanted to utilize, so this option wasn't really considered, but it looks like a person could do some pretty fantastic things here.

With each option above, the AWS API Gateway enables transformation of payloads, both inbound and outbound, using <a href="https://velocity.apache.org/engine/releases/velocity-1.5/user-guide.html">VTL Mapping Templates</a>.  VTL was pretty easy to understand, but limited in functionality (compared to something like javascript).  I'm guessing it performs much better, but it would be nice to see more capabilities added here in the future.

Once everything has been setup in AWS, there is a super cool option of exporting your Stage into a <a href="http://swagger.io/">Swagger<a> file.  This seems to be the JSON equivalent of what XSD provided for XML, but seems much simpler (as a side note, a developer on our team who is VERY particular about things being rigidly defined and documented scorned swagger/REST/JSON, because of the loose definitions.  I personally am OK with the tradeoff, but recognize the potential for ambiguity, confusion, etc).  With this Swagger file in hand, you now have an easy path to setting up documentation, an SDK sandbox, and Postman tests!

Documentation
-------------

Doc stuff here

SDK Sandbox
-----------

Sandbox stuff here

Postman
-------

Postman stuff here
