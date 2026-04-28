---
sidebar_label: "active_link_view"
title: "active_link_view config"
description: "월간 보기에서 날짜 숫자를 클릭 가능한 링크로 표시하여 선택한 뷰에서 해당 날짜를 열 수 있게 합니다."
---

# active_link_view

### Description

@short: 월간 보기에서 날짜 숫자를 클릭 가능한 링크로 표시하여 선택한 뷰에서 해당 날짜를 열 수 있게 합니다.

@signature: active_link_view: string

### Example

~~~jsx
scheduler.config.active_link_view = "week"; // 월간 보기에서 이동할 뷰를 지정합니다.
...
scheduler.init('scheduler_here',new Date(2027,7,6),"month");
~~~

**Default value:** day

**Applicable views:** [Month view](views/month.md)

### Related samples
- [Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note
 이 설정을 사용하려면 [active_links](guides/extensions-list.md#active-links) 플러그인이 활성화되어 있어야 합니다. 
:::

월의 날짜 숫자가 링크로 연결될 뷰의 이름을 이 속성에 설정하세요.

### Related Guides
- ["Month View"](views/month.md#presentingdaysnumbersasclickablelinks)
