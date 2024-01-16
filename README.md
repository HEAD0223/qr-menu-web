# QR Menu (**Client**) · In Progress...

![Client](https://img.shields.io/badge/Client-QR_Menu-brightgreen)
![Status](https://img.shields.io/badge/Status-In_Progress-yellow)
![Self Development](https://img.shields.io/badge/Project-Self_Development-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

This web application, built with React, a JavaScript library for building user interfaces, and Material-UI, a React UI framework for creating responsive and accessible web applications, is designed to efficiently manage QR code menus for restaurants. The application encompasses essential features, including user authentication, a dashboard, store management, and seamless menu creation.

## Table of Contents

-  [Folder Structure](#folder-structure)
-  [Usage](#usage)
-  [Media](#media)
-  [Localization](#localization)
-  [Contributing](#contributing)
-  [Dependencies](#dependencies)

## Folder Structure

-  **public:** Contains public assets and the main HTML file.
-  **src:**
   -  **components:** Reusable components.
   -  **redux:** Redux store setup and slices.
   -  **service:** Service functions for API communication.
   -  **App.js:** Main component rendering routes and managing state.
   -  **index.js:** Entry point of the application.
   -  **axios.js:** Configuration for Axios HTTP client.

## Usage

1. Clone the repository:

```bash
git clone https://github.com/HEAD0223/qr-menu-web.git
cd qr-menu-web
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
yarn start
```

4. Visit `http://localhost:3000` in your browser to see the application.

## Media

### Multi-Language Support and Login

![QR-Menu Language and Login](./public/preview/QR-Menu_lng-login.gif)
![QR-Menu Web 1](./public/preview/qr-menu-web_1.png)

### Store Creation and Draggable Stores

![QR-Menu Store Creation and Draggable Stores](./public/preview/QR-Menu_store-draggable.gif)
![QR-Menu Web 2](./public/preview/qr-menu-web_2.png)

### Tables Creation and Renaming

![QR-Menu Tables Creation and Renaming](./public/preview/QR-Menu_tables-create.gif)
![QR-Menu Web 3](./public/preview/qr-menu-web_3.png)

### QR Code Customization

![QR-Menu QR Code Customization](./public/preview/QR-Menu_qr-custom.gif)
![QR-Menu Web 4](./public/preview/qr-menu-web_4.png)

### User Creation and Privilege Management

![QR-Menu User Creation and Privilege Management](./public/preview/QR-Menu_users.gif)
![QR-Menu Web 5](./public/preview/qr-menu-web_5.png)

### Store Schedule and Time Editing

![QR-Menu Store Schedule and Time Editing](./public/preview/QR-Menu_schedule.gif)
![QR-Menu Web 6](./public/preview/qr-menu-web_6.png)

### Creating Socials and Generating WiFi QR Code

![QR-Menu Creating Socials and Generating WiFi QR Code](./public/preview/QR-Menu_socials-wifi.gif)
![QR-Menu Web 7](./public/preview/qr-menu-web_7.png)
![QR-Menu Web 8](./public/preview/qr-menu-web_8.png)

### Changing Store Parameters and Overview of All Created Stores

![QR-Menu Changing Store Parameters and Overview](./public/preview/QR-Menu_param-info.gif)
![QR-Menu Web 9](./public/preview/qr-menu-web_9.png)
![QR-Menu Web 10](./public/preview/qr-menu-web_10.png)

## Localization

The application supports localization using i18n. Translation files are located in the `public/assets/locales` directory. Add new translations as needed.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## Dependencies

-  **React:** JavaScript library for building user interfaces.
-  **Material-UI:** React UI framework for building responsive and accessible web applications.
-  **Redux Toolkit:** State management library for React applications.
-  **React Router:** Declarative routing for React.js.
-  **i18next:** Internationalization library for handling translations.
-  **axios:** Promise-based HTTP client for the browser and Node.js.
-  **js-cookie:** A simple, lightweight JavaScript API for handling cookies.
-  **react-toastify:** A library for displaying notifications in React applications.

Make sure to include these dependencies in your project.
