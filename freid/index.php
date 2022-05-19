	<!DOCTYPE HTML>
<html>
	<head>
		<link rel="stylesheet" href="./freid/scripts/freid.css" type="text/css" media="screen" title="no title" charset="utf-8">
		<script src="https://maps.google.com/maps/api/js?key=AIzaSyAmBpYILZc2Ktp2Qw8rRBX_ur7_qOGiJEk" type="text/javascript"></script>

	<script src="./freid/scripts/freid.js" type="text/javascript" charset="utf-8"></script>
	<script src="./freid/scripts/jung.js" type="text/javascript" charset="utf-8"></script>
	<script src="./freid/scripts/berne.js" type="text/javascript" charset="utf-8"></script>
	<script src="./freid/scripts/webixcore.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../scheduler/codebase/dhtmlxscheduler.js" type="text/javascript" charset="utf-8"></script>

	<script type="text/javascript">
		/*var google = { maps:{ 
			LatLng:function(){ return null; },
			MapTypeId:{ ROADMAP : 1 }
		} }; */

		(function(){
			var n =1;
			var original = scheduler.attachEvent;
			scheduler.attachEvent = function(){
				scheduler["_freid_"+n] = arguments[1];
				n++;
				return original.apply(this, arguments);
			}
		})();
	</script>
	<script>
		scheduler.plugins({
			recurring:true,
			active_links: true,
			agenda_view: true,
			expand: true,
			html_templates: true,
			key_nav: true,
			readonly: true,
			url: true,
			year_view: true,
			serialize: true,
			pdf: true,
			collision: true,
			minical: true,
			timeline: true,
			limit: true,
			outerdrag: true,
			map_view: true,
			week_agenda: true,
			treetimeline: true,
			multiselect: true,
			tooltip: true,
			editors: true,
			units: true,
			all_timed: true,
			grid_view: true,
			quick_info: true,
			container_autoresize: true,
			mvc: true
		});
	</script>
	<script src="../../scheduler/sources/core/docs.js" type="text/javascript" charset="utf-8"></script>
	<script src="../index.php?action=freid" type="text/javascript" charset="utf-8"></script>

	<script type="text/javascript">
		function run_onload(){
			Freid.root = "";
			Freid.hideView = { };

			//fill templates
			scheduler.skin = "terrace";

			scheduler.init("scheduler")

			Freid.analize();
		};
	</script>
	</head>
	<body onload="run_onload()">
	<div style="border-bottom: 1px dashed #909090; margin-bottom: 10px; padding-bottom: 10px;">
		<input type='button' value='Generate Docs' onclick="Freid.generate('touch')">
		<input type='button' value='Log Patients' onclick="Berne.checkProblems();">
		<span class="logoinfo">docBuilder // drunix edition</span>
	</div>
	<div id="test_div" style='display:none;'></div>
	<div id="test_div2" style='display:none;'></div>
	<div id="test_div3" style='display:none;'></div>
	<div id="berne_report"></div>
	<div id="stat" style='float:right'></div>
	<table border="0" cellspacing="1" cellpadding="1">
		<td align="left" valign="top" id="views_here_id"></td>
		<td align="left" valign="top" id="methods_here_id"></td>
	</table>
	<div id="scheduler" style="display:none">
	</body>
</html> 