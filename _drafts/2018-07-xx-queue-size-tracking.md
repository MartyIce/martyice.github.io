---
layout: post
title: Querying Azure Queues - My, How You've Grown!
tweetText: Querying Azure Queues - My, How You've Grown!
---

The magic of the cloud - infrastructure on demand!  Spin up the queues, and stack up the messages!  A piece of the puzzle we used to implement and worry over, forever delegated to the professionals.  But we still have to *use* them correctly.  And we still need to know if things are working correctly.  How to peel back that layer?

Using Application Insights, this becomes very easy to do.  I'm going to walk through the process of both monitoring the queues, and displaying their current sizes in a pretty chart, placed front and center on an Azure dashboard.  

*Disclaimer - things are constantly evolving (both my knowledge and Azure's abilities), so odds are this post will become quite dated shortly!*

Frankly, it suprised me that I needed to hand-roll this functionality - it seems like something Azure would provide out of the box?  However, I wasn't able to figure out where/how they do, so I implemented something myself (using Azure, of course!).  There are a few pieces to this implementation:

* **Azure Function** - used to periodically poll the sizes of queues
* **App Insights** - used to record the results the function polls, and turn them into a pretty chart
* **Azure Dashboard** - used to conveniently house the chart for readily viewing

Azure Function - Tracking the Sizes
---

Azure Functions offer a way to quickly spin up "micro services" that perform smaller tasks, in a compartmentalized fashion.  They are effectively a small "slice" of a full web app, with Azure handling much of "infrastructure" and setup concerns behind the scenes.  We created one to periodically query each queue in a list for their size...it looks like this:

```c#
// Reference external assembly
// https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-csharp#referencing-external-assemblies
#r "Microsoft.WindowsAzure.Storage"

// Standard .Net "usings"
using System;
using Microsoft.WindowsAzure.Storage;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.Extensibility;

// TelemetryClient for sending info to AI.
// Substitute your "InstrumentationKey" here:
private static TelemetryClient _client = new TelemetryClient() { InstrumentationKey = "<InstrumentationKey>" };

// This function will run on a periodic basis (timer config displayed in screenshot below)
public static void Run(TimerInfo myTimer, TraceWriter log)
{
    // This will log a Trace to App Insights in the App Insights instance ASSOCIATED WITH THIS FUNCTION (not necessarily
    //  the same AI instance referenced by our "_client" variable!)
    log.Info($"MonitorScanQueues function executed at: {DateTime.Now}");

    // connect to Azure Storage
    var connectionString = "<AzureStorageConnectionString";
    var account = CloudStorageAccount.Parse(connectionString);
    var queueClient = account.CreateCloudQueueClient();

    // List of Queues we want to poll
    var myQueues = new string[] { 
            "my-queue-1",
            "my-queue-2",
            "my-queue-another",
            "my-queue-error",
            "my-queue-random"
         };

    // Loop through queues
    foreach (var queueName in myQueues)
    {
        // get a reference to the queue and retrieve the queue length
        var queue = queueClient.GetQueueReference(queueName);
        queue.FetchAttributes();
        var length = queue.ApproximateMessageCount;

        // Track the count as a metric within App Insights
        _client.TrackMetric($"Queue length - {queueName}", (double)length);
    }

}
```

Here's a view of the "Integrate" section of the Azure Function administration, where we establish a timer to trigger our function:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/timer-based-function.png" alt="Timer Based Function"/>
<em>Timer the Trigger</em>
</p>

The "Schedule" parameter is a standard <a href="https://www.freeformatter.com/cron-expression-generator-quartz.html">chron expression</a> used to define a time interval.  In this screenshot, we're executing our function once a minute.

App Insights - Record the Sizes, Display Pretty Chart
---
Our usage of the App Insights SDK is illustrated in the code sample above - we're performing a simple recording of App Insights <a href="https://docs.microsoft.com/en-us/azure/application-insights/app-insights-metrics-explorer">Metrics</a> to capture the size of our queues once a minute.

When viewed from App Insights Analytics, these results will look something like this:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/queue-data.png" alt="Raw Queue Data"/>
<em>Lots and Lots of Meaningless Data</em>
</p>

Note our queues are running pretty nicely right now!  I'm writing this blog post on a weekend :-)

That view is pretty boring, but becomes much cooler with a simple "render" statement at the end of our query:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/queue-chart.png" alt="Queue Data Visualized"/>
<em>Very Pretty Data</em>
</p>

In addition to being easy on the eyes, this chart provides visual cues that immediately leap off the page, allows us to view trends, and is more consumable by "non-techies".  Big win!  The final step here is to put this chart somewhere readily accessible, without the need to write a confusing query....

Azure Dashboard - Share and Share Alike
---

This step is actually very simple - by clicking the "pin" icon in the upper right of the chart:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/pin-the-chart.png" alt="Pin the Chart"/>
<em>Pin the Chart on the Dashboard</em>
</p>

You can select an <a href="https://docs.microsoft.com/en-us/azure/azure-portal/azure-portal-dashboards">Azure Dashboard</a> on which to pin the chart.  Dashboards display upon logging into Azure Portal, and offer high-level, immediate views of interesting information in your system.  You can have multiple Dashboards (eg, "Operations", "Development", "Sales", etc).  And App Insight results (data or visualizations) are part of what you can put there!

Once our chart is pinned, upon opening Azure Portal we see our charts, front and center:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/dashboard.png" alt="All Charts, All the Time"/>
<em>All Charts, All the Time</em>
</p>

The 4 icons on the right of each chart are:

* Refresh - pull new information from AI, and refresh the display
* Edit Title - provide more meaningful title for the chart
* Edit Query - edit the query inline to tweak your results
* Open Chart in Analytics - open the analytics UI to edit/refine your query and chart

Big, easy power!

Thanks for reading, and stay tuned, as the next post will describe how you can get existing .Net code (not running within Azure) to write all these powerful App Insights traces yourself, and start to harness the power!