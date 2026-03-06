---
title: "自定义 Lightbox 控件"
sidebar_label: "自定义 Lightbox 控件"
---

# 自定义 Lightbox 控件

要设置一个自定义控件（编辑器），你需要像下面这样定义一个新对象:

~~~js
scheduler.form_blocks["my_editor"]={
    render:function(config){ // config - 区块配置对象
        var height="(config.height||50)+""px";
        return "<div class='dhx_cal_ltext' style='height:"+height+";'>" + 
            "<textarea></textarea></div>";
    },
    set_value:function(node,value,ev,config){
        // node - 与上面定义的 HTML 相关的 HTML 元素
        // value - 由 map_to 属性指定的值
        // ev - 事件对象
        // config - 区块配置对象
        node.querySelector("textarea").value = value || "";
    },
    get_value:function(node,ev,config){
        // node - 与上面定义的 HTML 相关的 HTML 元素
        // event object
        // config - 区块配置对象
        return node.querySelector("textarea").value;
    },
    focus:function(node){
        // node - 与上面定义的 HTML 相关的 HTML 元素
        node.querySelector("textarea").focus();
    }
};
~~~

用法示例:

~~~js
scheduler.locale.labels.section_details = "Details";
scheduler.config.lightbox.sections="["    
    { name:"details", height:35, map_to:"text", type:"my_editor", focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~

需要注意的是，在 "render" 函数返回的 HTML 中**避免**使用自闭合标签，否则可能会导致浏览器解析问题:

~~~js
// 错误示例:
render:function(){
    return "<div id='box'/>";
}

// 正确示例:
render:function(){
    return "<div id='box'></div>";
}
~~~


[Custom editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)


## 示例

以下是如何构建这样一个自定义编辑器的例子:

![custom_editor](/img/custom_editor.png)
  

~~~js
scheduler.form_blocks["my_editor"]={
    render:function(sns){
        return "<div class='dhx_cal_ltext'>" +
            "Text&nbsp;<input name='text' type='text'>

" +
            "Details&nbsp;<input name='location' type='text'></div>";
    },
    set_value:function(node,value,ev){
        node.querySelector("[name='text']").value = value||"";
        node.querySelector("[name='location']").value= ev.location||"";
    },
    get_value:function(node,ev){
        ev.location = node.querySelector("[name='location']").value;
        return node.querySelector("[name='text']").value;
    },
    focus:function(node){
        var input = node.querySelector("[name='text']"); 
        input.select(); 
        input.focus(); 
    }
};

scheduler.locale.labels.section_description = "Details";
scheduler.config.lightbox.sections="["    
    { name:"description", map_to:"text", type:"my_editor" , focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~


[Custom editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)
