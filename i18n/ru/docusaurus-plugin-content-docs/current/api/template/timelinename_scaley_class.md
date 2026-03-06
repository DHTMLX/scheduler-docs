---
sidebar_label: "TIMELINE_scaley_class"
title: "TIMELINE_scaley_class template"
description: "определяет имя CSS-класса, который будет присвоен элементам на оси Y"
---

# TIMELINE_scaley_class
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет имя CSS-класса, который будет присвоен элементам на оси Y

@signature: TIMELINE_scaley_class: (key: string, label: string, section: object) =\> string;

### Parameters

- `key` - (required) *string* - идентификатор секции
- `label` - (required) *string* - метка секции
- `section` - (required) *object* - объект, представляющий секцию, содержащий свойства 'key' и 'label'

### Returns
- ` css_class` - (string) - CSS класс, который будет применен к соответствующему элементу

### Example

~~~jsx
scheduler.templates.timeline_scaley_class = function(key, label,  section){ 
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Этот шаблон требует включения плагина [timeline](guides/extensions-list.md#timeline). 
:::

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
