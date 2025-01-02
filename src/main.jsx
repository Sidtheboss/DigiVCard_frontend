import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserContext } from './contexts/UserContext.jsx';  // Import the AppProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>  {/* Wrap your App component with the AppProvider */}
      <App />
    </UserContext>
  </StrictMode>,
);
