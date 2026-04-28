---
title: "iCal 내보내기/가져오기"
sidebar_label: "iCal 내보내기/가져오기"
---

# iCal 내보내기/가져오기

:::note
이 도구는 더 이상 사용되지 않으며 지원되지 않습니다. 따라서 애플리케이션에서 사용하지 마세요!
:::

레거시 exporter/importer는 PHP 기반이므로 아래의 코드 조각은 PHP 예제입니다. 다른 백엔드를 사용 중인 경우, 플랫폼의 iCalendar 라이브러리를 사용하고 필드를 Scheduler 이벤트 속성에 매핑하십시오.

iCal 형식의 데이터를 가져오기/내보내기할 수 있는 방법은 미리 준비된 유틸리티를 사용하거나 API 메서드를 사용하여 가능합니다. 

## iCal 내보내기(프런트엔드) 

![ical_exporter1.png](/img/ical_exporter1.png)

유틸리티의 프런트엔드은 두 부분으로 구성됩니다:

- **리소스 구성** 
- **데이터베이스 구성**.

첫 번째 부분에서 데이터의 경로를 설정합니다. 열려 있는 대화 상자에서 경로를 선택(%Ical 파일%, 버튼 "개요") 하거나 수동으로 지정할 수 있습니다 (**Ical URL**).
  
  
두 번째 부분에는 저장하고자 하는 iCal 데이터를 저장할 데이터베이스의 표준 설정( 호스트, 데이터베이스 및 테이블 이름, 사용자 이름과 비밀번호)들이 포함되어 있습니다. 또한 여기에서 이전 데이터를 삭제할지 여부를 설정할 수 있습니다 (**Delete all data** → **모든 데이터 삭제**).

## API 메서드

여기서는 앱에서 iCal 내보내기/가져오기를 구현하는 데 사용할 수 있는 모든 API 메서드를 확인할 수 있습니다.
 
### 초기화

iCal 내보내기/가져오기를 초기화하려면 다음 코드를 사용하세요:


~~~php
require_once("codebase/class.php");
$export = new ICalExporter();

~~~


### iCal 가져오기

다음 메서드를 사용하여 iCal 데이터를 가져올 수 있습니다:

- **setTitle($title)** - toICal() 메서드에서 iCal 파일의 제목을 설정합니다
- **getTitle()** - iCal 파일의 제목을 가져옵니다
- **toICal($events)** - 배열이나 XML 문자열의 정보를 icalendar 형식으로 변환합니다

### iCal 내보내기

다음 메서드를 사용하여 iCal 데이터를 내보낼 수 있습니다:

- **toHash($ical)** - iCal 문자열을 이벤트 배열로 변환합니다
- **toXML($ical)** - iCal 문자열을 XML 형식으로 변환합니다


#### 예제
여러 코드 조각이 iCal 내보내기/가져오기를 실행하는 방법을 여기에 제시합니다.


+ iCal 제목 설정

다음 코드는 가져오기/내보내기 iCalendar 데이터의 제목을 설정할 수 있게 해줍니다.

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$export->setTitle("Calendar name");
$ical = $export->toICal($xml);
file_put_contents("ical.ics", $ical);

~~~


+ 이벤트 배열

이벤트 배열은 배열로부터의 가져오기/내보내기 데이터에서 참조되는 예시입니다. 


~~~php
$events = array(
    array(
        "id" => 1,
        "start_date" => "2027-04-05 08:00:00",
        "end_date" => "2027-04-09 09:00:00",
        "text" => "text1",
        "rec_type" => "week_2___3,5",
        "event_pid" => null,
        "event_length" => 3600
    ),

    array(
        "id" => 2,
        "start_date" => "2027-04-06 12:00:00",
        "end_date" => "2027-04-06 18:00:00",
        "text" => "text2",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 3,
        "start_date" => "2027-04-07 12:00:00",
        "end_date" => "2027-04-07 18:00:00",
        "text" => "text3",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 4,
        "start_date" => "2027-04-08 12:00:00",
        "end_date" => "2027-04-08 18:00:00",
        "text" => "text4",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    )
);

~~~


+ 배열에서 iCal로

다음 코드를 사용하여 배열에서 iCal 문자열로 데이터를 내보내세요:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($events);
file_put_contents("ical.ics");

~~~


+ XML에서 iCal로

다음 코드를 사용하여 XML 데이터를 iCal로 내보내세요:

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($xml);
file_put_contents("ical.ics");

~~~


+ iCal에서 배열로

다음 코드를 사용하여 iCal 데이터를 배열로 변환합니다:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$events = $export->toHash($ical);

~~~


+ iCal에서 XML로

다음 코드를 사용하여 iCal 데이터를 XML로 변환합니다:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$xml = $export->toXML($ical);
file_put_contents("events_rec.xml", $xml);

~~~