---
title: "完全自定义 Lightbox"
sidebar_label: "完全自定义 Lightbox"
---

# 完全自定义 Lightbox

要为调度器创建一个完全自定义的 lightbox，你需要重写 [showLightbox](api/method/showlightbox.md) 方法:

~~~js
scheduler.showLightbox = function(id){
    // id - 事件的 id
    ... 用于显示任何自定义表单的代码 ...
}
~~~

有两个辅助方法可以让这个过程更加简单:


- [startLightbox](api/method/startlightbox.md) - 在指定的 HTML 容器内显示自定义 lightbox，并居中显示在屏幕上。
- [endLightbox](api/method/endlightbox.md) - 关闭 lightbox


假设你在页面的某处有一个 ID 为 **#custom_form** 的 HTML 容器。要实现自定义 lightbox，可以按照如下方式操作:

~~~js
var custom_form = document.getElementById("custom_form");

scheduler.showLightbox = function(id){
    var ev = scheduler.getEvent(id);
    scheduler.startLightbox(id, custom_form );
    ...'此处需要将事件值设置到表单中'...
    //document.getElementById("some_input").value = ev.text;
}
// 需要绑定到“保存”按钮
function save_form() {
    var ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    ...'此处需要从表单中获取值'...
    //ev.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, custom_form);
}
// 需要绑定到“取消”按钮
function close_form(argument) {
    scheduler.endLightbox(false, custom_form);
}
~~~


[Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
