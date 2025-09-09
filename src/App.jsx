import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
// Import only shared CSS files
import '../public/css/layout.css'
import { CartProvider } from './contexts/CartContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Offers from './pages/Offers.jsx'
import Blog from './pages/Blog.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Cart from './pages/Cart.jsx'

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div style={{ padding: 24 }}>Not Found. <Link to="/">Go Home</Link></div>} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}

export default App
