---
sidebar_label: section_delimiter
title: "section_delimiter config"
description: "specifies the delimeter that will be used to separate several sections/units in the related data property of the event"
---

# section_delimiter

### Description

@short: Specifies the delimeter that will be used to separate several sections/units in the related data property of the event

@signature: section_delimiter: string

### Example

~~~jsx
scheduler.config.section_delimiter = ";";
~~~

**Default value:** ","

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- [Units View](views/units.md#assigning-events-to-several-units)
- [Timeline View](views/timeline.md#assignment-of-events-to-several-sections)
