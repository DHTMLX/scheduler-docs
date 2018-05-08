wide_form
=============

@short: enables/disables displaying of the standard (wide) lightbox instead of the short one
	

@type: boolean
@default: true


@example:
scheduler.config.wide_form = true;
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");

@template:	api_config
@descr:
{{note
The standard (wide) lightbox is initially enabled in the default skin and can't be switched to the short one
}}

<br>

- Standard lightbox

<img src="api/wide_form_false.png"/>

- Wide lightbox

<img src="api/wide_form_true.png"/>

@relatedsample:
	07_skins/01_default.html
   

@apigroup: Lightbox