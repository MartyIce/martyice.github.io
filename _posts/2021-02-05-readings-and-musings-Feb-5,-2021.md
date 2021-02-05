---
layout: post
title: Readings and musings, 2/5/2021
tweetText: Readings and musings, 2/5/2021 - Cool happenings in India, thoughts about thinking, and other snappy tech walk-thrus
---

<h3>Overview</h3>
This week we have cool happenings in India, thoughts about thinking, and other snappy tech walk-thrus!

<h3>The Internet Country - How India created a digital blueprint for the economies of the future</h3>
[link][internet country]

There's a [famous line][future uneven] about tech and society - "The future is already here, it’s just unevenly distributed".  Living in the US, I've been able to reap the rewards of living in a "first-world" country and economy.  However, with the advance of mobile technology and the internet, new possibilities have emerged for with identity and banking.  Other countries are making huge strides in these areas, with some already well ahead of what we've got here in the US.  

This article highlights the "India Stack", which consists of 3 main pillars:

* Identity - everyone has a digital identity, removing the need for cumbersome paper-based authentication.
* Payments - mobile payments are king, with super cheap transactions allowing a near-frictionless economy.
* Data - people control their data, and can share it as necessary with various providers and third parties.

What seems to be emerging is an "API for life".  Government and industry have thoughtfully built these three primitives, and an enormous ecosystem of apps and services is growing atop it.  These three pillars are attacking real-life "papercuts", and removing loads of friction.  Bill Gates is quoted in the article as saying "India is on the cusp of leapfrogging", and the data in the article backs this up.

While it's discouraging to see the US falling behind, it's not a zero sum game.  The lessons and technologies developed in India will be repeatable elsewhere.  They are forging a path that we can follow.  

Additionally, US-based companies like Google are heavily involved in the Indian effort, and are lobbying the US government to do similar things here.  There are concerns around privacy and "big brother" that we'll need to solve.  But it seems clear that India is already reaping massive rewards from this infrastructure, and the rest of the world will inevitably follow.  

<h3>Comparing API Architectural Styles: SOAP vs REST vs GraphQL vs RPC</h3>
[link][api architectural]

This article provides a well-written summary of some major different API types.  I was already familiar with most of this, but the article was a nice refresher, and taught me some things I didn't know.  One takeaway - most of what we call "REST" may actually be better described as "RPC".  Additionally, it offered another reminder that I need to dive deeply into GraphQL.  I've played with it, and understand the concepts, but have not embraced.  Honestly, when I hear people tout GraphQL, I suspect they are more excited about the "shininess" than the actual functionality it offers.  But could it be that I'm an API [Ludddite][luddite]?  Might need to write a post or two in the future to shake off the unfamiliarity!

<h3>How to Think for Yourself</h3>
[link][think for yourself]

[Paul Graham][paul graham] has a few successes under his belt, including co-founding [Y Combinator][y combinator].  [His site][paul graham site] contains essays and references containing his thinking on all sorts of topics.  

[This essay][think for yourself] compares and contrasts "independent-minded" vs "conventional-minded" people.  It describes three qualities of independent-minded people:

* Fastidiousness about truth - being careful about "degree of belief".  Things aren't always "true" or "false" - there can be degrees of truthfulness or falsehood.  An independent-minded person is careful about this distinction, and labels ideas accordingly.
* Resistance to being told what to think - in essence, "think for yourself".  Judge ideas on your own, and reach your own conclusions.
* Curiosity - interest in new things, and a desire to learn about them

The essay goes into depth on these topics, and notes an interesting point - most "conventional-minded" people think they are "independent-minded".

In addition to getting me thinking about this topic, this essay was a little humbling in the subject matter it tackled.  My writing tends to be fairly high-level, and observes surface-level things.  eg, "Here's how to get this code working".  The idea of writing about different types of thought processes, and forming novel opinions about classifying them, is pretty heavy stuff.  Outside my wheelhouse.  But I shall keep writing, and building that muscle.  It's inspiring to read something beyond my abilities to create.  Even if I never get there, writing like this gives me something to strive towards.

<h3>Build a Simple Todo App with React ⚛</h3>
[link][react todo]

This is a small, self-contained tutorial walking through the creation of a simple [React][react] app.  If you've been itching to see what all the fuss is about, this tutorial is for you.  

I like it for a few reasons:

* It lives entirely within [Codepen][codepen], an online front-end sandbox.  No need to install things locally, fight through NPM issues, etc.  
* It highlights some important concepts in React (components, state, event handling) without getting too deep into the weeds.

Any serious React development would require a much deeper dive, but this is a nice 15 minute "taste".  If it wets your whistle, you might interested in drinking more deeply from the React well!

One additional nugget of value from this article - it's mention of [Bulma][bulma].  From their website:

> Bulma is a free, open source framework that provides ready-to-use frontend components that you can easily combine to build responsive web interfaces.

CSS is a mountain lurking on the horizon of my javascript journey, and I'm interested in frameworks that simplify it.  After reading this article, I've got another investigative TODO on my list!

<h3>Introducing Check</h3>
[link][check intro]

[Stripe][stripe] is a tech unicorn that seems to be everywhere these days.  "Payments infrastructure for the internet".  I've had a hard time internalizing exactly what that means, and why they're such a big deal.  "So...they collect payments?".  Honestly, it's been hard for me to fully understand the hype.

Reading this intro to [Check][check], something clicked in my brain.  Check provides "payroll as a service", an API to manage payroll for a company.  This is important because in the current tech landscape, payroll typically relies on legacy, monolithic apps.  

A typical company (hypothetically, let's say they manufacture bicycles) might have two major pieces of software:

* Bicycle Management software - this handles everything a bike manufacturer may need in their business
* Payroll - this is how they pay their people, because traditional Bicycle Management Software doesn't handle payroll

Check (and Stripe) are tackling these monolithic, legacy financial applications, and peeling their functionality off into micro services.  By doing so, Check has provided a way for other software (eg, Bicycle Manufacturing software) to *also* provide payroll.  

This is exciting stuff, both from a technological standpoint, as well as for the greater economy.  There is huge value trapped in these financial service providers, and breaking things into smaller services will allow better things to grow in their place.  It almost feels like an old, decaying oak tree is in the process of falling over, and with the newly available sunlight, an entire ecosystem will be born in its place.  And so on and so forth!

[internet country]: https://tigerfeathers.substack.com/p/the-internet-country
[future uneven]: https://quoteinvestigator.com/2012/01/24/future-has-arrived
[api architectural]: https://levelup.gitconnected.com/comparing-api-architectural-styles-soap-vs-rest-vs-graphql-vs-rpc-84a3720adefa
[luddite]: https://en.wikipedia.org/wiki/Luddite#Modern_usage
[think for yourself]: http://paulgraham.com/think.html
[paul graham]: https://twitter.com/paulg
[y combinator]: https://www.ycombinator.com/
[paul graham site]: http://paulgraham.com/index.html
[react todo]: https://medium.com/javascript-in-plain-english/build-a-simple-todo-app-with-react-561579b39ad1
[react]: https://reactjs.org/
[codepen]: https://codepen.io/
[bulma]: https://bulma.io/
[check intro]: https://checkhq.com/blog/introducing-check/
[check]: https://checkhq.com/
[stripe]: https://stripe.com/