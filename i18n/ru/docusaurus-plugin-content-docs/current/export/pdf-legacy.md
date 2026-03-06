---
title: "Экспорт в PDF (версия 4.0)"
sidebar_label: "Экспорт в PDF (версия 4.0)"
---

# Экспорт в PDF (версия 4.0)

*Эта статья описывает экспорт в dhtmlxScheduler версии 4.0 и более ранних. Для версий 4.1 и выше смотрите подробности [здесь](export/pdf.md).*

Начиная с версии 4.1, dhtmlxScheduler внедрил новый способ экспорта расписания в PDF - [онлайн сервис экспорта](export/pdf.md#defaultexporttopdf).

## Установка

Доступны пакеты для различных платформ:

- PHP версия: [https://github.com/DHTMLX/scheduler-to-pdf-php](https://github.com/DHTMLX/scheduler-to-pdf-php)  
- Java версия: [https://github.com/DHTMLX/scheduler-to-pdf-java](https://github.com/DHTMLX/scheduler-to-pdf-java)  
- .NET версия: [https://github.com/DHTMLX/scheduler-to-pdf-net](https://github.com/DHTMLX/scheduler-to-pdf-net)


[Export to PDF [Legacy]](https://docs.dhtmlx.com/scheduler/samples/04_export/05_standalone_export.html)


## Необходимые подключения

Чтобы включить экспорт в PDF на странице расписания, активируйте соответствующее расширение:

~~~js
scheduler.plugins({
    pdf: true
});
~~~

## Запуск экспорта

Для экспорта данных расписания в PDF добавьте кнопку, которая вызывает метод **toPDF()**. Этот метод требует URL ранее установленного скрипта:

~~~html
<input type="button" name="save" value="save" 
onclick="scheduler.toPDF('path/to/folder/generate.php')">
~~~

## Настройка сервиса

Настройка параметров экспорта требует изменений как на клиентской, так и на серверной стороне.

### Клиентская сторона

Метод **toPDF()** активирует процесс экспорта:

~~~js
scheduler.toPDF(path, color, header, footer);
~~~

**Параметры:**

- _**path**_ - (_url_) URL, указывающий на PHP-файл, отвечающий за генерацию PDF. Подробнее [ниже](export/pdf.md).
- _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) определяет цветовую схему:
    * '_color_' - полноцветный (по умолчанию).
    * '_gray_' - градации серого.
    * '_bw_' - только черно-белый.
    * '_custom_' - позволяет задать свою цветовую карту (требует доработки PHP, см. [ниже](export/pdf.md)).
    * '_fullcolor_' - используются реальные цвета фона и текста из расписания.
- _**header**_ - (_boolean_, необязательно) - добавлять ли шапку на страницу. По умолчанию - _false_. Подробнее [ниже](export/pdf.md).
- _**footer**_ - (_boolean_, необязательно) - добавлять ли подвал на страницу. По умолчанию - _false_. Подробнее [ниже](export/pdf.md).

Например, добавление этой строки на HTML-страницу вызовет **toPDF()** с серой цветовой схемой:

~~~js
scheduler.toPDF('path/to/folder/generate.php','gray');
~~~

## Серверная сторона

Файл _generate.php_ (указан выше) обрабатывает параметры экспорта.

Минимальный пример выглядит так:

~~~php
$scPDF = new schedulerPDF();
$scPDF->printScheduler($xml);
~~~

Перед вызовом **printScheduler()** можно применить различные пользовательские настройки:

**Размеры элементов:**

~~~php
// высота заголовка дня в месячном представлении
$scPDF->monthDayHeaderHeight = 6;
// высота заголовка месяца
$scPDF->monthHeaderHeight = 8;
// высота контейнера с названием месяца в годовом представлении
$scPDF->yearMonthHeaderHeight = 8;
// высота строки в представлении agenda
$scPDF->agendaRowHeight = 6;
// высота заголовка в дневном и недельном представлениях
$scPDF->dayTopHeight = 6;
// ширина левой шкалы в дневном и недельном представлениях
$scPDF->dayLeftWidth = 16;
~~~

**Размер шрифта:**

~~~php
// настройки размера шрифта
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

**Пользовательские цвета** (используйте 'custom' как имя цветовой карты на клиенте):

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

**Шапки и подвал:**

~~~php
// высота шапки
$scPDF->headerImgHeight = 40;
// высота подвала
$scPDF->footerImgHeight = 40;
// путь к изображению шапки
$scPDF->headerImg = './header.png';
// путь к изображению подвала
$scPDF->footerImg = './footer.png';
~~~

## Шапка и подвал

Пользовательские шапки и подвал можно добавить на каждую страницу следующим образом:

- Подготовьте изображения с именами "_header.png_" и "_footer.png_".
- Поместите эти изображения в ту же папку, что и _generate.php_.
- На клиентской стороне обновите вызов **toPDF()** следующим образом:

~~~js
scheduler.toPDF(url, "color", true, true);
~~~

Это добавит "_header.png_" и "_footer.png_" как шапку и подвал на каждой странице сгенерированного PDF.

## Сообщения об ошибках

Если генерация PDF завершилась неудачей, будет создан файл с именем "error_report_xxxx.xml". Пожалуйста, приложите этот файл при сообщении об ошибках.

Если вывод не завершился ошибкой, но есть проблемы, можно включить режим отладки в _generate.php_, изменив:

~~~php
$debug = false;
~~~

на

~~~php
$debug = true;
~~~

Это создаст файл "debug_xxxxx.xml", который также следует приложить к сообщению об ошибке.
