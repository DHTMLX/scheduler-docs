Integration with Bootstrap
=============================

You can integrate the Scheduler library with the Bootstrap framework. To add Scheduler in a Bootstrap application follow the steps given below:

1\. Include the dhtmlxScheduler file to the app:

~~~html
<script src="../../codebase/dhtmlxscheduler.js" 
	type="text/javascript" charset="utf-8"></script>
~~~

2\. Specify the HTML markup for the Bootstrap elements and add a Scheduler container and header elements, as in:

~~~html
<div class="container-fluid">
	<div class="navbar navbar-inverse">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">dhtmlxScheduler</a>
		</div>
	</div>

	<!--A container for Scheduler-->
	<div class="dhx_cal_container panel" id="scheduler_here">    
  		<!--The standard set of  Scheduler 'divs'-->	
    </div>
</div>

~~~

3\. Initialize and configure Scheduler in a usual way:

~~~js
scheduler.plugins({
	year_view: true,
});
scheduler.config.first_hour = 8;
scheduler.config.limit_time_select = true;

scheduler.init('scheduler_here',new Date(2017,5,30),"week");
~~~

{{sample
10_integration/08_bootstrap.html
}}