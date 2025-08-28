import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Offers from './pages/Offers.jsx'
import Blog from './pages/Blog.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<div style={{ padding: 24 }}>Not Found. <Link to="/">Go Home</Link></div>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
