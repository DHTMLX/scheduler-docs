---
title: "사용자 정의 라이트박스 컨트롤"
sidebar_label: "사용자 정의 라이트박스 컨트롤"
---

# 사용자 정의 라이트박스 컨트롤

사용자 정의 컨트롤(에디터)을 만들려면 아래와 같이 새 객체를 정의합니다:

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

확인하십시오, HTML 코드의 "render" 함수에서 반환되는 태그의 짧은 닫힘 구문(short closing syntax)을 사용하지 마십시오. 이는 브라우저에서 구문 분석 문제를 일으킬 수 있습니다:

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


[라이트박스에서의 커스텀 에디터](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)


## 예제

다음과 같은 커스텀 에디터를 만드는 방법을 살펴보겠습니다:

![커스텀 에디터](/img/custom_editor.png)
  

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


[라이트박스에서의 커스텀 에디터](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)