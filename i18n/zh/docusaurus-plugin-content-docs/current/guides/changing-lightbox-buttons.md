---
title: "更改 Lightbox 中的按钮"
sidebar_label: "更改 Lightbox 中的按钮"
---

# 更改 Lightbox 中的按钮

您可以自定义 lightbox 中的默认按钮。

![lightbox_buttons](/img/lightbox_buttons.png)

首先来看一下管理这些按钮的集合。


默认情况下，lightbox 包含 3 个按钮（"Save"、"Cancel"、"Delete"），它们由 [buttons_left](api/config/buttons_left.md) 和 [buttons_right](api/config/buttons_right.md) 配置项控制。

~~~js
scheduler.config.buttons_left = ["dhx_save_btn", "dhx_cancel_btn"];
scheduler.config.buttons_right = ["dhx_delete_btn"];
~~~

如需更新默认按钮组，请按照以下步骤操作:

1. 向 **buttons_left** 或 **buttons_right** 数组中添加新的条目，例如:

~~~js
scheduler.config.buttons_left = ["dhx_save_btn","dhx_cancel_btn","locate_button"];
~~~

2. 使用以下方式定义按钮标签:

~~~js
scheduler.locale.labels["locate_button"] = "Location";
~~~

3. 通过选择器 **(buttonName)_set** 自定义按钮颜色。例如:

~~~js
.dhx_save_btn_set{
    background-color:#4CAF50;
}
~~~

**Related sample** [Custom Color for Buttons](https://snippet.dhtmlx.com/1sjwldpb)

4. 为按钮分配图标（或应用其他样式），方法如下:

~~~js
.locate_button
{
    background-image:url('../../codebase/imgs/location.gif');
    background-position: -2px 0px;
    width:20px;
}
~~~

5. 实现 [onLightboxButton](api/event/onlightboxbutton.md) 事件处理器以处理按钮点击，如下所示:

~~~js
scheduler.attachEvent("onLightboxButton", function(button_id, node, e){
    if(button_id == "locate_button"){
        alert("Location!");
    }
});
~~~
