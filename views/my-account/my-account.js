$("#home").click(() => {
  $.ajax({
    url: "http://localhost:3000/home-page.html",
    method: "post",
  });
});

$(".details").click(() => {
  $(".section-orders").delay(100).fadeIn(100);
  $(".section-details").fadeOut(100);
});

$(".orders").click(() => {
  $(".section-details").delay(100).fadeIn(100);
  $(".section-orders").fadeOut(100);
});

//add change button
