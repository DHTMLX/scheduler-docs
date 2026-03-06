---
title: "指南"
sidebar_label: "指南"
---

# 指南

本节包含支持您高效使用 dhtmlxScheduler 的主要指导材料。 
内容以任务为中心，分为针对常见和复杂任务的手册，无论这些任务是常见还是罕见。 
文章涵盖了基本操作流程和实用解决方案。

请查看 dhtmlxScheduler 库 [Standard 和 PRO 版本可用的功能](guides/editions-comparison.md)。

<table cellspacing="0" cellpadding="5" border="0">
  <tbody>
  <tr>
  <td id="data" class='topics'><h4> 在页面上创建 Scheduler </h4> <ul id="data_sublist" > <li>[初始化 Scheduler](guides/initialization.md)</li> <li>[스케줄러 설치 방법](guides/installation.md)</li> <li>[전체 확장 기능 목록](guides/extensions-list.md)</li> </ul></td>
  <td class='topic_description'>介绍如何安装和初始化 Scheduler，并提供可用扩展的列表。</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 前端快速入门 Scheduler </h4> <ul id="data_sublist" > <li>[dhtmlxScheduler를 순수 JS/HTML에서 사용하기](guides/initialization.md)</li> <li>[dhtmlxScheduler와 Angular 연동](integrations/angular/howtostart-angular.md)</li> <li>[dhtmlxScheduler와 React](integrations/react/js-scheduler-react.md)</li> <li>[dhtmlxScheduler와 Vue.js](integrations/vue/howtostart-vue.md)</li> <li>[dhtmlxScheduler와 Svelte 연동](integrations/svelte/howtostart-svelte.md)</li> </ul></td>
  <td class='topic_description'>介绍如何在前端构建和设置标准 Scheduler。</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 服务端快速入门 Scheduler </h4> <ul id="data_sublist" > <li>[dhtmlxScheduler와 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)</li> <li>[dhtmlxScheduler와 Node.js](integrations/node/howtostart-nodejs.md)</li> <li>[dhtmlxScheduler와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)</li> <li>[dhtmlxScheduler와 PHP](integrations/php/howtostart-plain-php.md)</li> <li>[dhtmlxScheduler와 PHP:Laravel 연동하기](integrations/php/howtostart-php-laravel.md)</li> <li>[dhtmlxScheduler와 PHP:Slim](integrations/php/howtostart-php-slim4.md)</li> <li>[dhtmlxScheduler와 SalesForce LWC 통합하기](integrations/salesforce/howtostart-salesforce.md)</li> <li>[dhtmlxScheduler와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)</li> <li>[dhtmlxScheduler와 dhtmlxConnector 연동하기](integrations/other/howtostart-connector.md)</li> </ul></td>
  <td class='topic_description'>介绍如何在不同服务器端平台创建标准 Scheduler，并通过配置、模板自定义、事件绑定等方式实现功能。</td>
  </tr>
  <tr>
  <td id="manipulations" class='topics'><h4> Scheduler 配置 </h4> <ul id="manipulations_sublist"> <li>[Mobile Responsive Scheduler](guides/touch-support.md)</li> <li>[일반 설정 안내](guides/configuration.md)</li> <li>[스케줄러 마크업](guides/scheduler-markup.md)</li> <li>[RTL (오른쪽-왼쪽) 모드](guides/rtl-mode.md)</li> <li>[Localization](guides/localization.md)</li> <li>[페이지에서 여러 개의 Scheduler 생성하기](guides/multiple-per-page.md)</li> <li>[접근성](guides/accessibility.md)</li> </ul></td>
  <td class='topic_description'>演示如何配置 Scheduler、在同一页面创建多个调度器、本地化界面、启用无障碍功能等。</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 数据加载与存储 </h4> <ul id="data_sublist" > <li>[데이터 불러오기](guides/loading-data.md)</li> <li>[Server-Side Integration](guides/server-integration.md)</li> </ul></td>
  <td class='topic_description'>介绍将数据加载到 Scheduler 的不同方法，包括多种数据源、格式和技术，以及服务端集成的相关细节。</td>
  </tr>
  <tr>
  <td id="manipulations" class='topics'><h4> 视图配置 </h4> <ul id="manipulations_sublist"> <li>[视图概述](/views/)</li> <li>[뷰의 X축에서 시간 단위 숨기기](guides/custom-scales.md)</li> <li>[Custom View](guides/custom-views.md)</li> <li>[Blocking and Marking Dates](guides/limits.md)</li> </ul></td>
  <td class='topic_description'>讲解如何通过调整刻度单位、自定义视图、限制特定日期等方式自定义视图。</td>
  </tr>
  <tr>
  <td id="lightbox" class='topics'><h4> 配置 Lightbox（编辑表单） </h4> <ul id="lightbox_sublist"> <li>[分区与控件（编辑器）](guides/lightbox-editors.md) </li> <li>[自定义编辑器](guides/custom-lightbox-editor.md)</li> <li>[Lightbox 操作](guides/lightbox-editors-manipulations.md)</li> <li>[完全自定义 Lightbox](guides/custom-details-form.md)</li> <li>[更改按钮](guides/changing-lightbox-buttons.md)</li> </ul></td>
  <td class='topic_description'>重点介绍如何操作 Lightbox:添加或移除控件、获取和设置控件值、自定义外观等。</td>
  </tr>
  <tr>
  <td id="events" class='topics'><h4> Scheduler 事件管理 </h4> <ul id="events_sublist"> <li>[이벤트 객체 작업](guides/event-object-operations.md)</li> <li>[이벤트 추가/삭제](guides/adding-events.md)</li> <li>[이벤트 필터링](guides/filtering.md)</li> <li>[드래그 앤 드롭(Drag-and-Drop) 작업](guides/drag-between.md)</li> <li>[반복 이벤트](guides/recurring-events.md)</li> <li>[읽기 전용 모드](guides/readonly.md)</li> <li>[Validation](guides/validation.md)</li> <li>[타임 슬롯에서 중복 이벤트 방지하기](guides/collisions.md)</li> </ul></td>
  <td class='topic_description'>涵盖事件对象的基本操作，如添加、删除、筛选，并介绍如何处理周期性事件、设置 Scheduler 或部分只读等。</td>
  </tr>
  <tr>
  <td id="customevent" class='topics'><h4> 事件自定义 </h4> <ul id="customevent_sublist"> <li>[事件框](guides/custom-events-display.md)</li> <li>[颜色](guides/custom-events-color.md)</li> <li>[内容（模板）](guides/custom-events-content.md)</li> <li>[提示信息](guides/tooltips.md)</li> <li>[事件的编辑与选择条](guides/customizing-edit-select-bars.md)</li> <li>[스케일 및 이벤트 박스 크기 조정](guides/sizing.md)</li> </ul></td>
  <td class='topic_description'>详细介绍如何个性化事件的各个方面，从文本模板到事件框的视觉表现。</td>
  </tr>
  <tr>
  <td id="import" class='topics'><h4> 数据导入/导出 </h4> <ul id="import_sublist"> <li>[与 Google 日历集成](integrations/google-calendar/google-calendar-sync.md)</li> <li>[Export to PDF](export/pdf.md)</li> <li>[Export to PNG](export/png.md)</li> <li>[엑셀 및 iCal로 내보내기](export/excel.md)</li> <li>[ XML、JSON、iCal 及其他格式](export/serialization.md)</li> </ul></td>
  <td class='topic_description'>介绍 Scheduler 数据导入导出的可用格式和方法。</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> 外观与样式 </h4> <ul id="styling_sublist"> <li>[스킨(Skins)](guides/skins.md)</li> <li>[레이블, 날짜, 스타일 포매팅](guides/templates.md)</li> <li>[스킨 커스터마이제이션](guides/custom-skins.md)</li> </ul></td>
  <td class='topic_description'>介绍 Scheduler 的图形元素及其样式定制方法。</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> 日期处理 </h4> <ul id="styling_sublist"> <li>[날짜 형식 지정](guides/settings-format.md)</li> <li>[날짜 작업](guides/date-formats.md)</li> </ul></td>
  <td class='topic_description'>讨论 Scheduler 中与日期相关的重要主题，包括日期与字符串的相互转换，以及日期格式中允许的字符。</td>
  </tr>
  <tr>
  <td id="styling" class='topics'><h4> 集成 </h4> <ul id="styling_sublist"> <li>[Popup Messages and Modal Boxes](guides/popups-and-modals.md)</li> <li>[타입스크립트와 함께 Scheduler 사용하기](guides/scheduler-typescript.md)</li> <li>[jQuery 통합](integrations/other/jquery-integration.md)</li>  <li>[dhtmlxLayout와의 통합](integrations/other/dhxlayout-integration.md)</li> </ul></td>
  <td class='topic_description'>详细介绍 Scheduler 与第三方框架的集成选项。</td>
  </tr>
  <tr>
  <td id="internet" class='topics'><h4> 特殊扩展与版本 </h4> <ul id="internet_sublist"> <li>[미니 캘린더(날짜 선택기)](guides/minicalendar.md)</li> <li>[Live Updates 모드 (레거시)](guides/live-update.md)</li> <li>[여러 사용자](guides/multiple-users.md)</li> </ul></td>
  <td class='topic_description'>介绍库中包含的各种扩展及其增强功能的使用方法。</td>
  </tr>
  <tr>
  <td id="data" class='topics'><h4> 用户界面指南 </h4> <ul id="data_sublist" > <li>[Scheduler GUI](guides/user-interface.md)</li> </ul></td>
  <td class='topic_description'>从终端用户角度描述 Scheduler 的界面元素。</td>
  </tr>
  </tbody>
</table>
