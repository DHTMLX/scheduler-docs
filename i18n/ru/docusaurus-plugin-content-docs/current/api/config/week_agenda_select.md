---
sidebar_label: "week_agenda_select"
title: "week_agenda_select config"
description: "выделяет выбранное событие в представлении Week Agenda"
---

# week_agenda_select
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Выделяет выбранное событие в представлении Week Agenda

@signature: week_agenda_select: boolean

### Example

~~~jsx
scheduler.config.week_agenda_select= false; /*!*/
scheduler.init('scheduler_here',new Date(2013,0,10),"agenda_week");
~~~

**Default value:** true

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 Свойство требует активации плагина [week_agenda](guides/extensions-list.md#weekagenda). 
:::

![week_agenda_select](/img/week_agenda_select.png)

:::note
 Учтите, что установка **week_agenda_select** в *false* отключает только выделение выбранного события, но не препятствует редактированию события. Чтобы сделать событие доступным только для чтения, используйте конфигурацию [readonly](api/config/readonly.md). 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [Неделя-Агенда (Week Agenda View)](views/weekagenda.md)
