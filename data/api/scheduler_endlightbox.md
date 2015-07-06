endLightbox
=============
@short: 
	closes the lightbox

@params: 
- mode	boolean		if set to <i>true</i>, the changes, made in the lightbox, will be saved before closing. <br> If - <i>false</i>, the changes will be cancelled.
* box	HTMLElement		the HTML container for the lightbox

@example: 
scheduler.endLightbox(false);
//or
scheduler.endLightbox(true, document.getElementById("my_form"));



@template:	api_method
@relatedsample:
	02_customization/16_custom_form.html
@descr: 
{{note
The method is used while creating a custom lightbox
}}



