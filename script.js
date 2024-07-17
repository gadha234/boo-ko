  document.addEventListener('DOMContentLoaded', function() {
    const zoomImage = document.getElementById('zoom-image');
    const imageContainer = document.getElementById('image-container');

    imageContainer.addEventListener('mousemove', function(e) {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      zoomImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    });

    imageContainer.addEventListener('mouseleave', function() {
      zoomImage.style.transformOrigin = 'center center';
    });

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const decreaseBtn = document.getElementById('decrease-btn');
    const increaseBtn = document.getElementById('increase-btn');
    const quantityDisplay = document.getElementById('quantity-display');
    const totalAmount = document.getElementById('total-amount');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const images = [
      'https://optilux.com.bd/wp-content/uploads/2024/05/999-taka.jpg',
      'https://optilux.com.bd/wp-content/uploads/2024/05/Polarized-Sunglass-1-800x800.jpg',
      'https://optilux.com.bd/wp-content/uploads/2024/05/Polarized-Sunglass-2-1-1-800x800.jpg'
    ];
    let currentImageIndex = 0;
    let quantity = 1;
    const pricePerItem = 999;

    function updateImage() {
      zoomImage.src = images[currentImageIndex];
    }

    function updateTotalAmount() {
      totalAmount.textContent = (pricePerItem * quantity) + ' TK';
    }

    themeToggle.addEventListener('click', function() {
      const isLightTheme = document.body.classList.toggle('theme-light');
      document.body.classList.toggle('theme-dark', !isLightTheme);
      themeIcon.classList.toggle('bx-moon', isLightTheme);
      themeIcon.classList.toggle('bx-sun', !isLightTheme);
    });

    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('open');
    });

    decreaseBtn.addEventListener('click', function() {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
        updateTotalAmount();
      }
    });

    increaseBtn.addEventListener('click', function() {
      quantity++;
      quantityDisplay.textContent = quantity;
      updateTotalAmount();
    });

    prevBtn.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      updateImage();
    });

    nextBtn.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateImage();
    });

    setInterval(function() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateImage();
    }, 2000);

    updateTotalAmount();
  });

  document.addEventListener('DOMContentLoaded', function() {
    const decreaseBtns = document.querySelectorAll('.decrease-btn');
    const increaseBtns = document.querySelectorAll('.increase-btn');
    const quantityDisplays = document.querySelectorAll('.quantity-display');

    decreaseBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const display = btn.nextElementSibling;
            let quantity = parseInt(display.textContent);
            if (quantity > 1) {
                quantity--;
                display.textContent = quantity;
            }
        });
    });

    increaseBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const display = btn.previousElementSibling;
            let quantity = parseInt(display.textContent);
            quantity++;
            display.textContent = quantity;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const paymentOnline = document.getElementById('payment-online');
    const onlinePaymentOptions = document.getElementById('online-payment-options');

    paymentOnline.addEventListener('change', function() {
        if (paymentOnline.checked) {
            onlinePaymentOptions.classList.remove('hidden');
        } else {
            onlinePaymentOptions.classList.add('hidden');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('product');
    const quantityDisplay = document.getElementById('quantity-display');
    const totalPrice = document.getElementById('total-price');
    const deliveryInsideDhaka = document.getElementById('delivery-inside-dhaka');
    const deliveryOutsideDhaka = document.getElementById('delivery-outside-dhaka');
    const confirmOrderBtn = document.getElementById('confirm-order-btn');

    let deliveryPrice = 0;
    let quantity = 1;

    // Update total price based on selected product and quantity
    function updateTotalPrice() {
        const selectedProductPrice = parseInt(productSelect.value);
        const selectedDeliveryPrice = deliveryInsideDhaka.checked ? parseInt(deliveryInsideDhaka.getAttribute('data-price')) : parseInt(deliveryOutsideDhaka.getAttribute('data-price'));
        totalPrice.textContent = (selectedProductPrice * quantity + selectedDeliveryPrice) + ' TK';
    }

    // Update total price when product or quantity changes
    productSelect.addEventListener('change', updateTotalPrice);

    document.querySelector('.increase-btn').addEventListener('click', function() {
        quantity++;
        quantityDisplay.textContent = quantity;
        updateTotalPrice();
    });

    document.querySelector('.decrease-btn').addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            updateTotalPrice();
        }
    });

    // Update total price based on selected delivery site
    deliveryInsideDhaka.addEventListener('change', function() {
        document.getElementById('inside-dhaka-fields').classList.remove('hidden');
        document.getElementById('outside-dhaka-fields').classList.add('hidden');
        deliveryPrice = parseInt(deliveryInsideDhaka.getAttribute('data-price'));
        updateTotalPrice();
    });

    deliveryOutsideDhaka.addEventListener('change', function() {
        document.getElementById('outside-dhaka-fields').classList.remove('hidden');
        document.getElementById('inside-dhaka-fields').classList.add('hidden');
        deliveryPrice = parseInt(deliveryOutsideDhaka.getAttribute('data-price'));
        updateTotalPrice();
    });

    // Event listener for confirming order
    confirmOrderBtn.addEventListener('click', function() {
        console.log('Order confirmed!');
        // Implement your order confirmation logic here
    });
});