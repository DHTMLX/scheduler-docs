---
title: "dhtmlxLayout와의 통합"
sidebar_label: "dhtmlxLayout와의 통합"
---

# dhtmlxLayout와의 통합

:::warning
설명된 기능은 더 이상 사용되지 않으며 유지 관리되지 않습니다.
:::

여러 개의 스케줄러를 페이지에 배치하는 좋은 방법은 dhtmlxLayout를 사용하는 것입니다. 이는 아름다운 프레임을 제공할 뿐만 아니라 페이지의 다른 요소와의 올바른 상호 작용을 보장하고, 페이지 크기 변경에 따라 작동하도록 합니다.

:::note
dhtmlxLayout은 dhtmlxScheduler 라이브러리의 일부가 아닙니다.
레이아웃의 버전에 따라 선택할 수 있는 두 가지 버전이 있으며, 이는 dhtmlxSuite 라이브러리의 버전에 따라 다릅니다.
::-

## dhtmlxSuite v5+

이 버전에서 dhtmlxLayout는 독립적인 제품으로 사용하거나 dhtmlxSuite 라이브러리의 일부로 사용할 수 있습니다. 응용 프로그램에서 dhtmlxLayout v5.X를 사용하려면 [라이선스 구매](https://dhtmlx.com/docs/products/dhtmlxSuite/)를 해야 합니다.

**To attach a dhtmlxScheduler instance to a layout cell**, use the [attachScheduler()] 메서드를 사용하세요.
  
**참고**: 셀에 스케줄러를 연결하면 자동으로 초기화됩니다. 따라서 레이아웃에 배치하기 전에 스케줄러를 구성하십시오.

~~~js
function init() {
    const dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    sched1 = Scheduler.getSchedulerInstance();
    sched1.config.multi_day = true;
    dhxLayout.cells("a").attachScheduler(new Date(2027,05,30),"week",null,sched1);
    sched1.load("/data/units")
        
    sched2 = Scheduler.getSchedulerInstance();
    dhxLayout.cells("b").attachScheduler(new Date(2027,05,30),"month",null,sched2);
    sched2.load("/data/units")
}
~~~

[Integration with dhtmlxLayout (dhx_terrace skin, Suite v5.1)](https://docs.dhtmlx.com/scheduler/samples/10_integration/05_dhtmlxlayout_terrace.html)


## dhtmlxSuite v6+

dhtmlxSuite 6.0부터, dhtmlxLayout은 전체 Suite 라이브러리에서 별도로 얻을 수 없습니다.
이 방식으로 사용하려면 [Suite 6.X 라이브러리](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing)의 라이선스를 구매해야 합니다.

dhtmlxScheduler of [version 5.3](whats-new.md#53) and newer implements a common View interface used in dhtmlxSuite v6+ and can be
[attached to any cell directly](https://docs.dhtmlx.com/suite/layout/api/cell/layout_cell_attach_method/):

~~~js
// create and configure the scheduler instance
scheduler.config.header = [
   "day",
   "week",
   "month",
   "date",
   "prev",
   "today",
   "next"
];
scheduler.config.multi_day = true;

// after the scheduler is attached, onSchedulerReady will be fired
scheduler.attachEvent("onSchedulerReady", function () {
    requestAnimationFrame(function(){
        // here you can set the initial view and date and load the data
        scheduler.setCurrentView(new Date(2027,5,3), "week");
        scheduler.load("../common/events.json");
    });
    
});

const layout = new dhx.Layout("layout", {
    rows: [{
        id: "scheduler-cell",
        header: "Appointment Scheduler",
        html:"<div></div>"
    }]
});
layout.cell("scheduler-cell").attach(scheduler);
~~~



### Pay attention

- 주의: `dhtmlxSuite Layout`은 비동기식이며, `.attach` 호출 직후에 스케줄러가 초기화되지 않습니다.
- 초기화 이후 설정을 위해 onSchedulerReady를 캡처해야 합니다.
- 현재 dhtmlxSuite v6+와 함께 사용할 때 스케줄러 마크업을 지정하는 방법이 없으므로, 탐색 패널의 컨트롤을 지정하기 위해 [header](api/config/header.md) 구성을 사용해야 합니다.