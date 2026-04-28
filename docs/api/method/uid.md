---
sidebar_label: uid
title: "uid method"
description: "generates a unique ID (unique inside the current scheduler, not GUID)"
---

# uid

### Description

@short: Generates a unique ID (unique inside the current scheduler, not GUID)

@signature: uid: () =\> number

### Returns
- ` uid` - (number) - generated ID

### Example

~~~jsx
const new_id = scheduler.uid();
~~~
