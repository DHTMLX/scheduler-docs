readonly_form
=============
@short:activates the read-only mode for the lightbox
	

@type: boolean
@default:false

@example:
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"month");




@template:	api_config
@descr:
{{note The property requires the [readonly](extensions_list.md#readonly) plugin to be enabled.}}


@relatedapi:
	api/scheduler_readonly_config.md
@related:
	readonly.md
@relatedsample:
	03_extensions/12_readonly_form.html

@apigroup: General settings/Readonly mode	