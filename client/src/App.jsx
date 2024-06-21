 import { Route, Routes } from 'react-router-dom'

import './App.css'
import Layout from './Layout'
import IndexPage from './components/IndexPage'

function App() {
   

  return (
    
    
    <Routes>
     <Route path='/' element={<Layout/>}/>
     <Route index element={<IndexPage/>}/>
 
    </Routes>
 
    
  )
}

export default App
