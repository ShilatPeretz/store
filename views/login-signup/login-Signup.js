$(".signup").hide();

//return to home page
//$(".exit").click(function () {
// window.location.href = "/home-page/";
//});

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
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = `http://localhost:3000/home-page`;
    }
  });
});

$(".exit").click(function () {
  const date = new Date("2022-01-04");
  const userID = "641f1e8c68ca110d43a4b847";
  const products = [
    "6421e5d8c3cbf7467bedb334",
    "6421e65261fffaa1b437fab5",
    "6421e7d421f2ee17cb4712f1",
    "6421e8e533f9cb43948a4d0c",
    "6421ea14da6d2feeb53a97c1",
  ];
  const price = 145;

  const user = { date, userID, products, price };

  $.ajax({
    url: "http://localhost:3000/products/createorder",
    method: "post",
    data: user,
    dataType: "json",
  });
});
