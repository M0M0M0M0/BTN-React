import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import '../../public/css/bundle-builder.css'

export default function BundleBuilder() {
  const { bundleType } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState({
    fruits: null,
    vegetables: null,
    juices: null
  })
  const [loading, setLoading] = useState(true)

  // Load products data
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('./json/products.json')
        const data = await response.json()
        setProducts(data.products)
        setLoading(false)
      } catch (error) {
        console.error('Error loading products:', error)
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Filter products by category
  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category)
  }

  // Handle item selection
  const handleItemSelect = (category, product) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: product
    }))
  }

  // Check if bundle is complete
  const isBundleComplete = () => {
    return selectedItems.fruits && selectedItems.vegetables && selectedItems.juices
  }

  // Calculate bundle price
  const calculateBundlePrice = () => {
    if (!isBundleComplete()) return 0
    
    const fruitPrice = parseFloat(selectedItems.fruits.price.replace(/[^\d.]/g, ''))
    const vegetablePrice = parseFloat(selectedItems.vegetables.price.replace(/[^\d.]/g, ''))
    const juicePrice = parseFloat(selectedItems.juices.price.replace(/[^\d.]/g, ''))
    
    const totalPrice = fruitPrice + vegetablePrice + juicePrice
    const discount = totalPrice * 0.25 // 25% discount
    return totalPrice - discount
  }

  // Add bundle to cart
  const handleAddBundleToCart = () => {
    if (!isBundleComplete()) return

    const bundleItems = [
      {
        ...selectedItems.fruits,
        bundleType: 'Family Pack - Fruits',
        bundleDiscount: '25%'
      },
      {
        ...selectedItems.vegetables,
        bundleType: 'Family Pack - Vegetables',
        bundleDiscount: '25%'
      },
      {
        ...selectedItems.juices,
        bundleType: 'Family Pack - Juices',
        bundleDiscount: '25%'
      }
    ]

    bundleItems.forEach(item => {
      addToCart(item)
    })

    // Navigate back to offers
    navigate('/offers')
  }

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="bundle-builder-loading">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <main className="bundle-builder-main">
      <section className="bundle-builder-hero">
        <div className="container">
          <h1>Family Pack Builder</h1>
          <p>Choose your favorite items for each category and save 25%!</p>
        </div>
      </section>

      <div className="container bundle-builder-content">
        <div className="bundle-summary">
          <h2>Your Family Pack</h2>
          <div className="bundle-items-preview">
            <div className="bundle-item-preview">
              <h4>5 lbs Fruits</h4>
              {selectedItems.fruits ? (
                <div className="selected-item">
                  <img src={`./images/organic-img/${selectedItems.fruits.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={selectedItems.fruits.name} />
                  <span>{selectedItems.fruits.name}</span>
                  <span className="price">{selectedItems.fruits.price}</span>
                </div>
              ) : (
                <div className="placeholder">Select a fruit</div>
              )}
            </div>

            <div className="bundle-item-preview">
              <h4>5 lbs Vegetables</h4>
              {selectedItems.vegetables ? (
                <div className="selected-item">
                  <img src={`./images/organic-img/${selectedItems.vegetables.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={selectedItems.vegetables.name} />
                  <span>{selectedItems.vegetables.name}</span>
                  <span className="price">{selectedItems.vegetables.price}</span>
                </div>
              ) : (
                <div className="placeholder">Select a vegetable</div>
              )}
            </div>

            <div className="bundle-item-preview">
              <h4>4 Juices</h4>
              {selectedItems.juices ? (
                <div className="selected-item">
                  <img src={`./images/organic-img/${selectedItems.juices.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={selectedItems.juices.name} />
                  <span>{selectedItems.juices.name}</span>
                  <span className="price">{selectedItems.juices.price}</span>
                </div>
              ) : (
                <div className="placeholder">Select a juice</div>
              )}
            </div>
          </div>

          <div className="bundle-total">
            <div className="total-line">
              <span>Regular Price:</span>
              <span>{formatPrice(calculateBundlePrice() / 0.75)}</span>
            </div>
            <div className="total-line discount">
              <span>25% Discount:</span>
              <span>-{formatPrice((calculateBundlePrice() / 0.75) * 0.25)}</span>
            </div>
            <div className="total-line final">
              <span>Bundle Price:</span>
              <span>{formatPrice(calculateBundlePrice())}</span>
            </div>
          </div>

          <button 
            className="btn btn-success btn-lg add-bundle-btn"
            onClick={handleAddBundleToCart}
            disabled={!isBundleComplete()}
          >
            <i className="fas fa-shopping-cart me-2"></i>
            Add Family Pack to Cart
          </button>
        </div>

        <div className="product-selection">
          <div className="category-section">
            <h3>Choose Your Fruits (5 lbs)</h3>
            <div className="products-grid">
              {getProductsByCategory('fruits').map(product => (
                <div 
                  key={product.id} 
                  className={`product-card ${selectedItems.fruits?.id === product.id ? 'selected' : ''}`}
                  onClick={() => handleItemSelect('fruits', product)}
                >
                  <img src={`./images/organic-img/${product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="price">{product.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="category-section">
            <h3>Choose Your Vegetables (5 lbs)</h3>
            <div className="products-grid">
              {getProductsByCategory('vegetables').map(product => (
                <div 
                  key={product.id} 
                  className={`product-card ${selectedItems.vegetables?.id === product.id ? 'selected' : ''}`}
                  onClick={() => handleItemSelect('vegetables', product)}
                >
                  <img src={`./images/organic-img/${product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="price">{product.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="category-section">
            <h3>Choose Your Juices (4 bottles)</h3>
            <div className="products-grid">
              {getProductsByCategory('juice').map(product => (
                <div 
                  key={product.id} 
                  className={`product-card ${selectedItems.juices?.id === product.id ? 'selected' : ''}`}
                  onClick={() => handleItemSelect('juices', product)}
                >
                  <img src={`./images/organic-img/${product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="price">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
