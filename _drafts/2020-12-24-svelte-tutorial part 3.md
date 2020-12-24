---
layout: post
title: Svelte - Tutorial Walkthrough, Part 3
tweetText: Third post describing a walkthrough of Svelte's delightful online tutorial
---

<h3>Svelte Tutorial, Part 3</h3>
This is the 3nd post in a series walking through [Svelte's][svelte tutorial] online tutorial.  In the first post we covered Introduction, [Reactivity][svelte reactivity], and [Props][svelte props].  The second post explored [Logic][svelte logic] and [Events][svelte events].  Today we will explore [Bindings][svelte bindings], which are used to "tie" variable and state values with inputs.

<h4>Text Inputs</h4>
The [Text Input][svelte text input] section begins with a general rule of Svelte - "data flow in Svelte is top down — a parent component can set props on a child component, and a component can set attributes on an element, but not the other way around".  This is super important to solidify in your mind.  In my initial dabbling with Svelte, this tripped me up - a child component would update a variable, but I wouldn't see that updated in the "parent scope".  Always remember, "data flows downhill"

Now it's time to break that rule!  Bindings allow you to pass variables to child elements via properties, AND have changes within the child reflected at the parent level.  The Svelte tutorial starts with built in HTML components - up first, is the Text input.

Here's a simple example from the tutorial, where we initially set the value of the input element to our variable:

<p class="codeblock-label">Simple Text Binding</p>
```javascript
<script>
	let name = 'world';
</script>

<input value={name}>

<h1>Hello {name}!</h1>
```

Note that even though the input starts with "world" as it's value, when you type within the input the "Hello {name}" text does not change.  This is because of the "data flows downhill" behavior of Svelte.  

However, if we use the [bind][svelte bind] directive within Svelte, the data now flows both ways (uphill even!).  Here's what that looks like:

<p class="codeblock-label">Two Way Text Binding</p>
```javascript
<script>
	let name = 'world';
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>
```

This one simple keyword eliminates alot of boilerplate code, and brings the behavior of the app inline with our expectation ("I'm associating this variable with this input!").

<h4>Numeric Inputs</h4>
The section on [Numeric Inputs][svelte numeric inputs] highlights a difficulty with the DOM and numeric binding - the DOM treats everything as a string (ie, properties of individual elements are stored as strings).  Svelte handles this under the covers by coercing variables to numbers as part of the binding.  For example, the following Svelte code:

<p class="codeblock-label">Numeric Binding</p>
```javascript
<script>
	let myVal = 1;
</script>

<input type=number bind:value={myVal} min=0 max=10>
```

Looks like this in the compiled Javascript:

<p class="codeblock-label">Compiled Numeric Binding</p>
```javascript
	p(ctx, [dirty]) {
		if (dirty & /*myVal*/ 1 && to_number(input.value) !== /*myVal*/ ctx[0]) {
			set_input_value(input, /*myVal*/ ctx[0]);
		}
	},
```

Less boilerplate, leaner code!

<h4>Checkbox Inputs</h4>
[Checkboxes][svelte checkboxes] behave like you would expect, but instead of binding to the "value" property, bind to "checked":

<p class="codeblock-label">Checkbox Binding</p>
```javascript
<script>
	let isChecked = false;
</script>

<label>
	<input type=checkbox bind:checked={isChecked}>
	Please send me spam.
</label>
```

<h4>Group Inputs</h4>
[Group Inputs][svelte group inputs] include Radio Buttons and Checkboxes (when the checkboxes are bound to an array).  These offer straightforward methods of collecting a single value from a list (Radio), or one-to-many selections from a list (Checkbox).  The tutorial also demonstrates using the [each][svelte each] block to programatically build a list of Group Inputs from an array.  Here's a quick example:

<p class="codeblock-label">Group Input Binding</p>
```javascript
<script>
	let favoriteInstruments = [];

	let instruments = [
		'Guitar',
		'Drum', 
		'Bass',
		'Vocals'
	];
</script>

<h2>What Can You Play?</h2>

{#each instruments as instrument}
	<label>
		<input type=checkbox bind:group={favoriteInstruments} value={instrument}>
		{instrument}
	</label>
{/each}	
```

One thing to note from this example - the collection bound to the "available" list (instruments) is different than that bound to the "selected" list (favoriteInstruments).  I initially stumbled in my example, and used the same collection throughout.  The result was every item was initially selected, and de-selecting them removed them from the screen.  Seeing something broken, then making it work correctly, is a great way to learn!

<h4>Textarea Inputs</h4>

<h4>Select Bindings</h4>

<h4>Select Multiple</h4>

<h4>Contenteditable Bindings</h4>

<h4>Each Block Bindings</h4>

<h4>Media Elements</h4>

<h4>Dimensions</h4>

<h4>This</h4>

<h4>Component Bindings</h4>

<h3>Thoughts & Notes</h3>

[svelte]: https://svelte.dev
[svelte tutorial]: https://svelte.dev/tutorial/basics
[svelte reactivity]: https://svelte.dev/tutorial/reactive-assignments
[svelte props]: https://svelte.dev/tutorial/declaring-props
[svelte logic]: https://svelte.dev/tutorial/if-blocks
[svelte events]: https://svelte.dev/tutorial/dom-events
[svelte bind]: https://svelte.dev/docs#bind_component_property
[svelte numeric inputs]: https://svelte.dev/tutorial/numeric-inputs
[svelte checkboxes]: https://svelte.dev/tutorial/checkbox-inputs
[svelte group inputs]: https://svelte.dev/tutorial/group-inputs
[svelte each]: https://svelte.dev/tutorial/each-blocks