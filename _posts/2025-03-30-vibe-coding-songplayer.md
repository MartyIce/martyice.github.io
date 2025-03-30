---
layout: post
title: Vibe Coding a Guitar Tablature App
tweetText: Vibe Coding a Guitar Tablature App
---

<h3>Vibe Coding!</h3>
The whole world is abuzz with talk of AI, especially within the Software industry. And one specifically hot topic is [Vibe Coding][vibe_coding], where you just allow AI to write all the code. We still need a human for the prompting and overall direction, but no coding skills are required. Any old human will do.

I'm a software developer, and have used LLMs (mainly [ChatGPT][chat_gpt]) to generate code for a while now. However, this has always been focused, with "work purpose". For example, "fix these compilation warnings", or "show me how to sort and filter this collection in a language I barely know". But with all the talk of Vibe Coding, I've wanted to give it a try. I've decided to do so with "fun" projects that might be useful for my hobbies/life. The first is functional enough that I'm ready to share it.

<h3>Guitar Tablature Player</h3>
Catchy name, eh? I wanted the name to SPEAK to people. It plays tabs. For guitar.  

As I typed this, though, I realized that's a pretty lame name. I wish there was some way I could automatically spice things up a bit. An automatic way to crank out something better. Some sort of "make this language better" tool.

Hey, how about an LLM!? Did I just invent Vibe Branding?!  

Let's see what we can come up with! I posted the following prompt to ChatGPT and Gemini (side note, I have been using both lately, impatiently demanding best effort from each, and callously cherry-picking my preference. One LLM glows with pride, the other calculates shame). 

Here's what they produced:

<pre><code class="wrapped-code">my app is currently called "Guitar Tablature Player", and it does exactly what it sounds like. However, I want to give it a more creative name for branding purposes - please give me 10 suggestions</code></pre>

Gemini:
<pre><code class="wrapped-code">Okay, here are 10 creative name suggestions for your "Guitar Tablature Player" app:

ChordCraft: This name combines "chord" and "craft," suggesting skillful creation and playing of music.
FretFlow: This evokes the smooth movement along the fretboard and the natural flow of music.
StringSync: This name implies the synchronization of guitar strings and the rhythmic aspect of playing.
AcoustiCode: This blends "acoustic" (referencing the acoustic guitar type shown in your app) with "code," highlighting the digital nature of the tablature.
TabVerse: A playful combination of "tablature" and "universe," suggesting a wide and immersive collection of tabs.
NoteWeave: This name suggests the intricate way notes and melodies are woven together in music.
PlectrumPlay: "Plectrum" is another word for a guitar pick, making this name directly related to playing the instrument.
HarmonicHub: This positions your app as a central place for guitar harmonies and tablature.
SixStringScribe: This name directly references the six strings of a guitar and the act of writing or displaying musical notation (tablature).
TempoTune: This combines the concepts of tempo (the speed of music) and tuning, both important aspects of playing.</code></pre>

Open AI:
<pre><code class="wrapped-code">Sure! Here are 10 creative name ideas that capture the essence of your app while giving it a more distinctive and brandable identity:

FretFlow – Emphasizes smooth guitar practice and fretboard visuals.

TabTempo – Highlights both tablature and tempo control.

ChordCanvas – Evokes creativity and visual learning through chords and tabs.

Strumline – A play on "drumline," but for guitarists.

NoteNeck – Connects musical notes with the guitar neck.

PlayFret – Simple, playful, and easy to remember.

ToneTab – Combines tone control with tab reading.

Guitario – A catchy, musical-sounding brand name.

Loop & Fret – Evokes the looping and practice aspect of your app.

Melofret – A hybrid of "melody" and "fretboard."</code></pre>

Argh, so many great options! How is a meatspace brain to choose? I'm going to allow the AI to help with the decision:

<pre><code class="wrapped-code">Pick the best name for an app that displays and plays guitar tablature, or come up with a better name inspired by this list. It should be memorable, vibrant, perhaps humorous. Bonus points for something with Alliteration (eg, PayPal) - that might make it stick better. 
ChordCraft: This name combines "chord" and "craft," suggesting skillful creation and playing of music.
FretFlow: This evokes the smooth movement along the fretboard and the natural flow of music.
*snip*</code></pre>

