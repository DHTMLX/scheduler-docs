lightbox_recurring
=============
@short:defines the lightbox's behavior, when the user opens the lightbox to edit a recurring event
	

@type: string
@require:recurring
@default:'ask'
@values:
- <b>ask</b> - before the lightbox is opened, a message box alerts and asks the user whether he will edit a certain instance or the entire recurring event.
- <b>instance</b> - the lightbox is opened straight for editing a certain instance of the event.
- <b>series</b> - the lightbox is opened straight for editing the entire recurring event.

@example:
scheduler.config.lightbox_recurring = 'series';
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");



@template:	api_config
@descr:
The parameter is available from version 3.5. 

@apigroup: Lightbox
