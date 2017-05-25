/*jshint esversion: 6 */
var model = {

  GeoLocalize: function() {
    //https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    // Modified with my function processor
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function processor(lat = 38.7293334, long = -121.2751474) {
      //Default lat and long is installed in case there is issue with obtaining location from client
      JGeo = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + '&lon=' + long + '&units=metric&appid=eb5d3093d7e824e8a57c0037fc66c1ea';
      var currentGeoLocation = [lat, long, JGeo];
      console.log("currentGeoLocation at Processor():");
      console.log(currentGeoLocation);
      model.obtainWeather(currentGeoLocation);
      ViewModel1.kolon(long);
      ViewModel1.kolat(lat);
      model.getMap();
      model.obtainRGeo();
    }

    function success(pos) {
      var crd = pos.coords;
      processor(crd.latitude, crd.longitude);
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      processor();
      console.warn(`ERROR(${err.code}): ${err.message}`);
      console.warn('Default Coordinates are used.');
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  },


  getNYTimes: function() {
    var NYTKey = '&api_key=df8caa62f6d142c7bc7c4e5a56d37ea7';
    var NYTUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + ViewModel1.city() + "&sort=newest" + NYTKey;
    console.log("NYTimes URL get:");
    console.log(NYTUrl);

    $.getJSON(NYTUrl, function(data) {
      if (data) {
        ViewModel1.articlesNYT(data.response.docs);

      } else {
        ViewModel1.errorNYTimes("The NY Times data was returned null");
      }
    }).fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
      ViewModel1.errorNYTimes("The NY Times API has failed. Please check your connectivity.");
    });
  },

  getWiki: function() {
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + ViewModel1.city() + '&format=json';
    $.ajax({
      url: wikiUrl, //just adding error here.
      dataType: 'jsonp',
      jsonp: 'callback'
    }).done(function(response) {
      console.log("Wiki's Response");
      console.log(response);
      ViewModel1.wikiHeader(response[1]);
      ViewModel1.wikiArticle(response[2]);
      ViewModel1.wikiLink(response[3]);
      for (var i = 0; i < response[1].length; i++) {
        ViewModel1.wikiArray.push({
          title: response[1][i],
          desc: response[2][i],
          link: response[3][i]
        });
      }
    }).fail(function(jqXHR, textStatus) {
      console.log(textStatus);
      ViewModel1.errorWiki("The Wiki API call has failed.");
    });

  },

  obtainWeather: function(geo) {
    console.log('Obtaining the Weather! :D ');
    //console.log(geo)
    //Note, use geo[2] for the url address...
    $.getJSON(geo[2], function(data) {
      controller.weatherize(data);
      ViewModel1.weatherdata(data);
      console.log(data);
    }).fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
      ViewModel1.errorWeather("The OpenWeatherMap API has failed. Please check your connectivity.");
    });
  },

  obtainRGeo: function() {
    $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + ViewModel1.kolat() + "," + ViewModel1.kolon() + '&key=AIzaSyC9AjHKQO7uPcP3qj0b__1NI0xMXXgPBrc&results_type=locality|administrative_area_level_1',
      function(gdata) {
        console.log(gdata);
        ViewModel1.city(gdata.results["0"].address_components[3].long_name);
        ViewModel1.state(gdata.results["0"].address_components[5].long_name);
        ViewModel1.address(gdata.results["0"].formatted_address);
        model.getNYTimes();
        model.getWiki();
      }).fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
      ViewModel1.errorRGeo("The Google Location API has failed. Please check your connectivity.  This cascades into NY Times and Wiki's ability to obtain results as well.");
    });
  },

  getMap: function() {
    var currentloc = {
      lat: ViewModel1.kolat(),
      lng: ViewModel1.kolon()
    };

    function makeMarkerIcon(markerColor) {
      var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(25, 25),
        new google.maps.Point(0, 0),
        new google.maps.Point(5, 5),
        new google.maps.Size(20, 20));
      return markerImage;
    }

    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');

    map = new google.maps.Map(document.getElementById('map'), {
      center: currentloc,
      zoom: 10
    });

    // Added this from https://developers.google.com/maps/documentation/javascript/examples/event-simple
    map.addListener('center_changed', function() {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
        map.setZoom(10);
      }, 3000);
    });

    // End of addition

    var marker = new google.maps.Marker({
      position: currentloc,
      animation: google.maps.Animation.DROP,
      map: map,
      title: "You are here! :D"
    });

    var infowin = new google.maps.InfoWindow({
      content: "Do you see me? "
    });
    marker.addListener('click', function() {
      infowin.open(map, marker);
    });
    //Added this below

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: currentloc,
      radius: 5000,
      type: []
    }, callback2);

    ViewModel1.selectedPlace.subscribe(function() {
      //http://stackoverflow.com/questions/25937131/knockoutjs-select-change-event-doesnt-fire-the-first-time
      if (ViewModel1.selectedPlace()) {
        //for (var i = 0; i < markers.length; i++) {
        for (var i = 0; i < ViewModel1.placesGoogle().length; i++) {
          //  markers[i].setMap(null);
          ViewModel1.placesGoogle()[i].marker.setMap(null);
        }
        //markers = [];
        service.nearbySearch({
          location: currentloc,
          radius: 5000,
          type: ViewModel1.selectedPlace()
        }, callback2);

      }
    });

    ViewModel1.query.subscribe(function(value) {
      //http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
      for (var i = 0; i < ViewModel1.placesGoogle().length; i++) {
        ViewModel1.placesGoogle()[i].marker.setMap(null);
        ViewModel1.placesGoogle()[i].viewQ(false);
}
        for (var j in ViewModel1.placesGoogle()) {
          if (ViewModel1.placesGoogle()[j].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
            console.log("A match is found..." + value);
            ViewModel1.placesGoogle()[j].viewQ(true);
            ViewModel1.placesGoogle()[j].marker.setMap(map);

        }
      }

      console.log(ViewModel1.query());
    });

    function yelper(name, lat, lng) {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://drpkshreeman.herokuapp.com/https://api.yelp.com/v3/businesses/search?name=" + name + "&latitude=" + lat + "&longitude=" + lng + "&limit=10",
        "method": "GET",
        "headers": {
          "authorization": "Bearer LZJw4j51rV5ItgwB9BIU07S31A6LzLB2g9khZuqsE9zs7R9KYM4ojJP6bZQhwFWMtYXNSIu_N6_M15GkOHCMcKqbQ7ohhDWHkgb8OXI0yLpz3JwGBHI7v87KFB8jWXYx",
          "cache-control": "no-cache",
          "postman-token": "c410055b-5833-5499-931b-26a9ef957200"
        }
      };

      $.ajax(settings).done(function(response) {
        console.log('The response from Yelp:');
        console.log(response);
        console.log('The inputs are:' + settings.url);
        ViewModel1.yelpdata(response.businesses);
      }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
        ViewModel1.yelperror("Some Type of error occured: " + err);
      });
    }

    function callback2(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        ViewModel1.prePlace(results);
        for (var i = 0; i < results.length; i++) {
          ViewModel1.prePlace()[i].viewQ = ko.observable(true);
          createMarker(results[i], i);
        }
        ViewModel1.placesGoogle(ViewModel1.prePlace());
      } else {
        console.log("callback2 failed");
        ViewModel1.errorMarker('Google Places Call Failed. You will not be seeing any additional markers or places.');
      }

      function createMarker(place, num) {

        var icon = {
          url: place.icon,
          size: new google.maps.Size(25, 25),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(5, 5),
          scaledSize: new google.maps.Size(20, 20)
        };
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: icon
        });
        //yelper(place.name, place.geometry.location.lat(), place.geometry.location.lng());
        //Trigger this in click event if possible.
        //  markers.push(marker);
        marker.addListener('click', function() {
          map.panTo(marker.getPosition());
          map.setZoom(18);
          map.setCenter(marker.getPosition());
        });

        ViewModel1.prePlace()[num].marker = marker;
        //lets see if this works...


        google.maps.event.addListener(marker, 'click', function() {
          marker.setAnimation(google.maps.Animation.DROP);
          infowin.setContent(place.name);
          infowin.open(map, this);
          yelper(place.name, place.geometry.location.lat(), place.geometry.location.lng()); //See if this works...

        });
        google.maps.event.addListener(marker, 'mouseover', function() {
          marker.setIcon(highlightedIcon);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
          marker.setIcon(icon);
        });
      }
    }
  }
};

