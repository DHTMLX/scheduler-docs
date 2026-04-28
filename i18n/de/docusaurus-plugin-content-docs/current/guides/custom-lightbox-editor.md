--- 
title: "Benutzerdefinierte Lightbox-Steuerung" 
sidebar_label: "Benutzerdefinierte Lightbox-Steuerung" 
---

# Benutzerdefinierte Lightbox-Steuerung

Um eine benutzerdefinierte Steuerung (Editor) zu erstellen, definieren Sie ein neues Objekt wie folgt:

~~~js
scheduler.form_blocks["my_editor"]={
    render:function(config){ // config- Abschnitt-Konfigurationsobjekt
        const height="(config.height||50)+""px";
        return "<div class='dhx_cal_ltext' style='height:"+height+";'>" + 
            "<textarea></textarea></div>";
    },
    set_value:function(node,value,ev,config){
        // node - HTML-Objekt im Zusammenhang mit dem oben definierten HTML
        // value - Wert, der durch die map_to-Eigenschaft definiert ist
        // ev - Ereignisobjekt
        // config - Abschnitts-Konfigurationsobjekt
        node.querySelector("textarea").value = value || "";
    },
    get_value:function(node,ev,config){
        // node - HTML-Objekt im Zusammenhang mit dem oben definierten HTML
        // Ereignis-Objekt
        // config - Abschnitts-Konfigurationsobjekt
        return node.querySelector("textarea").value;
    },
    focus:function(node){
        // node - HTML-Objekt im Zusammenhang mit dem oben definierten HTML
        node.querySelector("textarea").focus();
    }
};
~~~

Verwendung:

~~~js
scheduler.locale.labels.section_details = "Details";
scheduler.config.lightbox.sections = [    
    { name:"details", height:35, map_to:"text", type:"my_editor", focus:true},
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~


Stellen Sie sicher, dass Sie die kurze Schlusssyntax für Tags im HTML-Code, der von der "render"-Funktion zurückgegeben wird, nicht verwenden, da dies Parsing-Probleme im Browser verursachen kann:

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

Betrachten wir, wie der folgende benutzerdefinierte Editor erstellt wird:

![Benutzerdefinierter Editor](/img/custom_editor.png)
  

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


[Custom editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)