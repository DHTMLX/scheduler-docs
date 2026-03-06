---
title: "Способы установки Scheduler"
sidebar_label: "Способы установки Scheduler"
---

# Способы установки Scheduler

Существует несколько способов добавить пакет dhtmlxScheduler в ваш проект, включая использование менеджеров пакетов, таких как [Bower](https://bower.io/) или [npm](https://www.npmjs.com/).

В качестве альтернативы, вы можете подключить необходимые JS и CSS файлы напрямую с CDN.

## npm - Оценочная и PRO версии {#npmevaluationandproversions}

**Оценочная Professional версия**

Вы можете скачать [пробную версию Scheduler](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml) и следовать инструкциям в файле README. 
Обратите внимание, что пробная версия Scheduler доступна только в течение 30 дней.

**Professional версия**

Доступ к приватному npm DHTMLX предоставляется через [Client's Area](https://dhtmlx.com/clients/) после генерации логина и пароля для npm. Подробное руководство по установке также размещено там. Обратите внимание, что доступ к приватному npm активен только при действующей лицензии на Scheduler.

## npm - стандартная бесплатная версия {#npmstandardfreeversion}

Стандартную версию Scheduler можно установить с [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler) с помощью следующей команды:

~~~html
npm install dhtmlx-scheduler
~~~

:::note
На [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler) доступна только стандартная версия Scheduler
:::

## Bower {#bower}

Чтобы получить стандартную версию Scheduler через [Bower](https://bower.io/), выполните следующую команду:

~~~html
bower install scheduler
~~~

## CDN {#cdn}

Подключение JS и CSS файлов с CDN предполагает прямую ссылку на файлы **dhtmlxscheduler.js** и **dhtmlxscheduler.css**:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js" 
    type="text/javascript"></script>  
~~~

Полный список CDN-ссылок для различных версий dhtmlxScheduler приведён в [отдельной статье](guides/cdn-links-list.md).

## Добавление PRO Edition в проект {#addingproeditionintoproject}

Стандартная редакция компонента, доступная из публичных источников, таких как CDN, Bower и npm, распространяется по лицензии GPL.

Для Professional и Evaluation версий вы можете использовать наш [приватный npm-реестр](#npmevaluationandproversions) для установки пакета.

Если эти способы недоступны, есть две альтернативы добавления Pro версии в ваш проект:
 
- добавить Pro версию вручную в ваш проект
- установить Pro версию через npm из локальной директории

### Установка пакета из локальной папки (#installfromlocalfolder)

При использовании **npm** пакет Pro может быть установлен из локальной папки с помощью команд [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) или [`npm link`](https://docs.npmjs.com/cli/link/).
Вот пошаговая инструкция для обоих методов:

### npm install

1. Скопируйте пакет Scheduler в локальную директорию
2. Перейдите в директорию вашего проекта
3. Выполните команду `npm install ../scheduler-local-package-path`

### npm link

1. Скопируйте пакет Scheduler в локальную директорию
2. Выполните команду `npm link` внутри папки с пакетом
3. Перейдите в директорию вашего проекта
4. Выполните команду `npm link dhtmlx-scheduler`

Для подробного сравнения стандартной и PRO версий dhtmlxScheduler обратитесь к соответствующей статье [Standard vs PRO Library Versions](guides/editions-comparison.md).
