---
layout: post
title: Generating Searchable PDF using Docker and Azure, in 15 minutes
tweetText: Generating PDF (with OCR) using Docker and Azure, in 15 minutes
---

<h2>The Problem</h2>
Recently at [EarthClassMail][earthclassmail]{:target="_blank"} we had a need to replace our "PDF Generation" system with something in Azure (long story), so I began researching our options.  There are plenty of solutions out there that create PDFs from images, but we also needed OCR results to make the PDF "searchable".  I figured we'd be able to locate a .Net library that would do the trick.  If not that, then some service that offered a cloud-based API to generate PDFs.  Boy was I wrong!  After browsing a multitude of possible solutions, I had them divided into 3 camps:

1. Too simple - mainly because they didn't include the OCR part.
2. Too old - utilizing DLLInclude and COM Interops that I didn't even want to attempt in Azure.
3. Too expensive - there were some that appeared to give us what we need, but they demanded an arm, a leg, and a pound of flesh to use.

I began to lose hope...then I expanded my google search to "non .Net" solutions.  Enter [OCRmyPDF][ocrmypdf]{:target="_blank"}!

<h2>OCRmyPDF and Tesseract</h2>
Unbeknownst to me during all my fruitless searching, there are some really awesome open source libraries that would give us all we needed, with a catch - they don't run on .Net!   OCRmyPDF jumped out at me with quality documentation, and a simple setup (via [Docker][docker]{:target="_blank"}).  It consisted of the following:

1. Docker image based on [Ubuntu][ubuntu]{:target="_blank"} (a popular flavor of Linux)
2. The image contained [Tesseract][tesseract]{:target="_blank"}, a powerful OCR library.
3. A [Python][python]{:target="_blank"} wrapper allowing easy invocation of Tesseract from the command line.

I knew a little about Docker, and less about Python, but was intrigued.  Could I solve this problem with open source and Docker?  After a little more searching, I found another library ([OCRmyPDF-web][ocrmypdfweb]{:target="_blank"}) where a brave soul had wrapped the above in a simple REST layer (and even more simple front end).  With a little hacking, I could basically host my own PDF-generating service!  But how to "expose" this within Azure?

<h2>Docker In Azure</h2>
Turns out, the answer is "easily".  The development process consisted of a few steps:

1. Get the code working locally (using Docker).
2. Follow [these instructions][dockerinazure]{:target="_blank"} to host your container within an Azure Web App.

While there was some elbow grease required to work through the steps above (learning python on the fly, working through errors, etc), it was *mostly* straightforward (and frankly, a little amazing after all my fruitless research into available .Net solutions).  Here are the details:

<h3>Speediest PDF</h3>
I created the simple [SpeediestPDF][speediestpdf]{:target="_blank"} repo to demo the script I cobbled together.  Say "Speediest PDF" a few times out loud to yourself.  It rhymes, y'all!  Pull it and take a look around some of the files:

* Dockerfile - used by Docker to build the image
* entrypoint.sh - used by Docker to launch the container
* requirements.txt - list of libraries needed to run python script
* server.py - actual python code that establishes the REST API

Build it:

```bash
docker build -t martyice/speediestpdf .
```

Fire it up with something like this:

```bash
docker run -e azureAccountName=<AzureStorageName> -e azureAccountKey=<AzureStorageKey> -e appInsightsTelemetryKey=<AppInsightsKey> -p 8888:8000 martyice/speediestpdf
```

Once it's running successfully, you can use the wonderful [Postman][postman]{:target="_blank"} to test it out:

<p>
<img src="{{ site.baseurl }}/images/speediest/postman_trigger.png" alt="Wait a Minute Mr. Postman!"/>
<em>Wait a Minute Mr. Postman!</em>
</p>

<h3>Docker Pro Tips</h3>
As I hacked throught this solution, I discovered some things about Docker that sped up my development.  Sharing them here in case they help you:

* You don't need to name your container.  I started out using the "--name" option when I'd run my container, and it caused issues if I had errors and wanted to run again (eg, "the container name "/test" is already in use by container...").  If you're just testing this stuff locally, you don't need the name.
* To stop and remove all running containers, run this super handy set of commands:
1. docker stop $(docker ps -aq)
2. docker rm $(docker ps -aq)

There's a whole world of things to learn with Docker, but these "tips" drastically sped up my iterations, and eliminated alot of frustration.

<h3>Push to Azure</h3>
Once your satisfied with how it works locally, time to take your act on the road!  The instructions for [pushing to Azure][dockerinazure]{:target="_blank"} are easy to follow, here they are in a nutshell:

1. 



<h2>Disclaimer</h2>
It's worth noting that this solution is a step towards a production ready solution, but is probably not recommended for actual production use.  Some things to consider:

1. [Hug][hug]{:target="_blank"} is a great development library for enabling REST in a Python application, but is not really intended for production volume.  There are details in the Hug documentation on what to change and use when you're ready for that.
2. Security, security, security - there is currently none.  Unwise for production, otherwise your service will attract the attention of baddies.
3. Scalability - this example is single threaded, and not tuned in any way.  If you need to support volume, you'd want to invest time and attention to that.

Ultimately, we ended up using a variant of this solution at EarthClassMail, one that launched "batch processing" Docker containers on the fly to respond to requests.  It was a barrel of fun to work on, but that's for another post.  

Happy Docker/Python/Azure/PDF-ing!

[earthclassmail]: https://www.earthclassmail.com/
[ocrmypdf]: https://github.com/jbarlow83/OCRmyPDF
[docker]: https://www.docker.com/
[ubuntu]: https://www.ubuntu.com/
[tesseract]: https://en.wikipedia.org/wiki/Tesseract_(software)
[python]: https://www.python.org/
[ocrmypdfweb]: https://github.com/sseemayer/OCRmyPDF-web
[dockerinazure]: https://docs.microsoft.com/en-us/azure/app-service/containers/tutorial-custom-docker-image
[hug]: http://www.hug.rest/
[speediestpdf]: https://github.com/martyice/speediestpdf