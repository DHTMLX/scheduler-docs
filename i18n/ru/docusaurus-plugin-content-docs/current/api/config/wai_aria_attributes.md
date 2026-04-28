---
sidebar_label: wai_aria_attributes
title: "конфигурация wai_aria_attributes"
description: "включает поддержку WAI-ARIA, чтобы компонент распознавался программами экранного чтения"
---

# wai_aria_attributes

### Description

@short: Включает поддержку WAI-ARIA, чтобы компонент распознавался программами экранного чтения

@signature: wai_aria_attributes: boolean

### Example

~~~jsx
scheduler.config.wai_aria_attributes = true;
...
scheduler.init("scheduler_here");
~~~

**Значение по умолчанию:** true

### Details

added in version 4.4

### Related Guides
- [Доступность](guides/accessibility.md#wai-aria-attributes)