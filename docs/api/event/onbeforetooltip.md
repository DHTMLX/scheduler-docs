---
sidebar_label: onBeforeTooltip
title: "onBeforeTooltip event"
description: "fires before the tooltip is displayed for a data item (only with the 'tooltip' extension enabled)"
---

# onBeforeTooltip

### Description

@short: Fires before the tooltip is displayed for a data item (only with the 'tooltip' extension enabled)

@signature: onBeforeTooltip: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - the id of a data item that the tooltip will be shown for

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeTooltip", function (id){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Return *false* and the tooltip won't be shown.
