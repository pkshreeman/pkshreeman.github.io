/*var video = document.querySelector('video');
video.addEventListener('ended', function () {
  $(".intro-video").html('<img src="img/Abey1.jpg">')
});
*/

var figure = $(".video").hover(hoverVideo, hideVideo);

function hoverVideo(e) {
  $('video', this).get(0).play();
}

function hideVideo(e) {
  $('video', this).get(0).pause();
}