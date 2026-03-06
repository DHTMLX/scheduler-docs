---
sidebar_label: "wai_aria_application_role"
title: "wai_aria_application_role config"
description: "устанавливает, должен ли атрибут role='application' быть назначен основному контейнеру scheduler и элементам minicalendar"
---

# wai_aria_application_role

### Description

@short: Устанавливает, должен ли атрибут role="application" быть назначен основному контейнеру scheduler и элементам minicalendar

@signature: wai_aria_application_role: boolean

### Example

~~~jsx
scheduler.config.wai_aria_application_role = true;
...
scheduler.init("scheduler_here");
~~~

**Default value:** true

### Details

добавлено в версии 5.0

Управляет тем, как скринридеры обрабатывают интерфейс scheduler.

### Related Guides
- [Доступность](guides/accessibility.md)
