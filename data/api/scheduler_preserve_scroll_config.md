preserve_scroll
=============
@short:cancels preserving of the current scroll position while navigating between dates of the same view
	

@type: boolean
@default:true
@views:day, week, units
@example:
scheduler.config.preserve_scroll = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@descr:

- The property is available from version 3.0.
- The property refers to the cases when the user navigates dates of the view <br> through this navigation panel -> <img style="vertical-align:middle;" src="api/navigation_panel.png"/>.

@apigroup: Deneral settings
