import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

// Attach page-scoped CSS dynamically
function usePageStyles(hrefs) {
  const [stylesLoaded, setStylesLoaded] = useState(false)
  
  useEffect(() => {
    const links = hrefs.map(href => {
      const el = document.createElement('link')
      el.rel = 'stylesheet'
      el.href = href
      
      // Add load event listener to track when CSS is loaded
      el.onload = () => {
        // Check if all stylesheets are loaded
        const allLinks = document.querySelectorAll('link[rel="stylesheet"]')
        const loadedLinks = Array.from(allLinks).filter(link => link.sheet !== null)
        if (loadedLinks.length >= hrefs.length) {
          // Add a small delay to ensure CSS is fully applied
          setTimeout(() => setStylesLoaded(true), 100)
        }
      }
      
      document.head.appendChild(el)
      return el
    })
    
    // Fallback: if onload doesn't fire, set loaded after a reasonable timeout
    const fallbackTimer = setTimeout(() => setStylesLoaded(true), 500)
    
    return () => { 
      links.forEach(el => document.head.removeChild(el))
      clearTimeout(fallbackTimer)
    }
  }, [hrefs.join('|')])
  
  return stylesLoaded
}

const CATEGORIES = ['all','fruits','vegetables','juice','dairy','processed-food','skin-care']

export default function Products() {
  const stylesLoaded = usePageStyles(['/css/layout.css', '/css/product-list.css'])
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [searchParams, setSearchParams] = useSearchParams()

  // Read category from URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setCategory(categoryFromUrl)
    }
  }, [searchParams])

  // Update URL when category changes
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    setSearchParams({ category: newCategory })
  }

  useEffect(() => {
    fetch('/json/products.json')
      .then(response => response.json())
      .then(data => {
        // Handle both array and object with products property
        const productsArray = Array.isArray(data) ? data : (data.products || [])
        setProducts(productsArray)
      })
      .catch(error => console.error('Error loading products:', error))
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'all' || product.category === category
    return matchesSearch && matchesCategory
  })

  // Loading screen while CSS is being loaded
  if (!stylesLoaded) {
    return <LoadingSpinner message="Loading Products..." />
  }

  return (
    <main className="section main">
      <section className="products-hero">
        <div>
          <h1>Our Products</h1>
          <p>Fresh organic produce delivered to your door</p>
        </div>
      </section>
      <section className="product-section">
        <div className="container">
          <div className="filters">
            {CATEGORIES.map(c => (
              <button key={c} className={category===c? 'active' : ''} onClick={() => handleCategoryChange(c)}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>

          <div id="productGrid" className="product-grid">
            {filteredProducts.map(p => (
                <div key={p.id} className="product-card">
                  {p.discount && p.discount > 0 ? <div className="discount-badge">-{p.discount}%</div> : null}
                  <Link to={`/product/${p.id}`} className="product-image-link">
                    <img src={`/images/organic-img/${p.name.toLowerCase().replace(/\s+/g,'-')}.jpg`} alt={p.name} />
                  </Link>
                  <div className="product-info">
                    <Link to={`/product/${p.id}`} className="product-title-link">
                      <h4>{p.name}</h4>
                    </Link>
                    <p className="product-description">{p.description}</p>
                    <div className="product-price">
                      {p.discount && p.discount > 0 && p.originalPrice ? (
                        <>
                          <span className="original-price">{p.originalPrice}</span>
                          <span className="current-price">{p.price}</span>
                        </>
                      ) : (
                        <span className="current-price">{p.price}</span>
                      )}
                      <span className="product-quantity">/ {p.quantity}</span>
                    </div>
                    <Link to={`/product/${p.id}`} className="add-to-cart-btn">
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </Link>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}


