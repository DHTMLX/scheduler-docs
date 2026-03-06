---
sidebar_label: onOptionsLoadFinal
title: "onOptionsLoadFinal event"
description: "fires after loading of an options(sections) collection is complete (the Timeline view only)"
---

# onOptionsLoadFinal

### Description

@short: Fires after loading of an options(sections) collection is complete (the Timeline view only)

@signature: onOptionsLoadFinal: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadFinal", function (){
    //any custom logic here
});
~~~

### Details

The event fires only when a collection is loaded with the help of dhtxmlConnector or through the [updateCollection](api/method/updatecollection.md) method.
