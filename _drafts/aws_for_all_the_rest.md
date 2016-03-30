---
layout: post
title: AWS for all the REST
---

### TODO

- [ ] styling update (colors?)
- [ ] try to find an interesting web service to add-in (poll? "where are people coming from?")
-- http://gustavepate.github.io/blog/20130718/todo-check-list-jekyll-blog/
-- http://matienzo.org/2016/jekyll-todo-list/
https://milanaryal.com/2015/writing-on-github-pages-and-jekyll-using-markdown/
- [ ] add "interesting links from the week" section

We've had a recent need at <a href="http://www.earthclassmail.com">Earth Class Mail</a> to expose a REST API for external partners.  They need to a way to interface with our backend, and we'd like a crack at their wonderful, shiny customers.  While we've already got a decent set of well-defined, publicly-exposed web services, there were a few shortcomings we wanted to address:

1. **Dirty SOAP** - The services were written in <a href="https://msdn.microsoft.com/en-us/library/ms731082(v=vs.110).aspx">WCF</a> on the SOAP protocol, and designed around the "internal" needs of our operations and GUIs.  It would be possible to use these as they are, but we wanted to provide a better overall experience for our  partners.  This includes an intuitive REST API that accurately models our business processes, along with documentation/sdk-generation/testability capabilities provided by some REST technologies.

2. **Who Are You?** - Related to #1, our existing services use an internal session authentication mechanism, and it wasn't really designed for external consumption.  We wanted something simpler.

3. **Beyond .Net** - Our entire operations stack is written in .Net.  This has served us very well, and we will continue to invest in the .Net architecture, but we don't want this to force us to use .Net when adding new functionality.  For example, we use Rails in our marketing stack, and may need to tie this into the REST API in the future.  We don't want to force everything through a .Net layer.

4. **Tight Coupling with Co-Lo Data Center** - we currently run a majority of operations from a co-located private data center, but have long term ambitions to lift everything to the cloud (lots more to come about that whole piece).  By putting our REST API mapping layer in the cloud, we avoid adding yet another component to our existing data center, and gain a little cloud experience in preparation of the eventual overall migration.

In order to address this list of concerns, and best position ourselves for change and scalability moving forward, we've decided to use the <a href="https://aws.amazon.com/api-gateway">AWS API Gateway</a> as a REST facade layer over our web services.  This brings several powerful ideas to the table:

1. **REST Easy** - Everything exposed to the outside world is REST.  We can use *any* protocol (eg, SOAP) from *within*, but to the outside world, it's a REST service.  This also gives us a clean slate to model the API after the business processes in question, in a way that makes sense to a "naive" consumer.

2. **A Single Front Door** - We can expose functionality from both the .Net and Rails stack, without the world being aware of the "seam".  AWS API Gateway gives us a clean way of exposing a single "layer" to external consumers, and leaving the nitty gritty details to us.

3. **One Foot In The Clouds** - By starting in the cloud, we get the commonly touted benefits (scalability, accessibility, analytics, etc), but we're also gaining valuable experience with overall cloud architecture.  While we haven't finalized any decision to use AWS for everything (did I mention we have a huge .Net architecture?  wink wink), using AWS for this REST layer has helped to educate us with various AWS (and cloud) concepts.

4. **We Have Swagger** - using a common language and model for various aspects of our development (business design, staging REST API resources, documentation, testing) streamlines and unifies the different stages of development.  There are several languages and frameworks available, but for this effort, we've chosen <a href="http://swagger.io/">Swagger</a>.  It's supported by both the AWS API Gateway and <a href="https://www.getpostman.com/">Postman</a>, which we've been using to automate the development and testing of our REST layer.

Stay tuned for some meaty (laborious?) posts containing further details of setting this up in AWS, testing the functionality, and creating fantastic documentation.

And now, the moment you've all been waiting for, this week's "What Did Marty Learn About Blogging and The Web" (better known as "WDMLABATW"):

<aside class="full-aside">
	<h3>WDMLABATW of the week:</h3>
	<ul class="padded-li">
		<li>TODO</li>
	</ul>
</aside>

