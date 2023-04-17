$("#home").click(function () {
  window.location.href = "/";
});

$("#details").click(function () {
  $(".section-orders").fadeOut(100);
  $(".section-recipt").fadeOut(100);
  $(".section-details").delay(100).fadeIn(100);
});

$("#orders").click(function () {
  $(".section-details").fadeOut(100);
  $(".section-recipt").fadeOut(100);
  $(".section-orders").delay(100).fadeIn(100);
});

//change account details
let tmp = "";
let username = "";
let password = "";
$("form.enterdetails").submit((e) => {
  e.preventDefault();
  username = $(".enterdetails .username-input").val();
  password = $(".enterdetails .password-input").val();

  const user = { username, password };
  $.ajax({
    url: "http://localhost:3000/users/validuser",
    method: "post",
    data: user,
    dataType: "json",
  }).done((data) => {
    if (data.message == "OK") {
      tmp = "ok";
      openChange();
    } else {
      alert(data.message);
    }
  });
});

$("form.changedetails").submit((e) => {
  e.preventDefault();
  if (tmp != "ok") {
    alert("please enter user details first!");
    return;
  }
  const NewUsername = $(".changedetails .username-input").val();
  const NewEmail = $(".changedetails .email-input").val();
  const NewPassword = $(".changedetails .password-input").val();

  const user = { username, password, NewUsername, NewEmail, NewPassword };

  $.ajax({
    url: "http://localhost:3000/users/updateUser",
    method: "post",
    data: user,
    dataType: "json",
  });
});

function openChange() {
  $(".changedetails .username-input").prop("disabled", false);
  $(".changedetails .email-input").prop("disabled", false);
  $(".changedetails .password-input").prop("disabled", false);
}

//view orders
// $("#get-information").click(function () {
//   const orderID = 3;
// });
