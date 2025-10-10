# SneakHub - Premium Sneaker Collection

![SneakHub Logo](logoSH.png)

SneakHub is a modern, responsive e-commerce website specializing in premium sneakers and customization services. Built with HTML5, CSS3, JavaScript, and Bootstrap 5, it offers a seamless shopping experience for sneaker enthusiasts.

## 🚀 Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse men's, women's, kids', and sports shoes
- **Shopping Cart**: Add/remove items with real-time updates
- **Product Search**: Intelligent search functionality
- **Wishlist**: Save favorite products
- **Responsive Design**: Optimized for all devices

### 🎨 Customization Services
- **Custom Design**: Professional sneaker customization
- **Size Guide**: Comprehensive sizing information
- **Shoe Care**: Maintenance and care services
- **Repairs**: Professional repair services

### 📱 User Experience
- **Modern UI/UX**: Clean, intuitive interface
- **Video Showcase**: Interactive product demonstrations
- **News Ticker**: Real-time updates and promotions
- **Newsletter**: Email subscription for updates
- **Social Media Integration**: Connect with community

### 🛠️ Technical Features
- **Bootstrap 5**: Responsive framework
- **Swiper.js**: Interactive carousels and sliders
- **Font Awesome**: Comprehensive icon library
- **SweetAlert2**: Beautiful alert dialogs
- **Local Storage**: Persistent cart and user preferences

## 📁 Project Structure

```
SneakHub/
├── index.html              # Homepage
├── about.html              # About Us page
├── blog.html               # Blog section
├── checkout.html           # Checkout process
├── contact.html            # Contact information
├── faq.html                # Frequently Asked Questions
├── male.html               # Men's shoes catalog
├── women.html              # Women's shoes catalog
├── kids.html               # Kids' shoes catalog
├── sport.html              # Sports shoes catalog
├── trend.html              # Trending products
├── sale.html               # Sale items
├── service.html            # Services page
├── showcase.html           # Product showcase
├── team.html               # Team information
├── size-guide.html         # Size guide
├── shipping.html           # Shipping information
├── returns.html            # Return policy
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── css/
│   └── style.css           # Custom styles
├── js/
│   ├── app.js              # Main application logic
│   ├── cart.js             # Shopping cart functionality
│   ├── checkout.js         # Checkout process
│   ├── forms.js            # Form handling
│   ├── navigation.js       # Navigation functionality
│   └── slider.js           # Carousel/slider controls
├── logoSH.png              # Main logo
├── francisco.png           # Team member photo
├── garcia.png              # Team member photo
├── guarin.png              # Team member photo
├── lappay.png              # Payment logo
├── viari.png               # Brand logo
├── vid.mp4                 # Showcase video 1
├── vid1.mp4                # Showcase video 2
└── vid2.mp4                # Showcase video 3
```

## 🎨 Design System

### Color Palette
- **Primary Orange**: #FF9B00
- **Secondary Yellow**: #FFE100
- **Accent Orange**: #FFC900
- **Light Yellow**: #EBE389
- **Dark Text**: #000000
- **Light Text**: #ffffff

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Responsive**: Optimized for all screen sizes

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MarkKheanViari/SneakHub.git
   cd SneakHub
   ```

## 📱 Pages Overview

### Core Pages
- **Homepage** (`index.html`): Hero section, featured products, video showcase
- **Product Catalogs**: Dedicated pages for different shoe categories
- **About Us** (`about.html`): Company story and mission
- **Services** (`service.html`): Customization and care services
- **Contact** (`contact.html`): Contact information and form

### Support Pages
- **FAQ** (`faq.html`): Frequently asked questions
- **Size Guide** (`size-guide.html`): Comprehensive sizing information
- **Shipping** (`shipping.html`): Shipping policies and information
- **Returns** (`returns.html`): Return and exchange policies
- **Privacy** (`privacy.html`): Privacy policy
- **Terms** (`terms.html`): Terms of service

## 🛠️ Customization

### Adding New Products
1. Edit the respective HTML files (e.g., `male.html`, `women.html`)
2. Add product cards with the following structure:
   ```html
   <div class="product-card card h-100">
       <div class="position-relative">
           <img src="product-image.jpg" class="card-img-top product-image" alt="Product Name">
           <button class="wishlist-btn" data-product-id="product-id">
               <i class="far fa-heart"></i>
           </button>
       </div>
       <div class="card-body">
           <h5 class="product-title">Product Name</h5>
           <div class="product-rating mb-2">
               <!-- Star ratings -->
           </div>
           <p class="product-price">$99.99</p>
           <button class="btn btn-primary w-100 add-to-cart-btn" 
                   data-product-id="product-id"
                   data-product-name="Product Name"
                   data-product-price="99.99"
                   data-product-image="product-image.jpg">
               Add to Cart
           </button>
       </div>
   </div>
   ```

### Styling Customization
- Edit `css/style.css` to modify colors, fonts, and layout
- Update CSS custom properties in `:root` for global changes
- Modify Bootstrap classes for component-specific styling

### JavaScript Functionality
- `js/app.js`: Main application logic
- `js/cart.js`: Shopping cart functionality
- `js/forms.js`: Form validation and submission
- `js/navigation.js`: Navigation and mobile menu
- `js/slider.js`: Carousel and slider controls

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@sneakhub.com or join our Discord community.

## 🙏 Acknowledgments

- Bootstrap team for the responsive framework
- Font Awesome for the comprehensive icon library
- Swiper.js for the carousel functionality
- Unsplash for the high-quality product images
- All contributors and supporters of the project

---

**SneakHub** - Step Into Style 🚀
