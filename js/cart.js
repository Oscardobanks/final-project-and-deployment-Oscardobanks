document.addEventListener("DOMContentLoaded", function () {
  // Load cart from localStorage
  function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Save cart to localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Update cart count in header
  function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      const cart = loadCart();
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountElement.textContent = itemCount;
    }
  }

  // Render cart items
  function renderCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartSummary = document.querySelector(".cart-summary");
    const emptyCartMessage = document.getElementById("empty-cart-message");

    if (!cartItemsContainer || !cartSummary) return;

    const cart = loadCart();

    // Show empty cart message if cart is empty
    if (cart.length === 0) {
      if (emptyCartMessage) {
        emptyCartMessage.classList.remove("hidden");
      }
      cartItemsContainer.parentElement.classList.add("hidden");
      cartSummary.classList.add("hidden");
      return;
    }

    // Hide empty cart message and show cart content
    if (emptyCartMessage) {
      emptyCartMessage.classList.add("hidden");
    }
    cartItemsContainer.parentElement.classList.remove("hidden");
    cartSummary.classList.remove("hidden");

    // Clear cart items container
    cartItemsContainer.innerHTML = "";

    // Add each item to the cart
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${
                          item.id
                        }">-</button>
                        <input type="number" value="${
                          item.quantity
                        }" min="1" data-id="${item.id}" readonly>
                        <button class="increase-quantity" data-id="${
                          item.id
                        }">+</button>
                    </div>
                    <div class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            `;

      cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners to cart item buttons
    addCartItemEventListeners();

    // Update cart summary
    updateCartSummary();
  }

  // Add event listeners to cart item buttons
  function addCartItemEventListeners() {
    // Increase quantity buttons
    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        updateItemQuantity(productId, 1);
      });
    });

    // Decrease quantity buttons
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        updateItemQuantity(productId, -1);
      });
    });

    // Remove item buttons
    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        removeItemFromCart(productId);
      });
    });
  }

  // Update item quantity
  function updateItemQuantity(productId, change) {
    const cart = loadCart();
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity += change;

      // Remove item if quantity is 0 or less
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }

      saveCart(cart);
      renderCart();
      updateCartCount();
    }
  }

  // Remove item from cart
  function removeItemFromCart(productId) {
    const cart = loadCart();
    const updatedCart = cart.filter((item) => item.id !== productId);

    saveCart(updatedCart);
    renderCart();
    updateCartCount();
  }

  // Update cart summary
  function updateCartSummary() {
    const subtotalElement = document.getElementById("cart-subtotal");
    const shippingElement = document.getElementById("cart-shipping");
    const taxElement = document.getElementById("cart-tax");
    const totalElement = document.getElementById("cart-total");

    if (!subtotalElement || !totalElement) return;

    const cart = loadCart();

    // Calculate subtotal
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Calculate shipping (free over $100, otherwise $10)
    const shipping = subtotal > 100 ? 0 : 10;

    // Calculate tax (8.25%)
    const tax = subtotal * 0.0825;

    // Calculate total
    const total = subtotal + shipping + tax;

    // Update elements
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElement) {
      shippingElement.textContent =
        shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
    }
    if (taxElement) {
      taxElement.textContent = `$${tax.toFixed(2)}`;
    }
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Apply promo code
  const promoForm = document.getElementById("promo-form");
  if (promoForm) {
    promoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const promoInput = document.getElementById("promo-code");
      const promoCode = promoInput.value.trim().toUpperCase();

      // Check if promo code is valid (in a real app, this would check against a database)
      if (promoCode === "DISCOUNT20") {
        // Apply 20% discount
        applyDiscount(0.2, "DISCOUNT20");
        showMessage("Promo code applied successfully!", "success");
      } else {
        showMessage("Invalid promo code.", "error");
      }

      promoInput.value = "";
    });
  }

  // Apply discount to cart
  function applyDiscount(discountRate, promoCode) {
    // In a real app, you would store the applied discount in the cart or session
    // For this demo, we'll just update the UI

    const cart = loadCart();

    // Calculate subtotal
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Calculate discount amount
    const discountAmount = subtotal * discountRate;

    // Add discount row to summary if it doesn't exist
    const cartSummary = document.querySelector(".cart-summary");
    let discountRow = document.getElementById("discount-row");

    if (!discountRow) {
      discountRow = document.createElement("div");
      discountRow.id = "discount-row";
      discountRow.className = "summary-row";
      discountRow.innerHTML = `
                <span>Discount (${promoCode})</span>
                <span id="cart-discount">-$${discountAmount.toFixed(2)}</span>
            `;

      // Insert before total row
      const totalRow = document.querySelector(".summary-row.total");
      cartSummary.insertBefore(discountRow, totalRow);
    } else {
      // Update existing discount row
      document.getElementById(
        "cart-discount"
      ).textContent = `-$${discountAmount.toFixed(2)}`;
    }

    // Recalculate total
    updateCartTotal();
  }

  // Update cart total after discount
  function updateCartTotal() {
    const subtotalElement = document.getElementById("cart-subtotal");
    const shippingElement = document.getElementById("cart-shipping");
    const taxElement = document.getElementById("cart-tax");
    const discountElement = document.getElementById("cart-discount");
    const totalElement = document.getElementById("cart-total");

    if (!subtotalElement || !totalElement) return;

    // Get values
    const subtotal = parseFloat(subtotalElement.textContent.replace("$", ""));
    const shipping =
      shippingElement.textContent === "Free"
        ? 0
        : parseFloat(shippingElement.textContent.replace("$", ""));
    const tax = parseFloat(taxElement.textContent.replace("$", ""));
    const discount = discountElement
      ? parseFloat(discountElement.textContent.replace("-$", ""))
      : 0;

    // Calculate new total
    const total = subtotal + shipping + tax - discount;

    // Update total element
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Show message function
  function showMessage(text, type) {
    const message = document.createElement("div");
    message.className = `message message-${type}`;
    message.textContent = text;

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.opacity = "1";
      message.style.transform = "translateY(0)";
    }, 10);

    setTimeout(() => {
      message.style.opacity = "0";
      message.style.transform = "translateY(-20px)";
      setTimeout(() => {
        document.body.removeChild(message);
      }, 300);
    }, 3000);
  }

  // Checkout button
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      // In a real app, this would redirect to a checkout page
      // For this demo, we'll just show a message
      showMessage(
        "Checkout functionality would be implemented in a real application.",
        "info"
      );
    });
  }

  // Initialize cart on page load
  renderCart();
  updateCartCount();
});
