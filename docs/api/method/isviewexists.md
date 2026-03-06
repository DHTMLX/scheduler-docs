---
sidebar_label: isViewExists
title: "isViewExists method"
description: "checks whether a view with the specified name exists"
---

# isViewExists

### Description

@short: Checks whether a view with the specified name exists

@signature: isViewExists: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - the view name

### Returns
- ` isExist` - (boolean) - <i>true</i>, if the view exists. Otherwise, <i>false</i>

### Example

~~~jsx
scheduler.init('scheduler_here');
scheduler.load("data/events.xml");

scheduler.isViewExists("month"); //->true  /*!*/
~~~
