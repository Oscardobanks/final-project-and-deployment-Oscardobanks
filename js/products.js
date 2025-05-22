document.addEventListener("DOMContentLoaded", function () {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      category: "Clothing",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviewCount: 128,
      image: "../images/product-1.jpg",
      badge: "sale",
      description:
        "A comfortable and versatile white t-shirt made from 100% organic cotton.",
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      category: "Clothing",
      price: 59.99,
      originalPrice: null,
      rating: 4.2,
      reviewCount: 95,
      image: "../images/product-2.jpg",
      badge: null,
      description: "Modern slim fit jeans with a comfortable stretch fabric.",
    },
    {
      id: 3,
      name: "Leather Crossbody Bag",
      category: "Accessories",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.8,
      reviewCount: 74,
      image: "../images/product-3.jpg",
      badge: "sale",
      description:
        "A stylish leather crossbody bag with multiple compartments.",
    },
    {
      id: 4,
      name: "Casual Sneakers",
      category: "Footwear",
      price: 79.99,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 112,
      image: "../images/product-4.jpg",
      badge: "new",
      description: "Comfortable casual sneakers perfect for everyday wear.",
    },
    {
      id: 5,
      name: "Oversized Sweater",
      category: "Clothing",
      price: 69.99,
      originalPrice: 89.99,
      rating: 4.3,
      reviewCount: 67,
      image: "../images/product-5.jpg",
      badge: "sale",
      description: "A cozy oversized sweater for those chilly days.",
    },
    {
      id: 6,
      name: "Aviator Sunglasses",
      category: "Accessories",
      price: 129.99,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 53,
      image: "../images/product-6.jpg",
      badge: null,
      description: "Classic aviator sunglasses with UV protection.",
    },
    {
      id: 7,
      name: "Floral Summer Dress",
      category: "Clothing",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.4,
      reviewCount: 88,
      image: "../images/product-7.jpg",
      badge: "sale",
      description: "A light and breezy floral dress perfect for summer.",
    },
    {
      id: 8,
      name: "Leather Watch",
      category: "Accessories",
      price: 199.99,
      originalPrice: null,
      rating: 4.9,
      reviewCount: 42,
      image: "../images/product-8.jpg",
      badge: "new",
      description: "A sophisticated leather watch with a minimalist design.",
    },
  ];

  // Function to render products
  function renderProducts(productsToRender) {
    const productsGrid = document.querySelector(".products-grid");
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    productsToRender.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      // Generate stars based on rating
      let stars = "";
      const fullStars = Math.floor(product.rating);
      const halfStar = product.rating % 1 >= 0.5;

      for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
          stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && halfStar) {
          stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
          stars += '<i class="far fa-star"></i>';
        }
      }

      productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${
                      product.badge
                        ? `<span class="product-badge badge-${product.badge}">${product.badge}</span>`
                        : ""
                    }
                    <div class="product-actions">
                        <button class="action-btn add-to-cart" data-id="${
                          product.id
                        }">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                        <button class="action-btn quick-view" data-id="${
                          product.id
                        }">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn add-to-wishlist" data-id="${
                          product.id
                        }">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(
                          2
                        )}</span>
                        ${
                          product.originalPrice
                            ? `<span class="original-price">$${product.originalPrice.toFixed(
                                2
                              )}</span>`
                            : ""
                        }
                    </div>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-count">(${
                          product.reviewCount
                        })</span>
                    </div>
                </div>
            `;

      productsGrid.appendChild(productCard);
    });

    // Add event listeners to the newly created buttons
    addProductEventListeners();
  }

  // Function to add event listeners to product buttons
  function addProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const productId = parseInt(this.getAttribute("data-id"));
        addToCart(productId);
      });
    });

    // Quick view buttons
    document.querySelectorAll(".quick-view").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const productId = parseInt(this.getAttribute("data-id"));
        showQuickView(productId);
      });
    });

    // Add to wishlist buttons
    document.querySelectorAll(".add-to-wishlist").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const productId = parseInt(this.getAttribute("data-id"));
        addToWishlist(productId);
      });
    });

    // Make the entire product card clickable
    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", function () {
        const productId = parseInt(
          this.querySelector(".add-to-cart").getAttribute("data-id")
        );
        window.location.href = `product-detail.html?id=${productId}`;
      });
    });
  }

  // Function to add a product to the cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product is already in cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      // Increment quantity if product already exists
      cart[existingProductIndex].quantity += 1;
    } else {
      // Add new product to cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show success message
    showMessage("Product added to cart!", "success");
  }

  // Function to show quick view modal
  function showQuickView(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Create modal HTML
    const modal = document.createElement("div");
    modal.className = "quick-view-modal";
    modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <div class="product-price">
                            <span class="current-price">$${product.price.toFixed(
                              2
                            )}</span>
                            ${
                              product.originalPrice
                                ? `<span class="original-price">$${product.originalPrice.toFixed(
                                    2
                                  )}</span>`
                                : ""
                            }
                        </div>
                        <p>${product.description}</p>
                        <button class="btn btn-primary add-to-cart-modal" data-id="${
                          product.id
                        }">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

    // Add modal to the DOM
    document.body.appendChild(modal);

    // Prevent body scrolling
    document.body.style.overflow = "hidden";

    // Show modal with animation
    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);

    // Close modal when clicking on close button or outside the modal
    const closeModal = modal.querySelector(".close-modal");
    closeModal.addEventListener("click", () => {
      closeQuickViewModal(modal);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeQuickViewModal(modal);
      }
    });

    // Add to cart functionality in modal
    const addToCartBtn = modal.querySelector(".add-to-cart-modal");
    addToCartBtn.addEventListener("click", () => {
      addToCart(productId);
    });
  }

  // Function to close quick view modal
  function closeQuickViewModal(modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(modal);
      document.body.style.overflow = "auto";
    }, 300);
  }

  // Function to add a product to the wishlist
  function addToWishlist(productId) {
    // Get existing wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if product is already in wishlist
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      showMessage("Product added to wishlist!", "success");
    } else {
      showMessage("Product is already in your wishlist!", "info");
    }
  }

  // Function to show message
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

  // Filter products
  const categoryFilter = document.getElementById("category-filter");
  const sortFilter = document.getElementById("sort-filter");
  const priceFilter = document.getElementById("price-filter");

  function applyFilters() {
    let filteredProducts = [...products];

    // Apply category filter
    if (categoryFilter && categoryFilter.value !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter.value
      );
    }

    // Apply price filter
    if (priceFilter && priceFilter.value !== "all") {
      switch (priceFilter.value) {
        case "under50":
          filteredProducts = filteredProducts.filter(
            (product) => product.price < 50
          );
          break;
        case "50to100":
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= 50 && product.price <= 100
          );
          break;
        case "over100":
          filteredProducts = filteredProducts.filter(
            (product) => product.price > 100
          );
          break;
      }
    }

    // Apply sort filter
    if (sortFilter) {
      switch (sortFilter.value) {
        case "price-low":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "name-asc":
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    }

    renderProducts(filteredProducts);
  }

  // Add event listeners to filters
  if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
  }

  if (sortFilter) {
    sortFilter.addEventListener("change", applyFilters);
  }

  if (priceFilter) {
    priceFilter.addEventListener("change", applyFilters);
  }

  // Initialize products on page load
  renderProducts(products);

  // Update cart count function
  function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountElement.textContent = itemCount;
    }
  }

  // Call updateCartCount on page load
  updateCartCount();
});
