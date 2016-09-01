---
layout: post
title: Azure App Service and Stale Nuget
tweetText: Azure App Service and Stale Nuget
---

If you've been a little bored by some of my earlier posts, and found them dry and technical, hold onto your hats.  This one's technical, very specific, and will only interest a tiny portion of my tinier audience.  Your boredom will runneth over, and your skimming abilities will be put to an extreme test.  

Today, we discuss Azure holding onto stale Nuget references.

<a href="https://www.nuget.org/">Nuget</a> is the package manager for the Microsoft development platform (.NET).  If you've used <a href="https://www.npmjs.com/">npm</a> in the javascript world, it's sort of like that for .Net.  

In a nutshell:<br />
<img src="{{ site.baseurl }}/images/npm_and_nuget.png" />

I'm no expert, but know my way around Nuget well enough to use it in projects, and have recently dipped my toe in the "create your own Nuget package!" waters.  

One of my recent projects at <a href="https://www.earthclassmail.com/">Earth Class Mail</a> involved a few overarching efforts:

1. Move code we want to share between projects into a Nuget package, and reference that new package from these projects.
2. Create an Azure-based REST service to facilitate bidness.

Nuget
-----

We use <a href="www.appveyor.com">AppVeyor</a> to build some of our solutions, and they offer <a href="https://www.appveyor.com/docs/nuget/">Nuget feed hosting</a>.  This seemed like the logical place to build and host our "framework" Nuget package, and after tinkering for a day or two, it's up and running.  I push commits to Github, Appveyor detects and compiles, then outputs the Nuget package to our feed.  One lesson I learned here is the importance of versioning - if you're making breaking changes, you need to increment the assembly version.  I fought with this for a while, trying to force package refreshes locally when things broke WITHOUT incrementing assembly version number.  But by simply incrementing the version in the AssemblyInfo.cs file, problem solved.

<img src="{{ site.baseurl }}/images/assembly_versioning.png" />

Azure REST app
--------------

Azure offers nifty <a href="https://azure.microsoft.com/en-us/documentation/articles/web-sites-deploy/">hooks</a> that trigger builds and deployments within Azure.  I went the basic route, and integrated with Github - when I push a commit, Azure builds and deploys (there are more details and capabilities than what I present here of course).  It's worth noting that AppVeyor also offers integration with Azure (and allows you to do things like automated testing to boot) - we will get there eventually, but for now, the direct Github-to-Azure integration is all we need.

<img src="{{ site.baseurl }}/images/azure_deployment.png" />

At this point, we're doing well - the "Framework" project is automatically built and deployed using AppVeyor, and the new App Service does the same in Azure.  Everything's integrating nicely, it's all in the cloud - I'm feeling like a coding rock star.  That is, until I introduce a breaking change to my "Framework" project...at that point, Azure's build & deploy start failing :(

Stale Nuget
-----------

Based on the error message in Azure (I tried to find an example, but Azure doesn't always keep a history of the builds, at least readily discovered in their Portal - this would be nice to have), I can plainly see this is due to a contract change in the Framework project.  First, I looked for the issue locally.  I verified that all the contracts looked good (and matched between solutions), and everything compiled.  This *should* be working.

Next, I figured I'd just force things through the pipeline.  I incremented the "Framework" version, pushed those changes, then updated my Nuget reference in the App Service project.  Everyone should be referencing the "new things".  But Azure was still failing to compile.

The compile errors in the Azure "Deployment options" output indicated it was still referencing the old "Framework" binaries, but everything in packages.config looked correct.  What to do?  On my local machine, this would mean a witch hunt of deleting packages, rebuilding and reinstalling packages, etc.  But what does that look like in Azure?

Thankfully, I stumbled across the "Console" Development Tool in Azure!  This gives you access to a "sandbox" console for the VM hosting your App Services, and while limited in functionality, it allowed me to do what I needed - <a href="https://github.com/NuGet/Home/issues/1516">CLEAR THE LOCAL NUGET CACHE!!!</a>

<img src="{{ site.baseurl }}/images/azure_console.png" />

As an aside, check out the fancy ASCII art!  By embracing the past (command line utilities), MSFT is demonstrating it's commitment to the future (worlds beyond Windows)!

Long story short, after running the following commands in the console:

* nuget.exe locals -clear all
* nuget.exe locals -clear http-cache
* nuget.exe locals -clear packages-cache

Then executing the "Synch" operation on my <a href="https://azure.microsoft.com/en-us/documentation/articles/web-sites-staged-publishing/">Deployment Slot</a>, the updated Nuget package was referenced correctly, my code compiled, and all was good with the world!

![Zen Enlightenment](/images/zen_enlightenment.png){: .center-image }

So if you ever find yourself in this situation, do not forget your friend "Azure Console".  It just may save your hide, job, and sanity.