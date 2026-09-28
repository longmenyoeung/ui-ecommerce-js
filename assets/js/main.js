// Sample product database (replace with your actual data source)
const products = {
  prod1: {
    id: 'prod1',
    name: 'Men Shirt',
    brand: 'Generic',
    price: 140.00,
    oldPrice: 245.8,
    description: 'Most shirts feature a collar, which can range from a standard pointed collar (for formal looks) to a button-down collar (for casual styles)',
    images: ['assets/img/product-1-1.jpg', 'assets/img/product-1-2.jpg']
  },
  prod2: {
    id: 'prod2',
    name: 'Henry Shirt',
    brand: 'Generic',
    price: 75.80,
    oldPrice: 140.00,
    description: 'Henry shirts typically come in a regular fit, offering a comfortable and relaxed silhouette. They can be slim fit or more oversized, depending on the design and brand.',
    images: ['assets/img/product-2-1.jpg', 'assets/img/product-2-2.jpg']
  },
  prod3: {
    id: 'prod3',
    name: 'Henley shirt',
    brand: 'Generic',
    price: 238.85,
    oldPrice: 245.8,
    description: ' A Henley shirt is a casual, collarless pullover shirt known forits distinctive round neckline and a short placket (about 3 to 5 inches long) with 2–5 buttons at the top.',
    images: ['assets/img/product-8-1.jpg', 'assets/img/product-8-2.jpg']
  },
  prod4: {
    id: 'prod4',
    name: 'Colorful Pattern Shirt',
    brand: 'Generic',
    price: 238.85,
    oldPrice: 245.8,
    description: 'A colorful patterned shirt is a vibrant and eye-catching clothing item designed to add personality and style to an outfit.',
    images: ['assets/img/product-6-1.jpg', 'assets/img/product-6-2.jpg']
  },
  prod5: {
    id: 'prod5',
    name: 'Girls Pattern Shirt',
    brand: 'Generic',
    price: 238.85,
    oldPrice: 245.8,
    description: 'Girls Pattern Shirt is the for girl and popular in american and Asia',
    images: ['assets/img/product-7-1.jpg', 'assets/img/product-7-2.jpg']
  },
  prod6: {
    id: 'prod6',
    name: 'White Pattern Shirt',
    brand: 'Generic',
    price: 65.90,
    oldPrice: 90.80,
    description: 'White Pattern Shirt is the for girl and popular in american and Asia',
    images: ['assets/img/product-12-2.jpg', 'assets/img/product-12-1.jpg']
  },
  prod7: {
    id: 'prod7',
    name: 'Moderm Shirt',
    brand: 'Generic',
    price: 120.00,
    oldPrice:160.80,
    description: 'Moderm Pattern Shirt is the for girl and popular in american and Asia',
    images: ['assets/img/showcase-img-6.jpg', 'assets/img/showcase-img-6-2.png'],
  },
  prod8: {
    id: 'prod8',
    name: 'Darkyellow Shirt',
    brand: 'Generic',
    price: 235.00,
    oldPrice:360.80,
    description: 'Darkyellow Pattern Shirt is the most popular in american',
    images: ['assets/img/showcase-img-5.jpg', 'assets/img/showcase-img-5.jpg'],
  },
};

// Helper Functions
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Update cart count in header
function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('.header__action-btn[href="cart.html"] .count');
  cartCountElements.forEach(el => el.textContent = totalItems);
}

// Add to Cart
function addToCart(product, quantity) {
  let cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart(cart);
  // Refresh cart display if on cart page
  if (document.querySelector('.cart')) {
    renderCart();
  }
  // Refresh checkout display if on checkout page
  if (document.querySelector('.checkout')) {
    renderCheckout();
  }
}

// Remove from Cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

// Update Cart Quantity
function updateCartQuantity(productId, newQuantity) {
  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item && newQuantity > 0) {
    item.quantity = newQuantity;
    saveCart(cart);
    renderCart();
  }
}

