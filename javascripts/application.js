// Helpers
Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(replace[curChar]){returnStr+=replace[curChar].call(this);}else{returnStr+=curChar;}}return returnStr;};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate();},D:function(){return Date.replaceChars.shortDays[this.getDay()];},j:function(){return this.getDate();},l:function(){return Date.replaceChars.longDays[this.getDay()];},N:function(){return this.getDay()+1;},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},w:function(){return this.getDay();},z:function(){return"Not Yet Supported";},W:function(){return"Not Yet Supported";},F:function(){return Date.replaceChars.longMonths[this.getMonth()];},m:function(){return(this.getMonth()<11?'0':'')+(this.getMonth()+1);},M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},n:function(){return this.getMonth()+1;},t:function(){return"Not Yet Supported";},L:function(){return"Not Yet Supported";},o:function(){return"Not Supported";},Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},a:function(){return this.getHours()<12?'am':'pm';},A:function(){return this.getHours()<12?'AM':'PM';},B:function(){return"Not Yet Supported";},g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},H:function(){return(this.getHours()<10?'0':'')+this.getHours();},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},e:function(){return"Not Yet Supported";},I:function(){return"Not Supported";},O:function(){return(this.getTimezoneOffset()<0?'-':'+')+(this.getTimezoneOffset()/60<10?'0':'')+(this.getTimezoneOffset()/60)+'00';},T:function(){return"Not Yet Supported";},Z:function(){return this.getTimezoneOffset()*60;},c:function(){return"Not Yet Supported";},r:function(){return this.toString();},U:function(){return this.getTime()/1000;}};
function chat_string_create_urls(input)
{
    return input
    .replace(/(ftp|http|https|file):\/\/[\S]+(\b|$)/gim,
'<a href="$&" class="my_link" target="_blank">$&</a>')
    .replace(/([^\/])(www[\S]+(\b|$))/gim,
'$1<a href="http://$2" class="my_link" target="_blank">$2</a>');
}
function get_relative_time(obj){
	var b=obj.split(" ");
	obj=b[1]+" "+b[2]+", "+b[5]+" "+b[3];
	var a=Date.parse(obj);
	var d=(arguments.length>1)?arguments[1]:new Date();
	var e=parseInt((d.getTime()-a)/1000);
	e=e+(d.getTimezoneOffset()*60);
	if(e<60){return"less than a minute ago"}else{if(e<120){return"about a minute ago"}else{if(e<(60*60)){return(parseInt(e/60)).toString()+" minutes ago"}else{if(e<(120*60)){return"about an hour ago"}else{if(e<(24*60*60)){return"about "+(parseInt(e/3600)).toString()+" hours ago"}else{if(e<(48*60*60)){return"1 day ago"}else{return(parseInt(e/86400)).toString()+" days ago"}}}}}}
}

// Twitter API wrapper. http://apiwiki.twitter.com/Twitter-API-Documentation
function TwitterAPI(){}

TwitterAPI.Users = function Users(){}
TwitterAPI.Statuses = function Statuses(){}

// http://apiwiki.twitter.com/Twitter-REST-API-Method%3A-users%C2%A0show
TwitterAPI.Users.show = function(username, callback){
	requestURL = "http://twitter.com/users/show/" + username + ".json?callback=?";
	$.getJSON(requestURL, callback);
}

// http://apiwiki.twitter.com/Twitter-REST-API-Method%3A-statuses-user_timeline
TwitterAPI.Statuses.user_timeline = function(username, callback){
	requestURL = "http://twitter.com/statuses/user_timeline/" + username + ".json?callback=?";
	$.getJSON(requestURL, callback);
}

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

// GitHub API wrapper. http://developer.github.com/
function GitHubAPI(){}

// http://developer.github.com/v3/repos/
GitHubAPI.Repos = function(username, callback){
	requestURL = "https://api.github.com/users/" + username + "/repos?callback=?";
	$.getJSON(requestURL, function(json, status){
		callback(json.data.reverse(), status);
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
			$("#" + $(this).text().toLowerCase()).animate({opacity:1},100).slideDown(250);
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
	
	TwitterAPI.Statuses.user_timeline("enriquez", function(json, status){
		var content = "";
		$.each(json, function(i){
			tweet = chat_string_create_urls(this['text']);
			tweetDate = get_relative_time(this['created_at']);
			content += "<p class=\"tweets\">" + tweet + " <span class=\"date\">tweeted " + tweetDate + "</span></p>";
		});
		$("#twitter div#tweets").html(content);
	})
	
	RSSFeed.Entries("http://feeds2.feedburner.com/theezpzway", function(json, status){
		var content = "";
		$.each(json, function(i){
			publishedDate = new Date();
			publishedDate.setTime(Date.parse(this['y:published']['month'] + '/' + this['y:published']['day'] + '/' + this['y:published']['year']));
			postTitle = "<a href=\"" + this.link + "\">" + this.title + "</a>";

			content += "<p class=\"posts\">" + postTitle + " <span class=\"date\">posted on " + publishedDate.format('F jS, Y') + "</span></p>";
		})
		
		$("#blog div#posts").html(content);
	})
	
	GitHubAPI.Repos("enriquez", function(json, status){
		var content = "";
		$.each(json, function(i){
			projectName = "<a href=\"" + this.url + "\">" + this.name + "</a>";
			projectDescription = this.description;
			stats = this.watchers + " watchers";
			if (this.forks > 0){
				stats += ", " + this.forks + " forks";
			}
			content += "<p class=\"project\">" + projectName + " <span class=\"date\">" + stats + "</span><br/>" + projectDescription + "</p>";
		});
		$("#github #projects").html(content);
	})
	
});
