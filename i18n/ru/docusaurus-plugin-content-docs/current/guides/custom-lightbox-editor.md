---
title: "Пользовательский контрол Lightbox"
sidebar_label: "Пользовательский контрол Lightbox"
---

# Пользовательский контрол Lightbox

Чтобы создать пользовательский контрол (редактор), определите новый объект следующим образом:

~~~js
scheduler.form_blocks["my_editor"]={
    render:function(config){ // config - объект конфигурации секции
        var height="(config.height||50)+""px";
        return "<div class='dhx_cal_ltext' style='height:"+height+";'>" + 
            "<textarea></textarea></div>";
    },
    set_value:function(node,value,ev,config){
        // node - HTML-элемент, связанный с определённой выше разметкой
        // value - значение, указанное в свойстве map_to
        // ev - объект события
        // config - объект конфигурации секции
        node.querySelector("textarea").value = value || "";
    },
    get_value:function(node,ev,config){
        // node - HTML-элемент, связанный с определённой выше разметкой
        // event object
        // config - объект конфигурации секции
        return node.querySelector("textarea").value;
    },
    focus:function(node){
        // node - HTML-элемент, связанный с определённой выше разметкой
        node.querySelector("textarea").focus();
    }
};
~~~

Использование:

~~~js
scheduler.locale.labels.section_details = "Details";
scheduler.config.lightbox.sections="["    
    { name:"details", height:35, map_to:"text", type:"my_editor", focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~

Важно **избегать** использования самозакрывающихся тегов внутри HTML, возвращаемого функцией "render", так как это может вызвать проблемы с парсингом в браузере:

~~~js
// плохо:
render:function(){
    return "<div id='box'/>";
}

// хорошо:
render:function(){
    return "<div id='box'></div>";
}
~~~


[Custom editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)


## Пример

Вот пример того, как создать подобный пользовательский редактор:

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
