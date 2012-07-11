---
layout: post
title: Python Globals, Locals, and Hippos
author: Joshua Ma
---
{{ page.title }}
===

I found a cute little quirk with Python the other day, so I thought I'd document it here. (A quick search of [Stack Overflow](http://stackoverflow.com/search?q=python+local+variable+referenced+before+assignment) suggests quite a few people making the same mistake.)

Check out the below snippet:
{% highlight python linenos %}
global_var = 2

def funcA():
  print global_var

funcA() # No issues here!

def funcB():
  global_var = 3
  print global_var

funcB() # No issues here!

def funcC():
  print global_var
  global_var = 3
  print global_var

funcC() # Uh oh, UnboundLocalError: local
        # variable 'global_var' referenced
        # before assignment
{% endhighlight %}

What happened here? We had one working function, `funcA()`, and a second one, `funcB()`. We put them together into `funcC()`, and all hell broke loose.

The explanation is actually pretty simple, albeit bizzare - python will first parse the program (without running anything), determining scope and catching syntax errors. When it sees the assignment of `global_var = 3` in line 16, it registers that there is a *local* variable, `funcC().global_var`, inside `funcC()`. Strangely enough, this relegates *all* references to `global_var` (within the method) to the local copy, even the reference *before* it at line 15.

When it's running the second time through, at line 15 python sees an attempt to print `global_var`. As far as it's concerned, `global_var` is a local variable. The catch here, though, is that the local variable hasn't been initialized! And thus, we end up with `UnboundLocalError: local variable 'global_var' referenced before assignment.`

If you still want to both reference and assign to `global_var`, use the `global` keyword:

{% highlight python linenos %}
global_var = 2
def happy():
    global global_var
    print global_var
    global_var = 3
    print global_var

happy() # 2
        # 3
{% endhighlight %}

And what does this all have to do with hippos? Nothing, but here's a fun fact: did you know hippos can hold their breath for up to 5 minutes? (And yet they can't swim!)
