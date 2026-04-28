---
sidebar_label: wai_aria_application_role
title: "wai_aria_application_role конфигурация"
description: "определяет, будет ли role='application' использоваться для основного контейнера планировщика и элементов мини-календаря"
---

# wai_aria_application_role

### Description

@short: Определяет, будет ли role="application" использоваться для основного контейнера планировщика и элементов мини-календаря

@signature: wai_aria_application_role: boolean

### Example

~~~jsx
scheduler.config.wai_aria_application_role = true;
...
scheduler.init("scheduler_here");
~~~

**Значение по умолчанию:** true

### Details

Добавлено в версии 5.0

Определяет, как скрин-ридеры взаимодействуют с планировщиком.

### Related Guides
- [Доступность](guides/accessibility.md)