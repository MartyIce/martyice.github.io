---
layout: post
title: Painting a Pipeline from App Insights
tweetText: Painting a Pipeline from App Insights
---

Thousands of items moving into and through inventory.  Lots of information to track.  Plenty of things can go wrong.  How do we tell whether everything's working?  How can we know when things run more slowly than usual?

I work for a company called EarthClassMail, and we specialize in "Office Mail Automation".  We've got a pipeline (composed of people and software) with thousands of pieces of mail (and packages) coming in a day.  These items are scanned, added to various databases, considered for further action (content scan, shipping, recycle, etc), and presented to the customer in our UI.

Our existing (legacy) system still tracks lots of the above in our SQL database.  But we've been peeling back the layers, and moving things to clouds (mostly Azure queues and functions).  It's an ongoing process, and we're learning as we go.  But when things don't work correctly, we've been frustrated with a lack of visibility into where the problems lie.  Enter Application Insights.

Azure has had App Insights for a while.  I had played with it some, but only used their built-in dashboard.  The dashboard is powerful in ways (especially for tracking service throughput, etc), but limited in it's filtering capabilities (eg, looking at interesting traces, etc).  It was hard to find the information I needed.  I'd try to get lucky with date ranges, and usually fail.

<img src="{{ site.baseurl }}/images/azure_deployment.png" alt="Default App Insights Dashboard"/>

This let me to disregard the power AppInsights offered.  Until I used AppInsights Analytics.

<img src="{{ site.baseurl }}/images/analytics1.png" alt="App Insights Analytics Chart"/>

AppInsights Analytics is more like using SQL, but uses it's own query syntax.  It looked confusing to me at first, but the syntax began to make sense once I played with it some.  (whey can't they allow just a *little* SQL?  Seems like they could have some sort of interpretor?  maybe someone could write one.).  

<img src="{{ site.baseurl }}/images/hard-query.png" alt="Intense Querying"/>

While the above seems crazy to the untrained eye, you get used to it after a while.

Analytics allows me to find the exact traces/requests I need, and easily renders them in a variety of formats:

<img src="{{ site.baseurl }}/images/google-render-results.png" alt="So Much Beauty!"/>

We've only begun to explore using AppInsights in meaningful ways, but this series of posts will focus on the challenges encountered when instrumenting the item pipeline mentioned above.  They included:

* Legacy .Net/SqlServer architecture in a private data center, gradually under migration to cloud.
* Specifically, our "item pipeline" was being lifted out of a SQL state engine, and moved into Azure queues, functions, and an AWS Elastic data repository.  
* The pipeline was running slow.  Scans were taking way too long to go from "mailman handed us the bag" to "customer can view in the UI".

We needed a way of knowing our queue sizes, and where individual items stood in the "pipeline".  The next few posts will get into the technical details of how we tackled this problem.