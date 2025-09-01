import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
// Import all CSS files needed by components and pages
import '../public/css/header.css'
import '../public/css/FileFooter.css'
import '../public/css/layout.css'
import '../public/css/content1.css'
import '../public/css/content2.css'
import '../public/css/content3.css'
import '../public/css/offers.css'
import '../public/css/product-detail.css'
import '../public/css/product-list.css'
import '../public/css/blog.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Offers from './pages/Offers.jsx'
import Blog from './pages/Blog.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<div style={{ padding: 24 }}>Not Found. <Link to="/">Go Home</Link></div>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
