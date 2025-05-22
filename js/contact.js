document.addEventListener("DOMContentLoaded", function () {
  // Contact form validation and submission
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form inputs
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const inquiryType = document.getElementById("inquiry-type").value;

      // Validate inputs
      if (name === "" || email === "" || message === "") {
        showFormMessage("Please fill in all required fields.", "error");
        return;
      }

      // Validate email format
      if (!isValidEmail(email)) {
        showFormMessage("Please enter a valid email address.", "error");
        return;
      }

      // Simulate form submission (in a real application, you would send data to a server)
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      // Simulate server delay
      setTimeout(function () {
        // Show success message
        showFormMessage(
          "Thank you for your message! We will get back to you soon.",
          "success"
        );

        // Reset form
        contactForm.reset();

        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }, 1500);
    });
  }

  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to show form message
  function showFormMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = type;
      formMessage.classList.remove("hidden");

      // Scroll to message
      formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Hide message after 5 seconds for success messages
      if (type === "success") {
        setTimeout(function () {
          formMessage.classList.add("hidden");
        }, 5000);
      }
    }
  }

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-section .accordion-item");

  if (faqItems.length > 0) {
    // Initialize: Make sure all accordions start closed
    faqItems.forEach((item) => {
      const content = item.querySelector(".accordion-content");
      if (content) {
        content.style.display = "none";
        content.style.height = "0";
        content.style.overflow = "hidden";
        content.style.padding = "0";
      }
    });

    // Add click handlers
    faqItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const content = item.querySelector(".accordion-content");

      if (header && content) {
        header.style.cursor = "pointer";

        header.onclick = function () {
          // Close all other items
          faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
              const otherContent =
                otherItem.querySelector(".accordion-content");
              if (otherContent) {
                otherContent.style.display = "none";
                otherContent.style.height = "0";
                otherContent.style.padding = "0";
              }
              otherItem.classList.remove("active");
            }
          });

          // Toggle this item
          if (content.style.display === "none") {
            // Open this item
            content.style.display = "block";
            content.style.height = "auto";
            content.style.padding = "15px";
            item.classList.add("active");
          } else {
            // Close this item
            content.style.display = "none";
            content.style.height = "0";
            content.style.padding = "0";
            item.classList.remove("active");
          }

          return false; // Prevent event bubbling
        };
      }
    });
  }
});
