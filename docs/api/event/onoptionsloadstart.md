---
sidebar_label: onOptionsLoadStart
title: "onOptionsLoadStart event"
description: "fires before a collection of options or sections starts to be loaded from the server (the Timeline view only)"
---

# onOptionsLoadStart

### Description

@short: Fires before a collection of options or sections starts to be loaded from the server (the Timeline view only)

@signature: onOptionsLoadStart: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadStart", function (){
    //any custom logic here
});
~~~

### Details

The event fires only when a collection is loaded with the help of dhtxmlConnector or through the [updateCollection](api/method/updatecollection.md) method.
