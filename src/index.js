import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { Provider } from 'react-redux';
import store from './redux/store';
import Toast from './components/Toast';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Toast position={'bottom-right'} autoDelete={true}>
            <React.StrictMode>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </React.StrictMode>
        </Toast>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
