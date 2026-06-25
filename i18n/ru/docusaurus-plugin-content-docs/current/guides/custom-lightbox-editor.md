---
title: "Пользовательский элемент управления лайтбокс"
sidebar_label: "Пользовательский элемент управления лайтбокс"
---

# Пользовательский элемент управления лайтбокс

Чтобы создать пользовательский контрол (редактор), определите новый объект следующим образом:

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
scheduler.config.lightbox.sections="["    
    { name:"details", height:35, map_to:"text", type:"my_editor", focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~

Убедитесь, что вы не используете укороченный синтаксис закрывающих тегов внутри HTML-кода, возвращаемого функцией render, поскольку это может вызвать проблемы с разбором в браузере:

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


[Пользовательский редактор в лайтбоксе](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)


## Пример

Рассмотрим, как создать следующий пользовательский редактор:

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
scheduler.config.lightbox.sections="["    
    { name:"description", map_to:"text", type:"my_editor" , focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~


[Пользовательский редактор в лайтбоксе](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)