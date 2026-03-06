---
sidebar_label: "createGridView"
title: "createGridView method"
description: "在调度程序中设置 Grid 视图"
---

# createGridView
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 在调度程序中设置 Grid 视图

@signature: createGridView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - Grid 视图的配置对象

### Example

~~~jsx
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"id",       label:'Book Title',    width:'*',    align:'right',     sort:'str'},
        {id:"date",     label:'Author',     width:100},
        {id:"text",     label:'Votes',         width:200,    align:'left',    sort:'int'}
    ],
    from:new  Date(2000, 00, 01),
    to:new Date(2013, 00, 01)
});
~~~

**Applicable views:** [Grid view](views/grid.md)

### Related samples
- [Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)

### Details

:::note
 要使用此方法，必须激活 [grid_view](guides/extensions-list.md#gridview) 插件。 
:::

Grid 视图配置对象支持以下属性:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 视图的标识符</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>fields</b></td>
  <td>(<i>对象数组</i>) 定义 grid 的列。<br> 数组中的每个对象代表一列，可以包含以下属性:<ul><li><b>id</b> - (<i>string</i>) 列的 id，应与对应数据属性名称匹配</li><li><b>label</b> - (<i>string</i>) 列的表头文本</li><li><b>width</b> - (<i>string</i>) 列宽。使用 '*' 表示该列扩展以填充剩余空间。如果多个列使用 '*'，它们将平分剩余宽度。</li><li><b>align</b> - (<i>right, center 或 left</i>) 文本的水平对齐方式</li><li><b>valign</b> - (<i>top, middle 或 bottom</i>) 文本的垂直对齐方式</li><li><b>template</b> - (<i>function</i>) 单元格数据的自定义模板函数</li><li><b>sort</b> - (<i>'int','date','str' 或自定义函数</i>) 启用列排序（点击表头激活），可使用预定义类型或自定义排序函数</li><li><b>css</b> - (<i>string</i>) 应用于该列的 CSS 类名</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select</b></td>
  <td>(<i>boolean</i>) 是否开启 grid 中的选择功能（默认开启）</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>rowHeight</b></td>
  <td>(<i>number</i>) 指定 grid 中每行的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>paging</b></td>
  <td>(<i>boolean</i>) 切换 grid 中的导航按钮 ![navigation_buttons](/img/navigation_buttons.png) [(更多信息)](views/grid.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unit</b></td>
  <td>(<i>minute, hour, day, week, month, year</i>) 定义滚动的时间单位，默认为 'month'</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) 每次滚动的单位数，默认为 1。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>from</b></td>
  <td>(<i>Date</i>) 设置调度程序日期范围的起始日期限制</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>to</b></td>
  <td>(<i>Date</i>) 设置调度程序日期范围的结束日期限制</td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Grid View](views/grid.md)