Open AI:
<pre><code class="wrapped-code">🏆 Top Pick: Fret Fiesta
Why it works:

Alliteration ✅

Playful and memorable ✅

"Fret" ties directly to guitar playing

"Fiesta" evokes fun, rhythm, and liveliness — exactly what you want in a music practice tool

🔥 Honorable Mentions (Refined/New Suggestions):
TabTide – A smooth, rhythmic wave of tabs. Chill and flowing.

ChordCaddy – Like a trusty sidekick for your chord practice.

FretForge – For players who want to craft their skills.

StrumSavvy – Cool, catchy, and musically smart.</code></pre>

Gemini:
<pre><code class="wrapped-code">StringSlinger: This name is memorable, vibrant, and has alliteration. "String" clearly relates to the guitar, and "Slinger" evokes a sense of playful, skillful playing. It's catchy and has a good rhythm.

Best Name from Your List:
Strumline: This is a clever and humorous play on "drumline," immediately resonating with guitar players who understand the action of strumming. It's memorable and has a unique feel.

Other Strong Contenders:
TabTastic: This name is bright, positive, and clearly indicates the app's function.
FretFlow: This name is elegant and descriptive, suggesting a smooth and natural experience.
ChordCanvas: This evokes a sense of creativity and visual learning.
TabVerse: This name is playful and suggests a vast collection of tablature.</code></pre>

I think String Slinger is good enough! That's what I'll use.

<h3>String Slinger</h3>
Without further ado, I'd like to introduce [String Slinger][string_slinger] to the world! I will continue to build and hone the app, but for now, here's what it offers:

* Displays "sheet music" (built with a proprietary, simple JSON format)
* That same sheet music is displayed in tablature format, showing how to play it on guitar
* Several built-in songs (mainly classical guitar), with more to come
* Play, pause, stop. Loop. Control tempo
* Rudimentary metronome
* Different guitar sounds

What I'd like to do in future:

* Improved looping, playback, etc. It's not perfect, but that last 5% of usability can be a bear getting the AI to do the "right thing"
* More songs! I'm currently manually transcoding these from sheet music into the JSON format. I've made attempts providing the AI with screenshots of sheet music, but it doesn't do so well. Will continue to refine and think about this
* Mobile friendly - for those times around the campfire. Intelligent use of small amount of space will take some trial and error, but this would be cool to get right
* Styling - it's pretty rudimentary styling currently. Would be nice to make it pretty. I've had a few failed attempts at this with AI - it starts moving divs around, and before I know it, nothing works. Need to break it into smaller asks
* Audio detector? I've done a little bit of research, and there are libraries out there like [Pitchy][pitchy] that advertise this ability. Would be really cool to play something, and have it automatically encoded into sheet/tab
* Different tunings, moving the songs around on fretboard, chords + melody, song categorization, song upload/download/share, etc

Anything I'm missing?  I'd love to hear feature requests if anyone has any!

<h3>Toolset</h3>

My tool of choice lately has been [Cursor][cursor]. Its agentic workflow is pretty amazing, especially with [Claude-3 Sonnet][claude] under the hood. I consider my prompting to be rudimentary - I haven't done any deep study on expert prompting. I generally try to use clarity, and specify desired architecture, frameworks, and patterns where appropriate. Screenshots have been very beneficial for describing UI elements, and I've only recently begun using [MCP Playwright][mcp_playwright] to give the AI access to my browser. Results have been mixed, but I have no doubt this approach will become more effective than screenshots before long.

[mcp_playwright]: https://github.com/executeautomation/mcp-playwright
[string_slinger]: https://martyice.github.io/tabs/index.html
[cursor]: https://www.cursor.com/
[vibe_coding]: https://en.wikipedia.org/wiki/Vibe_coding
[chat_gpt]: https://chat.openai.com
[claude]: https://www.anthropic.com/claude
[gemini]: https://gemini.google.com/
[pitchy]: https://github.com/vadymmarkov/Pitchy