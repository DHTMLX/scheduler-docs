---
sidebar_label: onBeforeSectionRender
title: "onBeforeSectionRender event"
description: "fires before a single Timeline section was configured, but not rendered yet (the Timeline view only)"
---

# onBeforeSectionRender

:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Fires before a single Timeline section was configured, but not rendered yet (the Timeline view only)

@signature: onBeforeSectionRender: (mode: string, section: object, timeline: object) =\> object

### Parameters

- `mode` - (required) *string* - the timeline mode: 'cell', 'bar' or 'tree'
- `section` - (required) *object* - the section object with the 'key' and 'label' properties specified in the 'y_unit' array of the Timeline configuration object (e.g. \{key:1, label:"James Smith"\})
- `timeline` - (required) *object* - the Timeline configuration object

### Returns
- ` result` - (object) - the section object

### Example

~~~jsx
scheduler.attachEvent("onBeforeSectionRender", function(mode, section, timeline){
    //any custom logic here
    return section;
});
~~~

### Details

The event can be used to customize the timeline sections.
