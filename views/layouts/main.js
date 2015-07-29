
var APIURL = "http://api.flickr.com/services/feeds/photoset.gne?set=72157639493290775&nsid=37210777@N05&lang=en-us&format=json&jsoncallback=?";

$.getJSON(APIURL, function(data){
  
  // for each image in the results
  $.each(data.items, function(i,item){
    
    // lets get the image url, and not the small one
    var imgURL = item.media.m;
    imgURL = imgURL.replace("_m","");
    
    // generate the image HTML, link to source
    $("<img/>").attr("src", imgURL).appendTo("#slide-images")
    .wrap("<span class=\"slide-item item-" + i + "\"><a href='" + item.link + "'></a></span>");
    
    i++;
  });
  
  $(".total-slides").text(data.items.length-1);
  $(".slide-last").hide();

});


// what happens when 'last' is clicked
$(".slide-last").click(function() {
  var lastSlide = parseInt($(".current-slide").text()) - 1;
  var totalSlides = parseInt($(".total-slides").text());
  
  if(lastSlide == 0) {
    $(".slide-last").hide();
  }
  if(lastSlide <= totalSlides) {
    $(".slide-next").show();
  }
  
  showSlide(lastSlide);
});

// what happens when 'next' is clicked
$(".slide-next").click(function() {
  var nextSlide = parseInt($(".current-slide").text()) + 1;
  var totalSlides = parseInt($(".total-slides").text());
  
  if(nextSlide > 0) {
    $(".slide-last").show();
  }
  if(nextSlide >= totalSlides) {
    $(".slide-next").hide();
  }
  
  showSlide(nextSlide);
});

// show slide based on a slide number
function showSlide(slideNumber)
{
  var currentSlide = parseInt($(".current-slide").text());
  
  $(".item-" + slideNumber).show();
  $(".item-" + currentSlide).hide();
  
  $(".current-slide").text(slideNumber);
}