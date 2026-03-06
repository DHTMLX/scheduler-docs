---
sidebar_label: "isViewExists"
title: "isViewExists method"
description: "überprüft, ob eine View mit dem angegebenen Namen vorhanden ist"
---

# isViewExists

### Description

@short: Überprüft, ob eine View mit dem angegebenen Namen vorhanden ist

@signature: isViewExists: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - der Name der View

### Returns
- ` isExist` - (boolean) - <i>true</i>, wenn die View gefunden wurde; andernfalls <i>false</i>

### Example

~~~jsx
scheduler.init('scheduler_here');
scheduler.load("data/events.xml");

scheduler.isViewExists("month"); //->true  /*!*/
~~~
