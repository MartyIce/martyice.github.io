---
layout: post
title: Generating UML Diagrams with Postman
tweetText: Generating UML Diagrams with Postman
---

<h3>The Problem</h3>
You have an architectural idea in your head, but are struggling to communicate it.  Team members are not on the same page with how things are going to work, what things are called, and where they live.  The whiteboard has been erased, and the drawings there weren't very good to begin with.  You've seen diagramming used in other places, but you don't to install some crappy tool that does a poor job of creating them, and what do all those symbols mean anyway?

I've recently grown fond of an approach using [UML][uml org] (Unified Modeling Language), with a combination of the following tools:

* [Postman][postman] - an indispensable tool for invoking and testing http APIs
* [Plant UML][plant uml] - a free REST API that will generate pretty images from a UML document
* [Paint.Net][paint dot net] - a free windows tool that's way better than MSFT Paint

With these 3 in combination, I can quickly produce UML diagrams that can describe in a single picture what laborious conversations (voice and text) cannot:

![Simple Example of UML in Action][example uml]

<h3>UML</h3>
As with any new language, UML at first may look a little confusing.  Don't be dismayed, it's very simple, especially for "quick and dirty" use cases (which is typically what I use it for).  In general, you'll be adding the following:

Start tag:
```UML
@start uml
```

Define your groups:
```UML
box "group" #Yellow
    participant "thing 1 in group"
    participant "thing 2 in group"
end box
```

Define interactions between participants:
```UML
"thing 1 in group" -> "thing 2 in group" : "do something"
"thing 2 in group" -> "thing 1 in group" : "ok"
```


```UML
@startuml

box "App" #LightGreen
	participant Desktop
	participant Mobile
end box

box "Cloud" #LightBlue
	participant REST
	participant BusinessLogic
	participant Database
	participant NoSql
end box

box "Legacy System" #Yellow
	participant PainInTheAssNumberOne
	participant PainInTheAssNumberTwo
end box

Desktop -> REST : "update something"
REST -> BusinessLogic : "can this update be made?"
BusinessLogic -> REST : "Yes"
REST -> BusinessLogic: "update something"
BusinessLogic -> Database: "update something"
Database -> BusinessLogic: "you bet"
BusinessLogic -> NoSql: "please cache this"
NoSql -> BusinessLogic: "you bet"
BusinessLogic -> PainInTheAssNumberOne: "i suppose you want to know about this"
PainInTheAssNumberOne -> BusinessLogic: "thanks youngster, i'll put this somewhere safe"
BusinessLogic -> PainInTheAssNumberTwo: "i suppose you want to know about this"
PainInTheAssNumberTwo -> BusinessLogic: "where did i put my pants?"
BusinessLogic -> REST: "I think we're good"
REST -> Desktop: "I think we're good"
Mobile -> REST: "retrieve something"
REST -> Mobile: "you bet, here it is"
@enduml
```

[uml org]: http://www.uml.org/
[postman]: https://www.getpostman.com/
[plant uml]: plantuml-service.herokuapp.com
[paint dot net]: https://www.getpaint.net/
[example uml]: {{ site.baseurl }}/images/uml-in-postman/example-diagram.png "Simple Example of UML in Action"