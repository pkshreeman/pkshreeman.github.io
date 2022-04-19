$(document).ready(function () {
  $('#header').load("header2.html");  // NOTE: Default header.html is the orginial nav-bar
  //$('#body').load("about.html");  //Featuring Issue 3 Coming Soon!
  $('#body').load("issue3.html")
});

function callHome() {
  $('#body').load("issue1.html");
}
function callIssue3() {
  $('#body').load("issue3.html");
}
function callIssue2() {
  $('#body').load("issue2.html");
}
function callIssue1() {
  $('#body').load("issue1.html");
}
function callStigmata() {
  $('#body').load("stigmata.html");
}
function callEclipsor() {
  $('#body').load("eclipsor.html");
}
function callVertigo() {
  $('#body').load("vertigo.html");
}
function callPlasma() {
  $('#body').load("plasma.html");
}
function callCyclone() {
  $('#body').load("cyclone.html");
}
function callQuantum() {
  $('#body').load("quantum.html");
}
function callAbout() {
  $('#body').load("about.html");
}
function callArtist() {
  $('#body').load("artist.html");
}
function callStarRangers(){
  $('#body').load("starrangers.html");
}
function callStarRangers1(){
  $('#body').load("starrangers1.html");
}
function callStarRangers2(){
  $('#body').load("starrangers2.html");
}
function callStarRangers3(){
  $('#body').load("starrangers3.html");
}
function callStarRangers4(){
  $('#body').load("starrangers4.html");
}
function callStarRangers5(){
  $('#body').load("starrangers5.html");
}
function callStarRangers6(){
  $('#body').load("starrangers6.html");
}
function callStarRangers7(){
  $('#body').load("starrangers7.html");
}
function callStarRangers8(){
  $('#body').load("starrangers8.html");
}
function callStarRangers9(){
  $('#body').load("starrangers9.html");
}
function callStarRangers10(){
  $('#body').load("starrangers10.html");
}
function callStarRangers11(){
  $('#body').load("starrangers11.html");
}
function callTracing101(){
  $('#body').load("Tracing101.html");
}
// Going to try a complex function that rewrites 11 different html codes
// based on the input values - success!  Use this from now on.  Just type 'name.html' 
// such as onclick="loadFxn('name.html')"
function loadFxn(value){
  $('#body').load(value)
}