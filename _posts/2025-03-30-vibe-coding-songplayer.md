---
layout: post
title: Vibe Coding a Song Player
tweetText: Vibe Coding a Song Player
---

<h3>Vibe Coding!</h3>
The whole world is abuzz with talk of AI, especially within the Softare industry.  And one specifically hot topic here involves Vibe Coding, where we just let AI write all the code.  We still need a human for the prompting and direction, but any old human will do.

I've used LLM prompting to generate code for a while now, but it had always been focused, with "work purpose".  However, all the Vibe Coding talk is giving me FOMO vibes, so I've taken the plunge on a few "fun" projects.  The first is functional enough that I'm ready to share it.

<h3>Toolset<h3>
My tool of choice lately has been Cursor.io.  It's agentic workflow is pretty amazing, especially when you have horsepower like claude-3.7-sonnet under the hood.  I don't have any deep and intricate secrets on prompting, but I generally try to use clarity, and specify desired architecture, frameworks, and patterns where appropriate.  Screenshots have been very beneficial with describing UI things, and I've only recently started using [mcp_playwrite][MCP Playwrite] to give the AI access to my browser.  Results have been mixed, but I have no doubt this is going to be more effective than screenshots in before long.

<h3>Guitar Tablature Player</h3>
Catchy name, eh?  I wanted the name to SPEAK to people.  It plays tabs.  For guitar.  As I typed this, however, I realized that's a pretty lame name.  I wish there was some way I could automatically spice that up a bit.

How about LLMs!?  Did I just invent Vibe Branding?!  Let's see what we can come up with - I posted the following prompt to ChatGPT and Gemini (side note, I have been using both lately, impatiently demanding best effort from each, and callously cherry-picking my preference.  One LLM glows with pride, the other calculates shame):

```
my app is currently called "Guitar Tablature Player", and it does exactly what it sounds like . However, I want to give it a more creative name for branding purposes - please give me 10 suggestions
```

Gemini:
```
Okay, here are 10 creative name suggestions for your "Guitar Tablature Player" app:

ChordCraft: This name combines "chord" and "craft," suggesting skillful creation and playing of music.
FretFlow: This evokes the smooth movement along the fretboard and the natural flow of music.
StringSync: This name implies the synchronization of guitar strings and the rhythmic aspect of playing.
AcoustiCode: This blends "acoustic" (referencing the acoustic guitar type shown in your app) with "code," highlighting the digital nature of the tablature.
TabVerse: A playful combination of "tablature" and "universe," suggesting a wide and immersive collection of tabs.
NoteWeave: This name suggests the intricate way notes and melodies are woven together in music.
PlectrumPlay: "Plectrum" is another word for a guitar pick, making this name directly related to playing the instrument.
HarmonicHub: This positions your app as a central place for guitar harmonies and tablature.
SixStringScribe: This name directly references the six strings of a guitar and the act of writing or displaying musical notation (tablature).
TempoTune: This combines the concepts of tempo (the speed of music) and tuning, both important aspects of playing.
```

Open AI:
```
Sure! Here are 10 creative name ideas that capture the essence of your app while giving it a more distinctive and brandable identity:

FretFlow – Emphasizes smooth guitar practice and fretboard visuals.

TabTempo – Highlights both tablature and tempo control.

ChordCanvas – Evokes creativity and visual learning through chords and tabs.

Strumline – A play on "drumline," but for guitarists.

NoteNeck – Connects musical notes with the guitar neck.

PlayFret – Simple, playful, and easy to remember.

ToneTab – Combines tone control with tab reading.

Guitario – A catchy, musical-sounding brand name.

Loop & Fret – Evokes the looping and practice aspect of your app.

Melofret – A hybrid of "melody" and "fretboard."
```

Argh, too many options!  What's a meatspace brain to do?  I'm going to allow the AI to pick:

```
Pick the best name for an app that displays and plays guitar tablature, or come up with a better name inspired by this list.  It should be memorable, vibrant, perhaps humorous.  Bonus points for something with Alliteration (eg, PayPal) - that might make it stick better. 
ChordCraft: This name combines "chord" and "craft," suggesting skillful creation and playing of music.
FretFlow: This evokes the smooth movement along the fretboard and the natural flow of music.
*snip*
```

Open AI:
```
🏆 Top Pick: Fret Fiesta
Why it works:

Alliteration ✅

Playful and memorable ✅

"Fret" ties directly to guitar playing

"Fiesta" evokes fun, rhythm, and liveliness — exactly what you want in a music practice tool

🔥 Honorable Mentions (Refined/New Suggestions):
TabTide – A smooth, rhythmic wave of tabs. Chill and flowing.

ChordCaddy – Like a trusty sidekick for your chord practice.

FretForge – For players who want to craft their skills.

StrumSavvy – Cool, catchy, and musically smart.

PickPulse – Evokes both the physical pick and the rhythm (pulse) of playing.

RiffRise – Suggests leveling up with riffs and skill.

GrooveGrid – Combines rhythm ("groove") with visual structure ("grid" like a fretboard).

PluckPad – Fun, compact, and directly connected to playing guitar.

StringSaga – Suggests a journey through music with six strings.

Twist the Fret – Quirky, unique, and very memorable.

```

Gemini:
```
Here are a few options, with StringSlinger being my top pick for a new name and Strumline as the best from your list:

Best New Name (with Alliteration):

StringSlinger: This name is memorable, vibrant, and has alliteration. "String" clearly relates to the guitar, and "Slinger" evokes a sense of playful, skillful playing. It's catchy and has a good rhythm.
Best Name from Your List (with Humor):

Strumline: This is a clever and humorous play on "drumline," immediately resonating with guitar players who understand the action of strumming. It's memorable and has a unique feel.
Other Strong Contenders from Your List:

TabTastic: This name is bright, positive, and clearly indicates the app's function with the word "Tab." The "-tastic" suffix adds a vibrant feel and alliteration.
FretFlow: This name is elegant and descriptive, suggesting a smooth and natural experience with the app.
ChordCanvas: This evokes a sense of creativity and visual learning, which could be appealing to guitarists.
TabVerse: This name is playful and suggests a vast collection of tablature.
Ultimately, the "best" name depends on the specific brand identity you want to create. However, StringSlinger offers a great combination of memorability, vibrancy, and alliteration, while Strumline stands out for its humor and cleverness.
```

I think String Slinger is good - that's what I'll use!  Time to jump to another Cursor instance and "rebrand".

[mcp_playwrite]: https://github.com/executeautomation/mcp-playwright
[string_slinger]: https://martyice.github.io/tabs/index.html