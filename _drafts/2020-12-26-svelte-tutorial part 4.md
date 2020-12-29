---
layout: post
title: Svelte - Tutorial Walkthrough, Part 4
tweetText: Svelte's delightful online tutorial - Lifecycle and Stores
---

<h3>Svelte Tutorial, Part 4</h3>
This is the 4th post in a series walking through [Svelte's][svelte tutorial] online tutorial.  In the [first post]({% post_url 2020-12-11-svelte-tutorial %}) we covered Introduction, [Reactivity][svelte reactivity], and [Props][svelte props].  The [second post]({% post_url 2020-12-18-svelte-tutorial part 2 %}) explored [Logic][svelte logic] and [Events][svelte events].  The [third post]({% post_url 2020-12-24-svelte-tutorial part 3 %}) dove deeply into Bindings.  Today, we will explore [Lifecycle][svelte lifecycle] and [Stores][svelte stores].

<h3>Lifecycle</h3>
The [Svelte Lifecycle][svelte lifecycle] represents the different stages of building and rendering a Svelte component will undergo.  While Svelte hides this complexity behind the compiler, it is important to learn the details for a few reasons:

* Additional functionality is available by using the lifecycle hooks
* Unexpected behavior may occur if your code is doing certain things (eg, network calls) at the incorrect times in the component lifecycle

As you build your Svelte ninjitsu, it's important to continue to deepen your familiarity with the framework, in order to increase your develolper power.  Lifecycles are an example where deeper understanding will multiply your abilities.

<h4>onMount</h4>
The first function the tutorial mentions is [onMount][svelte lifecycle], which runs after the component is first rendered to the DOM.  According to the tutorial, this is the most frequently used of the Lifecycle functions.  One important use case for onMount is for executing networking calls with Javascript's [fetch][fetch api].  While you *could* make this call directly in the 'script' tag of your component, this won't work correctly if you're using server side rendering (SSR).

Here's a quick example of using onMount:

<p class="codeblock-label">onMount Example</p>
```javascript
<script>
	import { onMount } from 'svelte';

	let starWarsCharacters = [];

	onMount(async () => {
		const res = await fetch(`https://swapi.dev/api/people`);
		starWarsCharacters = await res.json();
	});
</script>

