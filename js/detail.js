document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || 1;

  fetch("../json/packages.json")
    .then(res => res.json())
    .then(data => {
      const product = data.find(p => p.id == id);
      if (!product) return;

      document.getElementById("title").textContent = product.title;
      document.getElementById("image").src = product.hero;
      document.getElementById("price").textContent = `$${product.price}`;

      paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              description: product.title,
              amount: { value: product.price.toString() }
            }]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            console.log("Payment completed:", details);
            alert(`Payment completed: $${details.purchase_units[0].amount.value}`);
          });
        },
        onError: function (err) {
          console.error("PayPal Error:", err);
          alert("Payment failed. Check console.");
        }
      }).render('#paypal-button-container');
    })
    .catch(err => console.error("JSON load error:", err));
});