---
title: "PDF로 내보내기 (v4.0)"
sidebar_label: "PDF로 내보내기 (v4.0)"
---

# PDF로 내보내기 (버전 4.0)

*이 문서는 dhtmlxScheduler 4.0 또는 그 이전 버전의 내보내기를 다룹니다. dhtmlxScheduler 4.1+를 사용하는 경우 아래의 내용을 확인하십시오 [here](export/pdf.md).*

버전 4.1부터 dhtmlxScheduler는 PDF 형식으로 스케줄러를 내보내는 새로운 방법을 제공합니다 - [온라인 내보내기 서비스](export/pdf.md#default-export-to-pdf). 

## 설치

패키지의 PHP 버전: [https://github.com/DHTMLX/scheduler-to-pdf-php](https://github.com/DHTMLX/scheduler-to-pdf-php)
  
패키지의 Java 버전: [https://github.com/DHTMLX/scheduler-to-pdf-java](https://github.com/DHTMLX/scheduler-to-pdf-java)
  
패키지의 .NET 버전: [https://github.com/DHTMLX/scheduler-to-pdf-net](https://github.com/DHTMLX/scheduler-to-pdf-net)


[Export to PDF [Legacy]](https://docs.dhtmlx.com/scheduler/samples/04_export/05_standalone_export.html)


## 필요한 포함 파일

스케줄러 페이지에서 아래 확장을 한 가지 더 활성화합니다:

~~~js
scheduler.plugins({
    pdf: true
});
~~~


## 내보내기 트리거

스케줄러 데이터를 PDF로 내보내려면 페이지에 버튼을 하나 추가하면 되며, 이 버튼은 **toPDF()** 메서드를 호출합니다. **toPDF()** 메서드의 매개변수는 이전에 설치된 스크립트의 URL입니다:

~~~html
<input type="button" name="save" value="save" 
onclick="scheduler.toPDF('path/to/folder/generate.php')" 
style="right:300px; width:80px; position:absolute; top:1px;">

~~~


## 서비스 구성

내보내기 옵션을 구성하려면 클라이언트 측과 서버 측을 모두 다루어야 합니다.

### 클라이언트 측

앞에서 언급했듯이 내보내기 활성화를 위해서는 **toPDF()** 메서드를 사용해야 합니다:

~~~js
scheduler.toPDF(path, color, header, footer);

~~~

**매개변수:**


- _**path**_ - (_url_) PDF 파일을 생성하는 PHP 파일의 경로. 아래의 세부 정보를 참고하십시오 [아래](export/pdf.md#using-export-services).
- _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) 컬맷맵(colormap)을 지정합니다.
    * '_color_' - 전체 색상 인쇄, 기본값.
    * '_gray_' - 흑백 음영으로 인쇄합니다.
    * '_bw_' - 흑백 색상만 사용합니다.
    * '_custom_' - 사용자 정의 컬맷맵을 활성화하는 데 사용할 수 있습니다( PHP 코딩 필요, 아래 참조 참조).
    * '_fullcolor_' - 내보내는 동안 실제 배경 및 텍스트 색상.
- _**header**_ - (_boolean_, optional) 페이지에 헤더를 추가할지 여부를 정의합니다. 기본값은 _false_입니다. 아래의 세부 정보를 참고하십시오.
- _**footer**_ - (_boolean_, optional) 페이지에 푸터를 추가할지 여부를 정의합니다. 기본값은 _false_입니다.
  
  아래의 세부 정보를 참조하십시오: export/pdf.md#headerfooter-of-the-output-file

따라서 HTML 페이지에 매개변수의 적절한 개수로 **toPDF()** 메서드를 호출하는 코드 한 줄을 추가합니다. 예를 들면 다음과 같습니다:

~~~js
scheduler.toPDF('path/to/folder/generate.php','gray');

~~~


## 서버 측

위의 코드 조각에서 _generate.php_는 내보내기 옵션을 정의하는 PHP 파일입니다.
  
  
가장 간단한 파일 예시는 다음과 같습니다:

~~~php
$scPDF = new schedulerPDF();
$scPDF->printScheduler($xml);

~~~


그러나 **printScheduler()** 메서드를 실행하기 전에 사용자 정의 구성 옵션을 적용할 수 있습니다:

**요소 크기(Size of elements):**

~~~php
// the height of the header of the day container in the month mode
$scPDF->monthDayHeaderHeight = 6;
 // the height of the header in the month mode
$scPDF->monthHeaderHeight = 8;
 // the height of the month name container in the year mode
$scPDF->yearMonthHeaderHeight = 8;
 // height of the row in the agenda mode
$scPDF->agendaRowHeight = 6;
 // the height of the header in the day and week mode
$scPDF->dayTopHeight = 6;
 // the width of the left scale in the day and week mode
$scPDF->dayLeftWidth = 16;

~~~


**글꼴 크기(Font size):**

~~~php
 // font size settings
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


**커스텀 색상(Custom colors)** (클라이언트 측에서 'custom' 값을 컬맷맵 이름으로 사용해야 함):

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

**헤더와 푸터(Header and Footers):**

~~~php
// the height of the header
$scPDF->headerImgHeight = 40;
// the height of the footer
$scPDF->footerImgHeight = 40;
// the path to the header image
$scPDF->headerImg = './header.png';
// the path to the footer image
$scPDF->footerImg = './footer.png';
~~~


## 헤더 및 푸터

각 페이지에 대해 커스텀 헤더와 푸터를 정의하는 것이 가능합니다.
  
이를 달성하려면 다음 단계를 수행하십시오:


+ "_header.png_" 와 "_footer.png_" 이름의 이미지를 만듭니다.
+ 생성된 이미지를 _generate.php_가 있는 같은 폴더로 복사합니다.
+ 클라이언트 측에서 코드의 호출을 다음과 같이 변경합니다:
  
  
~~~js
scheduler.toPDF(url, "color", true, true);

~~~

그 결과, 생성된 PDF 파일의 모든 페이지에 헤더와 푸터로 사용될 "_header.png_" 및 "_footer.png_" 이미지가 표시됩니다. 

## 오류 보고(Error reporting)

PDF 파일의 출력이 실패하면 "error_report_xxxx.xml"이라는 파일이 있어야 합니다. 이 파일을 버그 리포트와 함께 보내 주십시오.

출력이 실패하지는 않지만 여전히 문제가 있을 경우, _generate.php_를 편집하고 아래를 변경할 수 있습니다:

~~~php
$debug = false;

~~~

를

~~~php
$debug = true;

~~~

로 바꿉니다. 그러면 새로운 파일이 저장됩니다. 파일은 "debug_xxxxx.xml"과 같이 불리고, 관련 오류 보고서와 함께 보내 주십시오.