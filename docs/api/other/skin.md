---
sidebar_label: skin
title: "skin config"
description: "returns the current skin of the scheduler"
---

# skin

### Description

@short: Returns the current skin of the scheduler

@signature: skin: string

### Example

~~~jsx
const currentSkin = scheduler.skin;// -> 'glossy' or 'classic'
~~~

### Details

The method returns the current skin of the scheduler, if you're using the skin different from the default one (*'terrace'*). For the default skin the method returns 'undefined'.
