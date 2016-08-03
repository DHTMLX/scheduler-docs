multisection
=============
@short: enables the possibility to render the same events in several sections of the Timeline or Units view
	

@type: boolean
@example:
scheduler.config.multisection = true; 

scheduler.init('scheduler_here', new Date(2012, 5, 30), "timeline");

@template:	api_config
@descr:

@related:
	units_view.md#displayingthesameeventsinseveralunits
    timeline_view.md#displayingthesameeventsinseveralsections
@relatedsample:
	12_multisection_events/01_multisection_events.html
@relatedapi:
	api/scheduler_multisection_shift_all_config.md
@views:timeline, units
@default:  false


@edition:pro

@apigroup: Events/Multisection events