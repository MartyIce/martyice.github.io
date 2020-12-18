---
layout: post
title: Aaryavir Mentions Svelte
tweetText: One brave developer's bold attempt to convince an organization to try something new.
---

<h3>The Fateful Day</h3>
The past few months had been pretty rough at the candy factory.  Hell, the past few YEARS had been rough - lately it had been downright unbearable.  Aaryavir, the hero of our story, was a developer working on Dandy Candy's marketing website.  While he used to love the work, recently he'd been in a downward spiral.  The whole company was struggling with morale.  Sales were down, negative emotions were up, and the future was bleak.  Management was starting to pound tables, looking for easy fixes, and people to blame.  Heads were starting to roll.

A recent bright spot was the decision to revamp the marketing site (known internally as "The old, shitty marketing site").  Written 10 years ago on an old version of [Angular][angular], it was bad, and getting worse.  The styling looked antiquated, few knew how to make changes, and it was unusable on mobile devices.  Hiring had been very difficult lately, as no developers wanted to work on this relic.  It was a feedback loop of misery.

The *last* time a big change was introduced, it broke the checkout process.  And it took days to fix.  Deployed on a Friday afternoon, the lack of monitoring left the problem unnoticed for about a day.  It was Saturday afternoon before the boss noticed the lack of sales.  Frantic messaging ensued throughout the organization.  The lead architect was finally tracked down, and found the problem after a few hours (lightspeed in this code base!).  The long running deployment process eventually got the fix out Sunday afternoon.  Monday brought a shortened work week to several people, as they no longer had jobs.  The exhausted, abused morale of the company took another blow.

In the days and weeks that followed, blame was placed everywhere.  [DevOps][devops] rightly took a large share of it - the detection and fix for the issue took an inexcusable amount of time.  But as engineering leadership dug into the problem, they gained a better appreciation of the marketing site "situation".  At first, short term fixes were discussed.  However, all avenues for improving the site ran into insurmountable obstacles.  No automated testing.  Too much code debt.  Not enough talent.  Old platform.  Performance issues.  The list went on and on.  After a few days of heated debate, the big decision was made.  The site was to be scrapped, and a grand rewrite would commence!

This was welcome news for the developers, and spirits soared as they began thinking ahead.  A meeting was held, excitement was in the air!  Soon, however, discord sank in as different approaches were proposed.  Some devs championed [ReactJS][react], others [VueJS][vue].  Still others wanted to stick with [Angular][angular], by upgrading to the latest version (which was itself, a rewrite).  The temperature in the room was stifling.  Sleeves rolled up, armpits soaked with sweat.  The alpha coders in the organization dug in their heels, and each schemed how to undercut the other.  The pounding of tables escalated.

In the midst of all this grandstanding, something snapped within Aaryavir.  Ego was overtaking reason, and a workable decision was further away than ever.  He'd had enough.  He decided to take a chance, and spoke up.

"Has anyone here heard of [Svelte][svelte]?".  The room was silent.

<h3>Thoughts & Notes</h3>
* For our hero's name, I grabbed the first one I saw [here][brave baby names].
* I've deliberately made this a "cliffhanger".  Both to build nail-biting suspense, and because I don't have the time and material to take this deeply yet.  Remains to be seen how I will approach the serial posting - perhaps alternate between Svelte ecosystem overviews, and our story?

[brave baby names]: https://www.momjunction.com/baby-names/meaning-brave/boy/starting-with-a/
[devops]: https://azure.microsoft.com/en-us/overview/what-is-devops/
[angular]: https://angularjs.org/
[svelte]: https://svelte.dev
[react]: https://reactjs.org/
[vue]: https://vuejs.org/
