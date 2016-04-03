---
layout: post
title: AWS for all the REST
---

We've had a recent need at <a href="http://www.earthclassmail.com">Earth Class Mail</a> to expose a <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">REST</a> API for external partners.  They want to upsell our services, and we'd like a crack at their wonderful, shiny customers.  While we've already got a decent library of well-defined, publicly-exposed web services, there were a few shortcomings we wanted to address:

1. **Dirty SOAP** - The services were written using <a href="https://msdn.microsoft.com/en-us/library/ms731082(v=vs.110).aspx">WCF</a> on the <a href="https://en.wikipedia.org/wiki/SOAP">SOAP</a> protocol, and designed around the "internal" needs of our operations and GUIs.  It would be possible to use these as-is, but we wanted to provide a better overall experience for our  partners.

2. **Who Are You?** - Related to #1, our existing services use an internal session authentication mechanism, and it wasn't really designed for external consumption.  We wanted something simpler.

3. **Beyond .Net** - Our entire operations stack is coded in .Net.  This serves us well, and we will continue to invest in our .Net architecture, but we don't want to restrict ourselves to ONLY .Net for all functionality.  For example, we use Rails in our marketing stack, and may need to tie this into the Partner API in the future.

4. **Tight Coupling with co-located Data Center** - We currently run a majority of operations from a co-located, private data center, but have long term ambitions to lift everything to the cloud (lots more to come on that topic).  By putting our Partner API service layer in the cloud, we avoid adding yet another layer to our existing data center, and gain experience for the eventual cloud migration.

In order to address this list of concerns, and best position ourselves for change and scalability moving forward, we've decided to use the <a href="https://aws.amazon.com/api-gateway">AWS API Gateway</a> as a REST facade layer around our web services.  This brings several powerful ideas to the table:

1. **REST Easy** - Everything exposed to the outside world is REST.  We can use *any* protocol (eg, SOAP) from *within*, but to the outside world, it's a REST service.  This gives us a clean slate to model the API on the specific business process in question, in an intuitive fashion that makes sense to a "naive" consumer.

2. **Single Front Door** - We can expose functionality in a single place from both the .Net and Rails stack, without the outside world being aware of the "seam".  AWS API Gateway gives us a clean way of exposing a single endpoint to external consumers, and leaves the nitty gritty details to us.

3. **One Foot In The Clouds** - By starting in the cloud, we get the commonly touted benefits (scalability, accessibility, analytics, etc), and we're also gaining valuable experience with overall cloud architecture.  While we haven't finalized any decision to use AWS for *everything* (did I mention we have a huge .Net architecture?  wink wink), using AWS for this REST layer has helped to educate us with various AWS (and cloud) concepts.

4. **We Have Swagger** - By using a common language and model for various aspects of this effort (business design, staging REST API resources, documentation, testing), we can streamline and unify the different stages of development.  There are several languages and frameworks available, but for this effort, we've chosen <a href="http://swagger.io/">Swagger</a>.  It's supported by both the AWS API Gateway and <a href="https://www.getpostman.com/">Postman</a>, which we've been using to automate the development and testing of our REST layer.

I will provide some specific implementation details in upcoming posts - stay tuned for some meaty (laborious?) information, including setting this up in AWS, testing the functionality, and creating fantastic documentation.  This effort has been a very fruitful learning exercise for me personally, and has brought several cross-cutting technologies to my attention.  I've learned a ton, and have been inspired to keep learning more!

And now, the moment you've all been waiting for, this week's "What Did Marty Learn About Blogging and The Web" (better known as "WDMLABATW"):

<aside class="full-aside">
	<h3>WDMLABATW of the week:</h3>
	<ul class="padded-li">
		<li>I got serious about my <a href="{{ site.baseurl }}/about">About</a> page, and am going to experiment with using it as a "what have I been doing lately with code, music, and books".  I worry it's going to get stale quickly, but we'll see.</li>
		<li>Dug deeper into Sass this week, digging into the process of personalizing and snappy-fying the site.  This included using a mixin directive for the text shadows seen in the masthead.  A web design guru would probably chuckle at the simplicity, but I feel like I'm taking steps into deeper design waters.  As always, its work in progress</li>
		<li>I tried embedding a Github-style <a href="https://github.com/blog/1825-task-lists-in-all-markdown-documents">tasklist</a> into my post, but no love. AFAIK Github is using jekyll-style markdown, and this *should* work, but I'm not seeing it locally.  Some sort of extra processing from Github?
		</li>
	</ul>
</aside>
