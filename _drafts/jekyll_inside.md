---
layout: post
title: Jekyll Inside
---

Ahh, to have a blog published.  Such satisfaction.  Look at me, a published author!  It wasn't always this way, however.  Once I decided to blog, and had stockpiled a few ideas to write about, I didn't know where to put it all.  Or how to put it there.  Vague recollections of "Blogger" and "Blogspot" crossed my mind, but I hoped things had progressed since my last foray.  Where do we go from here?

I asked my manager <a href="https://stevenmaguire.com/" target="_blank">Steven</a> his thoughts, and he recommended <a href="https://jekyllrb.com/" target="_blank">Jekyll</a>.  Jekyll is a "basic" framework that can be used to generate static content quickly, without needing much infrastructure (eg database, backend services, etc).  It's a breeze to get up and running, and would add another tool to my belt, so I jumped in.  And so far, it's giving me just what I need.  This site may still resemble a Soviet-era military manual, but my primitive design skills are to blame for that (I'm working on it!  I will talk about it!).

Without diving too deeply into the implementation weeds, my blog consists of:

1. A site forked from a simple Jekyll <a href="https://github.com/barryclark/jekyll-now" target="_blank">starter project</a> on Github.  Jekyll has pure "site generation" capabilities, but the starter project provided some basic hooks for social media, analytics, etc.

2. Hosting provided (for free) by Github, via my "personal site".

Here's the <a href="https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/" target="_blank">post</a> I used to get this up and running, and it went *almost* flawlessly

<p class="all-clear"/>

<div class="belee-dat"></div>

<aside class="aside">
The one "flaw" I encountered was that by forking the github source, I couldn't make my repo private.  Not a huge deal, but it <span class="italics">would</span> mean my "_drafts" folder was publicly available, and I'd like a chance to trim the warts before shipping these immaculately crafted, delightfully entertaining nuggets of tech experience.	
</aside>

<p class="all-clear"/>
<p class="slight-vertical-space"/>

My impressions thus far:

1. Jekyll is slick and easy, with awesome documentation.  Compared to the bomb shelter you're viewing here, their site is very inviting.  Jekyll is painless to get up and running locally, a mostly brainless exercise.  Painless and brainless - my cup of tea.  One downside is that it doesn't offer much "dynamic" power (eg, database-related functionality).  In this day and age, however, you can find a web service for about any purpose, and I haven't needed any custom backend.  I've got my social hooks, analytics, a robust commenting system, etc, just by hooking into 3rd party services.  My needs may change with time, but I'm happy as a clam at the moment.

2. Jekyll uses <a href="https://daringfireball.net/projects/markdown/">Markdown</a>, an easy to learn abstraction of HTML. The Jekyll framework generates HTML from Markdown source, so anything you can't do with Markdown, you simply handroll your own HTML.  I mentally lump this into the "higher level language that abstracts things away" category (similar to Coffeescript).  I secretly feel inadequate for not knowing these languages, and am thankful for the opportunity to learn Markdown here.  Please keep this knowledge of my fear of inadequecy to yourself.

3. Along with #2, I'm determined to gain a deeper understanding of Sass/CSS, and how to control where all this stuff is placed on the screen.  I currently know enough to be dangerous, and would compare my CSS skills to a club made from a large stick.  I'd like to slowly whittle that down to a scalpel.

4. Github hosting is pretty sweet.  My blog is versioned controlled, and pushing changes to the remote repo automatically updates my blog.  No brainer.

As part of my journey, I'm going to document additions to the blog and lessons learned from the current post.  Could be stupid and trivial, or a whole new level of awareness.  Here's this week's "What Did Marty Learn About Blogging and The Web" (better known as "WDMLABATW"):

<aside class="full-aside">
	<h3>WDMLABATW of the week:</h3>
	<ul class="padded-li">
		<li>The sweet "aside" with the finger pointing required me to dig into CSS block/layout functionality, and launched the process of sprucing up the site.  I plan on incrementally doing this over time - that finger is pointing at the future, folks.</li>
		<li>I've hooked the blog into Google analytics - easy peasy to do.  I used the <a href="http://joshualande.com/jekyll-github-pages-poole/">following post</a> to learn how.  His "Hey, I'm learning Jekyll!" post is better than mine, and provides more detail.  Read that if you want to hear even more about the wonderous Jekyll.</li>
		<li>My writing is still mostly off the cuff, but I'm trying to formalize the process a little, and not get in a rush to release without revising several times.  Write, let it simmer, read again and tweak, let it simmer, remove several bad jokes, add one or two more, let it simmer.  It's all about the simmer, baby.  At some point, I think I'd like to formally read some "how to write great" books, but for now, you're getting mostly pure Marty, with some impatient Marty editing.
	</ul>
</aside>

<p class="all-clear"/>


