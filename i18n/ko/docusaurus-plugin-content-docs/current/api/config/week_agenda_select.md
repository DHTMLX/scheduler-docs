---
sidebar_label: "week_agenda_select"
title: "week_agenda_select config"
description: "Week Agenda 뷰에서 선택된 이벤트를 하이라이트합니다."
---

# week_agenda_select
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Week Agenda 뷰에서 선택된 이벤트를 하이라이트합니다.

@signature: week_agenda_select: boolean

### Example

~~~jsx
scheduler.config.week_agenda_select= false; /*!*/
scheduler.init('scheduler_here',new Date(2027,0,10),"agenda_week");
~~~

**Default value:** true

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 이 속성은 [week_agenda](guides/extensions-list.md#week-agenda) 플러그인이 활성화되어 있어야 작동합니다. 
:::

![week_agenda_select](/img/week_agenda_select.png)

:::note
 **week_agenda_select**를 *false*로 설정하면 선택된 이벤트의 하이라이트만 비활성화되며, 이벤트 편집 자체는 막지 않습니다. 이벤트를 편집 불가능하게 만들려면 [readonly](api/config/readonly.md) 설정을 사용하세요. 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- ["Week Agenda View"](views/weekagenda.md)
