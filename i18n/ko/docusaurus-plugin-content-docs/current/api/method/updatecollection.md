---
sidebar_label: "updateCollection"
title: "updateCollection method"
description: "지정된 컬렉션을 새로운 옵션으로 업데이트합니다."
---

# updateCollection

### Description

@short: 지정된 컬렉션을 새로운 옵션으로 업데이트합니다.

@signature: updateCollection: (collection: string, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string* - 업데이트할 컬렉션의 이름
- `options` - (required) *array* - 컬렉션의 새로운 값들

### Returns
- ` collection` - (boolean) - <i>true</i>, 업데이트가 성공했으면; <i>false</i>, 컬렉션을 찾지 못했으면

### Example

~~~jsx
scheduler.config.lightbox.sections = [   
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"items", height:23, type:"select", 
    options:scheduler.serverList("goods", goods_array), map_to:"section_id" }, 
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

### Details

- 이 메서드는 [onOptionsLoad](api/event/onoptionsload.md) 이벤트를 트리거하고 lightbox를 새로 고칩니다. 
- 컬렉션은 처음에 [serverList](api/method/serverlist.md) 메서드를 사용하여 생성할 수 있습니다.

### 예제

#### Select 컨트롤

다음과 같이 구성된 lightbox를 고려해보세요:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", ...},
    { name: "sections", type: "select", options: scheduler.serverList("sections"), /*!*/
        map_to: "section_id" },
    { name: "time", ... }
]; 
~~~

이 설정에서는 'sections'라는 이름의 리스트를 수정하여 select 컨트롤의 옵션을 업데이트할 수 있습니다. <br>
'sections' 리스트를 업데이트하려면 다음과 같이 하십시오:
~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~


#### Units 뷰
다음과 같이 Units 뷰가 구성되어 있다고 가정해봅시다:

~~~js
scheduler.createUnitsView({
    name: "unit",
    property: "section_id",
    list: scheduler.serverList("sections")  /*!*/
});
~~~

표시되는 유닛 리스트를 변경하려면 다음을 사용하세요:

~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)
