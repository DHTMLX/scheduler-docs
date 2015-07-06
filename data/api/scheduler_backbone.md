backbone
=============
@short:makes the scheduler reflect all data changes in the Backbone model and vice versa
	

@params:
- events	Backbone collection		the Backbone data collection


@example:
$(".myscheduler").dhx_scheduler({
	date:new Date(2009,5,25),
	mode:"month"
});

scheduler.backbone(events);


@template:	api_method

@related:
	backbone_integration.md
@relatedsample:
	10_integration/07_backbone.html

@descr:

