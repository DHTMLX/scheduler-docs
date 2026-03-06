---
title: "Custom Lightbox Control"
sidebar_label: "Custom Lightbox Control"
---

# Custom Lightbox Control

사용자 정의 컨트롤(에디터)을 설정하려면 다음과 같이 새로운 객체를 정의합니다:

~~~js
scheduler.form_blocks["my_editor"]={
    render:function(config){ // config - section configuration object
        var height="(config.height||50)+""px";
        return "<div class='dhx_cal_ltext' style='height:"+height+";'>" + 
            "<textarea></textarea></div>";
    },
    set_value:function(node,value,ev,config){
        // node - 위에서 정의한 HTML과 연결된 HTML 요소
        // value - map_to 속성에 지정된 값
        // ev - 이벤트 객체
        // config - section configuration object
        node.querySelector("textarea").value = value || "";
    },
    get_value:function(node,ev,config){
        // node - 위에서 정의한 HTML과 연결된 HTML 요소
        // event object
        // config - section configuration object
        return node.querySelector("textarea").value;
    },
    focus:function(node){
        // node - 위에서 정의한 HTML과 연결된 HTML 요소
        node.querySelector("textarea").focus();
    }
};
~~~

사용 방법:

~~~js
scheduler.locale.labels.section_details = "Details";
scheduler.config.lightbox.sections="["    
    { name:"details", height:35, map_to:"text", type:"my_editor", focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~

"render" 함수에서 반환하는 HTML 내부에 self-closing 태그를 사용하지 않는 것이 **중요**합니다. 그렇지 않으면 브라우저 파싱에 문제가 발생할 수 있습니다:

~~~js
// 잘못된 예:
render:function(){
    return "<div id='box'/>";
}

// 올바른 예:
render:function(){
    return "<div id='box'></div>";
}
~~~


[Custom editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)


## 예제

다음은 이와 같은 사용자 정의 에디터를 만드는 예제입니다:

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
