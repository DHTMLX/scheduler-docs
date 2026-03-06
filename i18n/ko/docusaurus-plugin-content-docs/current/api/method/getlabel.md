---
sidebar_label: "getLabel"
title: "getLabel method"
description: "라이트박스 내 select 컨트롤의 레이블을 가져옵니다."
---

# getLabel

### Description

@short: 라이트박스 내 select 컨트롤의 레이블을 가져옵니다.

@signature: getLabel: (property: string, key: string | number) =\> string

### Parameters

- `property` - (required) *string* - 컨트롤에 연결된 데이터 프로퍼티 이름  
- `key` - (required) *string | number* - 옵션의 ID입니다. 이 값은 이벤트의 데이터 프로퍼티와 매칭되어 <br> 해당 이벤트와 연관된 select 옵션을 식별합니다.

### Returns
- ` label` - (string) - 라이트박스 내 select 컨트롤 옵션에 해당하는 레이블

### Example

~~~jsx
scheduler.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]},
        // 더 많은 옵션들
];

var holder2 = scheduler.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Related samples
- [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)

### Details

:::note
  
이 메서드는 라이트박스 내 select 컨트롤에서 특정 옵션의 레이블을 가져오는 데에만 사용됩니다. 
 
:::

<br>

예를 들어, 이 메서드를 사용하여 이벤트 텍스트가 표시되는 방식을 커스터마이징할 수 있습니다:

~~~js
scheduler.templates.event_text = function(start, end, event){
    return event.text + " ("+scheduler.getLabel("unit_id",event.unit_id) +")";
};

scheduler.init('scheduler_here',new Date(2013,5,30),"unit");
scheduler.parse([
 {start_date:"06/30/2013 09:00",end_date:"06/30/2013 12:00",text:"TaskA",unit_id:1},
 {start_date:"06/30/2013 12:00",end_date:"06/30/2013 20:00",text:"TaskB",unit_id:2},
 {start_date:"06/30/2013 08:00",end_date:"06/30/2013 12:00",text:"TaskC",unit_id:2}
],"json");

~~~

![getlabel_method_copy](/img/getlabel_method_copy.png)
