---
sidebar_label: "serverList"
title: "serverList method"
description: "Units, Timeline 뷰 또는 Lightbox에 로드할 수 있는 이름이 지정된 컬렉션을 정의합니다."
---

# serverList

### Description

@short: Units, Timeline 뷰 또는 Lightbox에 로드할 수 있는 이름이 지정된 컬렉션을 정의합니다.

@signature: serverList: (list_name: string, options?: any[]) =\> any[]

### Parameters

- `list_name` - (required) *string* - 리스트의 이름  
- `options` - (optional) *array* - 선택 사항, 옵션 배열

### Returns
- ` list` - (array) - 옵션 리스트

### Example

~~~jsx
// 'my_list'라는 이름의 옵션 리스트를 가져옵니다.
var list = scheduler.serverList("my_list"); 
...
// 지정된 옵션으로 리스트를 생성하고 반환합니다.
var list = scheduler.serverList("options", [
    {key: 1, label: "John"},
    {key: 2, label: "Adam"},
    {key: 3, label: "Diane"}
]);
~~~

### Related samples
- [Populating a select editor from the server](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/09_connector_options.html)
- [Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

- 첫 번째 파라미터만 전달하면, 해당 이름과 연관된 리스트가 존재할 경우 그 리스트를 반환합니다.  
- 두 개의 파라미터가 전달되면, 주어진 이름으로 새 리스트를 생성하거나, 이미 존재하는 리스트가 있으면 덮어씁니다.

이 메서드를 통해 생성된 리스트는 이후 [scheduler.updateCollection](api/method/updatecollection.md) 메서드를 사용해 업데이트할 수 있습니다.

셀렉트 옵션이나 Timeline, Units 뷰의 단위 리스트처럼 컬렉션을 업데이트해야 하는 상황에서, 이름이 지정된 옵션 리스트로 정의하는 것이 실용적인 방법입니다.

~~~js
scheduler.serverList("sections", [
    { key: 1, label: "Section A" },
    { key: 2, label: "Section B" },
    { key: 3, label: "Section C" },
    { key: 4, label: "Section D" }
]);

scheduler.config.lightbox.sections = [
    { 
        name: "description", height: 130, map_to: "text", type: "textarea", 
          focus: true 
    },
    { 
        name: "sections", type: "select",
          options: scheduler.serverList("sections"), map_to: "section_id"  /*!*/
    },
    { 
        name: "time", height: 72, type: "time", map_to: "auto" 
    }
]; 
...
// 마찬가지로 "units" 리스트 사용
scheduler.createUnitsView({
    name: "unit",
    property: "section_id",
    list: scheduler.serverList("sections") /*!*/ 
});

scheduler.createTimelineView({
    name: "timeline",
    x_unit: "minute",
    x_date: "%H:%i",
    x_step: 30,
    x_size: 24,
    x_start: 16,
    x_length: 48,
    y_unit: scheduler.serverList("sections"), /*!*/
    y_property: "section_id",
    render: "bar"
});

scheduler.init("scheduler_here", new Date(), "unit");
~~~

이후, [scheduler.updateCollection](api/method/updatecollection.md) 메서드를 사용하여 모든 곳에서 옵션을 업데이트할 수 있습니다:

~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)
