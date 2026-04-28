--- 
title: "完全自定义灯箱"
sidebar_label: "完全自定义灯箱"
---

# 完全自定义灯箱

为了为调度程序指定一个完全自定义的灯箱，请重新定义 [`showLightbox()`](api/method/showlightbox.md) 方法：

~~~js
scheduler.showLightbox = (id) => {
    // id - 事件的 id
    ... 用于显示任何自定义表单的代码 ...
};
~~~

有 2 个辅助方法可用于简化实现：

- [`startLightbox()`](api/method/startlightbox.md) - 在指定的 HTML 容器中居中显示自定义灯箱
- [`endLightbox()`](api/method/endlightbox.md) - 关闭灯箱

假设在页面的某处有 `#custom_form` HTML 容器。然后你可以像下面这样实现自定义灯箱：

~~~js
const customForm = document.getElementById("custom_form");

scheduler.showLightbox = (id) => {
    const event = scheduler.getEvent(id);
    scheduler.startLightbox(id, customForm);
    ...'此处需要将事件值设置到表单中'...
    // document.getElementById("some_input").value = event.text;
};

// 需要绑定到“保存”按钮
const saveForm = () => {
    const event = scheduler.getEvent(scheduler.getState().lightbox_id);
    ...'此处需要从表单中获取值'...
    // event.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, customForm);
};

// 需要绑定到“取消”按钮
const closeForm = () => {
    scheduler.endLightbox(false, customForm);
};
~~~

### 相关示例

- [完全自定义灯箱](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)