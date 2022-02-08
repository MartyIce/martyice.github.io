---
layout: post
title: My Week in ML, 2/7/2022
tweetText: My Week in ML, 2/7/2022 - More Neural Nets, Learning by Example
---

<h3>I Feel Like I'm Cheating</h3>
I'd like to start out with some tattling - I didn't work on ML at all this past weekend.  I've had a streak of doing *something* every day for a couple of weeks, but not this weekend.  And I have no excuse - there was lots of sitting around the house taking place.  I'm of two minds on this.  On one hand, "give yourself a break!".  On the other, "that's a slippery slope.  Get off your ass!".  For now, I'm simply going to write my weekly summary today (Monday), and move on.

This past week I went deep into several Regression ML examples.  My intent was to tackle a NN Regression problem "on my own", but found myself reading through and executing examples as part of ramping that up.  And I think I'm OK with this.  I don't want to go fast, skim, and realize I don't know this material...but I also don't want to thrash on a bad/limited idea, while there are so many rich and rewarding examples out there.  My current thinking - reading (and executing AND understanding!) examples are going to be an important part of my learnings.

<h3>Regression Problems</h3>
Here are some of the readings and examples I went through in the past week, in no particular order:

* [Kaggle Regression Problems] - I found this useful summary of all Kaggle Regression problems (it also includes links to other Kaggle problems, including Classification, Sequence, Image, and Miscellaneous).  Nice aggregate of jumping off points to see more examples of given types of problems.
* [Psychology of a Professional Athlete] - cool competition around analyzing the complete history of Kobe Bryant's Shot Selection.  This notebook provided a good example of data investigation and graphing.  Always nice to have data that's interesting OUTSIDE of the ML aspect.
* Why Apply Log Transformations - a couple of articles ([log1] and [log2]) describing how log transformations can help prepare data for ML analysis.  This will correct and normalize skewed data, and typically help you build better models.  Almost feels like magic. 
* [Study on Regression Applied to the Ames Dataset] - an incredibly informative walkthrough of data preprocessing to uncover the most relevant inputs.  This one was great.  It also gave me motivation and opportunity to read more in depth about read about Lasso and Ridge regression.  Concepts that I still don't fully grasp, but the more I read, the more I circle around the truth.
* [Comprehensive Data Exploration With Python] - another walkthrough of data analysis on a housing dataset.  Super useful to see different approaches to the same thing.  I feel like I learn many new things each time I read through a well-written notebook.
* [How to Choose Loss Functions] - thorough article on how different loss functions affect results.  Good examples and visuals, worth a read.
* [Predicting Rainfall] - this one hurt my brain.  Didn't understand all of it, and didn't make it all the way through.  I found value in seeing something beyond my abilities, though.  Data isn't always clean and easy, and sometimes deep context is necessary to make any headway against the data.  I have a long way to go...but that's OK.

<h3>Da Book</h3>
I also started reading Chapter ll: Training Deep Neural Networks of [the book] (again).  I'm taking it slow, and am understanding more this time around.  Slow, steady absorption.

<h3>Upcoming Week</h3>
This week will be mixed between more book ^, and more examples on the web.  My goal is to have completed Chapter 11 and worked through the exercises, as well as picking up more odds and ends out there on the interwebs.

[Kaggle Regression Problems]: https://github.com/ShuaiW/kaggle-regression
[Psychology of a Professional Athlete]: https://www.kaggle.com/selfishgene/psychology-of-a-professional-athlete
[log1]: https://statmodeling.stat.columbia.edu/2019/08/21/you-should-usually-log-transform-your-positive-data/
[log2]: https://medium.com/@kyawsawhtoon/log-transformation-purpose-and-interpretation-9444b4b049c9
[Study on Regression Applied to the Ames Dataset]: https://www.kaggle.com/juliencs/a-study-on-regression-applied-to-the-ames-dataset
[Comprehensive Data Exploration With Python]:  https://www.kaggle.com/pmarcelino/comprehensive-data-exploration-with-python
[How to Choose Loss Functions]: https://machinelearningmastery.com/how-to-choose-loss-functions-when-training-deep-learning-neural-networks/
[Predicting Rainfall]: https://www.kaggle.com/suchith0312/predicting-rainfall/notebook
[the book]: https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1492032646