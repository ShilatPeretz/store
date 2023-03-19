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

$("form.signup").submit((e) => {
  e.preventDefault();
  const username = $(".signup .username").val();
  const password = $(".signup .password").val();
  const email = $(".signup .email").val();

  const newUser = { username, password, email };

  $.ajax({
    url: "http://localhost:3000/users",
    method: "post",
    data: newUser,
    dataType: "json",
  });

  console.log();
});
