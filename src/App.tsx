
import React from 'react'
import './App.css'
import { BoardSandbox } from './components/BoardSandbox'
import { store } from './game/store'
import { Provider } from 'react-redux'

function App() {

  return (
    <React.StrictMode>
       <Provider store={store}>
         <BoardSandbox />
       </Provider>
    </React.StrictMode>
  )
}

export default App
