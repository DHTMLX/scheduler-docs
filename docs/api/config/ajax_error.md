---
sidebar_label: ajax_error
title: "ajax_error config"
description: "specifies how to display the default error notification in case the XML data loading failed"
---

# ajax_error

### Description

@short: Specifies how to display the default error notification in case the XML data loading failed

@signature: ajax_error: string | boolean

### Example

~~~jsx
// logs error message to console
scheduler.config.ajax_error = "console";

// or
// supresses the default error messages
// scheduler.config.ajax_error = false;

scheduler.init("scheduler_here");
~~~

**Default value:** "alert"

### Details

The default error notification (i.e. when <code>scheduler.config.ajax_error = "alert"</code>) looks like this: 

![ajax_error_property](/img/ajax_error_property.png)
