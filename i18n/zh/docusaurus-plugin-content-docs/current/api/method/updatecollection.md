---
sidebar_label: "updateCollection"
title: "updateCollection method"
description: "使用新的选项更新指定的 collection"
---

# updateCollection

### Description

@short: 使用新的选项更新指定的 collection

@signature: updateCollection: (collection: string, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string* - 要更新的 collection 名称
- `options` - (required) *array* - collection 的新值列表

### Returns
- ` collection` - (boolean) - <i>true</i>，如果更新成功；<i>false</i>，如果未找到该 collection

### Example

~~~jsx
scheduler.config.lightbox.sections=[   
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"items", height:23, type:"select", 
    options:scheduler.serverList("goods", goods_array), map_to:"section_id" }, 
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

### Details

- 此方法会触发 [onOptionsLoad](api/event/onoptionsload.md) 事件并刷新 lightbox。 
- Collections 可通过 [serverList](api/method/serverlist.md) 方法初始创建。

### 示例

#### Select 控件

假设有如下配置的 lightbox:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", ...},
    { name: "sections", type: "select", options: scheduler.serverList("sections"), /*!*/
        map_to: "section_id" },
    { name: "time", ... }
]; 
~~~

通过此配置，可以通过修改名为 'sections' 的列表来更新 select 控件中的选项。<br>
要更新 'sections' 列表，可以执行如下操作:
~~~js
scheduler.updateCollection("sections", [
    { key: 5, label: "Section E" },
    { key: 6, label: "Section F" },
    { key: 7, label: "Section G" }
]);
~~~


#### Units 视图
假设有如下配置的 Units 视图:

~~~js
scheduler.createUnitsView({
    name: "unit",
    property: "section_id",
    list: scheduler.serverList("sections")  /*!*/
});
~~~

要更改显示的单位列表，可以使用:

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
