# Die ZaPF-App

Gebaut als HTML5-Web-App, die auf mobilen Geräten und Laptops erlaubt,
die Arbeitskreise auf der ZaPF nachzusehen. Die Darstellung ist für
Handys, Tablets und größere Bildschirme gleichermaßen optimiert.

## So funktioniert es:

Die HTML-Seite der App enthält zunächst nicht die Daten der jeweiligen
ZaPF sondern nur das Layout und den JavaScript-Code, um die Seite mit
den Informationen zu füllen. Diese Informationen werden dann aus der
Datei api/arbeitskreise bezogen (diese Datei muss für die ZaPF z.B. aus
einer LibreOffice Calc-Tabelle erstellt werden).
Für jeden Zeitslot in den bezogenen Daten wird dann ein Infoblock in der
App eingefügt, der die darin stattfindenden Arbeitskreise darstellt.

## Eingebettete Fremd-Projekte

Die App nutzt die folgende freie Technologien und Projekte:

- [Twitter Bootstrap][] – HTML- und Design-Toolkit
- [jQuery][] – Javascript Toolkit
- [Sugar][] – A Javascript library that extends native objects, used to format dates

[Twitter Bootstrap]: http://twitter.github.com/bootstrap/
[jQuery]: http://jquery.com/
[Sugar]: http://sugarjs.com/
