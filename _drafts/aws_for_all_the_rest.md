---
layout: post
title: AWS for all the REST
---

### TODO

- [ ] Header for each bullet
- [ ] WDMLABATW of the week (include todo list!)
- [ ] styling update (colors?)
- [ ] try to find an interesting web service to add-in (poll? "where are people coming from?")
-- http://gustavepate.github.io/blog/20130718/todo-check-list-jekyll-blog/
-- http://matienzo.org/2016/jekyll-todo-list/
https://milanaryal.com/2015/writing-on-github-pages-and-jekyll-using-markdown/
- [ ] add "interesting links from the week" section

We've had a recent need at <a href="http://www.earthclassmail.com">Earth Class Mail</a> to expose a REST API for external partners.  They need to interact directly with our backend logic, and we'd like a crack at their wonderful, shiny customers.  While we've already got a decent set of well-defined, publicly exposed web services, there were a few shortcomings we wanted to address:

1. The services were written in <a href="https://msdn.microsoft.com/en-us/library/ms731082(v=vs.110).aspx">WCF</a> on the SOAP protocol, and designed around the "internal" needs of our operations and GUIs.  So while it would be possible to use these as-is, we wanted to provide a better consumption experience for potential partners.

2. Related to #1, our existing services use our internal session authentication mechanism, which wasn't really designed for external consumption.

3. Coupled to .Net

4. Coupled to Data Center

5. We want REST

In order to address this list of concerns, and best position ourselves with regards to change and scalability moving forward, we've decided to use the <a href="https://aws.amazon.com/api-gateway">AWS API Gateway</a> as a facade layer around any nd all of our web services.  This gives us several advantages:

1. REST - everything exposed to the outside world is REST.  We can use any protocol we want within the AWS API gateway, but from the outside world's perspective, it's a REST service.

2. Common entry point - alongside our existing WCF services, we have also started to build some APIs using Rails/Postgres for a different system.  While this is *somewhat* managable for us, it's not a seam we want the rest of the world to see.  AWS API Gateway gives us a clean way of exposing a single "layer" to external consumers, and leaving the nitty gritty details to us.

3. Foot in the cloud door - we are only beginning our migration to the cloud (hoping to post alot about that in the future), and this gives us some experience in that world.  In addition to all the commonly touted benefits (scalability, accessibility, analytics, etc), we're getting valuable experience learning about various concerns of a cloud architecture.

4.  Common Language (Swagger) - using a common language for various aspects of our development (staging REST API resources, documentation, testing) streamlines the different development stages, and ensures coordination between then.  There are several languages available, but for this effort, we've chosen <a href="http://swagger.io/">Swagger</a>.  It's supported by both AWS API Gateway and <a href="https://www.getpostman.com/">Postman</a>, which I've been using to automate the development and testing of our layers.