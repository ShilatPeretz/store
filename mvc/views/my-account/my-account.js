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

$(".remove-recipt").click(() => {
  $(".section-recipt").hide();
  $(".section-orders").show();
  $(".products-section").html(` `);
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
$("body")
  .find(".get-information")
  .each((index, element) => {
    element.addEventListener("click", async (e) => {
      $(".section-recipt").show();
      $(".section-orders").hide();
      const orderId = e.target.id;
      const orderData = await $.ajax({
        url: "http://localhost:3000/orders/items/" + orderId,
        method: "get",
        async: false,
      });
      const userID = orderData.userID;
      const user = await $.ajax({
        url: "http://localhost:3000/users/user/" + userID,
        method: "get",
        async: false,
      });
      const date = orderData.date.slice(0, 10);
      $(".recipt-total").text(orderData.price + " USD");
      $(".recipt-username").text(user.username);
      $(".recipt-id").text("Recipt id: " + orderData._id);
      $(".recipt-order-date").text("Order Date: " + date);
      $(".recipt-user-email").text("User email: " + user.email);
      $(".recipt-total-price").text("Total " + orderData.price + " USD");
      $(".recipt-paid-in").text("Paid in: " + orderData.currency);
      for (const product of orderData.products) {
        let p = `<div class="card shadow-0 border mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-2">
              <img
                src="#"
                class="img-fluid"
                alt="Phone"
              />
            </div>
            <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
              <p class="text-muted mb-0">${product.title}</p>
            </div>
            <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
              <p class="text-muted mb-0 small">${product.color}</p>
            </div>
            <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
              <p class="text-muted mb-0 small">Category: ${product.category}</p>
            </div>
            <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
              <p class="text-muted mb-0 small">Qty: 1</p>
            </div>
          </div>
          <hr class="mb-4" style="background-color: #e0e0e0; opacity: 1" />
          <div
            class="text-center d-flex justify-content-end align-items-center"
            style="margin-right: 20px"
          >
            <p class="text-muted mb-0 small">Price:${product.price} USD</p>
          </div>
        </div>
      </div>`;
        $(".products-section").append(p);
      }
    });
  });
