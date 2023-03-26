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
    if (data._id) {
      alert("Logged in Succesfully");
      window.location.href = "/";
    }
  });
});
var salesData = [
  { category: "short shirts", Qty: 1000 },
  { category: "long shirts", Qty: 2330 },
  { category: "short pants", Qty: 4540 },
  { category: "long pants", Qty: 1239 },
  { category: "skirts", Qty: 4349 },
  { category: "jackets", Qty: 7039 },
  { category: "hoodies", Qty: 1035 },
  { category: "swimming suits", Qty: 1035 },
];

$("#login-form-link").click(() => {
  console.log("in");
  const description = "bbb";
  const category = "skirts";
  const color = "red";
  const size = ["xs", "m"];
  const price = 20;
  const img = "bbb";
  const stock = 2600;

  const user = { description, category, color, size, price, img, stock };

  $.ajax({
    url: "http://localhost:3000/products/createproduct",
    method: "post",
    data: user,
    dataType: "json",
  }).done((data) => {
    if (data._id) {
      alert("****************");
    }
  });
});
