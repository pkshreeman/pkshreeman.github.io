/*jshint esversion: 6 */
var ViewModel = {
  tweetquote: ko.observable(),
  quote: ko.observable(),
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
  ),
  history: ko.observable([
    {
      "date": "2017-05",
      "event": "Recieved Full Stack Web Development Nanodegree",
      "certificate":""
    },
    {
      "date":"2016-10",
      "event":"Recieved Front-End Development Certification",
      "certificate":""
    },
    {"date": "2012-08",
      "event": "Graduated with PhD in Nanoscale Science and Engineering",
      "certificate":""
    }
  ])
};

function endofvideo() {
  console.log("end of video triggered");
  $('.salute').hide('slow');
  getquote();
}


function mycallback(data) {
  console.log("mycallback for twitter is triggered.");
  console.log(data);
  ViewModel.quote(data);
  var tweetthis = "https://twitter.com/intent/tweet?text="+ jQuery(ViewModel.quote()[0].content).text();
  ViewModel.tweetquote(tweetthis);
}

function getquote() {
  var url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback";
  $.ajax({
    url: url,
    type: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    crossDomain: true,
    dataType: 'jsonp',
  });
}

$('.collaspe').click(function(){
  $('.collaspe').collapse();
  console.log("The click function of pubrow is triggered");
});

//https://stackoverflow.com/questions/9048253/in-javascript-if-mobile-phone
// Code to detect the mobile to enable quote without having to play the video firstvideo
// Also hid the video...not sure if I want to do that or not.

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    $('.salute').hide();
    getquote();
}
ko.applyBindings(ViewModel);