{#each starWarsCharacters as starWarsCharacter, i}
	// Render Wisely
{/each}

```

Note I did some googling for some official documentation on Svelte SSR, but haven't had much luck.  My current understanding is that SSR is more the responsibility of auxiliary frameworks like [Sapper][svelte sapper] and [Svelte Kit][svelte kit].  I plan on digging into Sapper after finishing this Svelte Tutorial walkthrough, so hopefully more will become apparent then.

<h4>onDestroy</h4>
Svelte's [onDestroy][svelte ondestroy] hook seems to be largely used to clean things up and prevent memory leaks when your component is torn down.  The example provided in Svelte's tutorial demonstrates using onDestroy to clean up after a [setInterval][setinterval] function.  This is an important thing to consider with JS UI development, especially when your app grows large.  Memory leaks can slowly kill performance, and I'm not sure JS developers always keep them in mind.  The framework makes things easy, and in a way, that lulls people into not thinking about some of the deeper and more complicated problems that can occur.  Here's a [good article][js memory leaks] going deeper on the topic.

<h4>beforeUpdate and afterUpdate</h4>
Svelte provides [beforeUpdate and afterUpdate][svelte update] hooks that will trigger before and after the DOM is syncronized with your data.  In the words of the SVelte tutorial, "they're useful for doing things imperatively that are difficult to achieve in a purely state-driven way, like updating the scroll position of an element.".  To my ears, that means "lots of things can go sideways with HTML and DOM positioning/rendering - before/after update gives you hooks to hack together fixes".  Things like this are definitely valuable, though.  It's really hard to get everything in a complex framework to work correctly all the time, especially across different browsers and versions.  Sometimes, you need a backdoor.

<h4>tick</h4>
Svelte's [tick][svelte tick] is another "back door" into the Svelte lifecycle.  Svelete will batch updates to the DOM in order to improve efficiency (using [microtasks][js microtasks]).  Sometimes you have code you wouldn't want to execute until this sycnronization has completed.  The "tick" function allows you to effectively wait for the next refresh before executing logic.  The tutorial has a good example you should look into, but in a nutshell, it looks something like this:

<p class="codeblock-label">tick Example</p>
```javascript
<script>
	// Do lots of things

	await tick();  // This will not return until the next Svelte batch update occurs

	// Do things which require the latest state to work correctly
</script>
```

<h3>Stores</h3>
Ahhh....Stores.  For me, this was where Svelte made the leap from "interesting widget framework" to "something I can use to build an actual application".  Stores are what allow you to share data across unrelated components, as well as with non-Svelte Javascript modules.

<h4>Writeable Stores</h4>
At their simplest, Stores do the following:

* Store a value
* Allow value to be updated (via "update")
* Allow value to be set (via "set")

Here's a brief example:

<p class="codeblock-label">stores.js</p>
```javascript
import { writable } from 'svelte/store';

export const name = writable('');
```

<p class="codeblock-label">Component.svelte</p>
```javascript
<script>
	import { name } from './stores.js';

	function setToBilly() {
		name.set('Billy');
	}
	function addExclamation() {
		name.update(n => n + '!');
	}
	let name_value;

	const unsubscribe = name.subscribe(value => {
		name_value = value;
	});
</script>

<button on:click={setToBilly}>
Name Him Billy
</button>

<button on:click={addExclamation}>
Yell Louder
</button>

<div>{name_value}</div>
```

One issue I encountered at first was the inclination to bind to the writable store itself.  There's an important distinction here - the store is the container for the value, but is not the value itself:

<p><img src="/images/svelte/store_binding.png" alt="You can't bind directly to Writeable Store" title="You can't bind directly to Writeable Store" /></p>

Now that we've established this fact, it's time to use some Svelte magic to work around it!

<h4>Auto Subscriptions</h4>
With Svelte's [auto subscriptions][svelte auto subscription], you can bind directly to the Store, and leave alot of the boilerplate behind.  This is enabled by using the "$" operator, like the following:

<p class="codeblock-label">Component.svelte</p>
```javascript
<script>
	import { name } from './stores.js';

	function setToBilly() {
		name.set('Billy');
	}
	function addExclamation() {
		name.update(n => n + '!');
	}
</script>

<button on:click={setToBilly}>
Name Him Billy
</button>

<button on:click={addExclamation}>
Yell Louder
</button>

<div>{$name}</div>
```

Not only does this get rid of some boilerplate logic, it also eliminates a potential memory leak.  This is because when you directly subscribe to a writeable store, you are passed back the unsubscribe function.  If you don't invoke that, a memory leak occurs:

<p class="codeblock-label">MemoryLeakComponent.svelte</p>
```javascript
<script>
	import { name } from './stores.js';
	
	let name_value;

	const unsubscribe = name.subscribe(value => {
		name_value = value;
	});
</script>
```

This can be addressed by using the [onDestroy][svelte ondestroy] lifecycle hook, like the following:

<p class="codeblock-label">NoMemoryLeakComponent.svelte</p>
```javascript
<script>
	import { onDestroy } from 'svelte';
	import { name } from './stores.js';
	
	let name_value;

	const unsubscribe = name.subscribe(value => {
		name_value = value;
	});

	onDestroy(unsubscribe);
</script>
```

But isn't using the "$" approach much easier?

<h4>Readable Stores</h4>
[Readable Stores][svelte readable stores] provide the ability to have a centralized Store that consumers can't update - it merely provides read-only values to them.  The example provided by Svelte a readable store that maintains the current time.  They also mention you may want to use a readable store to contain the current mouse position.

Implicit in their examples is that you'd want to use [setInterval][setinterval] method to periodically enable a refresh of your readonly store (via the "set" callback).  Quickly googling for other examples didn't reveal any other use cases.

<h4>Derived Stores</h4>
[Derived Stores][svelte derived stores] offer the capability of building a store that is *derived* from another store.  This one gets a little more involved, and the Svelte [API documentation][svelte api derived stores] provides more details.  In an nutshell, you can build a derived store from any number of other stores.  Additionally, it features overrides that take a callback function as a parameter, allowing you to set the derived value in an async fashion.

<h4>Custom Stores</h4>
[Custom Stores][svelte custom stores] illustrate the fact that Svelte can treat anything with a correctly implemented "subscribe" method as a store.  This means that you can export a function that encapsulates "setting" functionality, and simply allows a consumer to subscribe to it.  This ensures that consumers won't ever do "bad things" with your store, and you have more control over how it can be used.

The tutorial illustrates this by building on its example in writeable stores, but instead of directly exporting the store, it exports an object that contains the store.  

Building on our previous example, we could update our "name" store to provide better encapsulation:

<p class="codeblock-label">CustomStore.js</p>
```javascript
import { writable } from 'svelte/store';

function createName() {
	const { subscribe, set, update } = writable('');

	return {
		subscribe,
		setToBilly: () => {
			set('Billy');
		},
		addExclamation: () => {
			update(n => n + '!');
		}
	};
}

export const name = createName();
```

Features like this both demonstrate to me how powerful Javascript can become, and how creatively it can be used.  Pretty cool stuff.

<h4>Store Bindings</h4>
Writeable Stores can be [bound][svelte store bindings] to components the same way as standard variables.  This offers a powerful mechanism for allowing input controls to update the values contained in your store:

<p class="codeblock-label">StoreBinding.svelte</p>
```javascript
<script>
	import { name } from './stores.js';
</script>

<input bind:value={$name}>

<div>{$name}</div>
```

<h3>Summary</h3>

<h3>Thoughts & Notes</h3>

[svelte]: https://svelte.dev
[svelte tutorial]: https://svelte.dev/tutorial/basics
[svelte reactivity]: https://svelte.dev/tutorial/reactive-assignments
[svelte props]: https://svelte.dev/tutorial/declaring-props
[svelte logic]: https://svelte.dev/tutorial/if-blocks
[svelte events]: https://svelte.dev/tutorial/dom-events
[svelte lifecycle]: https://svelte.dev/tutorial/onmount
[svelte ondestroy]: https://svelte.dev/tutorial/ondestroy
[svelte update]: https://svelte.dev/tutorial/update
[svelte tick]: https://svelte.dev/tutorial/tick
[svelte stores]: https://svelte.dev/tutorial/writable-stores
[svelte auto subscription]: https://svelte.dev/tutorial/auto-subscriptions
[svelte readable stores]: https://svelte.dev/tutorial/readable-stores
[svelte derived stores]: https://svelte.dev/tutorial/derived-stores
[svelte api derived stores]: https://svelte.dev/docs#derived
[svelte custom stores]: https://svelte.dev/tutorial/custom-stores
[svelte store bindings]: https://svelte.dev/tutorial/store-bindings
[fetch api]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[svelte sapper]: https://sapper.svelte.dev/docs
[svelte kit]: https://svelte.dev/blog/whats-the-deal-with-sveltekit
[setinterval]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
[js memory leaks]: https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/
[js microtasks]: https://javascript.info/microtask-queue