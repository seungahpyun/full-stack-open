import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  console.log('Apollo Request Token:', token);
  console.log('Headers before setting:', headers)
  // Create a headers object if it is undefined
  headers = headers || {}
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
