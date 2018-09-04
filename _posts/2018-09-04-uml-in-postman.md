---
layout: post
title: Generating UML Diagrams with Postman
tweetText: Generating UML Diagrams with Postman
---

<h3>The Problem</h3>
You hold an architectural idea in your head, but are struggling to communicate it.  Team members think differently about what things are called, where they live, and how they tie together.  Someone erased the whiteboard (and what was there was impossible to read a few days later anyway).  You've seen diagramming used in other places, but you don't want to install some crappy tool with an impossible user interface (and what do all those symbols mean anyway?!).

If you're in this situation, I'd encourage you to take a look at [UML (Unified Modeling Language)][uml org].  It's recently become a useful tool in my belt, with a combination of the following enablers:

* [Plant UML][plant uml]{:target="_blank"} - a free REST API that will generate pretty images from a UML document
* [Postman][postman]{:target="_blank"} - an indispensable ecosystem for invoking and testing http APIs
* [Paint.Net][paint dot net]{:target="_blank"} - a free Windows app that's light years better than MSFT Paint

With these 3 in combination, I can quickly produce UML diagrams that describe in a single picture what laborious conversations (voice and text) cannot:

![A Picture is Worth A Thousand Words][picture thousand words]

<h3>UML</h3>
As with any new language, UML may look a little confusing at first.  Don't be dismayed, it's very simple, especially for "quick and dirty" use cases (which is typically how I use it).  In general, you'll be adding the following:

<h4>Start tag:</h4>
```UML
@start uml
```

<h4>Define your groups and participants:</h4>
```UML
box "Picture" #LightGreen
	participant OnePicture
end box

box "Word" #LightBlue
	participant ThousandWords
end box
```

<h4>Define interactions between participants:</h4>
```UML
OnePicture -> ThousandWords : "Are we equal?"
ThousandWords -> OnePicture : "Yes."
```

<h4>And don't forget your end uml tag:</h4>
```UML
@enduml
```

This simple example above produces the "Picture is Worth a Thousand Words" diagram above!

<h3>Plant UML</h3>
[Plant UML][plant uml]{:target="_blank"} is a handy service that will generate SVG images from UML diagrams.  Additionally, they have fantastic documentation that provides both high-level overviews of UML features, as well as details when you're ready to get into the nitty gritty.  This is a valuable resource for scaling the UML learning curve.  Here's the URL we will use to generate the diagrams:

```
POST http://plantuml-service.herokuapp.com/svg
```

<h3>Postman</h3>
[Postman][postman]{:target="_blank"} should require no introduction if you've developed web-based APIs (REST, SOAP, etc).  If you *haven't* used it, I highly recommend checking it out - it is an irreplaceable part of my development toolbox.  In addition to the downloadable tool, their subscription service adds team sharing, documentation, testing components that we at [EarthClassMail][earthclassmail]{:target="_blank"} use extensively.

In order to generate UML, we need to do two things:

1. Fill the POST URL (http://plantuml-service.herokuapp.com/svg) in the Postman input
2. Paste our UML in the body:

![Postman UML Example][postman example]

The UML above results in the following easy-to-read diagram:

![Big UML Example][example uml]

<h3>Getting the Output</h3>
The last step involves getting your UML diagram out of Postman and into an image file, and I'll admit, it's a little hoaky.  There are a couple different ways of accomplishing this.  Both involve the use of the wonderful [Paint.Net][paint dot net]{:target="_blank"} for actually saving the output.

<h4>Poor Man's</h4>
If your diagram is small enough (ie, fits entirely in the Postman output window), then a simple approach is to take a screenshot (Ctrl-Alt-PrtScn), paste into Paint.Net, crop accordingly, and save.  Easy Peasy.

<h4>More Involved</h4>
If your UML diagram exceeds the output pane dimensions within Postman, fear not, the following (slighly convoluted) steps will allow you to save the full output.
1. In Postman, there is a down arrow on the "Send" button.  Click it, and select "Send and Download".  This will cause Postman to save the results in an SVG file (that's the format PlantUML returns).
2. Now for the *weird* part - converting the SVG to something Paint.Net will recognize (in this case, a PNG file).  I use the handy [SVGtoPNG][svgtopng]{:target="_blank"} website to accomplish this.  There may be better ways - this works for me :)
3. Once you have your PNG, you can open in Paint.Net, crop/trim/highlight/annotate, and away you go!

[uml org]: http://www.uml.org/
[postman]: https://www.getpostman.com/
[plant uml]: plantuml-service.herokuapp.com
[paint dot net]: https://www.getpaint.net/
[earthclassmail]: https://www.earthclassmail.com/
[example uml]: {{ site.baseurl }}/images/uml-in-postman/example-diagram.png "Simple Example of UML in Action"
[dirt simple uml]: {{ site.baseurl }}/images/uml-in-postman/dirt-simple-diagram.png "Dirt Simple Example of UML in Action"
[postman example]: {{ site.baseurl }}/images/uml-in-postman/postman-example.png "Postman Example"
[picture thousand words]: {{ site.baseurl }}/images/uml-in-postman/picture-worth-thousand-words.png "A Picture is Worth a Thousand Words"
[svgtopng]: https://svgtopng.com/

<h3>UML-ing the Night Away</h3>
Hopefully this short tutorial has inspired you with the confidence to embark upon a fantastic UML voyage.  No longer will you be held captive by the shortcomings of human language!  Let the machines lead you to technical communication nirvana!