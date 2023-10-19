import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IsLoginProvider } from './context/IsLoginContext';
import { UploadProvider } from './context/UploadContext';
import { FileInfoProvider } from './context/FileInfoContext';

const queryClient = new QueryClient();
const Google_Client_ID = process.env.REACT_APP_Google_Client_ID;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <FileInfoProvider>
    <UploadProvider>
      <IsLoginProvider>
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={Google_Client_ID}>
              {/* <React.StrictMode> */}
                  <App />
                {/* </React.StrictMode> */}
            </GoogleOAuthProvider>
          </QueryClientProvider>
      </IsLoginProvider>
    </UploadProvider>
  </FileInfoProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
