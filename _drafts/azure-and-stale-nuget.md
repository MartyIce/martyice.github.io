---
layout: post
title: Azure App Service and Stale Nuget
tweetText: Azure App Service and Stale Nuget
---

If you've been a little bored by some of my earlier posts, and found them dry and technical, hold onto your hats.  This one's technical, very specific, and probably will only be of interest to a tiny portion of anyone reading.  Your boredom will runneth over, and your skimming abilities will be put to the extreme test.  For today, we discuss a situation where Azure is holding onto a stale Nuget reference.

<a href="https://www.nuget.org/">Nuget</a> is the package manager for the Microsoft development platform (including .NET).  If you've used <a href="https://www.npmjs.com/">npm</a> in the javascript world, it's kinda like that for .Net.  I'm not an expert by any means, but know my way around Nuget well enough to code in projects that use it, and have even dipped my toe in the "create your own Nuget package!" waters.  

One of my recent projects <a href="https://www.earthclassmail.com/">Earth Class Mail</a> has involved a few overarching efforts:

1. Move some code we want to share between disparate projects into a Nuget package, and reference that new package from other projects.
2. Create a new Azure-based REST service to facilitate bidness.

For #1, we use <a href="www.appveyor.com">AppVeyor</a> to build some of our solutions, and they allow you to <a href="https://www.appveyor.com/docs/nuget/">create your own private Nuget feed</a>.  This seemed like the logical place to build and assembly our "framework" Nuget package, and after tinkering for a day or two, it seems to work pretty well.  I push commits to Github, Appveyor picks them up and builds, and outputs the Nuget package.  One thing I learned here is the importance of versioning - if you're making breaking changes, you need to increment the assembly version.  I fought this for a while, trying to force refresh packages, etc, then drank the versioning kool aid - after all, that's one of the reasons it's there!

For #2, Azure offers some pretty <a href="https://azure.microsoft.com/en-us/documentation/articles/web-sites-deploy/">nifty hooks</a> to automatically build and deploy App Services.  I went the basic route, and integrated with Github - when I push a commit, Azure builds and deploys.  It goes deeper, but that description will suffice for this post.  AppVeyor also offers integration with Azure (and allows you to do things like automated testing to boot) - we will probably end up using that, but I was burned by some pain trying to do all this with bleeding edge .Net Core, and for now am licking my wounds with the simple approach (Perhaps in a future blog post I'll lament about all the dead ends I encountered with .Net Core, resulting in my eventual return to good old stable .Net 4.6.).

So here we are - my "Framework" project is automatically built and deployed using AppVeyor, and my new App Service does the same in Azure.  Everything's integrating nicely, it's all in the cloud - I'm a rock star.  Until I introduced a breaking change to my "Framework" project.  At that point, Azure's build & deploy started failing.

I tried what made sense to me - first, I verified that all the contracts looked good (and matched between solutions).  When that didn't fix, I incremented the "Framework" version, pushed those changes, then updated my Nuget reference in the App Service project.  Everything worked correctly, but not in Azure.

I could tell from the compile errors in the Azure "Deployment options" output that it was compiling against an old version of my Framework project, but everything in packages.config looked correct.  What to do?  On my local machine, this would mean a witch hunt of deleting packages, rebuilding and reinstalling packages, etc.  But what does that look like in Azure?

Thankfully, I stumbled across the "Console" Development Tool in Azure!  This basically gives you access to a "sandbox" console for the VM running your App Services, and while limited, it allowed me to do what I needed - <a href="https://github.com/NuGet/Home/issues/1516">CLEAR THE LOCAL NUGET CACHE!!!</a>

Long story short, after running the following commands in this console:

* nuget.exe locals -clear all
* nuget.exe locals -clear http-cache
* nuget.exe locals -clear packages-cache

Then executing the "Synch" operation on my <a href="https://azure.microsoft.com/en-us/documentation/articles/web-sites-staged-publishing/">Deployment Slot</a>, the updated Nuget package was referenced correctly, my code compiled, and once again, all was right with the world!

So if you ever find yourself in this situation, do not forget your friend "Azure Console".  He just may save your hide.

