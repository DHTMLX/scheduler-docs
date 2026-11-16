---
sidebar_label: event_groups
title: "event_groups 配置"
description: "配置事件组集合"
---

# event_groups

### 描述

@short: 配置事件组集合

@signature: event_groups: EventGroupsConfig | false

### 示例

~~~js
scheduler.config.event_groups = { list: "calendars", property: "calendarId", default: "work" };
scheduler.serverList("calendars", [
    { key: "work", label: "Work", color: "#537cfa", textColor: "#fff" },
    { key: "personal", label: "Personal", color: "#39a675", active: false }
]);
~~~

### 详细说明

事件组是核心功能，无需插件。配置对象会启用事件组；`false`、`null` 或缺少该值会在下次渲染时禁用事件组。默认值为 `list: "event_groups"` 和 `property: "group"`。

### 配置选项

| 选项 | 类型 | 描述 |
| --- | --- | --- |
| `list` | *string* | 存储组定义的集合名称。默认值为 `"event_groups"`。 |
| `property` | *string* | 存储组键的事件属性。默认值为 `"group"`。 |
| `default` | *string \| number \| boolean* | 当键标识活动组时，分配给新建事件的键。 |

每个集合项使用 `key`、`label` 以及可选的 `color`、`textColor` 和 `active` 属性。非活动组的事件会被隐藏。未知值、空值、数组及其他多选值仍会显示，但不带组颜色。不要将多选属性用作 `property`。

当 `default` 指向活动组时，会将其分配给新建事件；否则 Scheduler 使用第一个活动组。事件组不会向默认 lightbox 添加区段；如需用户选择组，请添加 `select` 区段。

### 相关 API

- [eventGroups](api/other/eventgroups.md)

### 相关指南

- [事件组](guides/event-groups.md)
- [自定义事件颜色](guides/custom-events-color.md)