// Render Cart (for cart.html)
function renderCart() {
  const cart = getCart();
  const tableBody = document.getElementById('cartTableBody');
  if (tableBody) {
    tableBody.innerHTML = '';
    cart.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${item.images[0]}" class="table_img"></td>
        <td>
          <h3 class="table__title">${item.name}</h3>
          <p class="table__describtion">${item.description}</p>
        </td>
        <td><span class="table__price">$${item.price.toFixed(2)}</span></td>
        <td><input type="number" class="quanity" value="${item.quantity}" min="1" data-id="${item.id}"></td>
        <td><span class="table__subtotal">$${(item.price * item.quantity).toFixed(2)}</span></td>
        <td>
          <button class="btn btn--sm update-btn" data-id="${item.id}" style="margin-bottom:5px;">Update</button>
          <button class="btn btn--sm delete-btn" data-id="${item.id}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 10; // Fixed shipping cost
    const total = subtotal + shipping;
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartShipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
  }
}

// Render Checkout (for checkout.html)
function renderCheckout() {
  const cart = getCart();
  const checkoutProducts = document.querySelector('.checkout__products');
  if (checkoutProducts) {
    checkoutProducts.innerHTML = '';
    cart.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name} x ${item.quantity}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      `;
      checkoutProducts.appendChild(row);
    });

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 10; // Fixed shipping cost (same as cart.html, but will hide it)
    const total = subtotal + shipping; // Include shipping in total even if hidden

    // Update totals in the table
    const subtotalElement = document.querySelector('.cart__total-price[data-type="subtotal"]');
    const shippingElement = document.querySelector('.cart__total-price[data-type="shipping"]');
    const totalElement = document.querySelector('.order__grand-total');

    // Update subtotal and total
    if (subtotalElement) {
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
    if (totalElement) {
      totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Hide the shipping row
    const shippingRow = shippingElement ? shippingElement.closest('tr') : null;
    if (shippingRow) {
      shippingRow.style.display = 'none'; // Hide the entire row containing "Shipping"
    }
  }
}

// Add a single event listener to the table body for event delegation (cart.html)
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('cartTableBody');
  if (tableBody) {
    tableBody.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('update-btn')) {
        const productId = target.getAttribute('data-id');
        const quantityInput = target.closest('tr').querySelector('.quanity');
        const newQuantity = parseInt(quantityInput.value) || 1;
        updateCartQuantity(productId, newQuantity);
      }
      if (target.classList.contains('delete-btn')) {
        const productId = target.getAttribute('data-id');
        removeFromCart(productId);
      }
    });
  }

  // Add confirmation prompt for "Clear Cart" button
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('cart');
        window.location.reload();
      }
    });
  }
});

// Page-Specific Logic
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // ================= Responsive Header Navigation (mobile / tablet) =================
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navOverlay = document.getElementById('nav-overlay');

  const openNavMenu = () => {
    if (!navMenu) return;
    navMenu.classList.add('show-menu');
    document.body.classList.add('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  };

  const closeNavMenu = () => {
    if (!navMenu) return;
    navMenu.classList.remove('show-menu');
    document.body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle) {
    navToggle.addEventListener('click', openNavMenu);
  }
  if (navClose) {
    navClose.addEventListener('click', closeNavMenu);
  }
  if (navOverlay) {
    navOverlay.addEventListener('click', closeNavMenu);
  }
  if (navMenu) {
    // Close the off-canvas menu after a link is followed
    navMenu.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', closeNavMenu);
    });
  }
  // Escape key closes the menu
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavMenu();
  });
  // Reset the menu state when the layout grows back to the desktop navigation
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) closeNavMenu();
  });

  // Shop Page: Add to Cart from product item (optional direct add)
  const cartButtons = document.querySelectorAll('.cart__btn');
  cartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productItem = btn.closest('.product__item');
      const productId = productItem.getAttribute('data-id');
      const product = products[productId];
      if (product) {
        addToCart(product, 1);
        alert('Added to cart!');
      }
    });
  });

  // Details Page
  const detailsContainer = document.querySelector('.detials__container');
  if (detailsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const product = products[productId];
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; }; // only write when the element exists

    if (product) {
      setText('productTitle', product.name);
      setText('productBrand', product.brand);
      setText('newPrice', `$${product.price.toFixed(2)}`);
      setText('oldPrice', `$${product.oldPrice.toFixed(2)}`);
      setText('savePrice', `${((product.oldPrice - product.price) / product.oldPrice * 100).toFixed(0)}% off`);
      setText('productDescription', product.description);
      const mainImg = document.getElementById('mainImg'); if (mainImg) mainImg.src = product.images[0];

      const smallImages = document.getElementById('smallImages');
      if (smallImages) smallImages.innerHTML = '';
      if (smallImages) product.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'detials__small-img';
        img.addEventListener('click', () => {
          if (mainImg) mainImg.src = imgSrc;
        });
        smallImages.appendChild(img);
      });

      const addToCartBtn = document.getElementById('addToCartBtn'); if (addToCartBtn) addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const quantityInput = document.getElementById('quantity'), quantity = quantityInput ? (parseInt(quantityInput.value) || 1) : 1;
        addToCart(product, quantity);
        alert('Added to cart!');
      });

      // Add to Wishlist when heart button is clicked
      const addToWishlistBtn = document.getElementById('addToWishlistBtn'); if (addToWishlistBtn) addToWishlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addToWishlist(product);
      });
    }

    // Details Page: Tab Switching for "Additional Info" and "Reviews(5)"
    const detailTabs = document.querySelectorAll('.detail__tab');
    const detailTabContents = document.querySelectorAll('.details__tab-content');

    if (detailTabs.length > 0 && detailTabContents.length > 0) {
      detailTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const targetId = tab.getAttribute('data-target');
          const targetContent = document.querySelector(targetId);

          // Remove active-tab from all content sections
          detailTabContents.forEach((content) => {
            content.classList.remove('active-tab');
          });

          // Add active-tab to the target content
          if (targetContent) {
            targetContent.classList.add('active-tab');
          }

          // Remove active-tab from all tabs
          detailTabs.forEach((t) => {
            t.classList.remove('active-tab');
          });

          // Add active-tab to the clicked tab
          tab.classList.add('active-tab');
        });
      });
    }
  }

  // Accounts Page: Tab Switching for "Dashboard", "Orders", "Update Profile", etc.
  const accountTabs = document.querySelectorAll('.account__tab');
  const accountTabContents = document.querySelectorAll('.tab__content');

  if (accountTabs.length > 0 && accountTabContents.length > 0) {
    accountTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');
        const targetContent = document.querySelector(targetId);

        // Remove active-tab from all content sections
        accountTabContents.forEach((content) => {
          content.classList.remove('active-tab');
        });

        // Add active-tab to the target content if it exists
        if (targetContent) {
          targetContent.classList.add('active-tab');
        }

        // Remove active-tab from all tabs
        accountTabs.forEach((t) => {
          t.classList.remove('active-tab');
        });

        // Add active-tab to the clicked tab
        tab.classList.add('active-tab');
      });
    });
  }

  // Insert this updated code here to handle "Featured", "Popular", and "New Added" tabs
  const productTabs = document.querySelectorAll('.tab__btn'); // Match the class from HTML: "tab__btn"
  const productTabContents = document.querySelectorAll('.tab__item'); // Match the class from HTML: "tab__item"

  if (productTabs.length > 0 && productTabContents.length > 0) {
    productTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = tab.getAttribute('data-target');
        const targetContent = document.querySelector(targetId);

        // Remove active-tab class from all content sections
        productTabContents.forEach((content) => {
          content.classList.remove('active-tab');
        });

        // Add active-tab class to the target content
        if (targetContent) {
          targetContent.classList.add('active-tab');
        }

        // Remove active-tab class from all tabs
        productTabs.forEach((t) => {
          t.classList.remove('active-tab');
        });

        // Add active-tab class to the clicked tab
        tab.classList.add('active-tab');
      });
    });
  }

  // Cart Page
  if (document.querySelector('.cart')) {
    renderCart();
  }

  // Checkout Page
  if (document.querySelector('.checkout')) {
    renderCheckout();
  }

  // Wishlist Page
  if (document.querySelector('.wishlist')) {
    renderWishlist();
  }

  // Insert this new code here to handle product search functionality
  const searchInput = document.querySelector('.header__search input[type="text"]');
  const searchResultsContainer = document.createElement('div');
  searchResultsContainer.className = 'search__results';
  searchResultsContainer.style.position = 'absolute';
  searchResultsContainer.style.top = '100%';
  searchResultsContainer.style.left = '0';
  searchResultsContainer.style.right = '0';
  searchResultsContainer.style.backgroundColor = '#fff';
  searchResultsContainer.style.border = '1px solid #ddd';
  searchResultsContainer.style.borderRadius = '5px';
  searchResultsContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  searchResultsContainer.style.maxHeight = '300px';
  searchResultsContainer.style.overflowY = 'auto';
  searchResultsContainer.style.display = 'none';
  searchResultsContainer.style.zIndex = '1000';

  // Append the search results container to the search bar's parent
  if (searchInput) {
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(searchResultsContainer);

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length === 0) {
        searchResultsContainer.style.display = 'none';
        return;
      }

      // Filter products based on the search query
      const filteredProducts = Object.values(products).filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );

      // Display search results
      searchResultsContainer.innerHTML = '';
      if (filteredProducts.length === 0) {
        searchResultsContainer.innerHTML = '<div style="padding: 10px; color: #666;">No products found.</div>';
      } else {
        filteredProducts.forEach(product => {
          const resultItem = document.createElement('div');
          resultItem.style.padding = '10px';
          resultItem.style.borderBottom = '1px solid #eee';
          resultItem.style.cursor = 'pointer';
          resultItem.innerHTML = `
            <div style="display: flex; align-items: center;">
              <img src="${product.images[0]}" alt="${product.name}" style="width: 40px; height: 40px; margin-right: 10px;">
              <div>
                <h4 style="margin: 0; font-size: 14px;">${product.name}</h4>
                <p style="margin: 0; font-size: 12px; color: #666;">$${product.price.toFixed(2)}</p>
              </div>
            </div>
          `;
          resultItem.addEventListener('click', () => {
            window.location.href = `details.html?productId=${product.id}`;
          });
          searchResultsContainer.appendChild(resultItem);
        });
      }
      searchResultsContainer.style.display = 'block';
    });

    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResultsContainer.contains(e.target)) {
        searchResultsContainer.style.display = 'none';
      }
    });

    // Hide search results when the input is cleared
    searchInput.addEventListener('blur', () => {
      setTimeout(() => {
        if (document.activeElement !== searchInput) {
          searchResultsContainer.style.display = 'none';
        }
      }, 200);
    });
  }

  // Index Page: Initialize Swiper for Popular Categories and New Arrivals
  if (document.querySelector('.categories__container')) {
    var swiperCategories = new Swiper(".categories__container", {
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      },
    });
  }

  if (document.querySelector('.new__container')) {
    var swiperProducts = new Swiper(".new__container", {
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  }

  // Ensure wishlist count is updated on page load
  updateWishlistCount();
});

// Wishlist Functions
function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
}

function updateWishlistCount() {
  const wishlist = getWishlist();
  const totalItems = wishlist.length;
  const wishlistCountElements = document.querySelectorAll('.header__action-btn[href="wishlist.html"] .count');
  wishlistCountElements.forEach(el => el.textContent = totalItems);
}

function addToWishlist(product) {
  let wishlist = getWishlist();
  const existingItem = wishlist.find(item => item.id === product.id);
  if (!existingItem) {
    wishlist.push(product);
    saveWishlist(wishlist);
    alert('Added to wishlist!');
  } else {
    alert('This item is already in your wishlist!');
  }
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(item => item.id !== productId);
  saveWishlist(wishlist);
  renderWishlist();
}

function renderWishlist() {
  const wishlist = getWishlist();
  const tableBody = document.getElementById('wishlistTableBody');
  if (tableBody) {
    tableBody.innerHTML = '';
    if (wishlist.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6">Your wishlist is empty.</td></tr>';
    } else {
      wishlist.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${item.images[0]}" class="table_img"></td>
          <td>
            <h3 class="table__title">${item.name}</h3>
            <p class="table__describtion">${item.description}</p>
          </td>
          <td><span class="table__price">$${item.price.toFixed(2)}</span></td>
          <td><span class="table__stock">In Stock</span></td>
          <td><a href="#" class="btn btn--md add-to-cart-from-wishlist" data-id="${item.id}">Add to Cart</a></td>
          <td><button class="btn btn--sm delete-from-wishlist" data-id="${item.id}">Delete</button></td>
        `;
        tableBody.appendChild(row);
      });
    }

    // Event listeners for "Add to Cart" and "Delete" from wishlist
    document.querySelectorAll('.add-to-cart-from-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.getAttribute('data-id');
        const product = products[productId];
        if (product) {
          addToCart(product, 1);
        }
      });
    });

    document.querySelectorAll('.delete-from-wishlist').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.getAttribute('data-id');
        removeFromWishlist(productId);
      });
    });
  }
}

