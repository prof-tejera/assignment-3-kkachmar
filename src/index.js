import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from 'react-error-boundary'

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div style={{backgroundImage: 'linear-gradient(#005F96, #002034)'}}>
    <h1>Oh no!</h1>
    <h2>Something went wrong. Try again.</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
</div>
);

const Wrapped = () => {
  return <ErrorBoundary FallbackComponent={ErrorFallback} onError={(error, errorInfo) => {
    // Handle error, maybe send it to a logging service
  }}>
    <App />
  </ErrorBoundary>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {Wrapped()}
  </React.StrictMode>
);
