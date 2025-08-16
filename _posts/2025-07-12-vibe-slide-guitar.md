---
layout: post
title: Vibe Learning Slide Guitar
tweetText: Vibe Learning Slide Guitar
---

I'm learning how to play slide guitar, and vibe coding an app to help me get there.  A mutual intertwinement of passions, pushing me to expand my boundaries, and adding a bit of color and purpose to my life!

## Overview

I've been a guitar player for most of my life.  This has included periods of eager practice, mixed with (longer) bouts of low motivation, and sometimes, abandonment.  Time slips by, energy flags, and the guitar gathers dust.

I'm also a coder, and a while back wrote a Ruby on Rails app to motivate me to practice.  Alas, this site *also* began gathering dust.  It started as a way to learn RoR, and it got to the point where it was mildly interesting.  It tracked songs I was playing, and gave me a way to log practice time.  But it was never super useable (especially in mobile), and I lacked time and motivation to keep pushing it further.  A lonely website, dashed upon the shore of website lost hopes and dreams.

![Symbiotic Beanstalk]({{ site.baseurl }}/images/vibe-slide-guitar/WebsitesDashedOnRocks.png){: width="400px"}

However, with the onset of Vibe Coding, I've resurrected it as a new NestJS app.  Moved it from Heroku to Vercel.  And have supercharged its usefulness!

I'd like to (re) introduce **[JamboreeHero.com](https://www.jamboreehero.com){:target="_blank"}**.  Using Cursor Agents, my productivity has drastically increased, without taking much more of my time (more on that below).  Now I am able to "guide" the vibe coding while I experience the app as a user, without it requiring alot of my time to fix things.

It's a beautiful, symbiotic thing.  And I honestly feel like it's motivating me to play more guitar!

## Jamboree Hero

Here's a rough rundown of what the app provides:

* **Add Songs** - Create entries for songs you're learning, playing, or want to practice.
* **Track Resource Links** - Collect links to tablature, video tutorials, lyrics, chord charts, wikis, and any other song resources.
* **Log Practice** - Record practice sessions directly from your songs or add general practice time
* **Set Goals** - Define practice goals. Choose between daily or weekly targets (eg, "do this 15 minutes a day.  do that 60 minutes a week")
* **Create Incentives** (*newly added!*) - establish a long term goal with a reward for yourself (eg, "if I practice slide guitar for 40 hours total, I can buy that resonating guitar I've been wanting")

This last feature is underway as I type this blog entry.  Guided by me, coded by bots.  Incredible.

## Current Musical Mission

As I vibe coded the app, I realized I wanted to track different types of goals - one for regular guitar playing, a second for lap steel slide.  So I setup a "[Practice Goal](https://www.jamboreehero.com/practice-goals/brochure){:target="_blank"}" of 30 minutes of slide a week.  Easy to achieve, and also easy to see if I've been slacking.

As the app evolved, I remembered that I want to learn how to play slide guitar.  I bought a cheap lap steel guitar a couple years ago, messed around on it once or twice, and moved on.  Now it is gathering dust (I guess we have alot of dust in the house)!  But there's nothing more haunting and beautiful than a tastfully played slide guitar.  So I added a "Practice Goal" of 30 minutes of slide guitar a week.  And its worked pretty well - I now have a few weeks of *some* slide guitar under my belt.

Today, on a long walk, I was daydreaming about buying a resonator guitar.  I'm not good enough to justify buying one yet, and don't want another thing gathering dust.  But if I practice diligently for a few months, it might be a worthwhile investment!  This "treat" could be good motivation for meeting my practice goals.  Hey, why not put that in the app?!  

So there, on my walk, I used my phone to dictate the idea to a Cursor background agent.  As I continued to walk, my brain kept churning on this concept, and further developed the overall feature.  For each new thought, I'd add a comment to the Cursor job, and it would continue to evolve the implementation.  It's still thinking and building while I type up this blog post.

![Symbiotic Beanstalk]({{ site.baseurl }}/images/vibe-slide-guitar/BotArmy.png){: width="400px"}


*I've got to break here and check on Cursor's progress.  Be right back...*

Ah, Cursor had pushed a commit, which Github then pushed to Vercel, but there was a problem with the build.  Easy fix - I copied the Vercel output, and pasted into Cursor, asking it to fix.  It's working on that now.  A tiny manual step required to move things forward.  I'm guessing this is something that they will eventually automate, or already have and I just don't know how to use it yet?

![Vibe Coded Commit Battlefield]({{ site.baseurl }}/images/vibe-slide-guitar/VibeCodedCommitBattlefield.png){: width="800px"}

I'll check back on this in a few minutes to see how it's coming along.

## Symbiotic Vibe Learnings

For me, having a problem to solve (facilitate and improve practicing guitar) has been a magical ingredient in the Vibe Coding gumbo.  It's mind blowing what current AI can do, but without a purpose/mission/roadmap, it feels a bit hollow and useless.  But with an actual *need*, suddenly the ideas pour forth as fast as the AI can code them up.

The current vibe coding ecosystem is incredible, but does still require some coding know how.  

Here's the vibe coding "stack" I'm using on this project:

* Cursor/Claude for the coding, IDE, and agents
* Github for source control, and triggering actions
* Vercel for hosting the app, and managing deployments
* Supabase for backend database

Additionally, as this app gets more useful, I've started to look towards evangelizing it to the wider world.  With that comes marketing, social media, demonstration videos, etc.  I'm wondering how AI can help there as well.  I've already used Cursor to build some respectable brochure ware on the site (ie, when logged out, clicking the navigation items provides cheerful descriptions of what the app does, and how it can help you).  I'm now starting to percolate ideas about how to automate posting ideas and progress to the wider world.  Both enhancements to the app, as well as notable achievements with my guitar playing.

![Symbiotic Beanstalk]({{ site.baseurl }}/images/vibe-slide-guitar/SymbioticBeanstalk.png){: width="600px"}

It is a brave new world!  Hopefully one that will be set to the soundtrack of me playing some incredible slide guitar.
