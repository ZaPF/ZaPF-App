function zeigeArbeitskreise(){
  $.ajax( {
    url: "api/arbeitskreise",
    dataType: 'json',
    timeout: 12000,
    success: function(data) {
      $("#arbeitskreiscontainer").empty();
      $.each(data.slots , function(i,item){
        var css_id = 'slot'+item.id
           ,section_id = 'slot-'+item.id
           ,start = new Date(item.begin)
           ,end = new Date(item.end)
           ,num_cols = 2
           ,row_css_id = "row" + Math.floor(i/num_cols);
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
        $("<div/>", { id: css_id, class: 'ak-unit span4'} ).appendTo('#'+css_id+'cont');
        $("<h2/>", { class: 'slotname', html: '<i class="icon-tasks"></i>'+item.name }).appendTo('#'+css_id);
        $("<div/>", { class: 'slottime', text: wochentag(start) + " von " + $.format.date(start,'HH:mm') + ' bis ' + $.format.date(end,'HH:mm') + ' Uhr' }).appendTo('#'+css_id);
        $.format.date(new Date(), 'dd M yy')
      });
      $.each(data.arbeitskreise, function(i,item){
        var css_id = 'arbeitskreis'+i;
        var slot_css_id = 'slot'+item.slotid;
        // Arbeitskreis zum richtigen Slot hinzufügen:
        $("<p/>", { id: css_id, class: 'ps'} ).appendTo('#'+slot_css_id);
        $("<h3/>", { class: 'akname', html: '<i class="icon-chevron-right"></i> AK '+item.name }).appendTo('#'+css_id);
        $("<div/>", { class: 'responsible', text: 'Leiter: ' + item.responsible}).appendTo('#'+css_id);
        $("<div/>", { class: 'room', text: 'Raum: ' + item.room }).appendTo('#'+css_id);
        $("<a/>", { class: 'aklink btn-mini btn-info', href: item.url, text: 'Infos im Wiki'}).appendTo('#'+css_id);
        $("<div/>", { class: 'clearboth'}).appendTo('#'+css_id);
      });
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