document.addEventListener("DOMContentLoaded", function () {
  // Sample product data (in a real app, this would come from a database)
  const products = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      category: "Clothing",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviewCount: 128,
      images: [
        "../images/product-1.jpg",
        "../images/product-1-2.jpg",
        "../images/product-1-3.jpg",
        "../images/product-1-4.jpg",
      ],
      colors: ["#ffffff", "#000000", "#6c757d", "#007bff"],
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear, this classic tee features a relaxed fit and durable construction that will last through countless washes.",
      features: [
        "100% organic cotton",
        "Regular fit",
        "Crew neck",
        "Short sleeves",
        "Machine washable",
      ],
      specifications: {
        Material: "100% Organic Cotton",
        Fit: "Regular",
        Neck: "Crew",
        Sleeve: "Short",
        Care: "Machine wash cold, tumble dry low",
        Origin: "Ethically made in Portugal",
      },
      reviews: [
        {
          name: "John D.",
          date: "2023-05-15",
          rating: 5,
          title: "Perfect basic tee",
          comment:
            "Great quality t-shirt that has held up well after multiple washes. The fit is perfect and the material is soft and comfortable.",
        },
        {
          name: "Sarah M.",
          date: "2023-04-22",
          rating: 4,
          title: "Good quality, runs slightly large",
          comment:
            "Nice t-shirt with good quality fabric. I found it runs slightly large, so consider sizing down if you prefer a more fitted look.",
        },
        {
          name: "Michael P.",
          date: "2023-03-10",
          rating: 5,
          title: "My new favorite shirt",
          comment:
            "This has become my go-to t-shirt. The organic cotton feels great and the construction is solid. Will definitely buy more colors.",
        },
      ],
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      category: "Clothing",
      price: 59.99,
      originalPrice: null,
      rating: 4.2,
      reviewCount: 95,
      images: [
        "../images/product-2.jpg",
        "../images/product-2-2.jpg",
        "../images/product-2-3.jpg",
        "../images/product-2-4.jpg",
      ],
      colors: ["#0a3d62", "#000000", "#7f8c8d"],
      sizes: ["28", "30", "32", "34", "36", "38"],
      description:
        "Modern slim fit jeans with a comfortable stretch fabric. These versatile jeans feature a classic five-pocket design and are perfect for both casual and semi-formal occasions.",
      features: [
        "98% Cotton, 2% Elastane",
        "Slim fit",
        "Five-pocket design",
        "Button closure with zip fly",
        "Machine washable",
      ],
      specifications: {
        Material: "98% Cotton, 2% Elastane",
        Fit: "Slim",
        Rise: "Mid-rise",
        Closure: "Button with zip fly",
        Pockets: "Five-pocket design",
        Care: "Machine wash cold, inside out",
      },
      reviews: [
        {
          name: "Robert J.",
          date: "2023-06-02",
          rating: 4,
          title: "Great jeans, good value",
          comment:
            "These jeans fit well and look great. The stretch material makes them comfortable for all-day wear. Good value for the price.",
        },
        {
          name: "Emily L.",
          date: "2023-05-18",
          rating: 5,
          title: "Perfect fit",
          comment:
            "Finally found jeans that fit perfectly! The slim cut is flattering without being too tight, and the material has just the right amount of stretch.",
        },
      ],
    },
    // Additional products would be defined here
  ];

  // Get product ID from URL parameter
  function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    return isNaN(productId) ? 1 : productId; // Default to product 1 if no valid ID
  }

  // Load product details
  function loadProductDetails() {
    const productId = getProductIdFromUrl();
    const product = products.find((p) => p.id === productId) || products[0];

    // Update page title
    document.title = `${product.name} - StyleShop`;

    // Update breadcrumb
    const breadcrumbProduct = document.querySelector(".breadcrumb span");
    if (breadcrumbProduct) {
      breadcrumbProduct.textContent = product.name;
    }

    // Update product images
    const mainImage = document.querySelector(".main-image img");
    const thumbnailContainer = document.querySelector(".thumbnail-images");

    if (mainImage) {
      mainImage.src = product.images[0];
      mainImage.alt = product.name;
    }

    if (thumbnailContainer) {
      thumbnailContainer.innerHTML = "";

      product.images.forEach((image, index) => {
        const thumbnail = document.createElement("div");
        thumbnail.className = `thumbnail ${index === 0 ? "active" : ""}`;
        thumbnail.innerHTML = `<img src="${image}" alt="${product.name} ${
          index + 1
        }">`;

        thumbnail.addEventListener("click", function () {
          // Update main image
          mainImage.src = image;

          // Update active thumbnail
          document.querySelectorAll(".thumbnail").forEach((thumb) => {
            thumb.classList.remove("active");
          });
          thumbnail.classList.add("active");
        });

        thumbnailContainer.appendChild(thumbnail);
      });
    }

    // Update product info
    document.querySelector(".product-info h1").textContent = product.name;

    // Update product rating
    const ratingStars = document.querySelector(".product-rating .stars");
    if (ratingStars) {
      let starsHTML = "";
      const fullStars = Math.floor(product.rating);
      const halfStar = product.rating % 1 >= 0.5;

      for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
          starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && halfStar) {
          starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
          starsHTML += '<i class="far fa-star"></i>';
        }
      }

      ratingStars.innerHTML = starsHTML;
      document.querySelector(
        ".product-rating .rating-count"
      ).textContent = `(${product.reviewCount} reviews)`;
    }

    // Update product price
    const priceElement = document.querySelector(".product-price");
    if (priceElement) {
      priceElement.innerHTML = `
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${
                  product.originalPrice
                    ? `<span class="original-price">$${product.originalPrice.toFixed(
                        2
                      )}</span>`
                    : ""
                }
            `;
    }

    // Update product description
    document.querySelector(".product-description").textContent =
      product.description;

    // Update color options
    const colorOptions = document.querySelector(".color-options");
    if (colorOptions) {
      colorOptions.innerHTML = "";

      product.colors.forEach((color, index) => {
        const colorOption = document.createElement("div");
        colorOption.className = `color-option ${index === 0 ? "active" : ""}`;
        colorOption.style.backgroundColor = color;

        colorOption.addEventListener("click", function () {
          // Update active color
          document.querySelectorAll(".color-option").forEach((option) => {
            option.classList.remove("active");
          });
          colorOption.classList.add("active");
        });

        colorOptions.appendChild(colorOption);
      });
    }

    // Update size options
    const sizeSelect = document.getElementById("size-select");
    if (sizeSelect) {
      sizeSelect.innerHTML = "";

      // Add default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select Size";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      sizeSelect.appendChild(defaultOption);

      // Add size options
      product.sizes.forEach((size) => {
        const option = document.createElement("option");
        option.value = size.toLowerCase();
        option.textContent = size;
        sizeSelect.appendChild(option);
      });
    }

    // Update product features
    const featuresList = document.querySelector(".features-list");
    if (featuresList) {
      featuresList.innerHTML = "";

      product.features.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresList.appendChild(li);
      });
    }

    // Update specifications table
    const specsTable = document.querySelector(".specs-table tbody");
    if (specsTable) {
      specsTable.innerHTML = "";

      for (const [key, value] of Object.entries(product.specifications)) {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <th>${key}</th>
                    <td>${value}</td>
                `;
        specsTable.appendChild(row);
      }
    }

    // Update reviews
    updateReviews(product);
  }

  // Update reviews section
  function updateReviews(product) {
    // Update average rating
    document.querySelector(".average-rating h3").textContent =
      product.rating.toFixed(1);

    // Update rating bars
    const ratingCounts = [0, 0, 0, 0, 0]; // 5 stars to 1 star

    product.reviews.forEach((review) => {
      ratingCounts[5 - review.rating]++;
    });

    for (let i = 5; i >= 1; i--) {
      const count = ratingCounts[5 - i];
      const percentage =
        product.reviews.length > 0 ? (count / product.reviews.length) * 100 : 0;

      document.querySelector(
        `.rating-bar:nth-child(${6 - i}) .rating-progress-fill`
      ).style.width = `${percentage}%`;
      document.querySelector(
        `.rating-bar:nth-child(${6 - i}) .rating-count`
      ).textContent = count;
    }

    // Update reviews list
    const reviewsList = document.querySelector(".reviews-list");
    reviewsList.innerHTML = "";

    if (product.reviews.length === 0) {
      reviewsList.innerHTML =
        "<p>No reviews yet. Be the first to review this product!</p>";
    } else {
      product.reviews.forEach((review) => {
        // Generate stars for this review
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          starsHTML += `<i class="${
            i <= review.rating ? "fas" : "far"
          } fa-star"></i>`;
        }

        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";
        reviewItem.innerHTML = `
                    <div class="review-header">
                        <span class="reviewer-name">${review.name}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <div class="review-rating">
                        ${starsHTML}
                    </div>
                    <h4 class="review-title">${review.title}</h4>
                    <p>${review.comment}</p>
                `;

        reviewsList.appendChild(reviewItem);
      });
    }
  }

  // Add to cart functionality
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      const productId = getProductIdFromUrl();
      const product = products.find((p) => p.id === productId);

      if (!product) return;

      // Get selected size
      const sizeSelect = document.getElementById("size-select");
      if (sizeSelect && sizeSelect.value === "") {
        showMessage("Please select a size.", "error");
        return;
      }

      // Get selected color
      const selectedColor = document.querySelector(".color-option.active");
      if (!selectedColor) {
        showMessage("Please select a color.", "error");
        return;
      }

      // Get quantity
      const quantityInput = document.getElementById("quantity");
      const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

      // Add to cart
      addToCart(
        product,
        quantity,
        sizeSelect ? sizeSelect.value : null,
        selectedColor.style.backgroundColor
      );
    });
  }

  // Quantity selector functionality
  const decreaseBtn = document.querySelector(
    ".quantity-selector button:first-child"
  );
  const increaseBtn = document.querySelector(
    ".quantity-selector button:last-child"
  );
  const quantityInput = document.getElementById("quantity");

  if (decreaseBtn && quantityInput) {
    decreaseBtn.addEventListener("click", function () {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  }

  if (increaseBtn && quantityInput) {
    increaseBtn.addEventListener("click", function () {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
  }

  // Tab functionality
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons and panels
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      // Add active class to clicked button and corresponding panel
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(`${tabId}-panel`).classList.add("active");
    });
  });

  // Add to cart function
  function addToCart(product, quantity, size, color) {
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      size: size,
      color: color,
    };

    // Check if product with same options already exists in cart
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === cartItem.id &&
        item.size === cartItem.size &&
        item.color === cartItem.color
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item already exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show success message
    showMessage(`${product.name} added to cart!`, "success");
  }

  // Update cart count function
  function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountElement.textContent = itemCount;
    }
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

  // Initialize product details on page load
  loadProductDetails();
  updateCartCount();
});
