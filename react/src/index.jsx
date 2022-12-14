import 'react-app-polyfill/ie11'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import store from './redux/store';
import App from './components/App/App'
import 'normalize.css'
import './main.scss'





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
	<>
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>			
		</Provider>
	</>
	
);