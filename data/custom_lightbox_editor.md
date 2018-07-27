Custom Lightbox Control
====================================

To create  a custom control (editor), define a new object in the next way:

~~~js
scheduler.form_blocks["my_editor"]={
	render:function(config){ // config- section configuration object
		return "HTML code of the editor here";
	},
	set_value:function(node,value,ev,config){
		// node - HTML object related to HTML defined above
		// value - value defined by map_to property
		// ev - event object
        // config - section configuration object
		... code to set value to the element ...
	},
	get_value:function(node,ev,config){
		// node - HTML object related to HTML defined above
		// event object
        // config - section configuration object
		return "current value from editor";
	},
	focus:function(node){
		// node - HTML object related to HTML defined above
		...code to set focus to the element...
	}
}
~~~

Make sure that you **don't** use the short closing syntax for tags inside the HTML code 
returned by the "render" function, since that might cause parsing problems in the browser:

~~~js
// this is WRONG
render:function(){
	return "<div id='box'/>";
}

// instead use opening and closing tags syntax:
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
		return "<div class='dhx_cal_ltext' style='height:60px;'>Text&nbsp;<input type='text'><br/>Details&nbsp;<input type='text'></div>";
	},
	set_value:function(node,value,ev){
		node.childNodes[1].value=value||"";
		node.childNodes[4].value=ev.details||"";
	},
	get_value:function(node,ev){
		ev.location = node.childNodes[4].value;
		return node.childNodes[1].value;
	},
	focus:function(node){
		var a=node.childNodes[1]; a.select(); a.focus(); 
	}
}
scheduler.config.lightbox.sections=[	
	{ name:"description", height:200, map_to:"text", type:"my_editor" , focus:true},
	{ name:"time", height:72, type:"time", map_to:"auto"}	
]
~~~

{{sample
	02_customization/05_custom_editor.html
}}