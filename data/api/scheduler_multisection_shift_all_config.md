multisection_shift_all
=============
@short:specifies whether while dragging events that assigned to several sections of the Timeline or Units view, all  instances should be dragged at once ('true') or just the selected one ('false')
	

@type: boolean
@example:
scheduler.config.multisection_shift_all = false;

scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");

@template:	api_config
@descr:
{{note The property affects only dragging events vertically (between sections)}}

@related:
	units_view.md#displayingthesameeventsinseveralunits
    timeline_view.md#displayingthesameeventsinseveralsections
@relatedsample:
	12_multisection_events/01_multisection_events.html
@relatedapi:
	api/scheduler_multisection_config.md

@views:timeline,units
@default:true

@edition:pro

@apigroup: Events/Multisection events