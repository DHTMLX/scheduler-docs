---
title: "백엔드 통합 문제 해결"
sidebar_label: "백엔드 통합 문제 해결"
---

# 백엔드 통합 문제 해결

## 증상

1. 백엔드 API를 직접 구현하거나 [튜토리얼](integrations/howtostart-guides.md)을 따라 구현했을 때, Scheduler가 페이지에 이벤트를 표시하지 않습니다.

또는

2. 백엔드에 변경사항을 저장하는 데 문제가 있습니다.

## 원인

플랫폼별로 잘못된 동작의 원인과 해결책이 다양할 수 있으며, 이 글에서는 모두 다루지 않습니다.

여기서는 이러한 문제를 조사할 때 따라야 할 일반적인 단계를 안내합니다. 문제의 원인을 파악하고 이해하면, 대부분 쉽게 해결할 수 있습니다.

## 페이지의 에러 메시지 확인

1. 브라우저의 개발자 도구를 열고 페이지를 새로고침하세요. 콘솔에 에러 메시지가 표시되나요?

![Errors check](/img/errors_check.png)

2. 에러가 나타나면, 직접 해결할 수 있는지 확인하세요. 어렵다면 다음 단계로 진행하세요.

## 클라이언트의 요청 확인

1. **Network** 패널을 열고 *XHR* 요청이 표시되는지 확인하세요.

2. 페이지를 새로고침하고, 백엔드에서 데이터를 불러오는 요청을 찾으세요. 올바른 URL로 요청되는지, 응답 상태를 확인하세요.

![Requests check](/img/requests_check.png)

에러가 있나요?

404 상태는 `scheduler.init` 메서드에 전달된 URL이 잘못되었거나, 애플리케이션의 라우팅 설정에 문제가 있음을 의미합니다.

## 서버의 응답 확인

요청을 선택한 후, 응답 미리보기 또는 원본 응답 내용을 확인하세요.

![Response check](/img/response_check.png)

응답이 [예상 데이터 형식](guides/data-formats.md)과 유사한가요?

### Scheduler 데이터 대신 서버 에러 메시지가 보일 경우

이는 백엔드 코드나 데이터베이스 연결 설정에 문제가 있음을 나타냅니다.

일반적으로 에러 응답에는 원인을 파악할 수 있는 충분한 정보가 포함되어 있습니다. 만약 일반적인 `500 server error`만 보인다면, 실제 에러를 확인하기 위해 서버의 커스텀 에러 페이지를 임시로 비활성화해야 할 수도 있습니다. 이 과정은 플랫폼마다 다릅니다. 잘 모르겠다면 "disable custom error page in (your server or framework)"로 검색해보세요.

### 데이터가 대체로 올바르게 보일 경우

`id`, `start_date`, `end_date` 속성을 꼼꼼히 확인하세요.

- `id` - id가 같은 이벤트는 병합됩니다. id가 같은 이벤트가 5개라면, 하나만 표시됩니다.
- `start_date`, `end_date` - 날짜 형식이 [date_format](api/config/date_format.md)에 지정된 Scheduler 설정과 일치하는지 확인하세요.

[데이터 속성에 대한 자세한 내용](guides/loading-data.md#data-properties).

날짜 형식이 Scheduler의 예상과 다르면, 이벤트의 날짜가 유효하지 않아 표시되지 않거나 잘못된 날짜로 이동될 수 있습니다.

보통 `xml_date`는 다음과 같이 `scheduler.init` 전에 설정합니다:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
~~~

### 속성 값에 이상이 있을 경우

데이터베이스에 저장된 데이터를 확인하세요. 문제가 데이터베이스에 있을 가능성이 높습니다. 날짜 형식이 맞지 않으면, [date_format](api/config/date_format.md) 설정을 수정하거나, 클라이언트로 전송하기 전에 작업 날짜를 직렬화하는 코드를 조정하세요.

## Scheduler에 로드된 데이터 확인

### 잘못된 날짜 형식

1. 브라우저 콘솔을 열고 `scheduler.getEvents()`를 실행하세요.

2. 콘솔 출력에서 이벤트 배열을 확인하세요.

![Data check](/img/data_check.png)

몇몇 레코드의 `start_date`와 `end_date` 필드를 살펴보세요. `invalid date`나 1970년, 2038년 등 예상치 못한 값이 보이면, [date_format](api/config/date_format.md) 형식에 문제가 있는 것입니다.

:::note
[recurring extension](guides/recurring-events.md)을 사용하는 경우, [scheduler.getEvents()](api/method/getevents.md)는 `from`/`to` 날짜 파라미터를 지정하지 않으면 데이터를 반환하지 않습니다. 이 확인을 위해서는 recurring events extension을 페이지에서 제거해보세요.
:::

### Units/Timeline에 필요한 속성 누락

[Units](views/units.md) 또는 [Timeline](views/timeline.md) 뷰를 사용하는 경우, 이벤트가 해당 유닛이나 타임라인의 섹션에 할당되지 않으면 표시되지 않을 수 있습니다.

이 경우, [Units view](views/units.md#skippingeventsthatdontbelongtoanyoftheunits)에 `skip_incorrect:false`를 설정할 수 있습니다:

~~~js
scheduler.createUnitsView({
    name:"unit",
    ...
    skip_incorrect:false
});
~~~

또는 [Timeline view](api/method/createtimelineview.md)에는 `show_unassigned: true`를 설정하세요:

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
    show_unassigned: true
});
~~~

이렇게 하면, 설정을 업데이트하고 새로고침하면 이벤트가 Units/Timeline 뷰의 첫 번째 섹션에 표시됩니다. 그런 다음 Units 또는 Timeline 뷰의 `property` 또는 `y_property` 옵션과 이벤트의 해당 속성을 확인하세요.

### 필터

명확한 문제가 보이지 않는다면, 코드에서 [필터에 의해 이벤트가 숨겨진 것](guides/filtering.md)은 아닌지 확인하세요.

## 최후의 수단

위 단계로도 해결되지 않거나, 이벤트나 콘솔 에러가 전혀 나타나지 않는다면 [포럼에 질문을 남기시거나](https://forum.dhtmlx.com/c/scheduler-all), 기술 지원팀에 문의하세요.

문제 해결 과정에서 수집한 모든 정보를 함께 제공해 주세요.

또한, 저희 팀에서는 최소한의 재현 가능한 데모가 필요합니다. 즉, 간단한 앱(스케줄러 페이지, 필요한 모든 파일, 테스트 데이터가 포함된 데이터베이스 덤프 또는 로드하려는 데이터가 담긴 static JSON 파일) 패키지 또는 브라우저에서 직접 문제를 확인할 수 있는 온라인 링크가 필요합니다.
