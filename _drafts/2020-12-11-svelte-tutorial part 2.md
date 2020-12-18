---
layout: post
title: Svelte - Tutorial Walkthrough, Part 2
tweetText: Second post describing a walkthrough of Svelte's delightful online tutorial
---

<h3>Svelte Tutorial, Part 2</h3>
This is the 2nd post in a series walking through [Svelte's][svelte tutorial] online tutorial.  In the first post we covered Introduction, [Reactivity][[svelte reactivity], and [Props][svelte props].  This post will continue where we left off, exploring [Logic][svelte logic], [Events][svelte events], and [Bindings][svelte bindings].  With these in your toolbelt, you'll be able to conditionally render items, react to user actions, and collect user input.  

Upon completion of the work here, the mysterious, unsanctioned Svelte ninja would like some words with you!

<h3>Logic</h3>
Logic provides the mechanisms for building the screen based on values stored in variables.  This includes if/else clauses (eg, "Only show this if XYZ is true!"), as well as loops (eg, "Build a list from this collection!").

<h4>If/Then/Else</h4>
Some of this is straightforward.  For example, show elements based on a bool variable:

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

The previous example illustrates a few more special characters Svelte uses as part of it's magic:

# - "Block Opening Tag"
/ - "Block Closing Tag"
: - "Block Continuation Tag"

<h4>Each</h4>
"Each" blocks are another straightforward concept - they allow us to build things based on arrays.  Here's a stupid example:

<p class="codeblock-label">Simple Each Logic Example</p>
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

Note the syntax above that grabs the index of the item in the variable "i" - this is optional, but useful.

```javascript
	{#each moods as mood, i}
```

Additionally, you can use [destructuring][destructuring] to assign member variables directly into variables:

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

[Keyed Each blocks][svelte keyed each] warrant their own section - in order to uniquely identify items within a list, and accurately tie them back to DOM that was generated for them, Svelte supports a keyed each.  Long story short, it assigns a unique identifier during the buildout of the "each" block, and uses it for item->DOM association.  Sort of hard to explain, kinda hard to understand.  But take a look at their [example][svelte keyed each] to see it in action. 

<h4>Await Blocks</h4>

<h3>Events</h3>

<h3>Bindings</h3>

<h3>Thoughts & Notes</h3>

[svelte]: https://svelte.dev
[svelte tutorial]: https://svelte.dev/tutorial/basics
[svelte reactivity]: https://svelte.dev/tutorial/reactive-assignments
[svelte props]: https://svelte.dev/tutorial/declaring-props
[svelte logic]: https://svelte.dev/tutorial/if-blocks
[svelte events]: https://svelte.dev/tutorial/dom-events
[svelte bindings]: https://svelte.dev/tutorial/text-inputs
[destructuring]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[svelte keyed each]: https://svelte.dev/tutorial/keyed-each-blocks