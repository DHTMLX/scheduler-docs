---
title: "다중 페이지를 PDF로 내보내기"
sidebar_label: "다중 페이지를 PDF로 내보내기"
---

# 다중 페이지를 PDF로 내보내기

라이브러리는 한 번에 여러 뷰 페이지를 PDF 문서로 내보낼 수 있는 특수한 메서드를 제공합니다.


~~~js
scheduler.toPDFRange(from, to, view, path, scheme);

~~~
 


+ _**from**_ - (_Date 객체_) 내보내기를 시작할 이벤트 날짜
+ _**to**_ - (_Date 객체_) 내보내기를 종료할 날짜
+ _**view**_ - (_string_) 내보내기를 적용할 뷰
+ _**path**_ - (_URL_) PDF 파일을 생성하는 PHP 파일의 경로. 자세한 내용은 챕터 ['Export to PDF. Configuring service'](export/pdf.md#using-export-services) 참고
+ _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) 현재 사용 중인 컬러 맵을 지정합니다


1. '_color_' - 풀 컬러 인쇄, 기본값
2. '_gray_' - 흑백 색조로 인쇄
3. '_bw_' - 흑백 색상만 사용
4. '_custom_' - 사용자 정의 컬러 맵을 활성화하는 데 사용할 수 있습니다( PHP 코딩 필요, 자세한 내용은 챕터 ['Export to PDF. Configuring service'](export/pdf.md#using-export-services) 참고)
5. '_fullcolor_' - 내보내는 동안 실제로 사용되는 배경색 및 텍스트 색상

예를 들어, 2027년 1월 1일부터 2027년 2월 1일까지의 기간에 걸쳐 'week' 뷰의 페이지를 내보내려면 다음과 같이 메서드를 호출할 수 있습니다:


~~~js
scheduler.toPDFRange(
    new Date(2027,0,1), 
    new Date(2027, 1,1),
    'week', 
    'generate.php', 
    'fullcolor'
);
~~~