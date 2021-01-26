---
layout: post
title: Svelte - Tutorial Walkthrough, Part 3
tweetText: Svelte's delightful online tutorial - Bindings
---

<h3>Svelte Tutorial, Part 3</h3>
This is the 3rd post in a series walking through [Svelte's][svelte tutorial] online tutorial.  In the [first post]({% post_url 2020-12-11-svelte-tutorial %}) we covered Introduction, [Reactivity][svelte reactivity], and [Props][svelte props].  The [second post]({% post_url 2020-12-18-svelte-tutorial part 2 %}) explored [Logic][svelte logic] and [Events][svelte events].  Today we will explore [Bindings][svelte bindings], which are used to "tie" variable and state values with inputs.

<h4>Text Inputs</h4>
The [Text Input][svelte bindings]{:target="_blank"} section begins with a general rule of Svelte:

> "data flow in Svelte is top down — a parent component can set props on a child component, and a component can set attributes on an element, but not the other way around".

This is super important to solidify in your mind.  In my initial dabbling with Svelte, this tripped me up - a child component would update a variable, but I wouldn't see that updated in the "parent scope".  This is because "data flows downhill" in Svelte.

But what good is a rule if we can't break it?  It's time to break that rule!  Bindings allow you to pass variables to child elements (eg, inputs) via properties AND have changes within the child reflected in the parent's variables.  The Svelte tutorial starts with built in HTML components.  

Up first, the text input.  Here's a simple example from the tutorial, where we initially set the value of the input element to our variable.  Note this is not using actual "binding" yet - we are only setting a property from a variable:

<p class="codeblock-label">Simple Text Input Property</p>
```html
<script>
	let name = 'world';
</script>

<input value={name}>

<h1>Hello {name}!</h1>
```

Note, even though the input is initialized with the value "world", when you change that value, the "Hello world" text does not change.  This is because of the "data flows downhill" behavior of Svelte mentioned above.

However, if we use the [bind][svelte bind] directive, the data now flows both ways (uphill AND downhill).  Here's what that looks like:

<p class="codeblock-label">Two Way Text Binding</p>
```html
<script>
	let name = 'world';
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>
```

This one simple keyword eliminates boilerplate code, and brings the behavior of the app inline with our expectation ("I'm associating this variable with this input!").

<h4>Numeric Inputs</h4>
The [Numeric Inputs][svelte numeric inputs] section highlights a difficulty with the DOM and numeric binding: the DOM treats everything as a string (ie, properties on individual elements are stored as strings).  Svelte solves this by coercing variables to numbers within its binding logic.  

For example, the following Svelte code:

<p class="codeblock-label">Numeric Binding</p>
```html
<script>
	let myVal = 1;
</script>

<input type=number bind:value={myVal} min=0 max=10>
```

Is compiled to the following by Svelte:

<p class="codeblock-label">Compiled Numeric Binding</p>
```javascript
	p(ctx, [dirty]) {
		if (dirty & /*myVal*/ 1 && to_number(input.value) !== /*myVal*/ ctx[0]) {
			set_input_value(input, /*myVal*/ ctx[0]);
		}
	},
```

Less boilerplate required from us, leaner code overall.

<h4>Checkbox Inputs</h4>
[Checkboxes][svelte checkboxes] behave like you would expect, but instead of binding to the "value" property, we bind to "checked":

<p class="codeblock-label">Checkbox Binding</p>
```html
<script>
	let isChecked = false;
</script>

<label>
	<input type=checkbox bind:checked={isChecked}>
	Please send me spam.
</label>
```

<h4>Group Inputs</h4>
[Group Inputs][svelte group inputs] include Radio Buttons and Checkboxes.  These offer straightforward methods of collecting a single value (Radio), or one-to-many selections (Checkbox).  

The tutorial demonstrates using the [each][svelte each] block to programmatically build a list of Group Inputs from an array.  Here's a quick example:

<p class="codeblock-label">Group Input Binding</p>
```html
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

One thing to note from this example - the collection bound to the "available" list (instruments) is different than that bound to the "selected" list (favoriteInstruments).  I initially stumbled in my example, and used the same collection for both.  The result was that every item was initially selected, and de-selecting them removed them from the screen.  

Mistakes like this solidify the concepts, and fixing them is a great way to learn!

<h4>Textarea Inputs</h4>
[Textarea inputs][svelte textarea inputs] work the same as other inputs - bind a variable the "value" property on the "textarea" element.  The tutorial mentions a shortcut - as long as the variable is named the same as the property, you can shorten the binding in the following way:

Change the following bind property:

<p class="codeblock-label">Textarea Input 'Longform' Binding</p>
```html
<textarea bind:value={value}></textarea>
```

to an abbreviated:

<p class="codeblock-label">Textarea Input 'Abbreviated' Binding</p>
```html
<textarea bind:value></textarea>
```

This applies for all bindings - anywhere you're using "bind:property=property", it can be replaced with "bind:property".  Little shortcuts here and there add up over time, and make things more readable.

<h4>Select Bindings</h4>
The section on [select bindings][svelte select bindings] walks through binding to a select input.  There's a rich example there that I can't improve, so go [check it out][svelte select bindings].

<h4>Select Multiple</h4>
[Select multiple][svelte select multiple] is a variant of the standard "select" input, allowing the selection of multiple items.  Just toss the "multiple" keywords into your "select" node.  Easy peasey!

<p class="codeblock-label">Select Multiple</p>
```html
<h2>Favorite Instruments</h2>

<select multiple bind:value={favoriteInstruments}>
	{#each instruments as instrument}
		<option value={instrument}>
			{instrument}
		</option>
	{/each}
</select>
```

<h4>Contenteditable Bindings</h4>
The [contenteditable][svelte content editable] section introduces a strange twist - you can use this to allow editing of "textContent" or "innerHTML" properties within elements that [support editable content][contenteditable].  This idea was new to me, and I was curious why you might need this property.  After googling, I learned that some think it's [evil][contenteditable evil], whereas this page declares it's good for [WYSIWYG][contenteditable wysiwyg].  

Basically, if you find yourself needing to support some advanced user input, you might consider using this functionality.

<h4>Each Block Bindings</h4>
[Each Block Bindings][svelte each block bindings] build on the [each blocks][svelte each block] we covered earlier.  Essentially, if you build a collection of elements from an array using the "each block", then you can bind to properties on items in the array.  The tutorial warns about [immutability][immutability] - binding to children of an array within an each block will mutate the array.  If you want to keep things immutable, then you'll want to avoid input bindings, and use event handlers to react to input value changes.

<h4>Media Elements</h4>
Svelte supports [media][svelte media] elements, allowing you to embed audio and video in your components.  This is an example of:

<ol type="a">
  <li>How long it's been since I've done a deep dive into HTML/Javascript - I wasn't aware these HTML elements existed!</li>
  <li>How little I know about other frameworks - I'm not sure whether Svelte is providing <a href="https://en.wikipedia.org/wiki/Table_stakes">table stakes</a> here, and all frameworks have these, or if this is something unique to svelte.</li>
</ol>

Briefly googling, it looks like [react][react video] and [vue][vue video] both rely on external libraries, so it could be that Svelte is unique in this regard...

<h4>Dimensions</h4>
Svelte provides the ability to [bind to DOM element dimensions][svelte dimensions] in a "read only" fashion.  In other words, you can bind a variable, and if the element is resized, your variable will be updated...but not vice versa.  

Sizing and layout are usually one of the biggest challenges I face when creating web pages.  To my ignorant ears, this sounds like a way to override CSS behavior?  I plan on diving deeply into CSS at some point - that might be a good time to revisit this section.

<h4>This</h4>
Svelte allows you to [bind variables directly to DOM elements][svelte bind this], providing access to low-level functionality of DOM elements.  The Svelte example binds a variable to a "canvas" element, giving the code programmatic control of that canvas.  Note this depends on the component mounting within the overall Svelte hierarchy, and the variable won't be initialized until the [OnMount Lifecycle function][svelte lifecycle function].  We will cover these topics in an upcoming post.

<h4>Component Bindings</h4>
Extending the "data flows downhill" concept we explored in standard input bindings above, you can also [bind custom properties on child components][svelte component binding].  This allows changes to a custom child component to propagate back to the parent.  The tutorial offers a warning about doing so, however - if you rely on component binding, it can be difficult to track the flow of data around your application.  For complex data binding scenarios, Svelte recommends using something like [stores][svelte stores] to manage your application state.  This will also be covered in a future post.

<h3>Summary</h3>

And that's it for Bindings!  With these in your toolbelt, you can begin to add serious functionality to a web UI.  And while you thought you were alone this whole time - the Svelte ninja master observed all from his perch on a tree branch.  Silent and wise, he was with you through each difficult moment, and shared your triumph in completing this reading.  With a sage nod of his head, he disappears in a poof of smoke.

The next post will dig into Svelte [Lifecycle][svelte lifecycle] and [Stores][svelte stores], where you'll gain even more power.  For now....rest and reflect.  Gather your strength.  And keep being....Svelty.

<h3>Thoughts & Notes</h3>
* The "Svelte Ninja" concept feels a little shaky, but I started with it, and you know what they say..."dance with the one that brung ya".  Humor can lure people in and keep them coming back, so I gotta keep on keepin on with him.  Not that his feelings would be hurt if I didn't.  His wisdom is a superset of my own, and he understands.

[svelte]: https://svelte.dev
[svelte tutorial]: https://svelte.dev/tutorial/basics
[svelte reactivity]: https://svelte.dev/tutorial/reactive-assignments
[svelte props]: https://svelte.dev/tutorial/declaring-props
[svelte logic]: https://svelte.dev/tutorial/if-blocks
[svelte events]: https://svelte.dev/tutorial/dom-events
[svelte bind]: https://svelte.dev/docs#bind_component_property
[svelte bindings]: https://svelte.dev/tutorial/text-inputs
[svelte numeric inputs]: https://svelte.dev/tutorial/numeric-inputs
[svelte checkboxes]: https://svelte.dev/tutorial/checkbox-inputs
[svelte group inputs]: https://svelte.dev/tutorial/group-inputs
[svelte each]: https://svelte.dev/tutorial/each-blocks
[svelte textarea inputs]: https://svelte.dev/tutorial/textarea-inputs
[svelte select bindings]: https://svelte.dev/tutorial/select-bindings
[svelte select multiple]: https://svelte.dev/tutorial/multiple-select-bindings
[svelte content editable]: https://svelte.dev/tutorial/contenteditable-bindings
[svelte each block]: https://svelte.dev/tutorial/each-blocks
[svelte each block bindings]: https://svelte.dev/tutorial/each-block-bindings
[svelte media]: https://svelte.dev/tutorial/media-elements
[svelte dimensions]: https://svelte.dev/tutorial/dimensions
[svelte bind this]: https://svelte.dev/tutorial/bind-this
[svelte lifecycle function]: https://svelte.dev/tutorial/onmount
[svelte component binding]: https://svelte.dev/tutorial/component-bindings
[svelte stores]: https://svelte.dev/tutorial/writable-stores
[contenteditable]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content
[contenteditable evil]: https://medium.com/content-uneditable/contenteditable-the-good-the-bad-and-the-ugly-261a38555e9c
[contenteditable wysiwyg]: https://www.quackit.com/html/codes/contenteditable.cfm
[immutability]: https://dzone.com/articles/immutability-in-javascriptwhy-and-when-should-you
[table stakes]: https://en.wikipedia.org/wiki/Table_stakes
[react video]: https://video-react.js.org/
[vue video]: https://www.npmjs.com/package/vue-video-player
[svelte lifecycle]: https://svelte.dev/tutorial/onmount
[svelte stores]: https://svelte.dev/tutorial/writable-stores
