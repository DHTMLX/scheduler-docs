---
sidebar_label: deleteMarkedTimespan
title: "deleteMarkedTimespan method"
description: "removes marking/blocking set by the addMarkedTimespan() method"
---

# deleteMarkedTimespan

### Description

@short: Removes marking/blocking set by the addMarkedTimespan() method

@signature: deleteMarkedTimespan: (config?: any) =\> void

### Parameters

- `config` - (optional) *string | object* -  the timespan's id or the timespan's configuration properties

### Example

~~~jsx
const spanID = scheduler.addMarkedTimespan({  
    days:  [0,1], 
    zones: "fullday"              
});
scheduler.deleteMarkedTimespan(spanID);
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note

Available from version 3.5.
 
:::

:::note
 The method requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::

The method has 3 overloads:

1. **deleteMarkedTimespan()** - takes no parameters and removes all blocking/marking.
2. **deleteMarkedTimespan(id)** - takes the timespan's id.
3. **deleteMarkedTimespan(config)** - takes certain configuration properties.
  
  
~~~js
var spanID = scheduler.addMarkedTimespan({  
    days:  [3,4,5], 
    zones: [100,400]          
});

// removes marking from each Sunday
scheduler.deleteMarkedTimespan({ 
    days:  0,
});

//removes marking for the time period from 250 till 350 minute of each Friday
//each Friday now will have 2 marking blocks: 100-250, 350-400
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350]
});

// removes marking for the item with id=3 in the Units view
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350],
    sections:{ unit:3 }        
});

~~~

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
