startLightbox
=============
@short: shows a custom lightbox in the specified HTML container centered on the screen

@params: 
- id 	string 	the event's id
- box	HTMLElement		the lightbox's HTML container 

@example: 
<div id="my_form">
	...
</div>

<script>
scheduler.showLightbox = function(id) {
	scheduler.startLightbox(id, document.getElementById("my_form"));
	...
};
</script>


@template:	api_method
@related:
	custom_details_form.md
@relatedapi:
	 api/scheduler_endlightbox.md
     api/scheduler_showlightbox.md
@relatedsample:
	02_customization/16_custom_form.html
@descr: 
To hide a custom lightbox you can use the api/scheduler_endlightbox.md method.





