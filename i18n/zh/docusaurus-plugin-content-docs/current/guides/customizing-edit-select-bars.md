---
title: "自定义'选择'和'编辑'工具栏"
sidebar_label: "自定义'选择'和'编辑'工具栏"
---

# 自定义"选择"和"编辑"工具栏

dhtmlxScheduler 允许你为编辑和选择工具栏设置自定义按钮集合。

## 选择工具栏

默认情况下，选择工具栏包含 3 个按钮（'Details'、'Edit'、'Delete'），它们通过 [icons_select](api/config/icons_select.md) 配置选项定义。

~~~js
scheduler.config.icons_select = [
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~

### 使用示例

如下图所示，这里是一个选择工具栏的示例:

![select_bar.png](/img/select_bar.png)

在现有按钮旁边新增了一个名为 **Location** 的按钮。

实现步骤如下:

- 按如下方式更新 [icons_select](api/config/icons_select.md):

~~~js
scheduler.config.icons_select = [
   "icon_location",
   "icon_details",
   "icon_edit",
   "icon_delete"
];

~~~

:::note
注意，每个按钮的名称必须以 "icon_" 开头
::: 


- 为新按钮定义标签:

~~~js
scheduler.locale.labels.icon_location = "Location";
~~~

- 为按钮分配 CSS 类:

~~~js
.dhx_menu_icon.icon_location{
  background-image: url('location_icon.png');  
} 
~~~

- 为按钮提供点击事件处理函数:

~~~js
scheduler._click.buttons.location = function(id){
   some_function(id);
};
~~~

这里，**scheduler._click.buttons** 保存了工具栏按钮的 onClick 事件处理函数。'location' 键对应于 [icons_select](api/config/icons_select.md) 中按钮名称（去掉 'icon_' 前缀）。

## 编辑工具栏

通常，编辑工具栏有 2 个按钮（'Save' 和 'Cancel'），通过 [icons_edit](api/config/icons_edit.md) 选项进行配置。

~~~js
scheduler.config.icons_edit = [
   "icon_save",
   "icon_cancel"
];
~~~

### 使用示例

参考下图所示的编辑工具栏:

![customizing_edit_bar.png](/img/customizing_edit_bar.png)

除了 **Save** 和 **Cancel** 按钮外，还新增了一个 **Info** 按钮。
具体步骤如下:

- 按如下方式更新 [icons_edit](api/config/icons_edit.md):

~~~js
scheduler.config.icons_edit = [
   "icon_custom",
   "icon_save",
   "icon_cancel"
];
~~~

- 设置新按钮的标签:

~~~js
scheduler.locale.labels.icon_custom = "Info";
~~~

- 定义按钮的 CSS 类:

~~~js
.dhx_menu_icon.icon_custom{
  background-image: url('info_icon.png');  
} 
~~~

- 指定按钮的点击事件处理函数:

~~~js
scheduler._click.buttons.custom = function(id){
   some_function;
};
~~~

同样，**scheduler._click.buttons** 包含了按钮的点击事件处理函数，'custom' 与 [icons_edit](api/config/icons_edit.md) 中按钮名称（去掉 'icon_' 前缀）一致。

## 动态修改工具栏元素

你可以根据特定条件动态修改编辑和选择工具栏上的按钮。

例如，如果你的事件有一个布尔属性 **important**，用来表示该事件很重要且不应被删除，则可以根据该属性动态显示或隐藏选择工具栏中的 'delete' 按钮。示例代码如下:

~~~js
scheduler.attachEvent("onClick", function(id){
    var event = scheduler.getEvent(id);
    if (event.important)
        scheduler.config.icons_select = ["icon_details"];
    else
        scheduler.config.icons_select = ["icon_details", "icon_delete"];

    return true;
});
~~~
