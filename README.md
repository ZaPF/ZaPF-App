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

## Aber wie bekomme ich denn nun meine AK-Einteilung in die blöde App?

Du bist also eine austragende Fachschaft oder sonst wie für die Einteilung
der AKe einer ZaPF zuständig. Jetzt musst du dieses Repository nur clonen
und anschließend findest du im Ordner template zwei Dateien Namens
ak_beispiele.csv und slots_beispiele.csv, in welchen du dir anschauen
kannst, wie die beiden Dateien, welche du jetzt erstellen musst. Sind die
Dateien fertig, nutzt du das Script template.py um das Json-Object zu
erstellen. Die Syntax dafür ist
```
./template.py [AK-Datei] [Slot-Datei]
```
Im Anschluss erstellst du ein Pull-Request auf github.com und die Daten
können letztendlich in die App eingebunden werden.

## Syntax der Input-Datein

### JSON-Datei

Die JSON-Datei, die als arbeitskreise im Ordner api liegt, enthält die
von der App verwendete Version der Daten. Sie besteht in der ersten Ebene
einen Object mit zwei Arrays: arbeitskreise und slots.

arbeitskreise besteht aus Objects, die jeweils einen AK definieren.
Die Einträge hierin sind:

Key          | Value
-------------|-------------------------------------------------------
name         | Name des Arbeitskreises
repsonsible  | Name des für den Arbeitskreis Verantwortlichen
room         | Raum, in dem der Arbeitskreis stattfindet.
slotid       | ID des Slots, in dem der Arbeitskreis stattfinden soll
url          | URL zur Seite des AKs im ZaPF-Wiki

Alle Values sind Strings. slots besteht analog aus Objects, die jeweils
einen AK-Slot definieren. Hierbei sind die Einträge:

Key       | Values
----------|----------------------------------------------------------
name      | Name des Slots
shortname | Abkürzung des Namens des Slots
id        | ID, über die Arbeitskreise mit diesem Slot verknüpft werden
begin     | Anfangszeit des Slots
end       | Ende des Slots

Auch hier sind alle Values Strings

### CSV-Dateien

Sollte gerade keine Kompetenz zum direkten Erstellen der JSON-Datei zu
greifen sein, besteht auch die Möglichkeit, zwei CSV-Dateien, welche die
nötigen Informationen zu den Arbeitskreisen und Slots enthalten, und aus
diesen mit Hilfe des Scripts template.py die JSON-Datei zu erstellen.
Beispiele hierfür sind die Dateien ak_beispiel.csv und slots_beispiel.csv im
Ordner template.

## Bisherige Verwendung

Genutzt wurde die ZaPF-App zum ersten Mal im Winter-Semester 2012 in Karlsruhe
([damaliger Stand](https://github.com/ZaPF/ZaPF-App/tree/WiSe12-Karlsruhe))
und darauf im Sommer-Semester 2013 in Jena.

## Eingebettete Fremd-Projekte

Die App nutzt die folgende freie Technologien und Projekte:

- [Twitter Bootstrap][] – HTML- und Design-Toolkit
- [jQuery][] – Javascript Toolkit
- [Sugar][] – Javascript Bibliothek, die native Objekte erweitert;
  zum Formatieren von Uhrzeiten benutzt.

[Twitter Bootstrap]: http://twitter.github.com/bootstrap/
[jQuery]: http://jquery.com/
[Sugar]: http://sugarjs.com/
