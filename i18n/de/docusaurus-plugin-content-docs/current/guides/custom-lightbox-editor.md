---
title: "Benutzerdefiniertes Lightbox-Control"
sidebar_label: "Benutzerdefiniertes Lightbox-Control"
---

# Benutzerdefiniertes Lightbox-Control

Um ein benutzerdefiniertes Control (Editor) einzurichten, definieren Sie ein neues Objekt wie folgt:

~~~js
scheduler.form_blocks["my_editor"]={
    render:function(config){ // config - Abschnittskonfigurationsobjekt
        var height="(config.height||50)+""px";
        return "<div class='dhx_cal_ltext' style='height:"+height+";'>" + 
            "<textarea></textarea></div>";
    },
    set_value:function(node,value,ev,config){
        // node - HTML-Element, das mit dem oben definierten HTML verknüpft ist
        // value - Wert, der durch die map_to-Eigenschaft angegeben wird
        // ev - Ereignisobjekt
        // config - Abschnittskonfigurationsobjekt
        node.querySelector("textarea").value = value || "";
    },
    get_value:function(node,ev,config){
        // node - HTML-Element, das mit dem oben definierten HTML verknüpft ist
        // ev - Ereignisobjekt
        // config - Abschnittskonfigurationsobjekt
        return node.querySelector("textarea").value;
    },
    focus:function(node){
        // node - HTML-Element, das mit dem oben definierten HTML verknüpft ist
        node.querySelector("textarea").focus();
    }
};
~~~

Verwendung:

~~~js
scheduler.locale.labels.section_details = "Details";
scheduler.config.lightbox.sections="["    
    { name:"details", height:35, map_to:"text", type:"my_editor", focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~

Es ist wichtig, **keine** selbstschließenden Tags im HTML zu verwenden, das von der "render"-Funktion zurückgegeben wird, da dies zu Problemen beim Parsen durch den Browser führen kann:

~~~js
// schlecht:
render:function(){
    return "<div id='box'/>";
}

// gut:
render:function(){
    return "<div id='box'></div>";
}
~~~


[Custom editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)


## Beispiel

Hier ist ein Beispiel, wie ein solcher benutzerdefinierter Editor erstellt werden kann:

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
