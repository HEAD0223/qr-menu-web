import { CssBaseline } from '@mui/material';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/flag-icon-css/css/flag-icons.min.css';
import App from './App';
import store from './redux/store';

//Localisaton
i18n
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		supportedLngs: ['en', 'ru', 'fr', 'de', 'ro'],
		fallbackLng: 'en',
		detection: {
			order: ['cookie', 'localStorage', 'navigator', 'path', 'subdomain'],
			caches: ['cookie'],
		},
		backend: {
			loadPath: '/assets/locales/{{lng}}/translation.json',
		},
	});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<CssBaseline />
			<App />
		</Provider>
	</BrowserRouter>,
);
