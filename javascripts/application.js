// Helpers
Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(replace[curChar]){returnStr+=replace[curChar].call(this);}else{returnStr+=curChar;}}return returnStr;};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate();},D:function(){return Date.replaceChars.shortDays[this.getDay()];},j:function(){return this.getDate();},l:function(){return Date.replaceChars.longDays[this.getDay()];},N:function(){return this.getDay()+1;},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},w:function(){return this.getDay();},z:function(){return"Not Yet Supported";},W:function(){return"Not Yet Supported";},F:function(){return Date.replaceChars.longMonths[this.getMonth()];},m:function(){return(this.getMonth()<11?'0':'')+(this.getMonth()+1);},M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},n:function(){return this.getMonth()+1;},t:function(){return"Not Yet Supported";},L:function(){return"Not Yet Supported";},o:function(){return"Not Supported";},Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},a:function(){return this.getHours()<12?'am':'pm';},A:function(){return this.getHours()<12?'AM':'PM';},B:function(){return"Not Yet Supported";},g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},H:function(){return(this.getHours()<10?'0':'')+this.getHours();},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},e:function(){return"Not Yet Supported";},I:function(){return"Not Supported";},O:function(){return(this.getTimezoneOffset()<0?'-':'+')+(this.getTimezoneOffset()/60<10?'0':'')+(this.getTimezoneOffset()/60)+'00';},T:function(){return"Not Yet Supported";},Z:function(){return this.getTimezoneOffset()*60;},c:function(){return"Not Yet Supported";},r:function(){return this.toString();},U:function(){return this.getTime()/1000;}};

// RSS Feed wrapper
function RSSFeed(){}

// Yahoo pipe for turning an RSS XML feed into JSONP
// http://pipes.yahoo.com/pipes/pipe.run?_id=NvfW_c9m3hGRjX4hoRWqPg
RSSFeed.Entries = function(feed_url, callback){
  requestURL = "http://pipes.yahoo.com/pipes/pipe.run?_id=NvfW_c9m3hGRjX4hoRWqPg&_render=json&_callback=?&feed=" + feed_url;
  $.getJSON(requestURL, function(json, status){
    callback(json.value.items, status);
  });
}

$(document).ready(function(){
  $(".info").hide();
  $("ul#nav a").click(function() {
    infoPanel = $("#" + $(this).text().toLowerCase());

    $('ul#nav a').removeClass('active');

    if (infoPanel.is(':visible')){
      $(".info:visible").slideUp(100);
    }
    else {
      $(".info:visible").slideUp(100);
      $(this).addClass('active');
      $("#" + $(this).text().toLowerCase()).animate({opacity:1},100).slideDown(250, function() {
        $("#twitter:visible iframe").height($("#twitter:visible iframe").contents().find(".h-feed").height() + 50);
      });
    }

    return false;
  });

  // Toasty!
  $("#mre").mouseover(function(){
    $.sound.play('http://www.leedberg.com/MotaroFTP/sounds/toasty.wav');
    $("#me").animate({left:0}, 100);
  }).mouseleave(function(){
    $("#me").animate({left:-292}, 100);
  })

  RSSFeed.Entries("http://feeds2.feedburner.com/MikeEnriquez", function(json, status){
    var content = "";
    $.each(json, function(i){
      publishedDate = new Date();
      publishedDate.setTime(Date.parse(this['y:published']['month'] + '/' + this['y:published']['day'] + '/' + this['y:published']['year']));
      postTitle = "<a href=\"" + this.link + "\">" + this.title + "</a>";

      content += "<p class=\"posts\">" + postTitle + " <span class=\"date\">posted on " + publishedDate.format('F jS, Y') + "</span></p>";
    })

    $("#blog div#posts").html(content);
  })

  RSSFeed.Entries("http://github.com/enriquez.atom", function(json, status){
    var content = "";
    $.each(json, function(i){
      event_type = "something";
      event = "<div class=\"alert\"><div class=\"body\">" + this.description +"</div></div>";
      content += event;
    })

    $("#github #events").html(content);
  })
});
