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

  const newUser = { username, email, password };

  const response = $.ajax({
    url: "http://localhost:3000/users/signup",
    method: "post",
    data: newUser,
    dataType: "json",
  });

  const data = response.json();
  if (data.message) {
    alert(data.message);
  }

  console.log();
});

$("form.login").submit((e) => {
  e.preventDefault();
  const email = $(".login .email").val();
  const password = $(".login .password").val();

  const User = { email, password };

  $.ajax({
    url: "http://localhost:3000/users/login",
    method: "get",
    data: User,
    dataType: "json",
  });

  console.log();
});
