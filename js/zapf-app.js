function zeigeArbeitskreise(){
  $.ajax( {
    url: "api/arbeitskreise",
    dataType: 'json',
    timeout: 2000,
    success: function(data) {
      $("#arbeitskreiscontainer").empty();
      $.each(data.slots , function(i,item){
        var css_id = 'slot'+item.id;
        var start = new Date(item.begin);
        var end = new Date(item.end);
        var row_css_id = "row" + Math.floor(i/3);
        if (i % 3 == 0) {
          $("<div/>", { id: row_css_id, class: "row"} ).appendTo("#arbeitskreiscontainer");
        }
        $("<div/>", { id: css_id, class: 'span4'} ).appendTo('#'+row_css_id);
        $("<h2/>", { class: 'slotname', text: item.name }).appendTo('#'+css_id);
        $("<span/>", { class: 'slottime', text: wochentag(start) + ": on " + $.format.date(start,'HH:mm') + ' bis ' + $.format.date(end,'HH:mm') + ' Uhr' }).appendTo('#'+css_id);
        $.format.date(new Date(), 'dd M yy')
      });
      $.each(data.arbeitskreise, function(i,item){
        var css_id = 'arbeitskreis'+i;
        var slot_css_id = 'slot'+item.slotid;
        $("<p/>", { id: css_id, class: 'ps'} ).appendTo('#'+slot_css_id);
        $("<h3/>", { class: 'akname', text: item.name }).appendTo('#'+css_id);
        $("<a/>", { class: 'aklink btn btn-info', href: item.url, text: 'Infos im Wiki'}).appendTo('#'+css_id);
        $("<span/>", { class: 'room', text: 'Raum: ' + item.room }).appendTo('#'+css_id);
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
