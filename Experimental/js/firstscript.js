/*jshint esversion: 6 */
var ViewModel = {
  quote: ko.observable(),
  quotes: ko.observable({
    "success": {
        "total": 1
    },
    "contents": {
        "quotes": [
            {
                "quote": "Plant your own garden and decorate your own soul, instead of waiting for someone to bring you flowers.",
                "length": "102",
                "author": "Veronica A. Shoffstall",
                "tags": [
                    "flowers",
                    "inspire",
                    "self-help",
                    "soul"
                ],
                "category": "inspire",
                "date": "2017-05-25",
                "permalink": "https://theysaidso.com/quote/LQbKQGxVA2rcH4lIwn6OIweF/veronica-a-shoffstall-plant-your-own-garden-and-decorate-your-own-soul-instead-o",
                "title": "Inspiring Quote of the day",
                "background": "https://theysaidso.com/img/bgs/man_on_the_mountain.jpg",
                "id": "LQbKQGxVA2rcH4lIwn6OIweF"
            }
        ],
        "copyright": "2017-19 theysaidso.com"
    }
}),

  pub: ko.observable(
    [{
        "image": "img/Dissertation1-300px.png",
        "link": "https://drive.google.com/file/d/0B69-mwt8z-vza2NubnJQQmdrWkk/view?usp=sharing"
      },

      {
        "image": "img/2013-300px.png",
        "link": "https://drive.google.com/file/d/0B69-mwt8z-vzN3g2TTZZXzJMMW8/view?usp=sharing "
      },

      {
        "image": "img/2011-300px.png",
        "link": "https://drive.google.com/file/d/0B69-mwt8z-vzSG9hdGFXVDFsR3M/view?usp=sharing "
      },


      {
        "image": "img/2010-300px.png",
        "link": "https://drive.google.com/file/d/0B69-mwt8z-vzMVlHWE1DUWVRYzg/view?usp=sharing "
      },

      {
        "image": "img/2009-300px.png",
        "link": "https://drive.google.com/file/d/0B69-mwt8z-vzUkJpZHo2WEVzUWM/view?usp=sharing "
      },

      {
        "image": "img/2005-300px.png",
        "link": "https://drive.google.com/file/d/0B69-mwt8z-vzU195dnc4SER5OHM/view?usp=sharing "
      },

      {
        "image": "img/2004-300px.png",
        "link": "https://drive.google.com/file/d/0B69-mwt8z-vzU2VNaVl5NFpsVlk/view?usp=sharing "
      },
    ]
  )
};

function endofvideo(){
  console.log("end of video triggered")
  $('.salute').hide('slow');}

function getquote(){
  var getURL = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback";
  $.getJSON(getURL, function(response) {
    ViewModel.quote(response);
});
}
ko.applyBindings(ViewModel);