// Updated Function: Print Receipt
function printReceipt(order, billingDetails) {
  // Extract billing details
  const { customerName, address, city, country, postcode, phone, email, orderNote } = billingDetails;

  // Order details
  const orderId = order.orderId;
  const orderDate = order.date;
  const orderStatus = order.status;
  const total = order.total;
  const paymentMethod = order.paymentMethod;
  const items = order.items;

  // Generate receipt HTML
  let receiptContent = `
    <html>
    <head>
      <title>Receipt - Evara</title>
      <style>
        body {
          font-family: 'Courier New', Courier, monospace;
          width: 300px; /* Typical receipt paper width */
          margin: 0 auto;
          padding: 10px;
          font-size: 12px;
          line-height: 1.4;
        }
        .divider {
          text-align: center;
          margin: 5px 0;
        }
        .order-details, .customer-info, .items, .totals {
          margin-bottom: 10px;
        }
        .order-details p, .customer-info p {
          margin: 2px 0;
        }
        .customer-name {
          color: red;
          font-weight: bold;
        }
        .items table {
          width: 100%;
        }
        .items table td {
          padding: 2px 0;
        }
        .items table td:first-child {
          width: 70%;
        }
        .items table td:last-child {
          width: 30%;
          text-align: right;
        }
        .totals p {
          display: flex;
          justify-content: space-between;
        }
        .footer {
          text-align: center;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="divider">--------------------------------</div>

      <div class="order-details">
        <p>Order ID: ${orderId}</p>
        <p>Date: ${orderDate}</p>
        <p>Status: ${orderStatus}</p>
        <p>Payment Method: ${paymentMethod}</p>
      </div>

      <div class="customer-info">
        <p>Customer: <span class="customer-name">${customerName || ''}</span></p>
        <p>Address: ${address || ''}</p>
        <p>City: ${city || ''}</p>
        <p>Country: ${country || ''}</p>
        <p>Postcode: ${postcode || ''}</p>
        <p>Phone: ${phone || ''}</p>
        <p>Email: ${email || ''}</p>
        <p>Order Note: ${orderNote || ''}</p>
      </div>

      <div class="items">
        <p>Items:</p>
        <table>
  `;

  items.forEach(item => {
    receiptContent += `
      <tr>
        <td>${item.name} x ${item.quantity}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `;
  });

  receiptContent += `
        </table>
      </div>

      <div class="totals">
        <p><span>Total:</span> <span>${total}</span></p>
      </div>

      <div class="divider">--------------------------------</div>

      <div class="footer">
        <p>Thank you for shopping with Evara!</p>
      </div>
    </body>
    </html>
  `;

  // Open a new window and print
  const printWindow = window.open('', '_blank');
  printWindow.document.write(receiptContent);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

// Handle "Place Order" button click on checkout.html and store order in localStorage
document.addEventListener('DOMContentLoaded', () => {
  const placeOrderBtn = document.querySelector('.btn.btn--md');
  if (placeOrderBtn && document.querySelector('.checkout')) {
    placeOrderBtn.addEventListener('click', () => {
      // Get cart items
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        alert('Your cart is empty. Please add items to place an order.');
        window.location.href = 'cart.html';
        return;
      }

      // Get billing details
      const customerName = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
      const address = document.getElementById('address') ? document.getElementById('address').value.trim() : '';
      const city = document.getElementById('city') ? document.getElementById('city').value.trim() : '';
      const country = document.getElementById('country') ? document.getElementById('country').value.trim() : '';
      const postcode = document.getElementById('postcode') ? document.getElementById('postcode').value.trim() : '';
      const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
      const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
      const orderNote = document.getElementById('orderNote') ? document.getElementById('orderNote').value.trim() : '';

      // Validate required fields
      const missingFields = [];
      if (!customerName) missingFields.push('Name');
      if (!address) missingFields.push('Address');
      if (!phone) missingFields.push('Phone');
      if (!email) missingFields.push('Email');

      if (missingFields.length > 0) {
        alert(`Please fill in the following required fields: ${missingFields.join(', ')}.`);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Get existing orders from localStorage or initialize an empty array
      const orders = JSON.parse(localStorage.getItem('orders')) || [];

      // Calculate total (including shipping for the receipt)
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = 10; // Fixed shipping cost
      const total = subtotal + shipping;

      // Get selected payment method
      const paymentMethod = document.querySelector('input[name="payment"]:checked');

      // Determine order status based on payment method
      let status = 'Processing'; // Default status for methods requiring manual verification
      let paymentMethodText = 'Unknown';
      if (paymentMethod) {
        paymentMethodText = paymentMethod.nextSibling.textContent.trim();
        const paymentValue = paymentMethodText.toLowerCase();
        if (paymentValue === 'paypal') {
          // Immediate payment methods like PayPal can be marked as "Completed"
          status = 'Completed';
        } else if (paymentValue === 'direct bank transfer' || paymentValue === 'cheque') {
          // Methods like bank transfer or cheque require verification, so "Processing"
          status = 'Processing';
        }
      }

      // Create a new order entry with billing details
      const newOrder = {
        orderId: `#${Math.floor(1000 + Math.random() * 9000)}`,
        date: "March 20, 2025", // As per your example
        status: status,
        total: `$${total.toFixed(2)}`,
        items: cart,
        paymentMethod: paymentMethodText,
        billingDetails: {
          customerName,
          address,
          city,
          country,
          postcode,
          phone,
          email,
          orderNote
        }
      };

      // Add the new order to the orders array
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Print the receipt
      printReceipt(newOrder, newOrder.billingDetails);

      // Clear the cart
      localStorage.removeItem('cart');

      // Show confirmation message and redirect to accounts.html
      alert('Order placed successfully! Thank you for your purchase.');
      window.location.href = 'accounts.html';
    });
  }

  // Render orders in accounts.html under the "Orders" tab with "Check Process" for non-completed orders
  const ordersTabContent = document.querySelector('#orders .tab__body .placed__order-table');
  if (ordersTabContent) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Ensure the table header is correct
    const thead = ordersTabContent.querySelector('thead') || document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Orders</th>
        <th>Date</th>
        <th>Status</th>
        <th>Total</th>
        <th>Action</th>
      </tr>
    `;
    if (!ordersTabContent.querySelector('thead')) {
      ordersTabContent.prepend(thead);
    }

    const ordersTableBody = document.createElement('tbody');
    ordersTableBody.innerHTML = '';

    if (orders.length === 0) {
      ordersTableBody.innerHTML = '<tr><td colspan="5">No orders found.</td></tr>';
    } else {
      orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.orderId}</td>
          <td>${order.date}</td>
          <td>${order.status}</td>
          <td>${order.total}</td>
          <td>
            <div class="action__dropdown">
              <a href="#" class="view__order" data-order-index="${index}" style="color: #4CAF50;">View</a>
              <div class="dropdown__menu" style="display: none; position: absolute; background-color: #ffffff; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; border-radius: 5px;">
                <a href="#" class="view__detail" data-order-index="${index}" style="display: block; padding: 10px 20px; text-decoration: none; color: #2E7D32; font-weight: bold; border-bottom: 1px solid #e0e0e0;">View Detail</a>
                ${order.status !== 'Completed' ? `<a href="#" class="check__process" data-order-index="${index}" style="display: block; padding: 10px 20px; text-decoration: none; color: #1976D2; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Check Process</a>` : ''}
                <a href="#" class="delete__order" data-order-index="${index}" style="display: block; padding: 10px 20px; text-decoration: none; color: #D32F2F; font-weight: bold;">Delete</a>
              </div>
            </div>
          </td>
        `;
        ordersTableBody.appendChild(row);
      });

      // Add event listeners for dropdown and actions
      ordersTableBody.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;

        // Handle dropdown toggle on "View" click
        if (target.classList.contains('view__order')) {
          const dropdownMenu = target.nextElementSibling;
          dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        }

        // Handle "View Detail" action
        if (target.classList.contains('view__detail')) {
          const orderIndex = target.getAttribute('data-order-index');
          const order = orders[orderIndex];
          if (order) {
            const itemsList = order.items.map(item => `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
            const billingDetails = order.billingDetails ? `
Billing Details:
Customer: ${order.billingDetails.customerName || ''}
Address: ${order.billingDetails.address || ''}
City: ${order.billingDetails.city || ''}
Country: ${order.billingDetails.country || ''}
Postcode: ${order.billingDetails.postcode || ''}
Phone: ${order.billingDetails.phone || ''}
Email: ${order.billingDetails.email || ''}
Order Note: ${order.billingDetails.orderNote || ''}` : 'Billing Details: Not available';

            const details = `Order Details:
Order ID: ${order.orderId}
Date: ${order.date}
Status: ${order.status}
Total: ${order.total}
Payment Method: ${order.paymentMethod}
${billingDetails}
Items:
${itemsList}`;

            // Create a custom modal to display order details
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '1000';

            const modalContent = document.createElement('div');
            modalContent.style.backgroundColor = '#fff';
            modalContent.style.padding = '20px';
            modalContent.style.borderRadius = '5px';
            modalContent.style.maxWidth = '500px';
            modalContent.style.width = '90%';
            modalContent.style.maxHeight = '80%';
            modalContent.style.overflowY = 'auto';

            const detailsText = document.createElement('pre');
            detailsText.textContent = details;
            detailsText.style.whiteSpace = 'pre-wrap';
            modalContent.appendChild(detailsText);

            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.style.marginTop = '10px';
            closeButton.style.padding = '5px 10px';
            closeButton.style.backgroundColor = '#4CAF50';
            closeButton.style.color = 'white';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '3px';
            closeButton.style.cursor = 'pointer';
            modalContent.appendChild(closeButton);

            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Close modal on button click
            closeButton.addEventListener('click', () => {
              document.body.removeChild(modal);
            });

            // Close modal on outside click
            modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                document.body.removeChild(modal);
              }
            });
          }
        }

        // Handle "Check Process" action with payment method correction
        if (target.classList.contains('check__process')) {
          const orderIndex = target.getAttribute('data-order-index');
          const order = orders[orderIndex];
          if (order) {
            // Create a modal to select a new payment method
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '1000';

            const modalContent = document.createElement('div');
            modalContent.style.backgroundColor = '#fff';
            modalContent.style.padding = '20px';
            modalContent.style.borderRadius = '5px';
            modalContent.style.maxWidth = '400px';
            modalContent.style.width = '90%';
            modalContent.style.maxHeight = '80%';
            modalContent.style.overflowY = 'auto';

            const title = document.createElement('h3');
            title.textContent = 'Update Payment Method';
            title.style.marginBottom = '15px';
            modalContent.appendChild(title);

            const paymentOptions = document.createElement('div');
            paymentOptions.innerHTML = `
              <div style="margin-bottom: 10px;">
                <input type="radio" name="new_payment" value="Direct Bank Transfer" ${order.paymentMethod === 'Direct Bank Transfer' ? 'checked' : ''}>
                <span style="margin-left: 5px;">Direct Bank Transfer</span>
              </div>
              <div style="margin-bottom: 10px;">
                <input type="radio" name="new_payment" value="Cheque" ${order.paymentMethod === 'Cheque' ? 'checked' : ''}>
                <span style="margin-left: 5px;">Cheque</span>
              </div>
              <div style="margin-bottom: 10px;">
                <input type="radio" name="new_payment" value="Paypal" ${order.paymentMethod === 'Paypal' ? 'checked' : ''}>
                <span style="margin-left: 5px;">Paypal</span>
              </div>
            `;
            modalContent.appendChild(paymentOptions);

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.style.marginTop = '10px';
            updateButton.style.marginRight = '10px';
            updateButton.style.padding = '5px 10px';
            updateButton.style.backgroundColor = '#4CAF50';
            updateButton.style.color = 'white';
            updateButton.style.border = 'none';
            updateButton.style.borderRadius = '3px';
            updateButton.style.cursor = 'pointer';
            modalContent.appendChild(updateButton);

            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.style.marginTop = '10px';
            closeButton.style.padding = '5px 10px';
            closeButton.style.backgroundColor = '#D32F2F';
            closeButton.style.color = 'white';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '3px';
            closeButton.style.cursor = 'pointer';
            modalContent.appendChild(closeButton);

            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Handle update payment method
            updateButton.addEventListener('click', () => {
              const newPaymentMethod = document.querySelector('input[name="new_payment"]:checked');
              if (newPaymentMethod) {
                const newPaymentValue = newPaymentMethod.value;
                order.paymentMethod = newPaymentValue;
                if (newPaymentValue.toLowerCase() === 'paypal') {
                  order.status = 'Completed';
                  alert('Payment method updated to PayPal. Your order is now marked as Completed.');
                } else if (order.status === 'Shipped') {
                  // If already shipped, don't revert to Processing
                  alert(`Payment method updated to ${newPaymentValue}. Your order is already Shipped.`);
                } else {
                  order.status = 'Processing';
                  alert(`Payment method updated to ${newPaymentValue}. Your order status remains Processing.`);
                }
                localStorage.setItem('orders', JSON.stringify(orders));
                // Re-render the orders table
                ordersTableBody.innerHTML = '';
                if (orders.length === 0) {
                  ordersTableBody.innerHTML = '<tr><td colspan="5">No orders found.</td></tr>';
                } else {
                  orders.forEach((order, newIndex) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                      <td>${order.orderId}</td>
                      <td>${order.date}</td>
                      <td>${order.status}</td>
                      <td>${order.total}</td>
                      <td>
                        <div class="action__dropdown">
                          <a href="#" class="view__order" data-order-index="${newIndex}" style="color: #4CAF50;">View</a>
                          <div class="dropdown__menu" style="display: none; position: absolute; background-color: #ffffff; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; border-radius: 5px;">
                            <a href="#" class="view__detail" data-order-index="${newIndex}" style="display: block; padding: 10px 20px; text-decoration: none; color: #2E7D32; font-weight: bold; border-bottom: 1px solid #e0e0e0;">View Detail</a>
                            ${order.status !== 'Completed' ? `<a href="#" class="check__process" data-order-index="${newIndex}" style="display: block; padding: 10px 20px; text-decoration: none; color: #1976D2; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Check Process</a>` : ''}
                            <a href="#" class="delete__order" data-order-index="${newIndex}" style="display: block; padding: 10px 20px; text-decoration: none; color: #D32F2F; font-weight: bold;">Delete</a>
                          </div>
                        </div>
                      </td>
                    `;
                    ordersTableBody.appendChild(row);
                  });
                }
                document.body.removeChild(modal);
              } else {
                alert('Please select a payment method.');
              }
            });

            // Close modal on button click
            closeButton.addEventListener('click', () => {
              document.body.removeChild(modal);
            });

            // Close modal on outside click
            modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                document.body.removeChild(modal);
              }
            });
          }
        }

        // Handle "Delete" action
        if (target.classList.contains('delete__order')) {
          const orderIndex = target.getAttribute('data-order-index');
          if (confirm('Are you sure you want to delete this order?')) {
            orders.splice(orderIndex, 1); // Remove the order from the array
            localStorage.setItem('orders', JSON.stringify(orders)); // Update localStorage
            // Re-render the orders table
            ordersTableBody.innerHTML = '';
            if (orders.length === 0) {
              ordersTableBody.innerHTML = '<tr><td colspan="5">No orders found.</td></tr>';
            } else {
              orders.forEach((order, newIndex) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td>${order.orderId}</td>
                  <td>${order.date}</td>
                  <td>${order.status}</td>
                  <td>${order.total}</td>
                  <td>
                    <div class="action__dropdown">
                      <a href="#" class="view__order" data-order-index="${newIndex}" style="color: #4CAF50;">View</a>
                      <div class="dropdown__menu" style="display: none; position: absolute; background-color: #ffffff; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; border-radius: 5px;">
                        <a href="#" class="view__detail" data-order-index="${newIndex}" style="display: block; padding: 10px 20px; text-decoration: none; color: #2E7D32; font-weight: bold; border-bottom: 1px solid #e0e0e0;">View Detail</a>
                        ${order.status !== 'Completed' ? `<a href="#" class="check__process" data-order-index="${newIndex}" style="display: block; padding: 10px 20px; text-decoration: none; color: #1976D2; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Check Process</a>` : ''}
                        <a href="#" class="delete__order" data-order-index="${newIndex}" style="display: block; padding: 10px 20px; text-decoration: none; color: #D32F2F; font-weight: bold;">Delete</a>
                      </div>
                    </div>
                  </td>
                `;
                ordersTableBody.appendChild(row);
              });
            }
            alert('Order deleted successfully.');
          }
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('view__order')) {
          document.querySelectorAll('.dropdown__menu').forEach(menu => {
            menu.style.display = 'none';
          });
        }
      });
    }

    const existingTbody = ordersTabContent.querySelector('tbody');
    if (existingTbody) {
      ordersTabContent.replaceChild(ordersTableBody, existingTbody);
    }
  }
});