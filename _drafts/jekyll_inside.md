---
layout: post
title: Jekyll Inside
---

Ahh, to have a blog published.  Such satisfaction.  Look at me, a published author!  It wasn't always this way, however.  Once I decided to blog, and had stockpiled a few ideas to write about, I didn't know where to put it all.  Or how to put it there.  Vague recollections of "Blogger" and "Blogspot" crossed my mind, but I hoped things had progressed since my last foray.  Where do we go from here?

I asked my manager <a href="https://stevenmaguire.com/" target="_blank">Steven</a> his thoughts, and he recommended <a href="https://jekyllrb.com/" target="_blank">Jekyll</a>.  Jekyll is a "basic" framework that can be used to generate static content quickly, without needing much infrastructure (eg database, backend services, etc).  It's a breeze to get up and running, and would add a tool to my belt, so I jumped in.  And so far, it's giving me what I want.  This site may still resemble a Soviet-era military manual, but my design skills are to blame for that (I'm working on it!  I will talk about it!).

Without diving too deeply into the implementation weeds, it's basically:

1. a blog forked from a simple Jekyll <a href="https://github.com/barryclark/jekyll-now" target="_blank">starter project</a> on github

2. Hosting provided (for free) by Github, via my "personal site".

Here's the <a href="https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/" target="_blank">post</a> I used to get this up and running, and it went *almost* flawlessly

<p class="all-clear"/>

<div class="belee-dat"></div>

<aside class="aside">
The one "flaw" I encountered was that by forking the github source, I couldn't make my repo private.  Not a huge deal, but it <span class="italics">would</span> mean my "_drafts" folder was publicly available, and I'd like a chance to trim the warts before shipping these immaculately crafted, delightfully entertaining nuggets of tech experiences.	
</aside>

<p class="all-clear"/>

My impressions thus far:

1. Jekyll is slick and easy, with awesome documentation.  Compared to the bomb shelter you're viewing here, their site is very inviting.  Jekyll is easy to get up and running locally, and makes creating a blog, tracking posts, etc, a brainless exercise.  One downside is that it doesn't offer much "dynamic" power (eg, database-related functionality).  In this day and age, however, there is so much free and easy power  using external web services, that I haven't needed any custom backend.  I've got my social hooks, analytics, a robust commenting system, etc, just by hooking into 3rd party services.

2. Jekyll uses <a href="https://daringfireball.net/projects/markdown/">Markdown</a>, which I'm only beginning to learn.  It's pretty simple on the surface, and basically generates HTML, so anything you can't do with Markdown, you simply handroll some HTML.  I mentally lump this into the "higher level language that abstracts things away" category (similar to Coffeescript).  I secretly feel inadequate for not knowing these langauges, and am glad I'm getting the opportunity to learn Markdown here.

3. Along with #2, I'm determined to gain a deeper understanding of Sass/CSS, and how to control where all this stuff is placed on the screen.  This isn't specific to Jekyll of course, but Jekyll ties in nicely with Sass, and I want to move beyond my current simple understanding of these things.

4. Github hosting rocks.  I get my blog versioned controlled, and pushing changes to remote automatically updates my blog.  No brainer.

As part of my journey, I'm going to try and list some details about things I've learned with the current post.  Could be stupid and trivial, or a whole new piece.  Here's this week's "What Did Marty Learn About Blogging and The Web" (better known as "WDMLABATW"):

<aside class="full-aside">
	<h3>WDMLABATW of the week:</h3>
	<ul>
		<li>The "aside" above with the finger pointing at it required me to dig into CSS block/layout functionality a little, and began the process of personalizing and sprucing up the site.  I plan on incrementally doing this over time - that finger is pointing at the future, folks.</li>
		<li>I've hooked the blog into google analytics - easy peasy to do, I used the <a href="http://joshualande.com/jekyll-github-pages-poole/">following post</a> to learn how.  His "Hey, I'm learning Jekyll!" post is better than mine, provides better detail.  Read that if you want to hear even more about the wonderous Jekyll.</li>
	</ul>
</aside>

<p class="all-clear"/>


