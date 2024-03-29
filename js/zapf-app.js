function zeigeArbeitskreise(){
  $.ajax( {
    url: "api/arbeitskreise",
    dataType: 'json',
    timeout: 12000,
    success: function(data) {
      $("#arbeitskreiscontainer").empty();
        var past = 0
         ,total = data.slots.length
         ,time_positive = false
         ,next = 3
      $.each(data.slots , function(i,item){
        var css_id = 'slot'+item.id
           ,section_id = 'slot-'+item.id
           // workaround for Safari on Mac and iOS:
           ,start = Date.create(item.begin)
           ,end = Date.create(item.end)
           ,num_cols = 3
           ,row_css_id = "row" + Math.floor(i/num_cols)
        // 2-spaltiges Layout (auf großen Bildschirmen)
        if (i % num_cols == 0) {
          $("<div/>", { id: row_css_id, class: "row"} ).appendTo("#arbeitskreiscontainer");
        }
        // Navigations-Eintrag hinzufügen:
        var li = $("<li/>");
        $("<a/>", { href: "#"+section_id, text: item.shortname }).appendTo(li)
        li.appendTo("ul.aknav");
        // Slot zum Seiteninhalt hinzufügen:
        $("<section/>", { id: section_id}).appendTo('#'+row_css_id)
        $("<div/>", { id: css_id+'cont', class: 'ak-unit-container'} ).appendTo('#'+section_id);
        $("<div/>", { id: css_id, class: 'ak-unit span3'} ).appendTo('#'+css_id+'cont');
        $("<h2/>", { class: 'slotname', html: '<i class="icon-tasks"></i>'+item.name }).appendTo('#'+css_id);
        $("<div/>", { class: 'slottime', text: start.format('{Weekday} von {24hr}:{mm}', 'de') + ' bis ' + end.format('{24hr}:{mm}') + ' Uhr' }).appendTo('#'+css_id);
        var current_date = new Date();
        if (current_date > end) past++;
        if (!(time_positive)){
          next = i;
        }
        if (current_date.getTime() < end.getTime() && !(time_positive)){
          time_positive = true
        };
      });
      $.each(data.arbeitskreise, function(i,item){
        var css_id = 'arbeitskreis'+i;
        var slot_css_id = 'slot'+item.slotid;
        // Arbeitskreis zum richtigen Slot hinzufügen:
        $("<p/>", { id: css_id, class: 'ps'} ).appendTo('#'+slot_css_id);
        $("<h3/>", { class: 'akname', html: '<i class="icon-chevron-right"></i>'+item.name }).appendTo('#'+css_id);
        if (item.url != null) $("<a/>", { class: 'aklink btn-mini btn-info', href: item.url, text: 'Infos im Wiki'}).appendTo('#'+css_id);
        $("<div/>", { class: 'clearleft'}).appendTo('#'+css_id);
        $("<div/>", { class: 'responsible', text: 'Leitikon: ' + item.responsible}).appendTo('#'+css_id);
        $("<div/>", { class: 'room', text: 'Raum: ' + item.room }).appendTo('#'+css_id);
      });
      // Anzeigen, wie viele Zeitslots bereits abgeschlossen sind:
      perc = Math.round(past/total * 100);
      $("div#completion").removeClass('hidden');
      $("span#ratio-past-total").text('' + past + ' von ' + total);
      $("div#bar-percent-completed").width(''+perc+'%');
      now = new Date().getTime();
      time_ak = Date.create(data.slots[next].begin).getTime();
      if (now < time_ak) {
        time_ms = time_ak - now;
        time = Math.round(time_ms / ( 60 * 1000));
        time_h = Math.floor(time/60);
        if (time_h == 1){
          stunde = 'Stunde';
        } else {
          stunde = 'Stunden';
        };
        $("span#next-ak").text('Als nächstes findet der ' + data.slots[next].name + ' in ' + Math.floor(time / 60) + ' ' + stunde + ' und ' + String(time % 60) + ' Minuten statt.');
      } else {
        $("span#next-ak").text('Jetzt findet gerade der ' + data.slots[next].name + ' statt.');
      };
    },
    error: errorOccured,
  } );
}
function errorOccured(errorObj, message){
  $('#error').show();
  $('#error').text("Die Arbeitskreise konnten nicht geladen werden.");
}
$(document).ready(function () {
    zeigeArbeitskreise();
});

function wochentag(d) {
  var weekday=new Array(7);
  weekday[0]="Sonntag";
  weekday[1]="Montag";
  weekday[2]="Dienstag";
  weekday[3]="Mittwoch";
  weekday[4]="Donnerstag";
  weekday[5]="Freitag";
  weekday[6]="Samstag";
  
  return weekday[d.getDay()]
}
