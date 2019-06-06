Custom Lightbox Control
====================================

To create  a custom control (editor), define a new object in the next way:

~~~js
scheduler.form_blocks["my_editor"]={
	render:function(config){ // config- section configuration object
    	var height=(config.height||50)+"px";
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
scheduler.config.lightbox.sections=[	
	{ name:"details", height:35, map_to:"text", type:"my_editor", focus:true},
	{ name:"time", height:72, type:"time", map_to:"auto"}	
];
~~~

Make sure that you **don't** use the short closing syntax for tags inside the HTML code 
returned by the "render" function, since that might cause parsing problems in the browser:

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

{{sample
	02_customization/05_custom_editor.html
}}

##Example

Let's consider how to create the following custom editor:

<img src="custom_editor.png"/>
	

~~~js
scheduler.form_blocks["my_editor"]={
	render:function(sns){
		return "<div class='dhx_cal_ltext' style='height:60px;'>" +
        	"Text&nbsp;<input name='text' type='text'><br/>" +
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
scheduler.config.lightbox.sections=[	
	{ name:"description", map_to:"text", type:"my_editor" , focus:true},
	{ name:"time", height:72, type:"time", map_to:"auto"}	
];
~~~

{{sample
	02_customization/05_custom_editor.html
}}