---
layout: post
title: Logging to App Insights from Non-Azure Code
tweetText: Logging to App Insights from Non-Azure Code
---

<h3>The Problem</h3>

We've seen the glory of App Insights.  We want the pretty charts, and all the deep tracking.  But we're on a legacy system, not a cloud service running in Azure.  Are we forever out in the cold, looking through a window at the luxiorious comfort within?

Of course not!  Microsoft has an extensive list of <a href="https://docs.microsoft.com/en-us/azure/application-insights/app-insights-platforms">libraries</a> you can use to push data to App Insights from a wide variety of apps.  They also offer a <a href="https://dev.applicationinsights.io/">REST API</a> to query that data (similar to queries you can run within <a href="https://docs.microsoft.com/en-us/azure/application-insights/app-insights-analytics">App Insights Analytics</a>).  This post will be focused on the .Net side of things (including monitoring WCF)

<h3>Collecting Information</h3>

At it's most basic, the <a href="https://github.com/Microsoft/ApplicationInsights-dotnet">App Insights SDK</a> allows us to send data to Azure.  There are several types of data we can send:

* Requests - timings, environment info, as well as custom telemetry info
* Exceptions - log all types of exceptions from your application
* Custom Events - anything under the sun you may want to see from your application
* Performance Counters - performance logs from your servers

And much more.  This information is covered in more detail <a href="https://docs.microsoft.com/en-us/azure/application-insights/app-insights-overview">here</a>.

As an example, here's some C# that will send some business-related information to App Insights as a Custom Event

```c#
    TelemetryClient appInsights = new TelemetryClient();
    appInsights.InstrumentationKey = "INSTRUMENTATION_KEY_HERE";

    // Track an event
    Dictionary<string, string> properties = new Dictionary<string, string>();
    properties["ImportantInfo1"] = "1234";
    properties["ImportantInfo2"] = "5678";
    appInsights.TrackEvent("SomethingBig", properties);

```

The value for INSTRUMENTATION_KEY_HERE can be found in Azure, in the App Insight's "Overview" section:

<p>
<img src="{{ site.baseurl }}/images/tracing-from-dotnet/YourInstrumentationKey.png" alt="Instrumentation Key"/>
<em>Instrumentation Key</em>
</p>

After executing the above, and waiting a minute or two for App Insights to <a href="https://docs.microsoft.com/en-us/azure/application-insights/app-insights-api-custom-events-metrics#flushing-data">send the data</a>, we see the following in Analytics:

<p>
<img src="{{ site.baseurl }}/images/tracing-from-dotnet/SomethingBig.png" alt="Something Big"/>
<em>Something Big!</em>
</p>

This is a very simple example, but shows just how easy logging to AppInsights can be.

<h3>Monitoring WCF</h3>

One of the most powerful features of App Insights is the ability to completely trace web requests, giving visibility into load, performance, and usage patterns.  For our native stack (which is not yet in Azure), we are using WCF hosted within a custom process (non-IIS).

- https://github.com/Microsoft/ApplicationInsights-SDK-Labs/tree/master/WCF
- https://blog.rassie.dk/2015/12/using-azure-application-insights-to-monitor-a-self-hosted-wcf-service-part-1/

- mention ITelemetryInitializer, ability to tie requests together


<h3>Queruing Data</h3>

- https://docs.microsoft.com/en-us/azure/application-insights/app-insights-data-retention-privacy
 