var controller = {
  init: function() {
    model.GeoLocalize();
  },

  weatherize: function(wdata) {
    ViewModel1.temp('Your current temperature is ' + Math.floor(wdata.main.temp * (9 / 5) + 32) + '°F');
    ViewModel1.iconID("http://openweathermap.org/img/w/" + wdata.weather["0"].icon + ".png");
    ViewModel1.weatherdes(wdata.weather[0].description);
  },

};


var ViewModel1 = {
  yelpdata: ko.observable(),
  errorMarker: ko.observable(),
  errorRGeo: ko.observable(),
  errorWeather: ko.observable(),
  errorWiki: ko.observable(),
  errorNYTimes: ko.observable(),
  errorGoogleMap: ko.observable(),
  notifyGoogleMapError: function() {
    console.warn("googleMapError is triggered");
    ViewModel1.errorGoogleMap("Google Map has failed to load.  Please check your network connectivity");
  },
  weatherdata: ko.observableArray(),
  temp: ko.observable(),
  iconID: ko.observable(),
  city: ko.observable(),
  state: ko.observable(),
  kolon: ko.observable(),
  kolat: ko.observable(),
  address: ko.observable(),
  weatherdes: ko.observable(),
  articlesNYT: ko.observable(),
  wikiArticle: ko.observable(),
  wikiLink: ko.observable(),
  wikiHeader: ko.observable(),
  wikiArray: ko.observableArray(),
  placesGoogle: ko.observable(),
  places: ko.observable([
    'accounting',
    'airport',
    'amusement_park',
    'aquarium',
    'art_gallery',
    'atm',
    'bakery',
    'bank',
    'bar',
    'beauty_salon',
    'bicycle_store',
    'book_store',
    'bowling_alley',
    'bus_station',
    'cafe',
    'campground',
    'car_dealer',
    'car_rental',
    'car_repair',
    'car_wash',
    'casino',
    'cemetery',
    'church',
    'city_hall',
    'clothing_store',
    'convenience_store',
    'courthouse',
    'dentist',
    'department_store',
    'doctor',
    'electrician',
    'electronics_store',
    'embassy',
    'fire_station',
    'florist',
    'funeral_home',
    'furniture_store',
    'gas_station',
    'gym',
    'hair_care',
    'hardware_store',
    'hindu_temple',
    'home_goods_store',
    'hospital',
    'insurance_agency',
    'jewelry_store',
    'laundry',
    'lawyer',
    'library',
    'liquor_store',
    'local_government_office',
    'locksmith',
    'lodging',
    'meal_delivery',
    'meal_takeaway',
    'mosque',
    'movie_rental',
    'movie_theater',
    'moving_company',
    'museum',
    'night_club',
    'painter',
    'park',
    'parking',
    'pet_store',
    'pharmacy',
    'physiotherapist',
    'plumber',
    'police',
    'post_office',
    'real_estate_agency',
    'restaurant',
    'roofing_contractor',
    'rv_park',
    'school',
    'shoe_store',
    'shopping_mall',
    'spa',
    'stadium',
    'storage',
    'store',
    'subway_station',
    'synagogue',
    'taxi_stand',
    'train_station',
    'transit_station',
    'travel_agency',
    'university',
    'veterinary_care',
    'zoo'
  ]),
  selectedPlace: ko.observable(),
  yelperror: ko.observable("Please select a marker to get Yelp's Point of Interest listing"),
  query: ko.observable(),
  prePlace: ko.observable(),
};



function markmarker(place) {
  console.log("markmarker function is triggered");
  google.maps.event.trigger(place.marker, 'click');
}

//var markers = [];
controller.init();
ko.applyBindings(ViewModel1);
