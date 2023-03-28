const checkAdmin = function (admin) {
  if (admin === "true") {
    $(".admin").show();
  }
};

const loggedIn = function () {
  $(".login").hide();
  $(".logout").show();
};

const loggedOut = function () {
  $(".admin").hide();
  $(".logout").hide();
  $(".login").show();
};

const url = window.location.href;
if (url.includes("?")) {
  let paramString = url.split("?")[1];
  const admin = paramString.split("=")[1];
  if (admin != null) {
    loggedIn();
    checkAdmin(admin);
  }
} else {
  loggedOut();
}
