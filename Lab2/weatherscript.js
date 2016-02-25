var lat;
var lon;
if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(getLocation);
}
function forecastMenu(){
	var tag = $(this).attr("id");
	switch(tag){
		case "d1":
			$("#d2").fadeToggle(1500);
			$("#d3").fadeToggle(1500);
			$("#d4").fadeToggle(1500);
			$("#details1").fadeToggle(1500);
		case "d2":
			$("#d1").fadeToggle(1500);
			$("#d3").fadeToggle(1500);
			$("#d4").fadeToggle(1500);
			$("#details2").fadeToggle(1500);
		case "d3":
			$("#d2").fadeToggle(1500);
			$("#d1").fadeToggle(1500);
			$("#d4").fadeToggle(1500);
			$("#details3").fadeToggle(1500);
		case "d4":
			$("#d2").fadeToggle(1500);
			$("#d3").fadeToggle(1500);
			$("#d1").fadeToggle(1500);
			$("#details4").fadeToggle(1500);
		default: break;
	}
}
function getDirection(deg){
	if(deg >= 348.75 || deg < 11.25){return "N";}
	else if(deg >= 11.25 && deg < 33.75){return "NNE";}
	else if(deg >= 33.75 && deg < 56.25){return "NE";}
	else if(deg >= 56.25 && deg < 78.75){return "ENE";}
	else if(deg >= 78.75 && deg < 101.25){return "E";}
	else if(deg >= 101.25 && deg < 123.75){return "ESE";}
	else if(deg >= 123.75 && deg < 146.25){return "SE";}
	else if(deg >= 146.25 && deg < 168.75){return "SSE";}
	else if(deg >= 168.75 && deg < 191.25){return "S";}
	else if(deg >= 191.25 && deg < 213.75){return "SSW";}
	else if(deg >= 213.75 && deg < 236.25){return "SW";}
	else if(deg >= 236.25 && deg < 258.75){return "WSW";}
	else if(deg >= 258.75 && deg < 281.25){return "W";}
	else if(deg >= 281.25 && deg < 303.75){return "WNW";}
	else if(deg >= 303.75 && deg < 326.25){return "NW";}
	else {return "NNW";}

}
function getDaysofWeek(d){
  var dates = ['','','',''];
  dates[0] = "Tomorrow";
  var i = d.getDay() +2;
  for(count = 1; count < 4; count++){

    if(i > 6){i = 0;}
    switch(i){
      case 0:
        dates[count]="Sunday";
        break;
      case 1:
        dates[count]="Monday";
        break;
      case 2:
        dates[count]="Tuesday";
        break;
      case 3:
        dates[count]="Wednesday";
        break;
      case 4:
        dates[count]="Thursday";
        break;
      case 5:
        dates[count]="Friday";
        break;
      case 6:
        dates[count]="Saturday";
        break;
    }
    i++;
  }
  return dates;

}

function getLocation(position){
	lat = position.coords.latitude;
	lon = position.coords.longitude;
  var d = new Date();
  var dates = getDaysofWeek(d);

	$.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=44db6a862fba0b067b1930da0d769e98&units=imperial",
    dataType: "jsonp",
    success: function(responseData, status) {
      var weatherType = [];
      var temp = '';
      var tempMin = '';
      var tempMax = '';
      var humidity = '';
      var windSpeed = '';
      var windDir='';
      var icn='';
      $.each(responseData.weather, function(i, i2) {
      	$.each(i2, function(k,v){
      		if(k == "main"){weatherType.push(v);}
      		if(k == "icon"){icn="http://openweathermap.org/img/w/"+v+".png";}
      	});
			});
      var weather = weatherType[0];
      for(t = 1; t < weatherType.length; t++){
      	weather += ", " + weatherType[t];
      }
      $("#weatherType").html(weather);
      $('#icon').attr("src",icn);
      $.each(responseData.main, function(k1, v1) {
    		if(k1=="temp"){temp=v1+" F";}
    		else if(k1=="humidity"){humidity="Humidity " +v1 + "%";}
    		else if(k1=="temp_min"){tempMin = v1 + " F";}
    		else if(k1=="temp_max"){tempMax = v1 + " F";}
    	});
  		$("#temp").html(temp);
  		$("#humidity").html(humidity);
      $("#tempMin").html("Low of " + tempMin);
      $("#tempMax").html("High of " + tempMax);
      $.each(responseData.wind, function(k2, v2) {
      	if(k2=="speed"){windSpeed=v2 + "mph";}
      	if(k2=="deg"){windDir=getDirection(v2);}
      });
      $("#windspeed").html(windSpeed+" "+windDir);
      $("#name").html(responseData.name);
  	}
  });
	$.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat+"&lon="+lon+"&APPID=44db6a862fba0b067b1930da0d769e98&units=imperial",
    dataType: "jsonp",
    success: function(responseData, status) {
      var weatherType = [];
      var icn='';
      var days = 0;
      var day = '', morn = '', night = '', eve='';
      $.each(responseData.list, function(i, ii) {
        days += 1;
        if(days <= 4){
          $.each(ii, function(k,v){
            if(k =="temp"){
              $.each(v, function(k1, v1){
                if(k1=="day"){day=v1+"F <ul class='list-group' id='details"+days+"'>";}
                if(k1=="morn"){morn="<li class='list-group-item'>Morning "+v1+"F</li>";}                
                if(k1=="night"){night="<li class='list-group-item'>Night "+v1+"F</li>";}  
                if(k1=="eve"){eve="<li class='list-group-item'>Evening "+v1+"F</li>";}
              });
            }
            if(k == "weather"){
              $.each(v, function(k2,v2){
                $.each(v2, function(k1,v1){
                  if(k1 == "icon"){icn="<img src='http://openweathermap.org/img/w/"+v1+".png'>";}
                });
              });
            }
      	  });
          var inner = dates[days-1]+" "+icn+day+morn+eve+night+"</ul>";
          $("#d"+days).html(inner);
          $("#details"+days).hide();
        }
  		});
    }
	});
}