---
sidebar_label: "getState"
title: "getState method"
description: "获取调度器的当前状态"
---

# getState

### Description

@short: 获取调度器的当前状态

@signature: getState: () =\> any

### Returns
- `state` - (object) - 状态对象

### Example

~~~jsx
const mode = scheduler.getState().mode;  
if(mode == "day"){  
    // 在此处编写自定义逻辑  
}  
else {  
    // 在此处编写自定义逻辑  
}
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Removing needless hours from the time scale](https://docs.dhtmlx.com/scheduler/samples/06_timeline/09_drag_duration.html)

### Details

状态对象表示调度器的内部UI配置，包含以下属性:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>mode</b></td>
  <td>(<i>string</i>) 当前激活的视图</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>Date</i>) 当前选中的日期</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>min_date</b></td>
  <td>(<i>Date</i>) 当前视图中显示事件的起始日期</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>max_date</b></td>
  <td>(<i>Date</i>) 当前视图中显示事件的结束日期</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>editor_id</b></td>
  <td>(<i>string</i>) 当前正在进行内联编辑的事件ID。如果没有事件正在内联编辑，则为 'undefined' 或 'null'。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>lightbox_id</b></td>
  <td>(<i>string</i>) 当前在 lightbox 中打开的事件ID。如果没有事件在 lightbox 中打开，则为 'undefined' 或 'null'。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>new_event</b></td>
  <td>(<i>Date</i>) 指示当前是否正在创建新事件。如果正在创建新事件，则包含当前日期，否则为 'undefined' 或 'null'。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select_id</b></td>
  <td>(<i>string</i>) 当前选中的事件ID。如果没有事件被选中，则为 'undefined' 或 'null'。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>expanded</b></td>
  <td>(<i>boolean</i>) 当调度器处于展开状态时为 true。如果调度器为正常大小或未启用 [expand](guides/extensions-list.md#expand) 扩展，则为 'undefined' 或 'null'。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_id</b></td>
  <td>(<i>string</i>) 当前正在拖拽的事件ID。如果没有事件被拖拽，则为 'undefined' 或 'null'。</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_mode</b></td>
  <td>(<i>'move','resize','create', 'new-size'</i>) 当前的拖拽模式。如果没有事件被拖拽，则为 'undefined' 或 'null'。</td>
  </tr>
  </tbody>
</table>

:::note
  
注意，修改此对象不会影响调度器的行为。 
 
:::
