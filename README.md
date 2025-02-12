# Mobile Shop App

This is a mobile shop web application where users can browse different mobile phones, view their details, add items to the cart, and proceed to checkout. The app allows users to search for phones, view detailed information, and manage their cart.

## Features

- **Phone List**: Displays a list of available phones with details such as brand, model, price, and image.
- **Search Functionality**: Users can search for phones by their model or brand.
- **Phone Details**: When users click on a phone, they are redirected to a detailed page with more information about the selected phone.
- **Cart Management**: Users can add phones to their shopping cart, view the cart, and proceed to checkout.
- **Notifications**: The app includes notifications for various actions like adding/removing items from the cart.

## Tech Stack

- **React**: The frontend of the app is built with React.
- **React Router**: Used for client-side routing between different pages like phone list, phone details, and cart.
- **Context API**: Used for state management to handle global app states such as cart items, phone list, and loading states.
- **Jest & React Testing Library**: For unit and integration testing of components and functionality.
- **Typescript**: To type all the api calls and information of the components
- **SCSS**: For styling the application with custom themes and responsive layouts.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/mobile-shop-app.git
   ```

2. Navigate to project directory

   ```sh
   cd mobile-challenge
   ```

3. Install NPM packages in both, server and client folders

   ```sh
   cd server
   npm install
   cd client
   npm start
   ```

4. Start both, server and client projects in different consoles

   ```sh
   cd server
   npm start
   cd client
   npm start
   ```

5. Open the Project in Your Browse

   Go to localhost:3000 in your browser
