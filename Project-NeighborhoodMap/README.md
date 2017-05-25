# Introduction
## Neighborhood Analyzer

### Installation Instructions:

1. Clone the repo

  - The file structure:
    * index.html  (Open this in Web Browser)
    * README.md (You are reading this...)
    * Yelp_trademark_RGB.png (Yelp!)
    * js (folder)
      - bootstrap.min.js (Bootstrap)
      - jquery-3.1.1.min.js (Bootsrap/jQuery)
      - knockout-3.4.2.js (Knockout JS)
    * css (folder)
      - bootstrap-theme.min.css (Bootstrap)
      - bootstrap.min.css  (Bootstrap)
      - interactive.css (This is my custom css)
      - jquery-3.1.1.min.js (Bootstrap/jQuery)

2. Mumble the special github prayers

3. Open the html file in web browser.

### What is in there?

1. First, it will try to geolocalize you by using your web browser's location.  SO please grant the program permission to stalk you.  That way you will have much more relevant and rich experience. Otherwise, it will default to my location (Hopefully, I am not right next to you...)

2.  Once we (cough, I mean...) the application obtain the geolocation, it then will use [Open Weather Map API](<http://openweathermap.org/>) to get the  current weather information (as if you actually can't see what is going on outside).

3. With the same data, [NY Times API](https://developers.nytimes.com/) and [Wiki API](https://www.mediawiki.org/wiki/API:Main_page) then is used to obtain articles that may be relevant to you.  (The search term is based on the city/town search term.)

4. Lastly, but not least, the [Google Map](https://developers.google.com/maps/)  (including places) is invoked with your location as the center.  It then searches various establishments around you on your behalf.  You can control what type of establishments you want to explore by choosing the 'types' in drop down which will automatically update the entire front-end for you.

5. Yelp has been implemented to provide points of interest when you click on markers (or on the listings provided on left).  The point of interest will be listed on right side of map, and provide you with titles, picture, and link to Yelp's page of additional information.

6.  What you can't do:
    - Change the 'current location' unless you refresh and choose either default or your location.
    - Control the search terms and results of NY Times or Wiki Articles from the front-end.

### For my **own** references:
#### Parameters of openweathermap JSON
#### <http://openweathermap.org/current#current_JSON>
```JSON
{"coord":
{"lon":145.77,"lat":-16.92},
"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
"base":"cmc stations",
"main":{"temp":293.25,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
"wind":{"speed":5.1,"deg":150},
"clouds":{"all":75},
"rain":{"3h":3},
"dt":1435658272,
"sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
"id":2172797,
"name":"Cairns",
"cod":200}
```
coord
- coord.lon City geo location, longitude
- coord.lat City geo location, latitude

weather (more info Weather condition codes)
- weather.id Weather condition id
- weather.main Group of weather parameters (Rain,
Snow, Extreme etc.)
- weather.description Weather condition within the group
- weather.icon Weather icon id
base Internal parameter

main
- main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
- main.pressure Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
- main.humidity Humidity, %
- main.temp_min Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
- main.temp_max Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
- main.sea_level Atmospheric pressure on the sea level, hPa
- main.grnd_level Atmospheric pressure on the ground level, hPa

wind
- wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
- wind.deg Wind direction, degrees (meteorological)

clouds
- clouds.all Cloudiness, %

rain
- rain.3h Rain volume for the last 3 hours

snow
- snow.3h Snow volume for the last 3Â hours

dt Time of data calculation, unix, UTC

sys
- sys.type Internal parameter
- sys.id Internal parameter
- sys.message Internal parameter
- sys.country Country code (GB, JP etc.)
- sys.sunrise Sunrise time, unix, UTC
- sys.sunset Sunset time, unix, UTC

id City ID

name City name

cod Internal parameter


# Developer Google Instructions
### Places API
<https://developers.google.com/maps/documentation/javascript/examples/place-search>
