import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
        <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
