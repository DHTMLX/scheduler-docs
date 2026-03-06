---
title: "Export to PDF (version 4.0)"
sidebar_label: "Export to PDF (version 4.0)"
---

# Export to PDF (version 4.0)

*이 문서는 dhtmlxScheduler 4.0 및 그 이전 버전에서의 내보내기 방법을 다룹니다. 4.1 이상 버전의 경우 [여기](export/pdf.md)에서 자세한 내용을 확인하세요.*

4.1 버전부터 dhtmlxScheduler는 PDF로 스케줄러를 내보내는 새로운 방법인 [온라인 내보내기 서비스](export/pdf.md#defaultexporttopdf)를 도입하였습니다.

## 설치

다양한 플랫폼용 패키지는 아래에서 확인할 수 있습니다:

- PHP 버전: [https://github.com/DHTMLX/scheduler-to-pdf-php](https://github.com/DHTMLX/scheduler-to-pdf-php)  
- Java 버전: [https://github.com/DHTMLX/scheduler-to-pdf-java](https://github.com/DHTMLX/scheduler-to-pdf-java)  
- .NET 버전: [https://github.com/DHTMLX/scheduler-to-pdf-net](https://github.com/DHTMLX/scheduler-to-pdf-net)


[Export to PDF [Legacy]](https://docs.dhtmlx.com/scheduler/samples/04_export/05_standalone_export.html)


## 필수 포함 파일

스케줄러 페이지에서 PDF 내보내기를 활성화하려면 해당 확장 기능을 활성화해야 합니다:

~~~js
scheduler.plugins({
    pdf: true
});
~~~

## 내보내기 실행

스케줄러 데이터를 PDF로 내보내려면 **toPDF()** 메서드를 호출하는 버튼을 추가합니다. 이 메서드는 미리 설치한 스크립트의 URL을 필요로 합니다:

~~~html
<input type="button" name="save" value="save" 
onclick="scheduler.toPDF('path/to/folder/generate.php')">
~~~

## 서비스 설정

내보내기 옵션 설정은 클라이언트와 서버 양쪽에서 조정이 필요합니다.

### 클라이언트 측

**toPDF()** 메서드는 내보내기 프로세스를 시작합니다:

~~~js
scheduler.toPDF(path, color, header, footer);
~~~

**파라미터:**

- _**path**_ - (_url_) PDF 생성을 담당하는 PHP 파일의 URL입니다. 자세한 내용은 [아래](export/pdf.md#serverside) 참고.
- _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) 색상 테마를 결정합니다:
    * '_color_' - 전체 컬러(기본값)
    * '_gray_' - 그레이스케일
    * '_bw_' - 흑백만 사용
    * '_custom_' - 사용자 지정 컬러맵 사용(PHP 커스터마이징 필요, [아래](export/pdf.md#serverside) 참고)
    * '_fullcolor_' - 스케줄러의 실제 배경 및 텍스트 색상 사용
- _**header**_ - (_boolean_, 선택) 페이지에 헤더를 포함할지 여부. 기본값은 _false_. 자세한 내용은 [아래](export/pdf.md#headerandfooter) 참고.
- _**footer**_ - (_boolean_, 선택) 페이지에 푸터를 포함할지 여부. 기본값은 _false_. 자세한 내용은 [아래](export/pdf.md#headerandfooter) 참고.

예를 들어, HTML 페이지에 아래와 같이 추가하면 그레이스케일 색상 테마로 **toPDF()**를 호출할 수 있습니다:

~~~js
scheduler.toPDF('path/to/folder/generate.php','gray');
~~~

## 서버 측

위에서 참조한 _generate.php_ 파일이 내보내기 옵션을 처리합니다.

최소한의 예시는 다음과 같습니다:

~~~php
$scPDF = new schedulerPDF();
$scPDF->printScheduler($xml);
~~~

**printScheduler()**를 호출하기 전에 다양한 사용자 설정을 적용할 수 있습니다:

**요소 크기:**

~~~php
// 월간 보기에서 하루 컨테이너 헤더 높이
$scPDF->monthDayHeaderHeight = 6;
// 월간 헤더 높이
$scPDF->monthHeaderHeight = 8;
// 연간 보기에서 월 이름 컨테이너 높이
$scPDF->yearMonthHeaderHeight = 8;
// 아젠다 보기에서 행 높이
$scPDF->agendaRowHeight = 6;
// 일간 및 주간 보기에서 헤더 높이
$scPDF->dayTopHeight = 6;
// 일간 및 주간 보기에서 왼쪽 스케일 너비
$scPDF->dayLeftWidth = 16;
~~~

**글꼴 크기:**

~~~php
// 글꼴 크기 설정
$scPDF->monthHeaderFontSize = 9;
$scPDF->monthDayHeaderFontSize = 8;
$scPDF->monthEventFontSize = 7;
$scPDF->yearHeaderFontSize = 8;
$scPDF->yearFontSize = 8;
$scPDF->agendaFontSize = 8;
$scPDF->dayHeaderFontSize = 7;
$scPDF->dayScaleFontSize = 8;
$scPDF->dayEventHeaderFontSize = 7;
$scPDF->dayEventBodyFontSize = 7;
$scPDF->todayFontSize = 11;
~~~

**사용자 지정 색상** (클라이언트 측에서 컬러맵 이름으로 'custom'을 사용):

~~~php
$scPDF->lineColor = '586A7E';
$scPDF->bgColor = 'C2D5FC';
$scPDF->dayHeaderColor = 'EBEFF4';
$scPDF->dayBodyColor = 'FFFFFF';
$scPDF->dayHeaderColorInactive = 'E2E3E6';
$scPDF->dayBodyColorInactive = 'ECECEC';
$scPDF->headerTextColor = '2F3A48';
$scPDF->textColor = '2F3A48';
$scPDF->eventTextColor = '887A2E';
$scPDF->eventBorderColor = 'B7A543';
$scPDF->eventColor = 'FFE763';
$scPDF->todayTextColor = '000000';
$scPDF->scaleColorOne = 'FCFEFC';
$scPDF->scaleColorTwo = 'DCE6F4';
$scPDF->yearDayColor = 'EBEFF4';
$scPDF->yearDayColorInactive = 'd6d6d6';
~~~

**헤더 및 푸터:**

~~~php
// 헤더 높이
$scPDF->headerImgHeight = 40;
// 푸터 높이
$scPDF->footerImgHeight = 40;
// 헤더 이미지 경로
$scPDF->headerImg = './header.png';
// 푸터 이미지 경로
$scPDF->footerImg = './footer.png';
~~~

## 헤더 및 푸터

각 페이지에 맞춤 헤더와 푸터를 추가하려면 다음 단계를 따르세요:

- "_header.png_" 및 "_footer.png_" 이미지를 준비합니다.
- 이 이미지를 _generate.php_와 동일한 폴더에 저장합니다.
- 클라이언트 측에서 **toPDF()** 호출을 아래와 같이 수정합니다:

~~~js
scheduler.toPDF(url, "color", true, true);
~~~

이렇게 하면 생성된 PDF의 모든 페이지에 "_header.png_"와 "_footer.png_"가 각각 헤더와 푸터로 삽입됩니다.

## 오류 보고

PDF 생성이 실패하면 "error_report_xxxx.xml" 파일이 생성됩니다. 버그를 보고할 때 이 파일을 첨부해 주세요.

출력에 실패하지는 않지만 문제가 발생하는 경우, _generate.php_에서 아래와 같이 디버깅을 활성화할 수 있습니다:

~~~php
$debug = false;
~~~

를

~~~php
$debug = true;
~~~

로 변경하면 "debug_xxxxx.xml" 파일이 생성되며, 관련 오류 보고 시 함께 첨부해 주시기 바랍니다.
