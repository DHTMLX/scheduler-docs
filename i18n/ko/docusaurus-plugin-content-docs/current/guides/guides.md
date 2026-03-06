---
title: "가이드"
sidebar_label: "가이드"
---

# 가이드

이 섹션은 dhtmlxScheduler를 효과적으로 사용하는 데 도움이 되는 주요 안내 자료를 포함하고 있습니다. 
간단한 작업부터 복잡한 작업까지, 일반적이거나 드문 작업 모두를 돕기 위해 작업 중심의 매뉴얼로 구성되어 있습니다. 
이 문서들은 필수 절차와 실용적인 솔루션을 다룹니다.

dhtmlxScheduler 라이브러리의 [Standard 및 PRO 버전에서 제공되는 기능](guides/editions-comparison.md)을 확인해보세요.

<table cellspacing="0" cellpadding="5" border="0">
  <tbody>
  <tr>
  <td id="data" class='topics'><h4> 페이지에서 Scheduler 생성하기 </h4> <ul id="data_sublist" > <li>[Scheduler 초기화](guides/initialization.md)</li> <li>["스케줄러 설치 방법"](guides/installation.md)</li> <li>["전체 확장 기능 목록"](guides/extensions-list.md)</li> </ul></td>
  <td class='topic_description'>Scheduler를 설치하고 초기화하는 방법과 사용 가능한 확장 목록을 설명합니다.</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> Scheduler와 프론트엔드에서 시작하기 </h4> <ul id="data_sublist" > <li>["dhtmlxScheduler를 순수 JS/HTML에서 사용하기"](guides/initialization.md)</li> <li>["dhtmlxScheduler와 Angular 연동"](integrations/angular/howtostart-angular.md)</li> <li>["dhtmlxScheduler와 React"](integrations/react/js-scheduler-react.md)</li> <li>["dhtmlxScheduler와 Vue.js"](integrations/vue/howtostart-vue.md)</li> <li>["dhtmlxScheduler와 Svelte 연동"](integrations/svelte/howtostart-svelte.md)</li> </ul></td>
  <td class='topic_description'>프론트엔드에서 표준 Scheduler를 구축하고 설정하는 방법을 다룹니다.</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 서버 사이드에서 Scheduler 시작하기 </h4> <ul id="data_sublist" > <li>["dhtmlxScheduler와 ASP.NET Core"](integrations/dotnet/howtostart-dotnet-core.md)</li> <li>["dhtmlxScheduler와 Node.js"](integrations/node/howtostart-nodejs.md)</li> <li>["dhtmlxScheduler와 ASP.NET MVC"](integrations/dotnet/howtostart-dotnet.md)</li> <li>["dhtmlxScheduler와 PHP"](integrations/php/howtostart-plain-php.md)</li> <li>["dhtmlxScheduler와 PHP:Laravel 연동하기"](integrations/php/howtostart-php-laravel.md)</li> <li>["dhtmlxScheduler와 PHP:Slim"](integrations/php/howtostart-php-slim4.md)</li> <li>["dhtmlxScheduler와 SalesForce LWC 통합하기"](integrations/salesforce/howtostart-salesforce.md)</li> <li>["dhtmlxScheduler와 Ruby on Rails 연동하기"](integrations/other/howtostart-ruby.md)</li> <li>["dhtmlxScheduler와 dhtmlxConnector 연동하기"](integrations/other/howtostart-connector.md)</li> </ul></td>
  <td class='topic_description'>다양한 서버 사이드 플랫폼에서 표준 Scheduler를 생성하고, 설정 구성, 템플릿 커스터마이징, 이벤트 연결 등으로 동작하게 하는 방법을 설명합니다.</td>
  </tr>
  <tr>
  <td id="manipulations" class='topics'><h4> Scheduler 설정하기 </h4> <ul id="manipulations_sublist"> <li>["Mobile Responsive Scheduler"](guides/touch-support.md)</li> <li>["일반 설정 안내"](guides/configuration.md)</li> <li>["스케줄러 마크업"](guides/scheduler-markup.md)</li> <li>["RTL (오른쪽-왼쪽) 모드"](guides/rtl-mode.md)</li> <li>["Localization"](guides/localization.md)</li> <li>["페이지에서 여러 개의 Scheduler 생성하기"](guides/multiple-per-page.md)</li> <li>["접근성"](guides/accessibility.md)</li> </ul></td>
  <td class='topic_description'>Scheduler를 설정하고, 한 페이지에 여러 개의 Scheduler를 생성하거나, 인터페이스를 현지화하고, 접근성 기능을 활성화하는 방법 등을 보여줍니다.</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 데이터 불러오기 및 저장하기 </h4> <ul id="data_sublist" > <li>["데이터 불러오기"](guides/loading-data.md)</li> <li>["Server-Side Integration"](guides/server-integration.md)</li> </ul></td>
  <td class='topic_description'>Scheduler에 데이터를 불러오는 다양한 방법과 데이터 소스, 포맷, 기법 및 서버 사이드 연동에 대해 설명합니다.</td>
  </tr>
  <tr>
  <td id="manipulations" class='topics'><h4> 뷰(View) 설정하기 </h4> <ul id="manipulations_sublist"> <li>[뷰 개요](/views/)</li> <li>["뷰의 X축에서 시간 단위 숨기기"](guides/custom-scales.md)</li> <li>["Custom View"](guides/custom-views.md)</li> <li>["Blocking and Marking Dates"](guides/limits.md)</li> </ul></td>
  <td class='topic_description'>스케일 단위 조정, 사용자 정의 뷰 생성, 특정 날짜 제한 등 뷰를 커스터마이즈하는 방법을 설명합니다.</td>
  </tr>
  <tr>
  <td id="lightbox" class='topics'><h4> 라이트박스(편집 폼) 설정하기 </h4> <ul id="lightbox_sublist"> <li>[섹션 및 컨트롤(에디터)](guides/lightbox-editors.md) </li> <li>[사용자 정의 에디터](guides/custom-lightbox-editor.md)</li> <li>[라이트박스 조작](guides/lightbox-editors-manipulations.md)</li> <li>[완전 사용자 정의 라이트박스](guides/custom-details-form.md)</li> <li>[버튼 변경](guides/changing-lightbox-buttons.md)</li> </ul></td>
  <td class='topic_description'>라이트박스에서 컨트롤 추가/제거, 값 가져오기 및 설정, 라이트박스 외관 커스터마이징 등의 작업에 중점을 둡니다.</td>
  </tr>
  <tr>
  <td id="events" class='topics'><h4> Scheduler에서 이벤트 관리하기 </h4> <ul id="events_sublist"> <li>["이벤트 객체 작업"](guides/event-object-operations.md)</li> <li>["이벤트 추가/삭제"](guides/adding-events.md)</li> <li>["이벤트 필터링"](guides/filtering.md)</li> <li>["드래그 앤 드롭(Drag-and-Drop) 작업"](guides/drag-between.md)</li> <li>["반복 이벤트"](guides/recurring-events.md)</li> <li>["읽기 전용 모드"](guides/readonly.md)</li> <li>["Validation"](guides/validation.md)</li> <li>["타임 슬롯에서 중복 이벤트 방지하기"](guides/collisions.md)</li> </ul></td>
  <td class='topic_description'>이벤트 객체의 추가, 삭제, 필터링과 같은 기본 작업을 다루며, 반복 이벤트 처리, Scheduler(또는 일부)의 읽기 전용 설정 등도 설명합니다.</td>
  </tr>
  <tr>
  <td id="customevent" class='topics'><h4> 이벤트 커스터마이징 </h4> <ul id="customevent_sublist"> <li>[박스](guides/custom-events-display.md)</li> <li>[색상](guides/custom-events-color.md)</li> <li>[내용(템플릿)](guides/custom-events-content.md)</li> <li>[툴팁](guides/tooltips.md)</li> <li>[이벤트의 편집 및 선택 바](guides/customizing-edit-select-bars.md)</li> <li>["스케일 및 이벤트 박스 크기 조정"](guides/sizing.md)</li> </ul></td>
  <td class='topic_description'>이벤트의 텍스트 템플릿부터 박스의 시각적 외관까지, 다양한 이벤트 요소를 개인화하는 방법을 자세히 설명합니다.</td>
  </tr>
  <tr>
  <td id="import" class='topics'><h4> 데이터 내보내기/가져오기 </h4> <ul id="import_sublist"> <li>[Google Calendar 연동](integrations/google-calendar/google-calendar-sync.md)</li> <li>["Export to PDF"](export/pdf.md)</li> <li>["Export to PNG"](export/png.md)</li> <li>["엑셀 및 iCal로 내보내기"](export/excel.md)</li> <li>[ XML, JSON, iCal 및 기타 포맷](export/serialization.md)</li> </ul></td>
  <td class='topic_description'>Scheduler 데이터의 가져오기 및 내보내기를 위한 포맷과 방법을 설명합니다.</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> 외관 및 스타일링 </h4> <ul id="styling_sublist"> <li>["스킨(Skins)"](guides/skins.md)</li> <li>["레이블, 날짜, 스타일 포매팅"](guides/templates.md)</li> <li>["스킨 커스터마이제이션"](guides/custom-skins.md)</li> </ul></td>
  <td class='topic_description'>Scheduler의 그래픽 요소를 소개하고, 스타일을 지정하는 방법을 설명합니다.</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> 날짜 다루기 </h4> <ul id="styling_sublist"> <li>["날짜 형식 지정"](guides/settings-format.md)</li> <li>["날짜 작업"](guides/date-formats.md)</li> </ul></td>
  <td class='topic_description'>Scheduler에서 날짜를 다루는 중요한 주제(문자열 변환, 날짜 포맷에서 허용되는 문자 등)를 다룹니다.</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> 통합(Integration) </h4> <ul id="styling_sublist"> <li>["Popup Messages and Modal Boxes"](guides/popups-and-modals.md)</li> <li>["타입스크립트와 함께 Scheduler 사용하기"](guides/scheduler-typescript.md)</li> <li>["jQuery 통합"](integrations/other/jquery-integration.md)</li>  <li>["dhtmlxLayout와의 통합"](integrations/other/dhxlayout-integration.md)</li> </ul></td>
  <td class='topic_description'>Scheduler를 타사 프레임워크와 통합할 수 있는 옵션을 설명합니다.</td>
  </tr>
  <tr>
  <td id="internet" class='topics'><h4> 특수 확장 및 에디션 </h4> <ul id="internet_sublist"> <li>["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)</li>  <li>["Live Updates 모드 (레거시)"](guides/live-update.md)</li> <li>["여러 사용자"](guides/multiple-users.md)</li> </ul></td>
  <td class='topic_description'>라이브러리에 포함된 다양한 확장 기능을 활용하는 방법을 안내합니다.</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 사용자 인터페이스 가이드 </h4> <ul id="data_sublist" > <li>["Scheduler GUI"](guides/user-interface.md)</li> </ul></td>
  <td class='topic_description'>최종 사용자 관점에서 Scheduler 인터페이스 요소를 설명합니다.</td>
  </tr>
  </tbody>
</table>
