wide_form
=============
@short: enables/disables displaying the standard (wide) lightbox instead of the short one
	

@type: boolean
@default: true - for the default skin, false - for 'classic' and 'glossy' skins 
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

<img src="api/wideForm_property.png"/>

@relatedsample:
	07_skins/01_default.html
    07_skins/11_glossy_alt_rec.html
