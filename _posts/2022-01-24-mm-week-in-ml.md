---
layout: post
title: My Week in ML, 1/22/2022
tweetText: My Week in ML, 1/22/2022 - back to basics.
---

<h3>Stuck in the Mud</h3>
[Oops, I did it again][oops]{:target="_blank"}.  A project eagerly started, big plans, big dreams.  This time it was Machine Learning, and I was motivated.  Cool subject matter, cutting edge, and I had [the book]{:target="_blank"} that was going to get me there.  Look out world, here I come!

Fizzle.

At least this time, I sort of stuck to the plan.  I attempted to carve out time each week for reading, and slowly worked through the chapters.  However, deep into the Neural Networks portion of the book (Chapter 14, covering Convolutional Neural Networks, or "CNN"s), I realized I wasn't really following along.  Acronyms and concepts were flying past my brain, and I was no longer digesting the subject matter.  I hadn't built a strong foundation in the earlier chapters, and was quickly losing interest.  I was out [over my skis]{:target="_blank"}.

As a result, my attention wandered to other tech books.  [Building Microservices]{:target="_blank"} and [Domain Driven Design]{:target="_blank"}.  Important books, and chock full of information, valuable to an ambitious computer programmer.  But no machine learning in sight.  As my ML book gathered dust, my dreams of being a ML engineer began to fade.

No!  I can learn this!  I WILL learn this!

<h3>The Reboot</h3>
So here's my plan:

* Go back to the beginning of the NN chapters, and begin again.  Read slowly, understand the terms (eg, [ReLU]{:target="_blank"}), and REMEMBER THEM.
* Augment the book with information, videos, tutorials, and exercises from other places.  Cross pollinate and explore the space.  In addition to reinforcing the current subject matter, this will provide more familiarity with the overall "ML landscape".
* CODE.  Don't just read this stuff, apply it and use it!  This may have been the biggest shortcoming of the previous attempt.  Reading code isn't enough, even if I understand it.  I have to type it out myself, apply it to new problems, and overcome roadblocks and difficulties along the way.
* Slow and steady.  Allocate at least 30 minutes a day (and stick to it!).  Don't get in a hurry about finishing.  I want to enjoy this journey, without thinking too much about the destination.  Be a [turtle, not a hare]{:target="_blank"}. 
* Document and track my journey.  Keep a [schedule]{:target="_blank"}, and track what I do each day.  Maintain a [list of URLs]{:target="_blank"} with promising learning opportunities and things I learn/do.  Blog all the above, to work my writing muscle and keep me honest.

With this plan in hand, here's what I did last week:

<h3>My Week in Machine Learning - 1/17/2022</h3>
* **The Big Reboot** - This week brought the big reboot, and all the ambitious thinking and plans you just read about.  That in itself is a part of my ML goal, so it's being included in this week's recap.
* **ML Book** - I re-read Chapter 10, "Introduction to Artificial Neural Networks with Keras".  It really was more enjoyable the second time around - I understood everything better.  The topics that seemed "new" were a clear indication of where I failed to understand the first time through.  And there were topics where I failed to grasp their fundamental importance the first time around.  Now, I can give them the attention they deserve (Activation functions and Loss!).  In addition to reading the chapter, I also worked the [exercises in colab]{:target="_blank"}.  Being able to see, tweak, and execute the example code in the book is invaluable.
* **Library familiarity** - struggles with the lower level libraries [numpy]{:target="_blank"} and [pandas]{:target="_blank"} were a sticking point the first time around.  While array/dataframe manipulation are straightforward enough, I struggled with it in actual code.  Usually had to try a variety of combinations in order to find the right way to format/manipulate the data.  I made a small vow this time to become an expert in these libraries up front.  However, this didn't go as planned - the "getting started" tutorials were too boring.  In the limited time I spent working on them, I quickly went from "I'm going to be an expert with this library" to "I wonder what else is out there I could be doing right now".  I'd rather learn these libraries through application, instead of focusing on the libraries themselves.  So that's what I'm doing.
* **Detours to Solidify Understanding** - one of the great superpowers of learning online is popping new tabs in your browser, and taking a quick detour to gain a deeper understanding of a concept.  I'm using this superpower to augment my understanding of concepts in the book (Activation functions and Loss!).  It's mind blowing how much ML information is out there.  A whole army of smart people getting smarter, making machines smarter, and improving their resumes by writing about it.  You can go deep with the math on these topics, but you don't *need* to.  Most of the hard things are wrapped in friendly libraries awaiting your discovery.  Pop a tab and go learn about them.
* **Dans Becker** - I stumbled on [this guys]{:target="_blank"} Kaggle materials, and really appreciated both the informative videos, and the simple exercises that followed.  I just happened to start with [Tensorflow Programming][dansbecker]{:target="_blank"}, and was led through a simple course of Transfer Learning and building simple Neural Nets.  It was information I had already learned from the book, but presented slightly differently, with new things to learn.  I think Dans is going to be a valuable guide for my journey.  The book provides deeper fundamentals, but videos and simple exercises are going to be invaluable for reinforcement.

<h3>Upcoming Week</h3>
I will spend the upcoming week with sleeves rolled up, writing code.  Building some neural nets to learn well known datasets (eg, [MNIST]{:target="_blank"}, etc).  I will also poke around the "tool ecosystem" to augment my abilities (eg, [TensorBoard]{:target="_blank"}, [TPUs in Kaggle]{:target="_blank"}, etc)

[oops]: https://youtu.be/CduA0TULnow
[the book]: https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1492032646
[over my skis]: https://idioms.thefreedictionary.com/over+my+skis
[Building Microservices]: https://www.amazon.com/Building-Microservices-Designing-Fine-Grained-Systems/dp/1492034029
[Domain Driven Design]: https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215
[ReLU]: https://deepai.org/machine-learning-glossary-and-terms/relu
[turtle, not a hare]: https://storiesfirst.org/greatstoryreadingproject/docs/the-turtle-and-the-hare
[schedule]: https://docs.google.com/spreadsheets/d/1C5jOcdsnrOXdLigaAJ0KLL3pGuNN5lHtjXEi68w5muM/edit?usp=sharing
[list of URLs]: https://docs.google.com/document/d/1kEwof3gilddx0vTPgvYCtAmYRfUFx9End2R82KNujZU/edit?usp=sharing
[exercises in colab]: https://colab.research.google.com/github/ageron/handson-ml2/blob/master/10_neural_nets_with_keras.ipynb
[numpy]: https://numpy.org/
[pandas]: https://pandas.pydata.org/
[this guys]: https://www.kaggle.com/dansbecker
[dansbecker]: https://www.kaggle.com/dansbecker/tensorflow-programming
[MNIST]: https://deepai.org/dataset/mnist
[TensorBoard]: https://www.tensorflow.org/tensorboard/
[TPUs in Kaggle]: https://colab.research.google.com/github/ageron/handson-ml2/blob/master/10_neural_nets_with_keras.ipynb#scrollTo=gRN4T-Ta5wLK