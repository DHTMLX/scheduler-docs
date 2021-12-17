fix_tab_position
=============

@short:moves views' tabs from the left to the right side
	

@type: boolean
@views:day, week, units

@default:true
@example:
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config

@related:
	scheduler_markup.md#tabspositioning
@relatedsample:
	07_skins/01_default.html
    
@descr:    
The property is available from version 3.5.    

By default, the ['dhx_terrace'-skinned scheduler](skins.md#dhxterraceskin) presents the views tabs on the left side. To place the tabs on the right side - set the option to *false*.

@apigroup: General setting/View settings
