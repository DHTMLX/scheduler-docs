---
sidebar_label: wai_aria_application_role
title: "wai_aria_application_role config"
description: "defines whether role='application' will be used for the main scheduler container and minicalendar elements"
---

# wai_aria_application_role

### Description

@short: Defines whether role="application" will be used for the main scheduler container and minicalendar elements

@signature: wai_aria_application_role: boolean

### Example

~~~jsx
scheduler.config.wai_aria_application_role = true;
...
scheduler.init("scheduler_here");
~~~

**Default value:** true

### Details

added in version 5.0

Defines how screen readers interact with the scheduler.

### Related Guides
- [Accessibility](guides/accessibility.md)
