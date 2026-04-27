---
sidebar_label: "getView"
title: "getView method"
description: "根据视图名称返回一个视图对象。如果未提供名称，则返回当前视图。"
---

# getView

### Description

@short: 根据视图名称返回一个视图对象。如果未提供名称，则返回当前视图。

@signature: getView: (name?: string) =\> any

### Parameters

- `name` - (optional) *string* - 可选，视图的名称。

### Returns
- ` view` - (object) - 一个视图对象。

### Example

~~~jsx
const timeline = scheduler.getView(); 
timeline.x_size = 8;
scheduler.setCurrentView();
~~~

### Related samples
- [Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)

### Details

此方法仅返回具有自己对象表示的视图。目前，这包括[timeline](views/timeline.md#timelineobjectapi)和[units](views/units.md)视图，因此对于任何其他视图，该方法将返回*null*。

### Related Guides
- [타임라인 뷰](views/timeline.md)
- [Units View](views/units.md)
