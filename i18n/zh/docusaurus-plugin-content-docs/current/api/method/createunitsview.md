---
sidebar_label: "createUnitsView"
title: "createUnitsView method"
description: "在调度器中设置 Units 视图"
---

# createUnitsView
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在调度器中设置 Units 视图

@signature: createUnitsView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Units 视图的配置对象

### Example

~~~jsx
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id",
    list:[
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}    
    ]
});

scheduler.init('scheduler_here',new Date(2027,5,30),"unit");

scheduler.parse([
 {start_date:"06/30/2027 09:00",end_date:"06/30/2027 12:00",text:"Task1",unit_id:1},
 {start_date:"06/30/2027 12:00",end_date:"06/30/2027 20:00",text:"Task2",unit_id:3},
 {start_date:"06/30/2027 08:00",end_date:"06/30/2027 12:00",text:"Task3",unit_id:2}
],"json");
~~~

**Applicable views:** [Units view](views/units.md)

### Related samples
- [Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)
- [Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)

### Details

:::note
 使用此方法前，必须启用 [units](guides/extensions-list.md#units) 插件。 
:::

Units 视图的配置对象支持以下属性:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 视图的标识符。如果已存在同名的 Units 视图，将被替换</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>property</b></td>
  <td>(<i>string</i>) 指定用于将事件关联到特定单位的数据属性</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>list</b></td>
  <td>(<i>对象数组</i>) 定义视图中显示的单位。<br> 数组中的每个对象代表一个单位，包含:<ul><li><b>key</b> - (<i>string</i>) 单位的唯一 ID。该值用于与事件数据属性匹配，以关联事件与单位</li><li><b>label</b> - (<i>string</i>) 单位的显示标签</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>days</b></td>
  <td>(<i>number</i>) 沿 Y 轴显示的项目（天数）数量</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skip_incorrect</b></td>
  <td>(<i>boolean</i>) 设置为 <i>true</i> 时，不匹配任何单位的事件将不显示。若为 <i>false</i>，此类事件将分配给第一个单位。默认为 <i>false</i>。可选</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>size</b></td>
  <td>(<i>number</i>) 一次显示的单位数量。如果实际数量超过此值，将出现滚动条。可选</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) 每次滚动的单位数量。可选</td>
  </tr>
  </tbody>
</table>
