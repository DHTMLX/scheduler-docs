min_grid_size
=============


@short:
	defines the minimal possible size of the Grid view during autoresize
    
@default:25
@type: number
@example:
scheduler.config.min_grid_size = 30;

@template:	api_config
@descr:
{{note The property requires the [container_autoresize](extensions_list.md#containerautoresize) plugin to be enabled.}} 

@changelog:
added in version 4.4

@relatedapi:
api/scheduler_container_autoresize_config.md
api/scheduler_min_map_size_config.md

@related:
extensions_list.md#containerautoresize
grid_view.md

@edition: pro