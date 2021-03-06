---
layout: post
title: Bring Numbers to Life in Slack
tweetText: Bring Numbers to Life in Slack
---

I'm a sucker for learning new frameworks and ecosystems, and get a big rush generating fancy charts, so was in nerd paradise when I worked on this post's project.  The overarching goal was:

Given a set of numbers we track in our database
When I request a visual representation in Slack
Then a fancy chart will appear and give me an endorphin rush

I'm sure at this point I've got you on the edge of your seat, your body tingling with anticipation for the upcoming bliss.  Hopefully you'll get some joy reading about my experience, and enough of a roadmap to set yourself free as well.

There are a few pieces at play during this adventure:

1. *<a href="https://www.heroku.com">Heroku</a>* - our backend, which includes a PostgreSQL database and Rails app layer
2. *<a href="https://hubot.github.com">Hubot</a>* - a "bot" that can be used to automate chatrooms, perform tasks, etc.  Created by the folks at Github.
3. *<a href="https://charturl.com">Chart URL</a>* - a chart generating API - you send them numbers, they create an image containing a C3 chart.
4. *<a href="https://slack.com">Slack</a>* - super cool messaging app we use at <a href="https://www.earthclassmail.com">Earth Class Mail</a> for all our messaging needs.

Once these things are setup, what once was a black box of inscrutable data becomes a flowerly, rainbow-like smorgasboard of business insight!

Here's a play-by-play on how it all came together...

Heroku
------

We are utilizing Heroku for a few different <a href="http://rubyonrails.org/">Ruby on Rails</a> apps within our organization, including our onboarding process.  Part of this architecture includes a <a href="https://www.postgresql.org/">PostgreSQL</a> database that contains all sorts of interesting data.  While Heroku would allow us to directly connect to our DB (I believe they actually host it in <a href="https://aws.amazon.com/">AWS</a>?), they offer a simpler solution that allows us to create simple, targeted micro-services - <a href="https://blog.heroku.com/archives/2012/2/14/simple_data_sharing_with_data_clips">Data Clips</a>.

Heroku Data Clips are explained in detail in the blog link above, but essentially:

1. You provide a SQL query against your PostgreSQL data store.
2. Heroku provides a secure URL that will invoke that query (this can be executed real-time, every time, or pinned to a point in time, providing a static snapshot).
3. Your data is set free, and available to colleagues and 3rd party apps.

With a few simple Data Clips in place, we are ready to consume using Hubot!

Hubot
-----

Hubot is a scripted automation engine invented by the folks at Github.  It is useful for all sorts of things, including integrating chatrooms with 3rd party services (which is why we're using it). It is written in <a href="http://coffeescript.org/">CoffeeScript</a> and runs on <a href="https://nodejs.org/">Node JS</a>, and is easily to use if you know coffeescript (or javascript).

In a simplified nutshell, we do the following within our script:

1. Utilize (amongst other libraries) <a href="https://github.com/slackhq/hubot-slack">hubot-slack</a>
2. robot.respond /querytorobot - this is the hook in the script that responds to the command in the chat room.  We associate a delegate here that does the heavy lifting.
3. msg.send 'what we want to send to slack' - this allows us to send any info we want to Slack

I'm leaving alot of implementation details here to the reader, but long story short, Hubot will allow you to bridge your DataClips to your Slack instance (or any other chat program, for that matter).

So Far, Good Enough?
--------------------

With our data in hand, and a transport for sending it to Slack, we have a solid mechanism for providing valuable reports to end users.  In fact, at EarthClassMail we do just this regularly.  For example, something like:

/hubot leads

Will dump a set of numbers to the slack window representing our latest accumulation of lead data.  While super informative to the business, and probably "enough" to get the job done, I'm a big fan of visualizing data.  As they say, a picture is worth a thousand words.  Wouldn't it be great if we could slap a graph on front of the data?

ChartURL
--------

When I first tackled this visualization project, I figured I'd generate a <a href="https://d3js.org/">D3</a> graph from the data, and embed an HTML link in Slack.  Unfortunately, at the time I implemented this solution, this wasn't possible (maybe in the future?).  What IS possible is providing a link to a static image, and Slack will display that within the channel.  After pursuing several dead ends for accomplishing this task, a coworker clued me in to <a href="https://charturl.com/">Chart URL</a>, a handy service that gives us exactly what we need!

Chart URL actually uses <a href="http://c3js.org/">C3</a>, a charting library BASED on D3 (which is great for us!)  With a few simple steps (and some scripting transformations), we can get our Chart within Slack:

1. Define the chart template within Chart URL (a little bit of a learning curve here, but manageable).
2. Within our Hubot script, pull JSON data from Heroku Data Clip
3. Transform this JSON as necessary to get it in the format required by Chart URL.
4. Post payload to Chart URL - they will respond with a publicly exposed URL that displays a static chart representing our data.
5. Use msg.send to post this URL into Slack...and voila!  Our Chart appears in the channel, visually describing our data at a glance.  Money.

Slack
-----

Finally...there is no finally!  Slack is obviously a big part of this, but we're already done.  With this general pattern, all sorts of data can be represented in all sorts of ways.  Impress your boss!  Wow your friends!  SET YOUR DATA FREE!!!





