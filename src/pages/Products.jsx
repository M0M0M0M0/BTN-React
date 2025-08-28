import { useEffect, useMemo, useState } from 'react'
import { useEffect as usePageEffect } from 'react'
// Attach page-scoped CSS dynamically
function usePageStyles(hrefs) {
  usePageEffect(() => {
    const links = hrefs.map(href => {
      const el = document.createElement('link')
      el.rel = 'stylesheet'
      el.href = href
      document.head.appendChild(el)
      return el
    })
    return () => { links.forEach(el => document.head.removeChild(el)) }
  }, [hrefs.join('|')])
}

const CATEGORIES = ['all','fruits','vegetables','juice','dairy','processed-food','skin-care']

export default function Products() {
  usePageStyles(['/css/layout.css', '/css/product-list.css'])
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/json/products.json')
      .then(r => r.json())
      .then(data => setProducts(data.products || []))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return products.filter(p => category === 'all' ? true : p.category === category)
  }, [products, category])

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
              <button key={c} className={category===c? 'active' : ''} onClick={() => setCategory(c)}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>

          {loading && (
            <div id="loading" className="loading">
              Loading products...
            </div>
          )}

          {!loading && (
            <div id="productGrid" className="product-grid">
              {filtered.map(p => (
                <div key={p.id} className="product-card">
                  {p.discount ? <div className="discount-badge">-{p.discount}%</div> : null}
                  <img src={`/images/organic-img/${p.name.toLowerCase().replace(/\s+/g,'-')}.jpg`} alt={p.name} />
                  <div className="product-info">
                    <h4>{p.name}</h4>
                    <p className="product-description">{p.description}</p>
                    <div className="product-price">
                      {p.originalPrice ? <span className="original-price">{p.originalPrice}</span> : null}
                      <span className="current-price">{p.price}</span>
                    </div>
                    <button className="add-to-cart-btn">
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}


