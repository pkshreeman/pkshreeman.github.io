
/*(Greetings!  This is a customized quote generator based on the quotes that was borrowed from the website: http://buddhaimonia.com/101-zen-sayings-and-proverbs as part of the freecodecamp project.*/

var qii = 0;
var thequote;
var quoteblock;
var qblock;
var quotes = [
  '&quot;The only thing that is ultimately real about your journey is the step that you are taking at this moment. That’s all there ever is.&period;&period;&period; &quot;  Eckhart Tolle',

  '&quot;Wherever you are, be there totally.&quot;  Eckhart Tolle',

  '&quot;I&apos;m here to tell you that the path to peace is right there, when you want to get away.&quot;  Pema Ch&ouml;dr&ouml;n',

  '&quot;When you are present, you can allow the mind to be as it is without getting entangled in it.&quot; Eckhart Tolle',

  '&quot;If you miss the present moment, you miss your appointment with life. That is very serious!&quot; Thich Nhat Hanh',

  '&quot;Practice is this life, and realization is this life, and this life is revealed right here and now.&quot;  Maezumi Roshi',

  '&quot;If you want to change the world, start with the next person who comes to you in need.&quot;  B. D. Schiers',

  '&quot;My experience is that the teachers we need most are the people we’re living with right now.&quot; Byron Katie',

  '&quot;Guilt, regret, resentment, sadness and all forms of nonforgiveness are caused by too much past and not enough presence.&quot;  Eckhart Tolle',

  '&quot;Throughout this life, you can never be certain of living long enough to take another breath.&quot;  Huang Po',

  '&quot;Awareness is the greatest agent for change.&quot;  Eckhart Tolle',

  '&quot;When you do something, you should burn yourself up completely, like a good bonfire, leaving no trace of yourself.&quot;  Shunryu Suzuki'
];

var block1 = '<a class=\"button\" target=\"_blank\" href=\'https://twitter.com/intent/tweet?text=';

var block2 = '\'> <button class = "button btn btn-primary"> Tweet the quote! </button></a> <button id = "quotebutton" class="button btn btn-primary">Random Quotes</button> <br> <div class = "sourcelink"> Source of the quotes: <br> <a href = "http://buddhaimonia.com/101-zen-sayings-and-proverbs/">http://buddhaimonia.com/101-zen-sayings-and-proverbs/</a></div>';
var qlen = quotes.length;
var quoteblock;
console.log(block1);
$(document).ready(function(){
  $(document).on('click', '#quotebutton', function() {
    console.log("I see the click");
    qii = Math.floor(Math.random()*(qlen)) ;
     quoteblock1 = block1 + quotes[qii] + ' \'> <button class = "button btn btn-primary"> Tweet the quote! </button></a> '
     console.log(quoteblock1);
    $('#block1').html(quoteblock1);
    $('#quotemachine').html(quotes[qii]);
  //  $("#quotemachine").html(qblock);
  });
});
