function loadCart() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartItems = document.getElementById("cart-items");
      const grandTotal = document.getElementById("grand-total");

      cartItems.innerHTML = "";
      let total = 0;

      cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
          <tr>
            <td><img src="${item.img}" alt="${item.product}"></td>
            <td>${item.product}</td>
            <td>$${item.price}</td>
            <td>
              <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
              ${item.quantity}
              <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
            </td>
            <td>$${itemTotal}</td>
            <td><button class="remove-btn" onclick="removeItem(${index})">X</button></td>
          </tr>
        `;
      });

      grandTotal.innerText = total;
    }

    function changeQty(index, change) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }

    function removeItem(index) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }

    function buyNow() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert("🎉 Purchase successful! Thank you for your order.");
      localStorage.removeItem("cart"); // clear the cart
      loadCart(); // refresh UI
    }

    loadCart();