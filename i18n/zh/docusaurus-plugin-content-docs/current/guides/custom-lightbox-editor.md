---
title: "自定义灯箱控件"
sidebar_label: "自定义灯箱控件"
---

# 自定义灯箱控件

要创建一个自定义控件（编辑器），请按如下方式定义一个新对象：

~~~js
scheduler.form_blocks["my_editor"]={
    render:function(config){ // config- section configuration object
        const height="(config.height||50)+""px";
        return "<div class='dhx_cal_ltext' style='height:"+height+";'>" + 
            "<textarea></textarea></div>";
    },
    set_value:function(node,value,ev,config){
        // node - HTML object related to HTML defined above
        // value - value defined by map_to property
        // ev - event object
        // config - section configuration object
        node.querySelector("textarea").value = value || "";
    },
    get_value:function(node,ev,config){
        // node - HTML object related to HTML defined above
        // event object
        // config - section configuration object
        return node.querySelector("textarea").value;
    },
    focus:function(node){
        // node - HTML object related to HTML defined above
        node.querySelector("textarea").focus();
    }
};
~~~

Usage:

~~~js
scheduler.locale.labels.section_details = "Details";
scheduler.config.lightbox.sections = [ 
    { name:"details", height:35, map_to:"text", type:"my_editor", focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~

请确保不要在由 "render" 函数返回的 HTML 代码中使用短闭合标签语法，因为这可能在浏览器中引发解析问题：

~~~js
// bad:
render:function(){
    return "<div id='box'/>";
}

// good:
render:function(){
    return "<div id='box'></div>";
}
~~~


[灯箱中的自定义编辑器](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)


## 示例

让我们考虑如何创建以下自定义编辑器：

![custom_editor](/img/custom_editor.png)
  

~~~js
scheduler.form_blocks["my_editor"]={
    render:function(sns){
        return "<div class='dhx_cal_ltext' style='height:60px;'>" +
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
        const input = node.querySelector("[name='text']"); 
        input.select(); 
        input.focus(); 
    }
};

scheduler.locale.labels.section_description = "Details";
scheduler.config.lightbox.sections = [    
    { name:"description", map_to:"text", type:"my_editor" , focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~


[灯箱中的自定义编辑器](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)