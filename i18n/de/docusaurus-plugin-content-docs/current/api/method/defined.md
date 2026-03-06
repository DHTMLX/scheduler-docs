---
sidebar_label: "defined"
title: "defined method"
description: "gibt false zurück, wenn das Argument undefined ist; andernfalls true"
---

# defined

### Description

@short: Gibt false zurück, wenn das Argument undefined ist; andernfalls true

@signature: defined: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - das zu überprüfende Objekt

### Returns
- ` state` - (boolean) - false, wenn das Argument undefined ist, andernfalls true

### Example

~~~jsx
// überprüft, ob die Eigenschaft "custom_property" für das event-Objekt defined ist
if(scheduler.defined(event.custom_property)){
  // ..
};
~~~

### Change log
- hinzugefügt in Version 6.0
