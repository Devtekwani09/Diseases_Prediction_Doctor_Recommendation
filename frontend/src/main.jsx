import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './context/Authcontext.jsx';
import App from './App.jsx';
import './index.css';
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        {/* <ToastContainer 
          theme="dark" 
          position="top-right" 
          autoClose={3000} 
          closeOnClick 
          pauseOnHover={false} 
          
        /> */}
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
