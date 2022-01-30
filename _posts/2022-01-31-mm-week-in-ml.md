---
layout: post
title: My Week in ML, 1/31/2022
tweetText: My Week in ML, 1/31/2022 - Wading through Neural Nets
---

<h3>Neural Nets!</h3>
As planned, I spent most of this week working a few Kaggle competitions involving Neural Nets.  This mainly consisted of:

1) Finding appropriate competitions (Image Recognition this week).  This week featured the [Digit Recognizer] and [Dogs vs Cats] challenges.

2) Finding a few examples to get started on each.  This felt a little like cheating, but seeing actual examples helped me work through the "environmental challenges", including loading/saving datasets, image manipulation, graphing results, etc.  **This is not a test - it's homework**.  By bootstrapping from examples, I'm able to see a variety of techniques that work, and up my game much faster.  Some useful ones I leaned on included:
* [How to Choose CNN Architecture] - this was a fantastic example notebook.  The author walked through the various decision points of building out a [Convolutional Neural Network] (CNN), things like how many layers to use, how many neurons in each layer, etc.  This was incredibly valuable for learning how to approach one of these problems, and gradually work your way towards the ideal solution.
* [Cats vs Dogs] - the data loading threw me for a curveball with this competition.  For the digit recognizer, it was all CSV, but for Cats vs Dogs, they were actual color JPGs.  Seems simple enough, but seeing example code for how to load this appropriately into DataFrames was super valuable.
* Many others - anytime I bumped up against a weird runtime error, I found the answer via StackOverflow, Google, etc.  I've adopted the practice of adding a comment with the SO/Google/etc link next to the code that had the problem.  I've also been using "markdown" blocks within Kaggle to better document my work (taking inspiration from other examples I've seen out there).

3) Reading posts to provide contextual knowledge.  Sometimes they covered general CNN things, sometimes specific terms/words/tools I was curious about.  Some notable ones:
* Digging into ideal Batch Size: [How big should batch size be] and [Why Should Batch Size Be a Power of 2?]
* Reusing existing models for new challenges: [Building Powerful Image Classification Models Using Very Little Data]

Here are the notebooks I produced this week.  Fairly disorganized and certainly not going to win any competitions, but I'm sharing to motivate myself to do better as time goes on.

* [My Digit Recognizer]
* [My Dog vs Cat Recognizer]

<h3>Upcoming Week</h3>
In this upcoming week, I'd like to wrap up the work on the Dogs vs Cats challenge, and then pivot to one or two Regression Challenges (ie, coming up with a number, rather than a category).

[Digit Recognizer]: https://www.kaggle.com/c/digit-recognizer
[Dogs vs Cats]: https://www.kaggle.com/c/dogs-vs-cats-redux-kernels-edition
[How to Choose CNN Architecture]: https://www.kaggle.com/cdeotte/how-to-choose-cnn-architecture-mnist
[Convolutional Neural Network]: https://www.nvidia.com/en-us/glossary/data-science/convolutional-neural-network/
[How big should batch size be]: https://stackoverflow.com/questions/35050753/how-big-should-batch-size-and-number-of-epochs-be-when-fitting-a-model-in-keras#:~:text=I%20got%20best%20results%20with,b%2Fw%2050%20to%20100.
[Why Should Batch Size Be a Power of 2?]: https://stackoverflow.com/questions/44483233/is-using-batch-size-as-powers-of-2-faster-on-tensorflow
[Building Powerful Image Classification Models Using Very Little Data]: https://blog.keras.io/building-powerful-image-classification-models-using-very-little-data.html
[Cats vs Dogs]: https://www.kaggle.com/romazlobin/cats-vs-dogs
[My Digit Recognizer]: https://www.kaggle.com/martymavis/notebookad653aabb6
[My Dog vs Cat Recognizer]: https://www.kaggle.com/martymavis/notebooke8b19cc7fc