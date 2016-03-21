---
layout: post
title: Jekyll Inside
---

Ahh, to have a blog published.  Such satisfaction.  Look at me, a published author!  It wasn't always this way, however.  Once I decided to blog, and had stockpiled a few ideas to write about, I didn't know where to put it all.  Or how to put it there.  Vague recollections of "Blogger" and "Blogspot" crossed my mind, but I hoped things had progressed since my last foray.  Where do we go from here?

I asked my manager <a href="https://stevenmaguire.com/" target="_blank">Steven</a> his thoughts, and he recommended <a href="https://jekyllrb.com/" target="_blank">Jekyll</a>.  Jekyll is a "basic" framework that can be used to generate static content quickly, without needing much infrastructure (eg database, backend services, etc).  It's a breeze to get up and running quickly, and would be an addition to my toolbelt, so I jumped in.  And so far, it's exactly what I need!  I realize this site still resembles a Soviet-era military manual, but my immature design/styling skills are to blame for that (I'm working on it!  More to come!).

I won't dive too deeply into the implementation weeds, but my basic infrastructure consists of:

1. Blog site created with a simple Jekyll starter project (forked from Github)

2. Hosting provided (for free) by Github, via my Github "personal site".

<aside class="aside">
* The one "flaw" was that by forking the github source, I was not able to make my repo private.  Not a huge deal, but it would mean my "_drafts" folder was publicly available, and you all don't need to see the warts on my posts before I ship these immaculately crafted beauties!
</aside>

(here's the <a href="https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/" target="_blank">post</a> I leaned on heavily to get this up and running, and it went almost* flawlessly)

<img src="/images/belee-dat.png" class="belee-dat">

<br style="clear:right"/>

My impressions thus far:

1. Jekyll is alot of fun, with awesome documentation.  Compared to the bomb shelter you're viewing here, their site is very inviting.  Jekyll is easy to get up and running locally, and makes creating a blog, tracking posts, etc, a brainless exercise.  It doesn't offer much "dynamic power" (eg, database-related functionality); however, in this day and age, there is so much free/cheap power available using external web services, I haven't missed it yet.  I've got my social hooks, analytics, a robust commenting system, etc.

2. Jekyll uses <a href="https://daringfireball.net/projects/markdown/">Markdown</a>, which I'm only beginning to learn.  It's pretty simple on the surface, but I'm thinking/hoping it goes much deeper, and I'll continue to pickup tricks over time.  I mentally lump this into the "higher level language that abstracts things away" category (similar to Coffeescript).  I secretly feel inadequate for not knowing these langauges, and am glad I'm getting the opportunity to learn Markdown here.

3. Github hosting rocks.  I get my blog versioned controlled, and pushing changes to remote automatically updates my blog.  No brainer.

