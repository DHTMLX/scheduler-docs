---
title: "dhtmlxDataStore와의 통합"
sidebar_label: "dhtmlxDataStore와의 통합"
---

# dhtmlxDataStore와의 통합

이 문서에서는 [dhtmlXDataStore](https://docs.dhtmlx.com/datastore__index.html) 객체를 사용하여 [여러 개의 스케줄러](guides/multiple-per-page.md)를 동기화하는 방법을 다룹니다. 스케줄러들은 이 공유 저장소에서 데이터를 받아오기 때문에, 한 스케줄러에서 이벤트가 변경되면 다른 스케줄러에도 자동으로 업데이트됩니다.

:::note
참고: dhtmlxDataStore는 [dhtmlxSuite5](https://dhtmlx.com/docs/products/dhtmlxSuite5/) 패키지의 일부이며, 기본적으로 dhtmlxScheduler에는 포함되어 있지 않습니다. 하지만 dhtmlxSuite 라이선스가 없어도 dhtmlxDataStore를 dhtmlxScheduler와 함께 무료로 사용할 수 있습니다. 아래 단계를 따라 앱에 설정해보세요.
:::

- [dhtmlxDataStore 패키지 다운로드](https://files.dhtmlx.com/30d/33230caa09f4b5030ea5bfe374ef6d57/dhtmlxDataStore.zip)
- 페이지에서 dhtmlxscheduler.js를 로드한 후 *dhtmlxcommon.js*와 *datastore.js*를 추가하세요. 반드시 아래와 같은 순서를 지켜야 합니다:

~~~js
<script src="dhtmlxscheduler.js"></script>
<script src="datastore/dhtmlxCommon/codebase/dhtmlxcommon.js"></script>
<script src="datastore/datastore.js"></script>
~~~

DataStore를 통해 스케줄러를 동기화하는 일반적인 방법은 다음과 같습니다:

~~~js
function init() {
    var data = new dhtmlXDataStore({
        url:"data/data.json",
        scheme:{
            $init:function(obj){
                if (typeof obj.start_date == "string"){
                    obj.start_date = scheduler.templates.parse_date(obj.start_date);
                    obj.end_date = scheduler.templates.parse_date(obj.end_date);
                }
            }
        }
    });

    scheduler1 = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2019,05,12),"week");
    scheduler1.sync(data, { copy:true });
    

    scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_too',new Date(2019,05,12),"month");
    scheduler2.sync(data, { copy:true });
}
~~~

위 코드에서 일어나는 과정을 간단히 설명하면 다음과 같습니다:

1. 먼저, dhtmlXDataStore를 일반적인 방식으로 초기화합니다. 자세한 내용은 [Initialization](https://docs.dhtmlx.com/datastore__initialization.html) 및 [Data scheme](https://docs.dhtmlx.com/datastore__data_scheme.html) 항목을 [dhtmlXDataStore 문서](https://docs.dhtmlx.com/datastore__index.html)에서 확인할 수 있습니다.
2. 다음으로, 두 개의 스케줄러를 생성합니다. 일반적인 방식으로 생성하되, [sync](https://docs.dhtmlx.com/api__datastore_sync.html) 메서드를 사용하여 DataStore와 연결합니다.

[sync](https://docs.dhtmlx.com/api__datastore_sync.html) 메서드는 스케줄러를 DataStore와 연결하며, 두 개의 파라미터를 받습니다:

+ **data** - (필수) 스케줄러에 데이터를 제공하는 dhtmlXDataStore 인스턴스입니다.
+ **(copy:true)** -  (필수) 스케줄러가 DataStore 데이터의 복사본을 생성하도록 지정합니다.

두 번째 파라미터는 dhtmlxScheduler에만 해당하는 옵션으로, dhtmlXDataStore 공식 문서에는 나와 있지 않으니 주의가 필요합니다.

이 옵션은 각 스케줄러에 대해 데이터의 별도 복사본을 만들도록 DataStore에 지시합니다. 따라서 위 예시에서 _DataStore_, _scheduler1_, _scheduler2_는 각각 자체 데이터셋을 유지하게 됩니다. 하지만 이러한 데이터셋을 직접 동기화할 필요는 없습니다. 한 스케줄러에서 변경이 발생하면 DataStore를 통해 다른 스케줄러의 데이터셋도 자동으로 업데이트됩니다.

결과가 같아 보이는데 왜 이런 추가 단계가 필요한지 궁금할 수 있습니다.

이유는 다음과 같습니다: 이벤트의 주요 속성 외에도, 각 이벤트에는 Scheduler가 실행 중에 할당하는 여러 내부 속성이 있습니다. 이 내부 속성들은 현재 선택된 뷰에 따라 달라질 수 있습니다. 예를 들어, 동일한 이벤트가 두 스케줄러에서 서로 다른 뷰로 표시되고 있다면, 내부 속성값이 일치하지 않아 이벤트가 잘못 표시될 수 있습니다.

이런 경우, (**(copy:true)**) 파라미터를 사용하면 적절한 데이터 처리가 이루어져 이러한 문제를 방지할 수 있습니다. 그리고 이 외에도 데이터를 복제하는 것이 유용한 경우가 있습니다.

예를 들어, 한 페이지에 두 개의 스케줄러가 같은 이벤트를 서로 다른 시간대(예: 모스크바와 런던)로 보여줘야 한다면, 하나의 데이터셋을 공유하는 방식으로는 올바르게 표시하기 어렵습니다. 각 스케줄러에 별도의 데이터셋을 두면 두 시간대 모두에서 이벤트를 올바르게 보여줄 수 있습니다.


[Integration with dhtmlXDataStore](https://docs.dhtmlx.com/scheduler/samples/10_integration/04_datastore.html)
