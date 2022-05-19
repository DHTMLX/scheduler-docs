min_map_size
=============


@short:
	defines the minimal possible size of the Map view during autoresize

@default:400
@type: number
@example:
scheduler.config.min_map_size = 450;

@template:	api_config
@descr:
{{note The property requires the [container_autoresize](extensions_list.md#containerautoresize) plugin to be enabled.}} 

@changelog:
added in version 4.4


@relatedapi:
api/scheduler_container_autoresize_config.md
api/scheduler_min_grid_size_config.md

@related:
extensions_list.md#containerautoresize
map_view.md#maprelatedconfigurationoptions