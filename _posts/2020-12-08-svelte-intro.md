---
layout: post
title: Svelte - 1000 foot view
tweetText: A high-level walkthrough of Svelte, a shiny new reactive Javascript framework
---

<h3>What Is Svelte?</h3>
[Svelte][svelte] is a Javascript component framework, created by [Rich Harris][rich harris twitter] in 2016.  Similar to frameworks like [React][react] and [Vue][vue], Svelte is a [reactive][reactive] framework, with a key difference: rather than using a "[Virtual DOM][virtual dom]" to drive reactivity, Svelte uses a compiler to produce lean and efficient Javascript.  In other words, rather than doing the heavy lifting in the browser at runtime, Svelte does it ahead of time, in the build phase.

While Svelte is relatively new and lesser known, it is starting to gain significant traction in the Javascript community.  It touts performance and simplicity, and features first-rate documentation and tutorials.  It's community and ecosystem are growing rapidly.

<h3>Reactivity</h3>
What do we mean when we say a framwork is "reactive"?  In a nutshell, "reactive" means when a value is updated, the application automatically refreshes UI elements bound to that value.  

For example, with the following variable and div:

<p class="codeblock-label">Simple Reactivity</p>
```javascript
var myName = 'Frank';

<div>Frank</div>
```

Reactive programming means you don't have to write "glue" to keep them syncronized.  Updating the variable updates the div.

This becomes really powerful (and potentially expensive) when values ("bindings") are chained together.  Consider the following pseudocode:

<p class="codeblock-label">Reactive Pseudocode</p>
```
Name: Frank
IntroSentence: My Name is <Name>
Paragraph: <IntroSentence>.  How are you?   
```

In it's current form, the "Paragraph" would read:

<p class="codeblock-label">Pseudo Binding Rendering</p>
```
My Name is Frank.  How are you?   
```

In a Reactive world, we can change "Name" variable to "Harry", and expect the following paragraph:

<p class="codeblock-label">Pseudo Derived Binding Rendering</p>
```
My Name is Harry.  How are you?   
```

<h3>Virtual DOM</h3>
In the popular reactive frameworks (eg, React & Vue), all this magic happens in the browser, using a technique called the [Virtual DOM][virtual dom].  Browser-based Javascript utilizes the [DOM (Document Object Model)][dom] to represent the structure of the HTML.  The *Virtual* DOM is a "shadow" copy of the DOM, stored in memory.  When changes to variables/state occur, the changes are immediately applied to the Virtual DOM.  Then, periodically, the changes in Virtual DOM are pushed to the actual DOM.  While this is a powerful (and usually performant) approach, there are a few drawbacks:

1. The size of the framework - both React and Vue require a download of their runtime javascript packages to the browser.  These can grow [relatively large][package sizes], especially over slower internet connections.
2. In some situations (bigger apps or misuse of code), the Virtual DOM approach can encounter significant performance issues.  This can range from slightly annoying, to largely impactful.

<h3>Svelte Compilation</h3>
Svelte approaches this reactive problem from a different angle.  Rather than downloading a runtime, and performing the "reactivity" within the browser, Svelte uses [compilation][svelte compilation] at build time.  The Svelte compiler inspects your code, and builds the necessary logic in "vanilla" javascript, *before* it is downloaded to your browser.  The result is a smaller download, simpler javascript (compatible with all browsers), and (usually) better performance and responsiveness within the browser runtime.

<h3>Current State of Svelte</h3>
Svelte is currently on [version 3][svelte 3].  Versions 1 and 2 were essentially proof of concepts, with the intent of [testing whether a compilation-based approach worked better][svelte hypo].  Version 3 is touted as "significant overhaul", with a mature developer experience.  With it's growth comes more tools, auxiliary frameworks, documentation, and a community of enthusiastic adopters.  

Some highlights around recent Svelte advancements include:

* [Typescript support][typescript] - provides typed language support, rather than dynamic Javacript.
* [Sapper][sapper] - provides an app framework to build a fully-fledged application.  While Svelte is focused on individual components, Sapper ties the components together into an app (complete with server side rendering, code splitting, etc).  Note that Svelte has already replaced Sapper with something new, [SvelteKit][sveltekit].  This whole topic warrants a blog post of its own...
* [IDE Support][ide] - Visual Studio code is a great one, there are others, including [Atom][svelte atom] and [Intellij][intellij]
* [Svelte Native][svelte native] - use Svelte to create native mobile apps.

All in all, Svelte is rapidly becoming a platform to be reckoned with, and has compelling arguments for its use.  Svelte has grown up, and is ready for the big time!

<h3>Thoughts & Notes</h3>

* While researching this blog post, I searched "populate JS frameworks 2020", and Svelte was in some (but not all).  I thought the comments [here][popular js frameworks] were pretty amusing - no mention of Svelte, and commentors weren't having it!


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