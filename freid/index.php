	<!DOCTYPE HTML>
<html>
	<script src="./freid/scripts/freid.js" type="text/javascript" charset="utf-8"></script>
	<script src="./freid/scripts/jung.js" type="text/javascript" charset="utf-8"></script>
	<script src="./freid/scripts/berne.js" type="text/javascript" charset="utf-8"></script>
	<script src="./freid/scripts/webixcore.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" href="./freid/scripts/freid.css" type="text/css" media="screen" title="no title" charset="utf-8">

	<script src="../../scheduler/codebase/dhtmlxscheduler.js" type="text/javascript" charset="utf-8"></script>

	<script type="text/javascript">
		var google = { maps:{ 
			LatLng:function(){ return null; },
			MapTypeId:{ ROADMAP : 1 }
		} }; 

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

<script src='../../scheduler/codebase/ext/dhtmlxscheduler_dhx_terrace.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_recurring.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_active_links.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_agenda_view.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_expand.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_html_templates.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_key_nav.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_readonly.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_url.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_year_view.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_serialize.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_pdf.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_collision.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_minical.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_timeline.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_limit.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_outerdrag.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_map_view.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_week_agenda.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_treetimeline.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_multiselect.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_tooltip.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_editors.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_units.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_offline.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_all_timed.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_grid_view.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_quick_info.js'></script><script src='../../scheduler/codebase/ext/dhtmlxscheduler_container_autoresize.js'></script>
<script src='../../scheduler/codebase/ext/dhtmlxscheduler_mvc.js'></script>



	<script src="../../scheduler/sources/core/docs.js" type="text/javascript" charset="utf-8"></script>
	<script src="../index.php?action=freid" type="text/javascript" charset="utf-8"></script>

	<script type="text/javascript">
		function run_onload(){
			Freid.root = "";
			Freid.hideView = { };

			//fill templates
			scheduler.skin = "terrace";
			scheduler.ev_ontemplatesready = null;
			scheduler.init_templates();
			scheduler._skin_init();

			//private namespaces
			delete scheduler.lightbox;
			delete scheduler.grid;

			Freid.analize();
		};
	</script>
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
	</body>
</html> 