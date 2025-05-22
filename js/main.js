document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = document.getElementById("newsletter-email");
      const messageDiv = document.getElementById("newsletter-message");

      if (emailInput.value.trim() === "") {
        messageDiv.textContent = "Please enter your email address.";
        messageDiv.style.color = "red";
        return;
      }

      // Simulate form submission
      messageDiv.textContent = "Thank you for subscribing to our newsletter!";
      messageDiv.style.color = "white";
      emailInput.value = "";

      // Hide message after 3 seconds
      setTimeout(() => {
        messageDiv.textContent = "";
      }, 3000);
    });
  }

  // Accordion functionality for FAQs
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", function () {
      // Close all other accordion items
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Product tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons and panels
        tabBtns.forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(".tab-panel")
          .forEach((p) => p.classList.remove("active"));

        // Add active class to clicked button and corresponding panel
        btn.classList.add("active");
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(`${tabId}-panel`).classList.add("active");
      });
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");
      const formMessage = document.getElementById("form-message");

      if (
        nameInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        messageInput.value.trim() === ""
      ) {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.className = "error";
        formMessage.classList.remove("hidden");
        return;
      }

      // Simulate form submission
      formMessage.textContent =
        "Thank you for your message! We will get back to you soon.";
      formMessage.className = "success";
      formMessage.classList.remove("hidden");

      // Reset form
      contactForm.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.classList.add("hidden");
      }, 5000);
    });
  }

  // Update cart count from localStorage
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
