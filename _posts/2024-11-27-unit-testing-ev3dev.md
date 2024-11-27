---
layout: post
title: Unit Testing Python Ev3dev
tweetText: Robotics
---

<h3>Python Ev3dev</h3>
I'm learning about robotics with my hard-working son [(his blog)][his_blog]{:target="_blank"}, and we're starting the journey learning [Ev3dev][ev3dev].  Ev3dev is "a Debian Linux-based operating system that runs on several LEGO® MINDSTORMS compatible platforms including the LEGO® MINDSTORMS EV3 and Raspberry Pi-powered BrickPi."  Basically, you flash the OS on a microSD card, stick it in the Mindstorms EV3 brick, and it becomes the OS on the brick.  With that, you can do all sorts of linux things - for now, we are using it so we can utilize Python to control the robots (via [Python ev3dev][python_ev3dev])

<h3>Unit Tests</h3>

<h4>Overview</h4>

For the past couple of days, our AA batteries have been dead, and we are waiting for a charger to arrive from Amazon.  In the meantime, I figured it would be a good opportunity to teach and learn about unit testing our Python scripts.  I know enough to be dangerous with Python, but don't work with it daily, and am not super familiar with how unit testing is done there.

<h4>Enter ChatGPT</h4>

Like all my coding challenges these days, I started with ChatGPT - "how can I unit test this python script?"  There are a couple pieces of information I need:

* What does a typical Python unit test script/environment look like?  What libraries are used?
* How do I mock the pybricks libraries?

For the first question, Python has a built in [unittest][unittest] library.  It seems pretty typical - test fixtures, cases, suites, runners, etc.  ChatGPT also mentioned that I might like to use [pyttest][pytest], an external testing framework that has lots of bells and whistles.  Don't want to spend time on that now, but socked it away for future exploration.

As far as mocking, the unittest.mock library features MagicMock.  I didn't read deeply into it, but it seems to be what I need for mocking pybricks.

<h4>Head Banging</h4>

My first challenge was importing my SUT (system under test) module.  My understanding of Python is there are several ways you can arrange your code/modules, with nuances to each.  I'm in quick and dirty mode - don't want to boil the ocean and become the perfect Python programmer, I just want to unit test some simple functionality.  So I pested ChatGPT with the errors I saw, and eventually got the unit test loading *my* module correctly.  Next up, it can't find the pybricks module:

```
"Develop/starterlego/starterlego/colorwheel.py", line 3, in <module>
    from pybricks.hubs import EV3Brick
ModuleNotFoundError: No module named 'pybricks'
```

From there, ChatGPT gave me lots of advice about mocking pybricks.  It mainly seemed hung up on this pattern:

```
# Mock pybricks modules globally
with patch.dict('sys.modules', {
    'pybricks.hubs': MagicMock(),
    'pybricks.ev3devices': MagicMock(),
    'pybricks.parameters': MagicMock(),
    'pybricks.tools': MagicMock(),
}):
    import colorwheel  # Import after mocking
```

We argued about this for a good 15 minutes, because no matter how I tried, I couldn't get that ^ to work correctly.  Finally, I had to go outside of ChatGPT, and eventually found a suggestion on [StackOverflow][stack_overflow]:

```
import sys
sys.modules['B'] = __import__('mock_B')
import A

print(A.B.__name__)
```

With that, I was able to mock pybricks like this:

```
sys.modules['pybricks'] = MagicMock()
sys.modules['pybricks.hubs'] = MagicMock()
sys.modules['pybricks.ev3devices'] = MagicMock()
sys.modules['pybricks.parameters'] = MagicMock()
sys.modules['pybricks.tools'] = MagicMock()
```

And with that, we have working [unit tests][voila]!

[his_blog]: https://markmavis26.github.io/
[ev3dev]: https://www.ev3dev.org/
[python_ev3dev]: https://ev3dev-lang.readthedocs.io/projects/python-ev3dev/en/stable/
[unittest]: https://docs.python.org/3/library/unittest.html#module-unittest
[pytest]: https://docs.pytest.org/en/stable/
[stack_overflow]: https://stackoverflow.com/a/8658332/25175520
[voila]: https://github.com/MarkMavis26/starterlego/blob/a4e73be595cdec29094e7e861b2ad03205d43a11/starterlego/tests/test_colorwheel.py