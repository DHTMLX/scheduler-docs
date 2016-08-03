xml_date
=============
@short:sets the date format that is used to parse data from the data set 
	

@type:string
@example:
scheduler.config.xml_date="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2010,0,10),"week");
scheduler.load("./data/events.xml");

@template:	api_config
@descr:

@default:%m/%d/%Y %H:%i
@related:
	settings_format.md
@relatedsample:
	01_initialization_loading/01_basic_init.html
    01_initialization_loading/02_hour_scale_format.html
    
@apigroup: Date format