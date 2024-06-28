import './App.css'
import ChatScreen from './components/ChatScreen'
import Text from './components/Text'
import Header from './components/Header'
function App() {
  

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
