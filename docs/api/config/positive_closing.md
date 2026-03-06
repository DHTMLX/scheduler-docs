---
sidebar_label: positive_closing
title: "positive_closing config"
description: "defines the 'saving' behaviour for the case, when the user edits the event's text directly in the event's box"
---

# positive_closing

### Description

@short: Defines the 'saving' behaviour for the case, when the user edits the event's text directly in the event's box

@signature: positive_closing: boolean

### Example

~~~jsx
scheduler.config.positive_closing = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** false

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

A click on the edit button in the select bar opens a form for editing the event's text. 
Any outside click closes the form and cancels the changes. To prevent this and save any changes made in the form, set the option to *true*.

![positiveClosing_property](/img/positiveClosing_property.png)
