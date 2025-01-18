// import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './auth/AuthToken.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  // <React>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}  // More balanced for most use cases
          hideProgressBar={false}
          newestOnTop={false}  // Newest messages appear first
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"  // Matches vibrant design
          transition={Bounce}  // Adds dynamic effect
        />
      </AuthProvider>
    </BrowserRouter>
  // {/* </React> */}
);
