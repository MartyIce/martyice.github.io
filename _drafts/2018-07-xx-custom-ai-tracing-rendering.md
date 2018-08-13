---
layout: post
title: Logging to App Insights from Non-Azure Code
tweetText: Logging to App Insights from Non-Azure Code
---

<h3>The Problem</h3>

We've seen the glory of App Insights.  We want the pretty charts, and all the deep tracking.  But we're on a legacy system, not a cloud service running in Azure.  Are we forever out in the cold, looking through a window at the luxiorious comfort within?

Of course not!  Microsoft has an extensive list of <a href="https://docs.microsoft.com/en-us/azure/application-insights/app-insights-platforms">libraries</a> you can use to push data to App Insights from a wide variety of apps.  They also offer a <a href="https://dev.applicationinsights.io/">REST API</a> to query that data (similar to queries you can run within <a href="https://docs.microsoft.com/en-us/azure/application-insights/app-insights-analytics">App Insights Analytics</a>).  This post will narrate a small application that demonstrates two things:

* publishing custom info to App Insights (in this case, from javascript)
* querying App Insights for information to feed into "non-App-Insights" graphic solution (again, in javascript using a REST API)

<h3>Collecting Information</h3>

At it's most basic, the <a href="https://github.com/Microsoft/ApplicationInsights-dotnet">App Insights SDK</a> allows us to send data to Azure.  There are several types of data we can send:

* Requests - timings, environment info, as well as custom telemetry info
* Exceptions - log all types of exceptions from your application
* Custom Events - anything under the sun you may want to see from your application
* Performance Counters - performance logs from your servers

And much more.  This information is covered in more detail <a href="https://docs.microsoft.com/en-us/azure/application-insights/app-insights-overview">here</a>.

The sample app uses the <a href="https://github.com/Microsoft/ApplicationInsights-JS">Javascript SDK</a> to send a custom event to App Insights.  This is accomplished with a few chunks of javascript:

<h4>Javascript Chunk #1 - Initialization</h4>

Using a garbled, impossible to read javascript snippet provided by Microsoft, we initialize our JS environment with what it needs to write to App Insights (and establish the "window.appInsights" variable in the process):

```javascript
<script type="text/javascript">
    var appInsights = window.appInsights || function (a) {
        function b(a) { c[a] = function () { var b = arguments; c.queue.push(function () { c[a].apply(c, b) }) } } var c = { config: a }, d = document, e = window; setTimeout(function () { var b = d.createElement("script"); b.src = a.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js", d.getElementsByTagName("script")[0].parentNode.appendChild(b) }); try { c.cookie = d.cookie } catch (a) { } c.queue = []; for (var f = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; f.length;)b("track" + f.pop()); if (b("setAuthenticatedUserContext"), b("clearAuthenticatedUserContext"), b("startTrackEvent"), b("stopTrackEvent"), b("startTrackPage"), b("stopTrackPage"), b("flush"), !a.disableExceptionTracking) { f = "onerror", b("_" + f); var g = e[f]; e[f] = function (a, b, d, e, h) { var i = g && g(a, b, d, e, h); return !0 !== i && c["_" + f](a, b, d, e, h), i } } return c
    }({
        instrumentationKey: '@ViewData.Model.AppInsightsKey'
    });

    window.appInsights = appInsights, appInsights.queue && 0 === appInsights.queue.length && appInsights.trackPageView();
</script>
```

Note the "instrumentationKey" comes from my AppInsights instance, and is populated here by an MVC view model variable.

<h4>Javascript Chunk #2 - Writing the Event</h4>

With the appInsights variable established, we can use it to write all the different types of information to App Insights.  In this example, a custom event (from within a Vue click handler):

```javascript
    this.clickCount++;
    var properties = {"message": this.appInsightsMessage };
    var metrics = {"clickCount": this.clickCount };
    appInsights.trackEvent("IndexClick", properties, metrics);
    appInsights.flush();
```

<h3>Querying Data</h3>

App Insight's visualization capabilities are extensive, but don't currently support embedding an AppInsight chart in an external system.  However, they do support a <a href="https://dev.applicationinsights.io/">REST API</a> that can retrieve all the data, and with the plethora of javascript charting/graphing solutions, it's fairly straightforward wiring something up yourself.

The <a href="https://github.com/Microsoft/ApplicationInsights-JS">Javascript SDK</a> doesn't appear to support querying data, but it's easy enough to wire up with a library like <h ref="https://github.com/axios/axios">Axios</a>.

<h4>Javascript Chunk #3 - Querying with REST API</h4>

To begin, we'll setup a variable that contains the necessary "base" information for our query to the App Insights REST API:

```javascript
    // Establish our "base" URL, complete with App Insights keys provided by MVC View Model variable:
    appInsightsUrl = axios.create({
        baseURL: 'https://api.applicationinsights.io/v1/apps/@ViewData.Model.AppInsightsApplicationId',
        headers: {
            'x-api-key': '@ViewData.Model.AppInsightsRestApiKey'
        }
    });
```

And within another Vue click event handler, we can do the following to query App Insights:

```javascript
    var self = this;
    self.loading = true;
    // Query is a URL encoded represetion of "customEvents | order by timestamp desc", and the "timespan" parameter
    //  limits results to past 24 hours.
    appInsightsUrl.get('query?timespan=PT24H&query=customEvents%20|%20order%20by%20timestamp%20desc')
        .then(response => {
            this.events = response.data.tables[0].rows.map(i => {
                return {
                    timestamp: i[0],
                    clickCount: i[4] ? JSON.parse(i[4]).clickCount : "?",
                    message: i[3] ? JSON.parse(i[3]).message : "?"
                }
            });
            self.loading = false;
        })
        .catch(e => {
            self.loading = false;
        });
```

Here's a screenshot of the sample app, complete with a list of App Insights goodness:

<p>
<img src="{{ site.baseurl }}/images/custom-ai-tracing-rendering/simple-ai-render.png" alt="Simple App Insights Rendering Goodness"/><br />
<em>Simple App Insights Rendering Goodness</em>
</p>

<h3>Visualizing Data</h3>

While the data we store and retrieve from App Insights can be very useful by itself, what's the point if we don't have a shiny, pretty graph?  This is easy to do with all the javascript libraries available.  For this example, I used chart JS.

```javascript
            drawChart: function () {
                // Render a chart from our app insights data
                var ctx = document.getElementById("myChart").getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [
                            {
                                label: 'App Insights Clicks',
                                backgroundColor: "#00FF00",
                                borderColor: "#0000FF",
                                // Map data to fit what chartJS timeline is expecting
                                data: this.events.map(e => {
                                        return {
                                            x: new Date(e.timestamp),
                                            y: e.clickCount
                                        };
                                    })
                            }
                            ]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                distribution: 'linear'
                            }]
                        }
                    }
                });

            }
```

And the colorful, vibrant result!

<p>
<img src="{{ site.baseurl }}/images/custom-ai-tracing-rendering/graphed-ai-render.png" alt="Wonderful, Snappy Graphics!"/><br />
<em>Wonderful, Snappy Graphics!</em>
</p>



While this data is basically meaningless, it should illustrate how meaningful data can be captured and displayed.

<h3>From here...</h3>

Hopefully this sample exercise lends some ideas towards how to use App Insights to capture application data, and render it in a useful manner in a custom application.  Thanks for reading!