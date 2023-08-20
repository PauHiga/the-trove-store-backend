# The Trove Store - E-commerce

E-commerce web application project "The Trove Store". 
This single-page application is built using React for the frontend, Node.js with Express for the backend, MongoDB for the database, and Cloudinary for image storage.

Deploy: https://the-trove-store.netlify.app/

Frontend Repository: [https://github.com/PauHiga/the-trove-store-frontend](https://github.com/PauHiga/the-trove-store-frontend)   
Backend Repository: [https://github.com/PauHiga/the-trove-store-backend](https://github.com/PauHiga/the-trove-store-backend)



## Features

- Responsive Design: The app offers a responsive design optimized for both mobile and web interfaces.

- Header: Consistency is maintained across all pages with a header displaying the store logo, and several icons granting quick access to the "Login/User" and "Cart" sections.

- Main Page: The main page features a hero banner that catches visitors' attention. Smaller banners for four distinct sections follow: Women, Girls, Accessories, and Sale. Products are showcased in cards displaying images, names, and prices. If a discount is applied, the old price is displayed (crossed out) next to the new price. All this content is designed for visualization on mobile and web platforms while adhering to the design concept.

- Product Browsing: Users can explore the entire range of products on the main page, or alternatively, they can click on section banners to explore category-specific products. Products within sections are categorized. The admin user can assign sections and categories to each product, create new categories, and assign products to one or more categories.

- Shopping Cart: Both registered and unregistered users can add products to their shopping carts. For registered users, the app integrates with the PayPal API to facilitate a secure checkout process. Unregistered users are prompted to sign in first.

- User Authentication: Registered users can log in to their accounts, allowing them to place orders. New users are prompted to create an account before proceeding to checkout.

- Admin Dashboard: The admin user has access to a specialized admin board providing an overview of all placed orders, a section to manage the creation/editing of products, a section to create or edit categories, and a list of all available products.

- User Notifications: The project uses toasts to display information to the user. Additionally, the "Cart" icon includes a badge indicating the number of items selected for the cart.

- Security Features: The project employs token-based user login management. Passwords are encrypted using bcrypt.


## Technologies Used

### Frontend:
- React
- Redux for state management
- React Router for navigation

### Backend:
- Node.js with Express framework

### Database:
- MongoDB

### Image Hosting:
- Cloudinary

### End-to-End Testing:
- Cypress.io

### Security:
- bcrypt
- jsonwebtoken
