import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes'
import QueryProvider from './lib/QueryProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  </React.StrictMode>
)
