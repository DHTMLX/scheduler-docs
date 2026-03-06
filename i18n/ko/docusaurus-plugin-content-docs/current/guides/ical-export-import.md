---
title: "iCal 내보내기/가져오기"
sidebar_label: "iCal 내보내기/가져오기"
---

# iCal 내보내기/가져오기 

:::note
**이 도구는 더 이상 지원되지 않으며, 사용이 중단되었습니다. 따라서, 애플리케이션에서 사용하지 마십시오!**
:::

iCal 형식의 데이터를 가져오거나 내보내려면, 준비된 유틸리티 또는 API 메서드를 사용할 수 있습니다.

## iCal 내보내기 도구 (프론트엔드) 

![ical_exporter1.png](/img/ical_exporter1.png)

유틸리티의 프론트엔드는 두 개의 섹션으로 구성되어 있습니다:

- **리소스 설정** 
- **데이터베이스 설정**

첫 번째 섹션에서는 데이터 경로를 지정합니다. 이는 열기 대화창에서 경로를 선택(**Ical file**, "Overview" 버튼)하거나, 직접 입력(**Ical URL**)하는 방법이 있습니다.
  
두 번째 섹션에는 iCal 데이터를 저장할 데이터베이스의 일반적인 설정(호스트, 데이터베이스 및 테이블명, 사용자명, 비밀번호)이 포함되어 있습니다. 또한, 기존 데이터를 삭제할지(**Delete all data**) 여부도 선택할 수 있습니다.

## API 메서드 

아래는 애플리케이션에서 iCal 내보내기/가져오기를 구현할 수 있는 API 메서드입니다.
 
### 초기화 

iCal 내보내기/가져오기 도구를 설정하려면 다음 코드를 사용하세요:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();

~~~

### iCalendar 가져오기

iCal 데이터를 가져올 때 사용하는 메서드는 다음과 같습니다:

- **setTitle($title)** - toICal() 메서드에서 iCal 파일의 제목을 지정합니다
- **getTitle()** - iCal 파일의 제목을 가져옵니다
- **toICal($events)** - 배열 또는 XML 문자열의 데이터를 iCalendar 형식으로 변환합니다

### iCalendar 내보내기

iCal 데이터를 내보낼 때 사용하는 메서드는 다음과 같습니다:

- **toHash($ical)** - iCal 문자열을 이벤트 배열로 변환합니다
- **toXML($ical)** - iCal 문자열을 XML 형식으로 변환합니다

#### 예시 
아래는 iCal 내보내기/가져오기를 수행하는 코드 예제입니다.

+ iCalendar 제목 설정

이 예제는 가져오거나 내보낼 iCalendar 데이터의 제목을 설정하는 방법을 보여줍니다.

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$export->setTitle("Calendar name");
$ical = $export->toICal($xml);
file_put_contents("ical.ics", $ical);

~~~

+ 이벤트 배열

이 예제는 배열을 사용하여 데이터를 가져오거나 내보내는 방법을 보여줍니다.

~~~php
$events = array(
    array(
        "id" => 1,
        "start_date" => "2010-04-05 08:00:00",
        "end_date" => "2012-04-09 09:00:00",
        "text" => "text1",
        "rec_type" => "week_2___3,5",
        "event_pid" => null,
        "event_length" => 3600
    ),

    array(
        "id" => 2,
        "start_date" => "2010-04-06 12:00:00",
        "end_date" => "2010-04-06 18:00:00",
        "text" => "text2",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 3,
        "start_date" => "2010-04-07 12:00:00",
        "end_date" => "2010-04-07 18:00:00",
        "text" => "text3",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 4,
        "start_date" => "2010-04-08 12:00:00",
        "end_date" => "2010-04-08 18:00:00",
        "text" => "text4",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    )
);

~~~

+ 배열에서 iCal로

이 코드 예제는 배열에서 iCal 문자열로 데이터를 내보내는 방법입니다:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($events);
file_put_contents("ical.ics");

~~~

+ XML에서 iCal로

이 예제는 XML 데이터를 iCal 형식으로 내보내는 방법을 보여줍니다:

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($xml);
file_put_contents("ical.ics");

~~~

+ iCal에서 배열로

이 예제는 iCal 파일의 데이터를 배열로 내보내는 방법을 보여줍니다:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$events = $export->toHash($ical);

~~~

+ iCal에서 XML로

이 예제는 iCal 파일의 데이터를 XML 형식으로 내보내는 방법을 보여줍니다:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$xml = $export->toXML($ical);
file_put_contents("events_rec.xml", $xml);

~~~
