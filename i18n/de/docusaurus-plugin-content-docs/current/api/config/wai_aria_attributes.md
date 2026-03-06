---
sidebar_label: "wai_aria_attributes"
title: "wai_aria_attributes config"
description: "aktiviert WAI-ARIA-Unterstützung, sodass die Komponente von Screenreadern erkannt werden kann"
---

# wai_aria_attributes

### Description

@short: Aktiviert WAI-ARIA-Unterstützung, sodass die Komponente von Screenreadern erkannt werden kann

@signature: wai_aria_attributes: boolean

### Example

~~~jsx
scheduler.config.wai_aria_attributes = true;
...
scheduler.init("scheduler_here");
~~~

**Default value:** true

### Details

eingeführt in Version 4.4

### Related Guides
- [Barrierefreiheit](guides/accessibility.md#wai-aria-attributes)
