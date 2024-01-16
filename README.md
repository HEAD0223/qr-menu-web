# QR Menu (**Client**) · In Progress...

![Client](https://img.shields.io/badge/Client-QR_Menu-brightgreen)
![Status](https://img.shields.io/badge/Status-In_Progress-yellow)
![Self Development](https://img.shields.io/badge/Project-Self_Development-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

This web application is designed for managing QR code menus for restaurants. It includes features such as user authentication, dashboard, store management, and menu creation.

## Table of Contents

-  [Folder Structure](#folder-structure)
-  [Usage](#usage)
-  [Screenshots](#screenshots)
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

## Screenshots

![photo_1](https://github.com/HEAD0223/qr-menu-web/assets/43917535/29c04070-c436-43d4-b099-3ae022349c44)
![photo_2](https://github.com/HEAD0223/qr-menu-web/assets/43917535/af4ab33e-9042-4b37-b890-d5dbf7fee25f)
![photo_3](https://github.com/HEAD0223/qr-menu-web/assets/43917535/7404f576-14ac-4ad9-9013-984a9e5353ba)
![photo_4](https://github.com/HEAD0223/qr-menu-web/assets/43917535/4c42ef15-8770-436f-8dc4-3871cf04f308)
![photo_5](https://github.com/HEAD0223/qr-menu-web/assets/43917535/0102a496-d802-4887-9042-3d8a2f3fc853)
![photo_6](https://github.com/HEAD0223/qr-menu-web/assets/43917535/1f108cd9-301e-4bb7-b34e-30735f04415e)
![photo_7](https://github.com/HEAD0223/qr-menu-web/assets/43917535/ab6f8f33-0071-4925-aee3-eb1dbc39db39)
![photo_8](https://github.com/HEAD0223/qr-menu-web/assets/43917535/81739061-d25f-49dd-9872-0390721620f2)
![photo_9](https://github.com/HEAD0223/qr-menu-web/assets/43917535/e9166805-51ff-48c7-8dfa-3a48cfd3a590)
![photo_10](https://github.com/HEAD0223/qr-menu-web/assets/43917535/03c45e9e-76f2-42b7-a0dd-4e9988635a17)
![photo_11](https://github.com/HEAD0223/qr-menu-web/assets/43917535/710885a4-13c2-4080-a618-b69d5ce10f21)
![photo_12](https://github.com/HEAD0223/qr-menu-web/assets/43917535/05ba5560-32bd-4a9a-8c54-309d43d20da6)

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
