import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationProvider } from './NotificationContext'
import { UserProvider } from './UserContext'

const queryClient = new QueryClient()

ReactDOM.render(
  <UserProvider>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationProvider>
  </UserProvider>,
  document.getElementById('root')
)
