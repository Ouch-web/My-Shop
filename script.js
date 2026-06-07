// Sample Products Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
        description: "High-quality sound with noise cancellation",
        emoji: "🎧",
        rating: 4.5
    },
    {
        id: 2,
        name: "USB-C Cable",
        category: "electronics",
        price: 12.99,
        description: "Fast charging and data transfer",
        emoji: "🔌",
        rating: 4.8
    },
    {
        id: 3,
        name: "Phone Stand",
        category: "accessories",
        price: 15.99,
        description: "Adjustable phone holder for desk",
        emoji: "📱",
        rating: 4.3
    },
    {
        id: 4,
        name: "LED Desk Lamp",
        category: "home",
        price: 34.99,
        description: "Energy-efficient with USB charging",
        emoji: "💡",
        rating: 4.6
    },
    {
        id: 5,
        name: "Yoga Mat",
        category: "sports",
        price: 24.99,
        description: "Non-slip, eco-friendly material",
        emoji: "🧘",
        rating: 4.4
    },
    {
        id: 6,
        name: "Coffee Mug",
        category: "home",
        price: 9.99,
        description: "Ceramic, keeps drinks hot for hours",
        emoji: "☕",
        rating: 4.7
    },
    {
        id: 7,
        name: "Notebook Set",
        category: "books",
        price: 19.99,
        description: "Premium quality lined notebooks",
        emoji: "📓",
        rating: 4.5
    },
    {
        id: 8,
        name: "Backpack",
        category: "accessories",
        price: 49.99,
        description: "Durable with multiple compartments",
        emoji: "🎒",
        rating: 4.6
    },
    {
        id: 9,
        name: "Water Bottle",
        category: "sports",
        price: 22.99,
        description: "Insulated, keeps drinks cold/hot",
        emoji: "🧊",
        rating: 4.8
    },
    {
        id: 10,
        name: "Screen Protector",
        category: "electronics",
        price: 8.99,
        description: "Tempered glass, easy installation",
        emoji: "📲",
        rating: 4.4
    },
    {
        id: 11,
        name: "Desk Organizer",
        category: "home",
        price: 14.99,
        description: "Wooden storage for office supplies",
        emoji: "🗄️",
        rating: 4.5
    },
    {
        id: 12,
        name: "Portable Speaker",
        category: "electronics",
        price: 44.99,
        description: "Waterproof Bluetooth speaker",
        emoji: "🔊",
        rating: 4.7
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productList = document.getElementById('productList');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const closeBtn = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkoutBtn');
const continueShopping = document.getElementById('continueShopping');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    loadCart();
});

// Display Products
function displayProducts(productsToShow) {
    productList.innerHTML = '';

    if (productsToShow.length === 0) {
        productList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-rating">⭐ ${product.rating} (${Math.floor(Math.random() * 200) + 10} reviews)</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
    updateCartCount();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            displayCart();
            updateCartCount();
        }
    }
}

// Display Cart
function displayCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div>$${itemTotal.toFixed(2)}</div>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Update Cart Count
function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Modal Functions
cartBtn.addEventListener('click', () => {
    displayCart();
    cartModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

continueShopping.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase!\nTotal: $${total.toFixed(2)}\n\nYour order has been placed successfully!`);
    
    cart = [];
    saveCart();
    updateCartCount();
    cartModal.style.display = 'none';
    displayProducts(products);
});

// Search Products
searchInput.addEventListener('input', (e) => {
    filterProducts();
});

// Filter by Category
categoryFilter.addEventListener('change', () => {
    filterProducts();
});

// Filter Products Function
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 999;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);