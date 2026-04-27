--- 
title: "完全自定义灯箱" 
sidebar_label: "完全自定义灯箱" 
---

# 完全自定义灯箱

要为调度器指定一个完全自定义的灯箱，您需要重新定义 [showLightbox](api/method/showlightbox.md) 方法：

~~~js
scheduler.showLightbox = function(id){
    // id - id of event
    ... code to show any custom form ...
}
~~~

有两种辅助方法可简化实现：

- [startLightbox](api/method/startlightbox.md) - 在指定的 HTML 容器中居中显示一个自定义灯箱。
- [endLightbox](api/method/endlightbox.md) - 关闭灯箱

假设在页面的某处有 **#custom_form** HTML 容器。然后，要实现一个自定义灯箱，您可以使用以下代码： 

~~~js
const custom_form = document.getElementById("custom_form");

scheduler.showLightbox = function(id){
    const ev = scheduler.getEvent(id);
    scheduler.startLightbox(id, custom_form );
    ...'here you need to set values in the form'...
    //document.getElementById("some_input").value = ev.text;
}
//needs to be attached to the 'save' button
function save_form() {
    const ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    ...'here you need to retrieve values from the form'...
    //ev.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, custom_form);
}
//needs to be attached to the 'cancel' button
function close_form(argument) {
    scheduler.endLightbox(false, custom_form);
}
~~~


[完全自定义灯箱](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)