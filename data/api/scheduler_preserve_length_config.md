preserve_length
=============
@short: preserves the visible length of an event while dragging along a non-linear time scale
	

@type: boolean
@default:true
@views:month, timeline
@example:
scheduler.config.preserve_length = true;


@template:	api_config
@descr:

Mode is enabled by default.

When the mode is enabled, an event preserves the visible length, instead of the actual length  (defined by start and end dates ) during the drag-and-drop operation.
<br> Let's assume that you have a two-day event in the Month view and the weekends are hidden. If you drag the event and place it to occupy Friday and Monday length, the real difference between start and end day will be 4 days, 
but the scheduler will preserve the visible length - 2 days. 

@apigroup: General settings/Scale