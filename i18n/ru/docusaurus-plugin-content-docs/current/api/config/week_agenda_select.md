---
sidebar_label: week_agenda_select
title: "week_agenda_select конфигурация"
description: "выделяет выбранное событие в представлении Week Agenda"
---

# week_agenda_select
:::info
 Эта функциональность доступна только в PRO-версии.
:::
### Description

@short: Выделение выбранного события во представлении Week Agenda

@signature: week_agenda_select: boolean

### Example

~~~jsx
scheduler.config.week_agenda_select= false; /*!*/
scheduler.init('scheduler_here',new Date(2027,0,10),"agenda_week");
~~~

**Значение по умолчанию:** true

**Применимые представления:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 Свойство требует активированного плагина [week_agenda](guides/extensions-list.md#week-agenda).
 :::

![week_agenda_select](/img/week_agenda_select.png)

:::note
 Обратите внимание, что значение *false* конфигурации **week_agenda_select** запрещает только подсветку выбранного события, но не запрещает его редактирование. Чтобы сделать событие не редактируемым, используйте конфигурацию [readonly](api/config/readonly.md).
 :::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [Week Agenda View](views/weekagenda.md)