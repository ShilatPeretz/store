$("#home").click(function () {
  window.location.href = "/";
});

$("#details").click(function () {
  $(".section-orders").fadeOut(100);
  $(".section-details").delay(100).fadeIn(100);
});

$("#orders").click(function () {
  $(".section-details").fadeOut(100);
  $(".section-orders").delay(100).fadeIn(100);
});

$("form.changedetails").submit((e) => {
  e.preventDefault();

  const username = $(".changedetails .username-input").val();
  const email = $(".changedetails .email-input").val();
  const password = $(".changedetails .password-input").val();

  const user = { username, email, password };

  $.ajax({
    url: "http://localhost:3000/users/changeUser",
    method: "post",
    data: user,
    dataType: "json",
  }).done((data) => {
    if (
      data.username == username &&
      data.email == email &&
      data.password == password
    ) {
      alert("User details changes successfully");
    }
  });
});
//look at sign up
