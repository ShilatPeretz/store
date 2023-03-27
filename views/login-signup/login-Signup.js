$(".signup").hide();

//return to home page
$(".exit").click(function () {
  window.location.href = "/home-page/";
});

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

  $.ajax({
    url: "http://localhost:3000/users/signup",
    method: "post",
    data: newUser,
    dataType: "json",
  }).done((data) => {
    console.log(data.message);
    if (data._id) {
      alert("Created Succesfully");
    } else {
      alert(data.message);
    }
  });
});

$("form.login").submit((e) => {
  e.preventDefault();
  const email = $(".login .email").val();
  const password = $(".login .password").val();

  const user = { email, password };

  $.ajax({
    url: "http://localhost:3000/users/login",
    method: "post",
    data: user,
    dataType: "json",
  }).done((data) => {
    console.log(data);
    if (data.user._id) {
      alert("Logged in Succesfully");
      window.location.href = `http://localhost:3000/home-page?admin=${data.user.isAdmin}`;
    }
  });
});
