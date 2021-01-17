---
layout: post
title: A Svelte Example - App Insights Viewer
tweetText: Finally, a way to view App Insights graphs on the mobile web!
---

<h3>Overview</h3>
I enjoy working in Azure, and their [Portal][azure portal] is usually pretty fantastic to work with.  I've really come to love the [Application Insights Query language][app insights query] - it provides a powerful mechanism for searching and visualizing relevant metrics and logs within Azure.  It *used* to have limited support for app insight charts on mobile devices, which inspired me to create a Svelte component to provide this capability.  However, I've just checked again, and they have improved the mobile experience - charts are available and beautiful!  So while my component is sort of redundant (and inferior), it was a good starter project within Svelte.  I'll walk through it here.

<h3>Source Code Layout</h3>
You can find the code [here][svelte appinsights].  It was created using the [svelte app template] [svelte app template], a simple way to quickly create a Svelte app.  

The overall folder structure looks like the following:
- node_modules - all the referenced node packages, ~85 of them.  All this buried goodness is a reminder of how much we depend on open source, and those that have gone before us.  I have no idea what most of these packages do, but they are diligently enabling our development experience today.
- public - contains the main artifacts that house the app (index.html, global.css, etc), as well as the "build" folder, where the Svelte compiler places everything.  After running "npm run build", we have a bundle.js file and a bundle.js.map file (more on map files [here][js map files]).  These Svelte-compiled files contain all the magic of my app.
- scripts - this was provided by the template, and appears to only contain a file relevant to Typescript enablement.  Not messing with that today.
- src - here is where most of my work goes.  Components to provide the various screen widgets, a few [stores][svelte stores], and a "appInsightsRepository" for invoking REST calls against App Insights.

<h3>Component Structure</h3>
The app is pretty simple, here's the functional layout:
* Index.html - the shell html initially loaded by the browser. This references all the other goodness.
  * App.svelte - the Svelte container.  Currently contains the navigation bits (which really should be in their own Svelte component!), nested components providing the core functionality, and some styling.
    * Error - a component for displaying errors at the topmost layer.
    * AppInsightsConfig - a component for collecting necessary keys to interface with App Insights REST API.
    * AppInsightsQuery - a component for inputting the AppInsights query.
    * AppInsightsResults - a component for displaying the results in a chart (utilizing [ChartJS][chartjs])

<h3>Thoughts & Notes</h3>

[azure portal]: https://portal.azure.com
[app insights query]: https://azure.microsoft.com/en-us/blog/azure-log-analytics-meet-our-new-query-language-2/
[svelte appinsights]: https://github.com/MartyIce/svelte-appinsights
[svelte app template]: https://github.com/sveltejs/template
[js map files]: https://stackoverflow.com/questions/21719562/how-to-use-javascript-source-maps-map-files
[svelte stores]: https://svelte.dev/tutorial/custom-stores
[chartjs]: https://www.chartjs.org/