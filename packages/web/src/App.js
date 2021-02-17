import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routes from './routes'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
