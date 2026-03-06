---
title: "dhtmlxLayout와의 통합"
sidebar_label: "dhtmlxLayout와의 통합"
---

# dhtmlxLayout와의 통합

dhtmlxLayout를 사용하면 [여러 개의 스케줄러](guides/multiple-per-page.md)를 한 페이지에 효과적으로 배치할 수 있습니다. dhtmlxLayout는 세련된 프레임을 제공하며, 페이지 크기 변화에 유연하게 적응하면서 다른 페이지 요소와의 상호작용을 관리하는 데 도움을 줍니다.

:::note
dhtmlxLayout는 dhtmlxScheduler 라이브러리에 포함되어 있지 않습니다. 사용하는 dhtmlxSuite 라이브러리 버전에 따라 두 가지 버전의 Layout이 제공됩니다.
:::

## dhtmlxSuite v5+

이 버전에서는 dhtmlxLayout를 독립형 제품 또는 dhtmlxSuite 라이브러리의 일부로 사용할 수 있습니다. 프로젝트에 dhtmlxLayout v5.X를 포함하려면 [라이선스 구매](https://dhtmlx.com/docs/products/dhtmlxSuite5/)가 필요합니다.

**dhtmlxScheduler 인스턴스를 레이아웃 셀에 추가하려면** [attachScheduler()](https://docs.dhtmlx.com/api__dhtmlxcell_attachscheduler.html) 메서드를 사용하세요.
  
**참고:** 스케줄러를 셀에 연결하면 자동으로 초기화됩니다. 따라서, 스케줄러를 레이아웃에 추가하기 전에 먼저 설정을 구성해야 합니다.

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


[Integration with dhtmlxLayout (dhx_terrace skin, Suite v5.1)](https://docs.dhtmlx.com/scheduler/samples/10_integration/05_dhtmlxlayout_terrace.html)


## dhtmlxSuite v6+

dhtmlxSuite 6.0부터는 dhtmlxLayout가 전체 Suite 라이브러리의 일부로만 제공됩니다. 이 방식을 사용하려면 [Suite 6.X 라이브러리](https://dhtmlx.com/docs/products/dhtmlxSuite/#licensing)에 대한 라이선스가 필요합니다.

[버전 5.3](guides/what-s-new.md#53)부터 dhtmlxScheduler는 dhtmlxSuite v6+와 호환되는 공통 View 인터페이스를 구현하여 [어떤 셀에도 직접 연결](https://docs.dhtmlx.com/suite/layout/api/cell/layout_cell_attach_method/)할 수 있습니다.

~~~js
// 스케줄러 인스턴스 생성 및 설정
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

// 스케줄러가 연결된 후 onSchedulerReady가 발생합니다
scheduler.attachEvent("onSchedulerReady", function () {
    requestAnimationFrame(function(){
        // 여기서 초기 뷰와 날짜를 설정하고 데이터를 로드할 수 있습니다
        scheduler.setCurrentView(new Date(2017,5,3), "week");
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

### 주의 사항

- `dhtmlxSuite Layout`은 비동기적으로 동작하므로, `.attach`를 호출한 직후에는 스케줄러가 바로 준비되지 않습니다.
- 초기화 이후 작업을 수행하려면 "onSchedulerReady" 이벤트를 반드시 감지해야 합니다.
- 현재 **dhtmlxSuite v6+와 함께 사용할 때 스케줄러 마크업을 지정하는 옵션은 없습니다**. 따라서 내비게이션 패널의 컨트롤은 [header](api/config/header.md) 설정을 통해 구성해야 합니다.
