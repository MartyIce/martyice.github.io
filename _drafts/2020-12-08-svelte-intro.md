---
layout: post
title: Svelte - 1000 foot view
tweetText: A high level walkthrough of Svelte, and using it to create "Cybernetically enhanced web apps"
---

<h3>What Is Svelte?</h3>
[Svelte][svelte] is a new-ish JS component framework (first released in 2016) created by [Rich Harris][rich harris twitter].  Similar to frameworks like [React][react] and [Vue][vue], Svelte is a [reactive][reactive] framework.  While new and not as well known, Svelte is starting to gain significant traction.  It touts performance and simplicity, and features first-rate documentation and tutorials.  It's community and ecosystem are growing rapidly.

<h3>Reactivity</h3>
In a nutshell, "reactive" means when a value is updated, the application automatically refreshes any UI bound to that value.  For example, with the following variable and div:
```
var myName = 'Frank';

<div>Frank</div>
```

Reactive programming means you don't have to write "glue" to keep them in synch.  Updating the variable updates the div.

This becomes really powerful (and potentially expensive) when values ("bindings") are chained together.  As a contrived example, consider the following:
```
Name: Frank
IntroSentence: My Name is <Name>
Paragraph: <IntroSentence>.  How are you?   
```

In it's current form, the "Paragraph" would read:
```
My Name is Frank.  How are you?   
```

In a Reactive world, we can change "Name" variable to "Harry", and expect the following paragraph:
```
My Name is Harry.  How are you?   
```

<h3>Virtual DOM</h3>
In the popular reactive frameworks (eg, React & Vue), all this magic happens in the browser, using a technique called the "[Virtual DOM][virtual dom]".  Essentially, the [DOM][dom] is a programattic representation of the structure of the HTML rendered by the browser.  The *Virtual* DOM is a "shadow" copy of the DOM, cheaper to update and maintain.  The aforementioned reactive frameworks apply any changes to data and variables to the Virtual DOM, then periodically refresh the actual DOM with these changes.  While this is a powerful (and usually performant) approach, there are a few drawbacks:

1) The size of the framework - both React and Vue require a download of their runtime javascript packages to the browser.  These can grow [relatively large][package sizes], especially over slower internet connections.
2) In some situations (bigger apps or misuse of code), the Virtual DOM approach can encounter significant performance issues.  This can range from slightly annoying, to largely impactful.

<h3>Svelte Compilation</h3>
Svelte approaches this reactive problem from a different angle.  Rather than downloading a runtime, and performing the "reactivity" within the browser, Svelte uses [compilation][svelte compilation].  This means it inspects your code, and outputs the necessary logic in "vanilla" javascript, *before* it is downloaded to your browser.  The result is a smaller download, simpler javascript (compatible with all browsers) and (usually) better performance and responsiveness within the browser runtime.

<h3>Current State of Svelte</h3>
Svelte is currently on [version 3][svelte 3].  Versions 1 and 2 were essentially proof of concepts, with the intent of [testing whether a compilation-based approach worked better][svelte hypo].  Version 3 is touted as "significant overhaul", touting an outstanding developer experience.  With it's growth comes more tools, auxiliary frameworks, documentation, and a community.  

Some highlights around recent Svelte advancements include:

* [Typescript Support][typescript] - provides typed language support, rather than dynamic Javacript.
* [Sapper][sapper] - provides an app framework to build something real.  Svelte is focused on individual components, Sapper ties the components together into an app (complete with server side rendering, code splitting, etc).  Note that Svelte has already replaced Sapper with something new, [SvelteKit][sveltekit].  This whole topic warrants a blog post of its own...
* [IDE Support][ide] - Visual Studio code is a great one, there are others, including [Atom][svelte atom] and [Intellij][intellij]
* [Svelte Native][svelte native] - use Svelte to create mobile apps.

All in all, Svelte is rapidly becoming a platform to be reckoned with, and has compelling arguments for its use.  Svelte has grown up, and is ready for the big time!

<h3>Thoughts & Notes</h3>

While researching this blog post, I searched "populate JS frameworks 2020", and Svelte was in some (but not all).  I thought the comments [here][populate js frameworks] were pretty amusing - no mention of Svelte, and commentors weren't having it!


[svelte]: https://svelte.dev
[svelte 3]: https://svelte.dev/blog/svelte-3-rethinking-reactivity
[rich harris twitter]: https://twitter.com/Rich_Harris
[react]: https://reactjs.org/
[vue]: https://vuejs.org/
[reactive]: https://en.wikipedia.org/wiki/Reactive_programming
[svelte hypo]: https://svelte.dev/blog/frameworks-without-the-framework
[virtual dom]: https://stackoverflow.com/questions/21965738/what-is-virtual-dom
[dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
[package sizes]: https://gist.github.com/Restuta/cda69e50a853aa64912d
[svelte compilation]: https://lihautan.com/the-svelte-compiler-handbook/
[popular js frameworks]: https://hackr.io/blog/best-javascript-frameworks
[typescript]: https://www.typescriptlang.org/
[sapper]: https://svelte.dev/blog/sapper-towards-the-ideal-web-app-framework
[sveltekit]: https://svelte.dev/blog/whats-the-deal-with-sveltekit
[ide]: https://marketplace.visualstudio.com/items?itemName=JamesBirtles.svelte-vscode
[svelte atom]: https://atom.io/packages/ide-svelte
[intellij]: https://github.com/tomblachut/svelte-intellij
[svelte native]: https://svelte-native.technology/