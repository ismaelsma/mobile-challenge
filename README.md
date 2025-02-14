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
- **Node**: Backend is managed by a node server in the /server folder
- **Jest & React Testing Library**: For unit and integration testing of components and functionality.
- **Typescript**: To type all the api calls and information of the components
- **SCSS**: For styling the application with custom themes and responsive layouts.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/ismaelsma/mobile-challenge.git
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

## Folder structure

    ./server
    Contains Node Backend server

    ./client
      Contains React Frontal server

    ./client/src/components
      Components created in the app. It's divided in:

      ./components/main
        Core components of the app

      ./components/common
        Smaller components that can be used in main components for several cases

    ./client/src/styles
      Styles applied for all the app. Contains the variables, the imports and the main app styles

    ./client/src/jest
      Files used by Jest to test the app

    ./client/src/types
      Models used to type the context data and the api responses (adapetd and not adapted)

## Tests

Tests are done by jest. The tests are of types, context, functions and components.
To carry out the test, just type:

```sh
npm run test
```

## Deploy and minify

Both servers (Node and React) are prepared to be deployed and minified.
Server has a line in index.ts that triggers build when deployed in prod, and client has it's build files ready (and can be updated with an npm run build)

## Other functions

The app has also esLint and preetify to indent and format the code.
Configuration will be installed directly in npm start, but be careful not to have a custom configuration in the plugins of your IDE
