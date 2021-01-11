---
layout: post
title: Svelte - Tutorial Walkthrough, Part 2
tweetText: Svelte's delightful online tutorial - Events and Logic
---

<h3>Svelte Tutorial, Part 2 - Logic & Events</h3>
This is the 2nd post in a series walking through [Svelte's][svelte tutorial] online tutorial.  In the [first post]({% post_url 2020-12-11-svelte-tutorial %}) we covered the Introduction, [Reactivity][svelte reactivity], and [Props][svelte props].  This post will continue where we left off, exploring [Logic][svelte logic] and [Events][svelte events].  With these in your toolbelt, you'll be further down the Svelte path, well on your way to creating something useful!

The imaginary Svelte ninja master sits atop a large boulder, observing your progress.  When you completed [part 1]({% post_url 2020-12-11-svelte-tutorial %}), his eyebrows raised the most imperceptable of amounts.  He is impressed with your progress, and momentarily lost the total control he maintains over every aspect of his being.  Let's see if we can continue to reward his tutelage with acquired knowledge, starting with "Logic"...

<h3>Logic</h3>
Logic provides the mechanism for "making decisions", based on values stored in variables.  This includes if/else clauses (eg, "Only show this if XYZ is true!"), as well as loops (eg, "Build a list from this collection!").

<h4>If/Then/Else</h4>
Ahhh, good old "if, then, else" - where would we be without you?  What would the programming world look like if we couldn't dream...."if".  This is all straightforward [within Svelte][svelte logic].  

For example, show elements based on a bool variable:

<p class="codeblock-label">Simple If/Else Logic Example</p>
```javascript
<script>
	let errorText = 'You done messed up';
</script>
{#if errorText.length > 20}
	<div class="error">
		{errorText}, Big Time!
  	</div>
{:else if errorText}
	<div class="error">
		{errorText}
  	</div>
{:else}
	<div>
		All is Well!
	</div>
{/if}
```

The previous example illustrates a few additional reserved characters Svelte uses as part of it's magic:

<p class="codeblock-label">Block reserved characters</p>
```
# - "Block Opening Tag"
/ - "Block Closing Tag"
: - "Block Continuation Tag"
```

<h4>Each</h4>
["Each"][svelte each] blocks are another straightforward concept - they allow us to build UI elements from arrays.  Here's a stupid example:

<p class="codeblock-label">Stupid "Each" Logic Example</p>
```javascript
<script>
	let moods = [
		{ score: 10, name: 'Happy' },
		{ score: 1, name: 'Sad' },
		{ score: 5, name: 'Indifferent' }
	];
</script>
<ul>
	{#each moods as mood, i}
		<li>{i}: {mood.name}, Score: {mood.score}</li>
	{/each}
</ul>
```

Note the syntax above gives us access to the current iteration index, "i" - this is optional, but can be useful.

<p class="codeblock-label">Iteration Index</p>
```javascript
	{#each moods as mood, i}
```

Additionally, you can use [destructuring][destructuring] to assign member variables directly into variables.  This example does so with the "score" and "name" properties of the "mood" objects:

<p class="codeblock-label">Destructuring Example</p>
```javascript
<script>
	let moods = [
		{ score: 10, name: 'Happy' },
		{ score: 1, name: 'Sad' },
		{ score: 5, name: 'Indifferent' }
	];
</script>
<ul>
	{#each moods as {score, name}, i}
		<li>{i}: {name}, Score: {score}</li>
	{/each}
</ul>
```

<h4>Keyed Each Blocks</h4>

[Keyed Each blocks][svelte keyed each] warrant their own section.  In order to uniquely identify items within a list, and reliably tie them back to their respective DOM elements, Svelte supports a "keyed each".  Long story short, it assigns a unique identifier during the buildout of the "each" block, and uses it for item->DOM association.  Sort of hard to explain, kinda hard to understand.  But take a look at their [example][svelte keyed each] to see it in action. 

<h4>Await Blocks</h4>
Svelte provides a nifty concept called ["Await Blocks"][svelte await blocks] to build a UI that handles asyncronous (async) execution automatically.  This can be used to provide a good user experience while waiting on API calls to complete.  

But first, a brief segue into async programming...

<h5>Very Brief Explanation of Async and Promises</h5>
[Promises][promise] are the core building block of [asyncronous programming within Javascript][eloquent async].  They allow code to perform long running operations (such as retrieving a value from an external API), without blocking other execution.  

As a simple example, consider a page loading that requires 5 API requests to retrieve data.  In a syncronous programming model, these would happen one after the other, ie:

```
Call1->Response 
               Call2->Response 
                              Call3->Response 
                                             Call4->Response 
                                                            Call5->Response
```

This is inefficient, because the CPU largely sits idle while waiting for each call to return.  With async programming, we can launch all the calls at once, and wait for them all to return.  So it might look something like this:

```
Call1->   Response 
Call2->Response 
Call3->            Response 
Call4->  Response 
Call5->      Response
```

The effect is we reduce the overall time the code is waiting for these calls to return.  The benefit - faster overall execution, and snappier UIs!

<h5>Svelte Await Blocks</h5>

Svelte's [Await Blocks][svelte await blocks] provide a powerful template-based mechanism for launching an async operation, awaiting its return, and displaying the result.  

Here's a simple example:

<p class="codeblock-label">Await Block Example</p>
```javascript
<script>
	async function makeNetworkCall() {
		// long running network call
	}

	let promise = makeNetworkCall();
</script>

{#await promise}
	<p>Loading</p>
{:then response}
	<ResponseView response={response}></ResponseView>
{:catch error}
	<ErrorView error={error}></ErrorView>
{/await}
```

This is a very simple example, and some promise-based async logic may be too complex to fit neatly into this language feature.  But for simple scenarios, await blocks offer an easy mechanism for creating components that are reactive to long running calls.  Very cool.

<h3>Events</h3>
[Event Driven Programming][event driven programming] is a concept widely used in UI programming (and beyond).  In a nutshell, it means when "something happens" (a user clicks, layout of screen completes, a timer clicks) the runtime will trigger an event.  Code in your application can then respond to (or "handle") these events (for example, executing a web call when the user clicks "Submit").  

The following sections walk through how Svelte models and handles events.

<h4>DOM Events</h4>
[DOM events][dom events] are built into the web browser's javsacript engine, and provide feedback when things happen on the screen.  In it's simplest form, Svelte provides direct support for these events.  

Here's an example of reacting to mouse movement:

<p class="codeblock-label">DOM Event Example</p>
```javascript
<script>
	let isMouseOver = false; 

	function handleMouseOver(event) {
		isMouseOver = true;
	}
</script>
<div on:mouseover={handleMouseOver}>
	The mouse is over me: {isMouseOver}
</div>
```

<h4>Inline Handlers</h4>
If the logic required by your handler isn't complicated, you might consider an [inline handler][svelte inline handler].  

Here's an example from the Svelte documentation:

<p class="codeblock-label">Inline Handler Example</p>
```javascript
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
	The mouse position is {m.x} x {m.y}
</div>
```

Worth repeating a tidbit the Svelte documentation mentions around performance - with some reactive frameworks, inline handlers can introduce performance issues, especially when used within loops.  That doesn't apply to Svelte.  Because Svelte is compiled ahead of time, the compiler will "always do the right thing".

<h4>Event Modifiers</h4>
Occasionally DOM events can introduce problems...almost like they do their job TOO well.  A common example is when something is clicked multiple times - without special logic, the event handling code executes multiple times.  This can result in duplicate entries in your backend, conflict exceptions, etc.  

Svelte provides [event modifiers][svelte event modifiers] to alleviate or prevent DOM event-related issues.  Here's the example from their documentation illustrating how to prevent double-clicking issues with their "once" modifier:

<p class="codeblock-label">Inline Handler Example</p>
```javascript
<script>
	function handleClick() {
		alert('no more alerts')
	}
</script>

<button on:click|once={handleClick}>
	Click me
</button>
```

The Svelte documentation contains the complete list of available modifiers.  This is an area you can peruse at a high level initially.  Then, once comfortable with the framework, return and spend some time diving deeper to solidify your understanding.

<h4>Component Events</h4>
In addition to built-in DOM events, Svelte allows components to [raise events][svelte component events].  Events enable components to communicate actions/behavior to the "wider world" (other components, the framework itself, etc).  

Here's an example *based* on the example Svelte provides, and it illustrates an important nuance that escaped me initially:

* the first parameter in the dispatch method is the name of the event
* the parent component must subscribe to "on:\<eventName\>".

This is obvious as I type it, but my brain initially treated "message" as a framework keyword.  Took a few minutes of hammering to figure out what I was doing wrong!

<p class="codeblock-label">Child.svelte</p>
```javascript
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function trigger() {
		dispatch('triggered', {
			payload: {}
		});
	}
</script>
```

<p class="codeblock-label">Parent.svelte</p>
```javascript
<script>
	import Child from './Child.svelte';

	function handleChildTrigger(event) {
		// event.detail carries the payload
		console.log(event.detail);
	}
</script>

// "on:triggered" is corresponding to the "triggered" string the child component passed to dispatch function.
<Child on:triggered={handleChildTrigger}/>
```

<h4>Event Forwarding</h4>
By default, Svelte will only raise a Component event to the immediate higher level.  This is different than DOM events, which will bubble the whole way up the hierarchy (unless you use the stopPropagation modifier!).  When you have multiple levels of nested components, you'll need to raise the events at each level.

This requires cumbersome boilerplate logic, but thankfully Svelte provides the [on:message][svelte event forwarding] shorthand.  With this, intermediate components will simply raise the event to the next level, where it may or may not be handled:

<p class="codeblock-label">on:message</p>
```javascript
<IntermediateComponent on:message/>
```

Easy peasey.

<h4>DOM Event Forwarding</h4>
Svelte also supports [DOM event forwarding][svelte dom event forwarding].  Similar to Event Forwarding, this applies to the built in DOM events.  As an example, their documentation illustrates a "custom button".  It it's own styling and hover behavior, but we still want it to raise the "on:click" DOM event for anyone consuming it.  By declaring the event (without a handler) on the button element, Svelte will raise to parent components:

<p class="codeblock-label">DOM Event Forwarding</p>
```javascript
<button on:click>
	Submit
</button>
```

<h3>Summary</h3>
OK, we've covered logic and events, and now it is time to pause.  Up next is bindings, and there's alot of ground to cover there.  

For now, continue playing in the [Svelte tutorial][svelte tutorial] and see these concepts in action for yourself.  You might also consider creating a simple/stupid project to play on your own - Svelte's [quickstart][svelte quickstart] makes that a painless exercise.  If you want to jump ahead a bit and add [bindings][svelte bindings] or [stores][svelte stores], that's perfectly fine.  Their tutorial makes it easy to learn, and we'll dig into those in just a bit here.

Hopefully you're enjoying the idea of what Svelte offers, and looking forward to more.  The imaginary, unsanctioned Svelte ninja certainly approves.  You wouldn't know it by looking at his stoic, granite exterior, but he's been observing your progress.  As you learned logic and events, his heart glowed with love.  A teacher is only as good as their students, and he was watching another begin to flap their wings.  With focus and dedication, you will soon learn to fly!

<h3>Thoughts & Notes</h3>

[svelte]: https://svelte.dev
[svelte tutorial]: https://svelte.dev/tutorial/basics
[svelte reactivity]: https://svelte.dev/tutorial/reactive-assignments
[svelte props]: https://svelte.dev/tutorial/declaring-props
[svelte logic]: https://svelte.dev/tutorial/if-blocks
[svelte each]: https://svelte.dev/tutorial/each-blocks
[svelte events]: https://svelte.dev/tutorial/dom-events
[svelte event modifiers]: https://svelte.dev/tutorial/event-modifiers
[svelte component events]: https://svelte.dev/tutorial/component-events
[svelte bindings]: https://svelte.dev/tutorial/text-inputs
[svelte stores]:https://svelte.dev/tutorial/writable-stores 
[svelte quickstart]: https://svelte.dev/blog/the-easiest-way-to-get-started
[destructuring]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[svelte keyed each]: https://svelte.dev/tutorial/keyed-each-blocks
[svelte await blocks]: https://svelte.dev/tutorial/await-blocks
[svelte inline handler]: https://svelte.dev/tutorial/inline-handlers
[svelte event forwarding]: https://svelte.dev/tutorial/event-forwarding
[svelte dom event forwarding]: https://svelte.dev/tutorial/dom-event-forwarding
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[eloquent async]: https://eloquentjavascript.net/11_async.html
[event driven programming]: https://en.wikipedia.org/wiki/Event-driven_programming
[dom events]: https://www.w3schools.com/jsref/dom_obj_event.asp
[table stakes]: https://en.wikipedia.org/wiki/Table_stakes