const headerHtml = `
<section>
        <nav id="header">
            <input id="nav-toggle" type="checkbox">
            <div class="logo"><img src="../home-page/images/logo_shlusy.png" alt="logo" style="height: 100px;"></div>
            <ul class="links">
                <li><a class="home" href="http://localhost:3000/users/logged">Home</a></li>
                <!-- where to go while pressing products-->
                <li><a class="products" href="http://localhost:3000/">Products</a></li>
                <!-- where to go while pressing about-->
                <li><a class="about" href="/about-us">About</a></li>
                <li><a class="admin" style="display: none;" href="http://localhost:3000/admin/">Admin</a></li>
                <li><a href="#Help">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-bag-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </a></li>
                <li><a class="login" href="http://localhost:3000/users/isLogged">Log In</a></li>
                <li><a class="logout" style="display: none;" href="#">Log Out</a></li>
            </ul>
            <label for="nav-toggle" class="icon-burger">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </label>
        </nav>
    </section>`;

document.body.insertAdjacentHTML("afterbegin", headerHtml);

$(".logout").click(() => {
  fetch("http://localhost:3000/users/logout");
  localStorage.removeItem("user");
  loggedOut();
});

const showAdmin = function () {
  $(".admin").show();
};

const loggedIn = function () {
  $(".login").hide();
  $(".logout").show();
};

function loggedOut() {
  $(".admin").hide();
  $(".logout").hide();
  $(".login").show();
}

const user = localStorage.getItem("user");
if (user) {
  loggedIn();
  const parsedUser = JSON.parse(user);
  const { isAdmin } = parsedUser;
  if (isAdmin) {
    showAdmin();
  }
}
