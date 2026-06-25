---
title: "Radio"
sidebar_label: "Radio"
---

# Radio 

一组单选按钮

![radio_editor](/img/radio_editor.png)

:::note
启用 **编辑器** 扩展以在灯箱中使用此控件
:::

~~~js
scheduler.plugins({
    editors: true /*!*/
});

const priorities = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Medium' },
    { key: 3, label: 'Low' }
];
            
scheduler.locale.labels.section_priority = 'Priority';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"priority", height:58, options:priorities, 
                map_to:"priority", type:"radio", vertical:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[灯箱中的单选按钮](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## 初始化

将单选控件添加到灯箱，请按照以下步骤进行：

1. 在页面上启用 'editors' 扩展：
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. 将该分区添加到灯箱配置中：
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"radiobutton", height:58, options:priorities, 
    map_to:"priority", type:"radio", vertical:true},
    { name:"time", ...}
];
~~~
3. 为该分区设置标签：
~~~js
scheduler.locale.labels.section_priority = 'Priority';
~~~

[灯箱中的单选按钮](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## 属性

以下属性对于 'radio' 控件来说非常重要且常被设置（完整列表请参见此处：[here](api/config/lightbox.md)）：

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 该分区的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) 该分区的高度</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) 将映射到该分区的数据属性的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) 该分区控件的类型</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>对象数组</i>) 定义控件的可选项（仅对 'select'、'multiselect'、'radio'、'combo' 控件生效）。数组中的每个对象指定一个选项，并包含以下属性： <ul> <li><b>key</b> - (<i>string</i>) 选项的 id。该属性与事件的数据属性进行比较，以将选项分配给事件</li> <li><b>label</b> - (<i>string</i>) 选项的标签</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) 指定单选按钮应垂直排列（<i>true</i>）还是水平排列（<b>仅对 'multiselect' 和 'radio' 控件</b>）</td>
  </tr>
  </tbody>
</table>


## 用数据填充控件

通常，要为单选按钮设置值，应使用 [options](api/config/lightbox.md) 参数：

~~~js
scheduler.config.lightbox.sections = [
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'High' },
            { key: 2, label: 'Medium' },
            { key: 3, label: 'Low' }
    ]},
    ...
];
~~~


在 [options](api/config/lightbox.md) 参数中的项必须具有两个强制性属性：

- **key** - 选项的 id
- **label** - 选项的标签

## 从服务器获取单选按钮的值

要使用从服务器检索的数据设置单选按钮的值，请使用 [serverList](api/method/serverlist.md) 方法：

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"priority", map_to:"priority", type:"radio", 
          options:scheduler.serverList("priority")},
    {name:"time", ...}
];

scheduler.load("/api/types");
~~~


对于 [load](api/method/load.md) 方法的数据响应，应该包含名为服务器端集合的集合，且 JSON 的格式应符合以下格式 [数据格式指南](guides/data-formats.md#json-with-collections)：

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Interview",
          "priority":1
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Performance review",
          "type":2
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":1,"label":"Low"},/*!*/
         {"value":2,"label":"Medium"},/*!*/
         {"value":3,"label":"High"}/*!*/
      ]/*!*/
   }/*!*/
}

~~~

示例后端处理程序（Node.js/Express）：

~~~js
app.get("/api/types", async (req, res) => {
  const data = await eventsService.list();
  const collections = {
    type: [
      { value: 1, label: "Low" },
      { value: 2, label: "Medium" },
      { value: 3, label: "High" }
    ]
  };
  res.json({ data, collections });
});
~~~


:::note
注意，你可以使用 [updateCollection](api/method/updatecollection.md) 方法来更新检索到的选项列表
:::


## 单选控件的事件处理

默认情况下，dhtmlxScheduler API 并未为调度器灯箱中的单选按钮提供特定的事件处理程序。

但你可以像下面这样为灯箱内的单选控件分配一个点击处理程序：

1. 在灯箱打开后获取单选元素。

~~~js

scheduler.attachEvent("onLightbox", function(){
    const node = scheduler.formSection("type").node;
    const radios = node.getElementsByTagName("input");
    ...
});
~~~

2. 将 <b>onclick</b> 事件附加到灯箱中的单选按钮：

~~~js

scheduler.attachEvent("onLightbox", function(){
    ...
    for(let i = 0; i < radios.length; i++){
      radios[i].onclick = onRadioClick; 
    }
});
~~~

3. 最后，应该指定在单击单选按钮后将执行的函数：

~~~js
function onRadioClick(event){
    let e = event || window.event,
        node = this;
  
    dhtmlx.message(node.value);
}
~~~

相关示例 [对单选控件的事件处理](https://snippet.dhtmlx.com/5/5b62dd79e)