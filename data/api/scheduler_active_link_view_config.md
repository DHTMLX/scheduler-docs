active_link_view
=============
@short:'says' to present the numbers of days in the Month view as clickable links that open the related day in the specified view
	

@type: string
@example:
scheduler.config.active_link_view = "week"; //where we'll jump from the Month view
...
scheduler.init('scheduler_here',new Date(2012,7,6),"month");

@template:	api_config
@default:day

@views:month
@descr:
{{note The property requires the [active_links](extensions_list.md#activelinks) plugin to be activated.}}

The property should be set to the name of the view you want to open month's days in.

@relatedsample:
    03_extensions/06_links_plugin.html
	09_api/07_highlighted_timespans_month_view.html
@related:
	month_view.md#presentingdaysnumbersasclickablelinks

@apigroup: Views
