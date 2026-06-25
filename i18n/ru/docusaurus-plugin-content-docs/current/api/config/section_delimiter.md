---
sidebar_label: section_delimiter
title: "section_delimiter конфигурация"
description: "указывается разделитель, который будет использоваться для разделения нескольких секций/единиц во связанном свойстве данных события"
---

# section_delimiter

### Description

@short: Указывает разделитель, который будет использоваться для разделения нескольких секций/единиц во связанном свойстве данных события

@signature: section_delimiter: string

### Example

~~~jsx
scheduler.config.section_delimiter = ";";
~~~

**Значение по умолчанию:** ","

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- [Units View](views/units.md#assigning-events-to-several-units)
- [Timeline View](views/timeline.md#assignment-of-events-to-several-sections)