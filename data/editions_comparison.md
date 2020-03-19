Standard vs PRO Library Versions
================================

If you doubt what is the difference between the Standard and PRO versions of the dhtmlxScheduler library and want to know what bonuses you will get with the PRO edition, this guide is what you
are looking for.

The PRO edition includes all the functionality of the Standard version and also contains additional useful features. The table below provides the list of features and allows you to compare the two versions of dhtmlxScheduler.

<br>

<div id="showData"></div>    
  
<script type="text/javascript">
    var features = [
    	{"name":"Day/Week/Month/Year View\n","url":"views.html","standard":true,"pro":true},
    	{"name":"Timeline View\n","url":"timeline_view.html", "standard":false,"pro":true},
    	{"name":"Units View (Multiple Resource View)\n","url":"units_view.html","standard":false,"pro":true},
    	{"name":"Grid View\n","url":"grid_view.html","standard":false,"pro":true},
        {"name":"Week Agenda View\n","url":"weekagenda_view.html","standard":false,"pro":true},
    	{"name":"Agenda View\n", "url":"agenda_view.html","standard":true,"pro":true},
        {"name":"Map View\n", "url":"map_view.html","standard":true,"pro":true},
    	{"name":"Ability to define custom views\n","url":"custom_views.html","standard":true,"pro":true},
    	{"name":"Multisection Events\n","url":"api__scheduler_multisection_config.html","standard":false,"pro":true},
    	{"name":"Single/multi-day events\n","url":"api__scheduler_multi_day_config.html","standard":true,"pro":true},
    	{"name":"Recurring events\n","url":"recurring_events.html","standard":true,"pro":true},
    	{"name":"Multiple schedulers on page (<strong>Enterprise and Ultimate licenses only</strong>)\n","url":"multiple_per_page.html","standard":false,"pro":true},
    	{"name":"Customizable time scales\n", "url":"sizing.html","standard":true,"pro":true},
   	 	{"name":"Ability to specify color for hours/days in calendar\n","url":"limits.html","standard":true,"pro":true},
    	{"name":"Ability to block hours/days\n","url":"limits.html","standard":true,"pro":true},
    	{"name":"Powerful JavaScript API\n","url":"api__refs__scheduler.html","standard":true,"pro":true},
    	{"name":"Easy REST API integration\n","url":"server_integration.html","standard":true,"pro":true},
    	{"name":"Easy integration with Google and Outlook calendars\n","url":"google_calendar_integration.html","standard":true,"pro":true},
    	{"name":"iCal format support\n","url":"ical_export_import.html","standard":true,"pro":true},
    	{"name":"Bootstrap compatibility\n","url":"https://docs.dhtmlx.com/scheduler/samples/10_integration/08_bootstrap.html","standard":true,"pro":true},
    	{"name":"Ready to use backend integration libraries for PHP, ASP.NET, Java (dhtmlxConnector)\n","url":"server_integration.html","standard":true,"pro":true},
    	{"name":"Dynamic loading\n","url":"loading_data.html#dynamicloading","standard":true,"pro":true},
    	{"name":"Touch support\n","url":"touch_support.html","standard":true,"pro":true},
    	{"name":"Intuitive drag-and-drop interface\n","url":"dhtmlx_components_integration.html","standard":true,"pro":true},
    	{"name":"Keyboard navigation\n","url":"keyboard_navigation.html","standard":true,"pro":true},
    	{"name":"Export to XML, iCal, JSON, PDF/PNG\n","url":"data_export.html","standard":true,"pro":true},
    	{"name":"Accessibility features\n","url":"accessibility.html","standard":true,"pro":true},
    	{"name":"Multilingual (29 locales)\n","url":"localization.html","standard":true,"pro":true}
	]
  
    var col = ["Feature","Standard","PRO"];
   
    var table = document.createElement("table");

    var tr = table.insertRow(-1);                   

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

   	features.sort(function(a, b){ return a.name > b.name ? 1 : -1});

    for (var i = 0; i < features.length; i++) {

        tr = table.insertRow(-1);

        var tabCell = tr.insertCell(-1);
		var html = features[i].url ? ("<a href='" + features[i].url+ "'>" + features[i].name + "</a>") : features[i].name
		tabCell.innerHTML =html;

        var yes = "<span style='color: #04bd04;font-size: 15px;'>&#10004;</span>";
		var no = "<span style='color: #f58484;font-size: 15px;'>&#10006;</span>"

		var tabCell = tr.insertCell(-1);
		tabCell.style.textAlign = "center";
		tabCell.innerHTML = features[i].standard ? yes : no;

		var tabCell = tr.insertCell(-1);
		tabCell.style.textAlign = "center";
		tabCell.innerHTML = features[i].pro ? yes : no;

    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

</script>
