---
sidebar_label: "week_agenda_select"
title: "week_agenda_select config"
description: "在 Week Agenda 视图中突出显示所选事件"
---

# week_agenda_select
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在 Week Agenda 视图中突出显示所选事件

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
 此属性需要激活 [week_agenda](guides/extensions-list.md#weekagenda) 插件。 
:::

![week_agenda_select](/img/week_agenda_select.png)

:::note
 请注意，将 **week_agenda_select** 设置为 *false* 只会禁用所选事件的高亮显示，但不会阻止事件被编辑。若要使事件不可编辑，请使用 [readonly](api/config/readonly.md) 中的配置。 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [Week Agenda View](views/weekagenda.md)
