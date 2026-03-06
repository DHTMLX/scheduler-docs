---
sidebar_label: delay_render
title: "delay_render config"
description: "sets a timeout (in milliseconds) that wraps the updateView and setCurrentView calls (that cause re-drawing of the scheduler)"
---

# delay_render

### Description

@short: Sets a timeout (in milliseconds) that wraps the [updateView](api/method/updateview.md) and [setCurrentView](api/method/setcurrentview.md) calls (that cause re-drawing of the scheduler)

@signature: delay_render: number

### Example

~~~jsx
scheduler.config.delay_render = 30;

scheduler.init("scheduler_here");
~~~

### Details

:::note

This option may help you to increase the performance.
 
:::

:::note

To be sure that some command will be called only after actual re-drawing happen, call it in the callback function of the [onViewChange](api/event/onviewchange.md) event.
 
:::

The default value is 0.

Many scheduler's configurations require re-drawing. And, in case you have a complex configuration, you may end up with separate functions, each of those specifies some configuration and refreshes the scheduler in order to apply it. A large number of re-drawings will affect the performance of your app.

Use the **delay_render** option, to minimaze the number of re-drawings. 

<br>

For example, if you set <code>scheduler.config.delay_render = 30;</code>, any time the code invokes re-drawing, the scheduler will put the call into a queue and wait for 30 milliseconds.
If another 're-draw' call will be got during this time, the scheduler will reset the timeout and wait for another 30 ms. 
As a result, if the [updateView](api/method/updateview.md) or/and [setCurrentView](api/method/setcurrentview.md) method is/are called multiple times within a short amount of time 
(which usually happens when re-drawing is triggered from different places of the custom code), only the last call will be executed.
