$("form").submit(function (e) {
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: "/users/signup",
    data: {
      username: $(".username").val(),
      email: $(".email").val(),
      password: $(".password").val(),
    },
    success: function (res) {
      console.log("RES " + res + ", " + typeof res);
      if (typeof res !== "string") {
        //localStorage.setItem('username', username);
        window.location.href = "/home-page";
      } else {
        $(".errorMSG").text(res);
      }
    },
  });
});
