import { useState } from 'react'
import './App.css'
import ChatScreen from './components/ChatScreen'
import Text from './components/Text'
import Header from './components/Header'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Header />
        <ChatScreen />
        <div className='fixed top-[91%] text h-full w-full'><Text /></div>
      </div>
    </>
  )
}

export default App
