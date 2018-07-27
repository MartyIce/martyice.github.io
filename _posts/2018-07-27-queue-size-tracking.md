---
layout: post
title: Querying Azure Queues - My, How You've Grown!
tweetText: Querying Azure Queues - My, How You've Grown!
---

<h3>The Problem</h3>
The magic of the cloud - infrastructure on demand!  Spin up the queues, and stack up the messages!  Queues, something we used to have to manage ourselves, now forever delegated to the experts.  But we still need to track them, and know whether things are working correctly.  How to peel back that layer?

<a href="https://azure.microsoft.com/en-us/services/storage/queues/">Azure Queues</a> are a cornerstone of our cloud-migration strategy at <a href="https://www.earthclassmail.com/" target="_blank">EarthClassMail</a>.  We use them in a couple ways: to queue work within a service, and as an async, resilient communication mechanism between services.  However, there isn't an built-in way (that we were able to find) to simply monitor queue size over a time period.  This is important information for monitoring the health of our system, and detecting bottlenecks and errors.

<h3>When in Doubt, Add More Cloud</h3>

Thankfully, there are other pieces of Azure we can use to roll a custom monitoring solution.  Using some simple Azure code and configuration, we can easily create a graph showing our queue sizes over time:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/queue-chart-image.png" alt="Queue Timeline"/>
<em>Queue Sizes Timeline</em>
</p>

This implementation consists of a few components:

* **Azure Function** - periodically polls the queue sizes, and logs results to App Insights
* **App Insights** - records the results, and turns them into a pretty chart
* **Azure Dashboard** - centralized location for displaying the chart

A bonus gained implementing the above was it gave us the excuse and opportunity to explore and learn new Azure things!  Let's roll up our sleeves...

<h3>Azure Function - Query the Queues</h3>

<a href="https://azure.microsoft.com/en-us/blog/introducing-azure-functions/">Azure Functions</a> allow us to quickly spin up <a href="https://martinfowler.com/articles/microservices.html">micro services</a> that perform smaller, specialized tasks, in a compartmentalized fashion.  They are effectively a small "slice" of a full web app, with Azure handling most of the infrastructure and setup concerns under the covers.  

For this project, we created a function to periodically retrieve the "approximate" message count for a list of queues.  It looks like this:

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
    // This will log a Trace to the App Insights instance ASSOCIATED WITH THIS FUNCTION (not necessarily
    //  the same AI instance referenced by our "_client" variable!)
    log.Info($"MonitorScanQueues function executed at: {DateTime.Now}");

    // connect to Azure Storage
    var connectionString = "<AzureStorageConnectionString>";
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

        // Track the count as a metric within App Insights (the App Insights instance specified by <InstrumentationKey> above)
        _client.TrackMetric($"Queue length - {queueName}", (double)length);
    }
}
```

The timer that triggers the function is configured in the "Integrate" section of the Azure Function administration:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/timer-based-function.png" alt="Timer Based Function"/>
<em>Triggered by Timer</em>
</p>

The "Schedule" parameter is a standard <a href="https://www.freeformatter.com/cron-expression-generator-quartz.html">chron expression</a> used to define a time interval.  In this screenshot, we're executing our function once a minute.

<h3>App Insights - Make it Pretty</h3>

The code sample above logs App Insights <a href="https://docs.microsoft.com/en-us/azure/application-insights/app-insights-metrics-explorer">Metrics</a> that capture the size of our queues every minute.  

When viewed within App Insights Analytics, these results will look something like this:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/queue-data.png" alt="Raw Queue Data"/>
<em>Lots and Lots of Meaningless Data</em>
</p>

That view is pretty boring, but becomes much cooler with a simple "render" statement at the end of our query:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/queue-chart.png" alt="Queue Data Visualized"/>
<em>Snappy, Informative Visual!</em>
</p>

In addition to being easy on the eyes, this chart provides visual cues that immediately leap off the page, allowing us to view trends.  They are also more consumable by "non-techies".  Big win!  

The final step here is to put this chart somewhere readily accessible, so we only need to write the query once....

<h3>Azure Dashboard - Share and Share Alike</h3>

This step is actually very simple - by clicking the "pin" icon in the upper right of the chart:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/pin-the-chart.png" alt="Pin the Chart"/><br />
<em>Pin the Chart on the Dashboard</em>
</p>

You can select an <a href="https://docs.microsoft.com/en-us/azure/azure-portal/azure-portal-dashboards">Azure Dashboard</a> on which to pin the chart.  Dashboards are displayed when logging into Azure Portal, and offer high-level views of interesting information in your system.  You can have multiple Dashboards (eg, "Operations", "Development", "Sales", etc).   In addition to other built-in Azure "information widgets", App Insight results (raw data or visualizations) are part of what you can put there.  Very slick!

Once our chart is pinned, logging into Azure Portal displays it, front and center:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/dashboard.png" alt="All Charts, All the Time"/>
<em>All Charts, All the Time</em>
</p>

The 4 icons on the right of each chart are:

<p>
<img src="{{ site.baseurl }}/images/queue-size-tracking/four-icons.png" alt="The Four Icons"/><br />
</p>

* Refresh - pull new information from AI, and refresh the display
* Edit Title - provide more meaningful title for the chart
* Edit Query - edit the query inline to tweak your results
* Open Chart in Analytics - open the analytics UI to edit/refine your query and chart

Big, easy power!

<h3>Up Next - Logging from "Legacy"</h3>

Thanks for reading, and stay tuned, as the next post will describe how you can get existing .Net code (not running within Azure) to write all these powerful App Insights traces yourself, and start to harness the power!