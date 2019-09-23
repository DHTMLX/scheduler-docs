Integration with dhtmlxLayout
=============================

A good way to place [multiple schedulers](multiple_per_page.md) on the page is using dhtmlxLayout. It not only provides a beautiful frame, but also ensures correct interacting
with other elements on the page and acting according to the page size changes. 

{{note Note that dhtmlxLayout is not a part of the dhtmlxScheduler library.
There are two versions of Layout you can choose from, depending on the version of the dhtmlxSuite library.}}

Layout v5.X
--------------------

In this version dhtmlxLayout can be used as a separate product or as a part of the dhtmlxSuite library. To use dhtmlxLayout v5.X in your application, you should 
[purchase the license](https://dhtmlx.com/docs/products/dhtmlxSuite5/).


**To attach a dhtmlxScheduler instance to a layout cell**, use the [attachScheduler()](https://docs.dhtmlx.com/api__dhtmlxcell_attachscheduler.html) method.
  
**Note**, attaching scheduler to a cell automatically initializes it. So, configure scheduler before placing it into the layout.

~~~js
function init() {
	var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

	sched1 = Scheduler.getSchedulerInstance();
	sched1.config.multi_day = true;
	dhxLayout.cells("a").attachScheduler(new Date(2019,05,30),"week",null,sched1);
	sched1.load("/data/units")
		
	sched2 = Scheduler.getSchedulerInstance();
	dhxLayout.cells("b").attachScheduler(new Date(2019,05,30),"month",null,sched2);
	sched2.load("/data/units")
}
~~~

{{sample
	10_integration/05_dhtmlxlayout_terrace.html
}}

Layout v6.X
------------------------

In this version dhtmlxLayout can only be used as a part of the dhtmlxSuite library. To use dhtmlxLayout v6.0 in your application, you should purchase the license of
the [Suite 6.X library](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing).


{{todo complete 2nd section}}