---
layout: post
title: AWS REST wrapped around WCF - Front to Back
tweetText: AWS REST wrapped around WCF - Front to Back
---

Last post I laid out some reasons for using <a target="_blank" href="https://aws.amazon.com/api-gateway">AWS API Gateway</a> for creating REST services.  In this post, I'd like to walk some of the pieces involved, both within AWS, as well as some external tools that can take it to the next level.  In order to cover all the things, I'm going to paint a high level picture, with links to pages providing more detail.

AWS Overview
------------

First, setup within AWS.  The basic layout for a REST service within the AWS API Gateway is:

* **APIs** - overall container for a single API (in our implementation, "Dev", "Prd", "Sandbox" each get their own API)
	* **Resources** - entities exposed by the REST API, eg "Reservation", "Account", etc.  Resources define source endpoints, mappings, and security.
	* **Stages** - deployment/snapshots of a Resource.  Once your Resource has been defined, you deploy a (publicly available) Stage.  For our implementation, we followed the convention of versioning in the Stage path (eg "myResource/v1/<id>").  AWS exposes a (lengthy) URI for your Stage (eg,  https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/v1), which can be invoked from the internets.
	* **Custom Authorizers** - these provide a variety of access control mechanisms to your REST endpoints, such as OAuth and SAML.
	* **Models** - these can be used to define the payload of the various REST endpoints, and are mainly used by mapping templates (more on mapping templates in a minute, they allow you to transform inputs/outputs from the AWS REST layer to your internal layer).  They're also referenced by Lambda functions (more on those below as well).  Honestly, we didn't use these much - we aren't using Lambdas, and wrote most of the transformation templates by hand.

Amazon provides thorough documentation around this whole thing, including this informative <a target="_blank" href="http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-from-example.html">walkthrough</a>.  There are a variety of other wikis/blogs out there that illustrate this process, Googling turns up plenty.

Outside In
----------

With all the above configured, you have two options for your "internal" services:

1. Provide existing endpoints that AWS invokes from the REST endpoints (this is the method we are using).
2. Use <a target="_blank" href="https://aws.amazon.com/lambda/">AWS Lambda</a> functions.  These are dynamic services you define entirely within AWS (using languages such as JS, Python, Java, etc), and look pretty powerful.  We already have web services we want to utilize, so this option wasn't really considered; however, it appears a person could do some pretty fantastic things with them.

With each option above, the AWS API Gateway enables transformation of payloads, both inbound and outbound, using <a target="_blank" href="https://velocity.apache.org/engine/releases/velocity-1.5/user-guide.html">VTL Mapping Templates</a>.  VTL was pretty easy to understand, but limited in functionality (compared to something like JS).  I'm assuming its more performant, but it would be nice to see more capabilities added here in the future.

Swagger
-------

Once everything has been setup in AWS, there is a super cool option of exporting your Stage into a <a target="_blank" href="http://swagger.io/">Swagger</a> file.

<img src="{{ site.baseurl }}/images/AWSAPIExport.png" />

This is sort of the JSON equivalent of what XSD provides for XML, but simpler (as a side note, a developer on our team who is VERY particular about rigidly defining and documenting services scorns Swagger/REST/JSON, because of the "loose" definitions.  I personally am OK with the tradeoff, but recognize there is probably potential for ambiguity, confusion, etc).

With this Swagger file in hand, you now have an easy path to setting up Documentation, an SDK sandbox, and Postman tests!

Documentation / Sandbox
-----------------------

One of the biggest challenges with supporting an external API is teaching people how to use it, and keeping that documentation up to date.  One benefit to Swagger is you can use <a target="_blank" href="http://swagger.io/swagger-ui/">Swagger UI</a>, a tool that automatically generates documentation and a sandbox from a Swagger file.  It is dead simple to get up and running, and the open-sourceness of it allows for tweaking generated content to your heart's content (/ˈkäntent/, /kənˈtent/).  

Here's a screenshot of the their default example.  As you can see, it provides a high level list of all the resources available in the Swagger definition:

<img src="{{ site.baseurl }}/images/swaggerUI1.png" />

From here, a user can drill down into the operations available on each Resource:

<img src="{{ site.baseurl }}/images/swaggerUI2.png" />

And for each operation, they can drill deeper, view detailed documentation, and even test them against a sandbox.  Huge potential for professional SDK generation here!

<img src="{{ site.baseurl }}/images/swaggerUI3.png" />

As long as the Swagger file is the source of truth, and is kept current, Swagger UI can drastically reduce friction for external consumption of a REST API.

Postman
-------

One mental shift I've had to make in the past few years is when creating "pure" services, I no longer need a client app.  In the days when a client app was part of the delivery, that's what we used to test functionality.  When a service was the only delivery, I would usually create some sort of throwaway GUI to test functionality.  However, recently I've been using <a target="_blank" href="https://www.getpostman.com/">Postman</a> to test services, and love it.  

Postman invokes any sort of web endpoint, and allows for configuration of headers, payloads, security, etc.  Additionally, they are continuing to add other functionality on top of these primitives, such as environment management to enable variable sets (eg, "development" variables vs "qa" variables), test scripts to validate results (and populate environment variables), and importing/exporting suites to foster collaboration.

Postman seems to fall short when it comes to "composite" operations, where you're trying to test a series of web calls end-to-end.  A recent update offers the ability to chain different calls together, so it looks like they're looking to improve this?  However, if you need complex coordination between a series of web service calls, you either need to manually coordinate them, or fallback to a custom test harness.

With regards to Swagger and AWS, Postman offers the capability of importing Swagger files, and generating a series of tests from it.  This means that once your API has been staged in AWS, you can quickly spin up test invocations from Postman.  Very slick, very powerful.

<img src="{{ site.baseurl }}/images/PostmanImport.png" />

Postscript
----------

I hope I've done a decent job of illustrating possibilities with the AWS API architecture, and describing tools that multiply its power.  It's worth noting that we are in the initial stages of using these ourselves (first consumer is currently in the testing phase), so we will continue to learn and grow.  But so far, we're really excited about the potential!

...And now, the moment you've all been waiting for, this week's "What Did Marty Learn About Blogging and The Web" (better known as "WDMLABATW"):

<aside class="full-aside">
	<h3>WDMLABATW of the week(s):</h3>
	<ul class="padded-li">
		<li>Longer, more detailed posts take more time!  I know that you, my rabid readers, have been wondering about the next post, and I hope I haven't brought too much sadness into your lives with this delay.  In addition to the longer time actually writing, its harder to stay motivated between writing sessions.  This one sat untouched for days on end, and I'd get depressed just thinking about it.  Kind of a slog!  I suspect the secret here is taking it in smaller bites, being OK with yourself when you need a few days off, and steadily marching forward.  I think/hope this type of thing will get easier with time.</li>
		<li>I've got a Tweet button!  I wanted to get this in place, and like I said, this post took longer than I would have liked, so I did this rather quickly. Twitter <a target="_blank" href="https://about.twitter.com/resources/buttons#tweet">makes it easy</a>.  I plan on making this more robust and complete in the future.
		</li>
	</ul>
</aside>

