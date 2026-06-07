# 🛍️ My Shop - E-Commerce Store

A simple, modern e-commerce website to sell miscellaneous products. Built with HTML, CSS, and JavaScript.

## Features

✅ **Product Catalog** - Browse 12+ sample products with categories
✅ **Shopping Cart** - Add/remove items, update quantities
✅ **Search & Filter** - Find products by name or category
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
✅ **Local Storage** - Cart persists even after page refresh
✅ **Easy Checkout** - Simple one-click purchase simulation

## Product Categories

- 📱 Electronics
- 🏠 Home & Garden
- ⚽ Sports & Outdoors
- 📚 Books & Media
- 🎒 Accessories

## How to Use

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ouch-web/my-shop.git
   cd my-shop
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **Browse & Shop:**
   - Search for products
   - Filter by category
   - Add items to cart
   - View cart and checkout

## File Structure

```
my-shop/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Features Breakdown

### 1. Product Display
- Grid layout with product cards
- Product information (name, price, rating, description)
- Easy "Add to Cart" button

### 2. Shopping Cart
- View all cart items
- Update quantities (increase/decrease)
- Remove items
- Real-time total calculation
- Cart count badge in header

### 3. Search & Filter
- Real-time search by product name/description
- Filter by category
- Instant results

### 4. Local Storage
- Cart automatically saves to browser storage
- Persists across page refreshes
- No server required

## Sample Products Included

- Wireless Headphones ($79.99)
- USB-C Cable ($12.99)
- Phone Stand ($15.99)
- LED Desk Lamp ($34.99)
- Yoga Mat ($24.99)
- Coffee Mug ($9.99)
- Notebook Set ($19.99)
- Backpack ($49.99)
- Water Bottle ($22.99)
- Screen Protector ($8.99)
- Desk Organizer ($14.99)
- Portable Speaker ($44.99)

## Customization

### To Add More Products
Edit `script.js` and add items to the `products` array:

```javascript
{
    id: 13,
    name: "Product Name",
    category: "electronics",
    price: 29.99,
    description: "Product description",
    emoji: "🎧",
    rating: 4.5
}
```

### To Change Colors
Edit `styles.css`:
- Primary color: `#3498db` (buttons)
- Secondary color: `#2c3e50` (header/footer)
- Accent color: `#e74c3c` (prices, cart)

### To Add Payment Integration
Replace the checkout alert with real payment processor integration:
- Stripe
- PayPal
- Square

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Future Enhancements

- [ ] Backend database integration
- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] Admin panel
- [ ] Product reviews
- [ ] Wishlist feature
- [ ] Email notifications

## License

This project is open source and available for personal and commercial use.

## Support

For questions or issues, please create a GitHub issue or contact us at info@myshop.com

---

**Happy Selling! 🚀**