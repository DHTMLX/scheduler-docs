---
title: "自定义 'Select' 与 'Edit' 栏"
sidebar_label: "自定义 'Select' 与 'Edit' 栏"
---

# 自定义 "Select" 与 "Edit" 栏

dhtmlxScheduler 提供了为编辑栏和选择栏定义自定义按钮集合的可能性。

## 选择栏

默认情况下，选择栏包含 3 个按钮（'Details'、'Edit'、'Delete'），由 [icons_select](api/config/icons_select.md) 配置选项指定。

~~~js
scheduler.config.icons_select = [
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~


### 用法示例

让我们来看看下图所示的选择栏：
  
![select_bar.png](/img/select_bar.png)

在现有按钮的基础上，我们新增了一个按钮 - **Location**。

以下是我们的步骤：

-  重新定义 [icons_select](api/config/icons_select.md)，如下所示：
  
~~~js
scheduler.config.icons_select = [
   "icon_location",
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~
 
:::note
注：任何按钮必须以 "icon_" 开头
::: 


-  为新按钮设置标签：
  
~~~js
scheduler.locale.labels.icon_location = "Location";
~~~

-  为按钮设置 CSS 类：
  
~~~js
.dhx_menu_icon.icon_location{
  background-image: url('location_icon.png');  
} 
~~~

-  指定处理按钮点击的处理函数：
  
~~~js
scheduler._click.buttons.location = function(id){
   some_function(id);
};
~~~
 
其中 **scheduler._click.buttons** 包含栏按钮的 onClick 处理函数集合。'location' 是在 [icons_edit](api/config/icons_edit.md) 中，位于 'icon_' 部分后的按钮名称。
 

## 编辑栏

通常，编辑栏包含 2 个按钮（'Save' 和 'Cancel'），由 [icons_edit](api/config/icons_edit.md) 配置选项指定。

~~~js
scheduler.config.icons_edit = [
   "icon_save",
   "icon_cancel"
];
~~~


### 用法示例

让我们来看看下图所示的编辑栏：
  
![customizing_edit_bar.png](/img/customizing_edit_bar.png)

在 **Save** 和 **Cancel** 按钮的基础上，我们新增了一个按钮 - **Info**。
以下是我们的步骤：

-  重新定义 [icons_edit](api/config/icons_edit.md)，如下所示：
  
~~~js
scheduler.config.icons_edit = [
   "icon_custom",
   "icon_save",
   "icon_cancel"
];
~~~

-  为新按钮设置标签：
  
~~~js
scheduler.locale.labels.icon_custom = "Info";
~~~

-  为按钮设置 CSS 类：
  
~~~js
.dhx_menu_icon.icon_custom{
  background-image: url('info_icon.png');  
} 
~~~

-  指定处理按钮点击的处理函数：
  
~~~js
scheduler._click.buttons.custom = function(id){
   some_function;
};
~~~

其中 **scheduler._click.buttons** 包含栏按钮的 onClick 处理函数集合。'custom' 是在 [icons_edit](api/config/icons_edit.md) 中，位于 'icon_' 部分后的按钮名称。
 

## 动态改变栏元素

编辑栏和选择栏的按钮可以根据某些条件动态地改变。 

例如，您的事件有一个自定义布尔属性 **important**，表示该事件是否重要且用户无法删除。
根据该属性的值，您可能希望在选择栏中隐藏/显示 'delete' 按钮。要实现这样的行为，请使用以下技巧：

~~~js
scheduler.attachEvent("onClick", function(id){
    const event = scheduler.getEvent(id);
    if (event.important)
        scheduler.config.icons_select = ["icon_details"];
    else
        scheduler.config.icons_select = ["icon_details", "icon_delete"];

    return true;
});
~~~