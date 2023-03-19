$(".signup").hide();

$("#signup-form-link").click(function () {
  $(".login").fadeOut(100);
  $(".signup").delay(100).fadeIn(100);
  $("#login-form-link").removeClass("active");
  $("#signup-form-link").addClass("active");
});

$("#login-form-link").click(function () {
  $(".login").delay(100).fadeIn(100);
  $(".signup").fadeOut(100);
  $("#login-form-link").addClass("active");
  $("#signup-form-link").removeClass("active");
});
