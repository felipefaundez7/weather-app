import { useState } from 'react'
import './App.css'
import MiApi from './components/MiApi';

function App() {
  return (
    <div>
      <h1>OpenWeatherMap API</h1>
      <MiApi />
    </div>
  )
}

export default App
