import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// CSS files are now imported globally in App.jsx

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [otherProducts, setOtherProducts] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)


  useEffect(() => {
    // Fetch product data
    fetch('./json/products.json')
      .then(r => r.json())
      .then(data => {
        const foundProduct = data.products.find(p => p.id === parseInt(id))
        setProduct(foundProduct)
        
        // Get random other products (exclude current product)
        const otherProductsList = data.products
          .filter(p => p.id !== foundProduct.id)
          .sort(() => Math.random() - 0.5) // Shuffle array
          .slice(0, 4) // Get 4 random products
        setOtherProducts(otherProductsList)

      })
      .finally(() => setLoading(false))
  }, [id])

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    if (!product) return 0
    const price = parseFloat(product.price.replace('$', ''))
    return price * quantity
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Adding to cart:', { product, quantity })
    alert(`Added ${quantity} ${product.name} to cart!`)
  }

  const handleBuyNow = () => {
    // Check if quantity is large and show confirmation
    if (quantity > 10) {
      const confirmed = window.confirm(
        `Are you sure you want to buy ${quantity} ${product.name} for a total of ${formatPrice(`$${calculateTotalPrice()}`)}?`
      )
      if (!confirmed) return
    }
    
    // Buy now logic here
    console.log('Buying now:', { product, quantity })
    alert(`Proceeding to checkout with ${quantity} ${product.name} - Total: ${formatPrice(`$${calculateTotalPrice()}`)}!`)
  }

  // Format price to remove trailing zeros
  const formatPrice = (priceString) => {
    if (!priceString) return ''
    // Remove $ and parse as number
    const price = parseFloat(priceString.replace('$', ''))
    // Format to remove trailing zeros
    const formatted = price.toFixed(2).replace(/\.?0+$/, '')
    return `$${formatted}`
  }



  if (!product) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #2d5016 0%, #7fb069 100%)',
        color: 'white',
        fontFamily: 'Playfair Display, serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Product not found</h2>
          <Link to="/products" style={{ color: 'white', textDecoration: 'underline' }}>
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  // Generate multiple images for the product (simulating image gallery)
  const productImages = [
    `/images/organic-img/${product.name.toLowerCase().replace(/\s+/g,'-')}.jpg`,
    `/images/organic-img/${product.name.toLowerCase().replace(/\s+/g,'-')}-2.jpg`,
    `/images/organic-img/${product.name.toLowerCase().replace(/\s+/g,'-')}-3.jpg`,
    `/images/organic-img/${product.name.toLowerCase().replace(/\s+/g,'-')}-4.jpg`
  ]

  return (
    <main className="section main">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb-section">
          <Link to="/product" className="back-link">
            <i className="fas fa-arrow-left"></i> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
        </div>

        {/* Product Detail Section */}
        <div className="product-detail-container">
          {/* Left Column - Product Images & Info */}
          <div className="product-images-section">
            {/* Main Product Image */}
            <div className="main-image-container">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="main-product-image"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div 
                className="image-placeholder"
                style={{
                  display: 'none',
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: '#6c757d'
                }}
              >
                {product.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail-item ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  title={`${product.name} - Ảnh ${index + 1}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="thumbnail-image"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div 
                    className="thumbnail-placeholder"
                    style={{
                      display: 'none',
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '6px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#6c757d',
                      fontWeight: 'bold'
                    }}
                  >
                    {product.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Image number indicator */}
                  <div className="thumbnail-number">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>

                         {/* Product Information */}
             <div className="product-information">
               <h3>Product Information</h3>
               
                               <div className="info-section">
                  <h4>Origin</h4>
                  <p>{product.origin}</p>
                </div>

               <div className="info-section">
                 <h4>Description</h4>
                 <p>{product.descriptionDetail}</p>
               </div>

               <div className="info-section">
                 <h4>Product Benefits</h4>
                 <div className="benefits-list">
                   <div className="benefit-item">
                     <i className="fas fa-heart"></i>
                     <span>Strengthens cardiovascular health</span>
                   </div>
                   <div className="benefit-item">
                     <i className="fas fa-shield-alt"></i>
                     <span>Boosts immune system</span>
                   </div>
                   <div className="benefit-item">
                     <i className="fas fa-eye"></i>
                     <span>Good for vision</span>
                   </div>
                   <div className="benefit-item">
                     <i className="fas fa-brain"></i>
                     <span>Improves memory and brain function</span>
                   </div>
                 </div>
               </div>

               <div className="info-section">
                 <h4>Main Nutrients</h4>
                 <div className="nutrients-grid">
                   <div className="nutrient-item">
                     <span className="nutrient-name">Vitamin C</span>
                     <span className="nutrient-value">45mg</span>
                   </div>
                   <div className="nutrient-item">
                     <span className="nutrient-name">Fiber</span>
                     <span className="nutrient-value">3.2g</span>
                   </div>
                   <div className="nutrient-item">
                     <span className="nutrient-name">Potassium</span>
                     <span className="nutrient-value">358mg</span>
                   </div>
                   <div className="nutrient-item">
                     <span className="nutrient-name">Antioxidants</span>
                     <span className="nutrient-value">High</span>
                   </div>
                 </div>
               </div>

               <div className="info-section">
                 <h4>Usage Instructions</h4>
                 <ul className="usage-list">
                   <li>Wash thoroughly before use</li>
                   <li>Can be eaten directly or processed</li>
                   <li>Store in refrigerator to maintain freshness</li>
                   <li>Use within 7 days after opening</li>
                 </ul>
               </div>
             </div>
          </div>

          {/* Right Column - Product Info & Purchase */}
          <div className="product-info-section">
            {/* Product Name & Share */}
            <div className="product-header">
              <h1 className="product-title">
                {product.name} {product.quantity}
              </h1>
                             <button className="share-btn">
                 <i className="fas fa-share-alt"></i> Share Link
               </button>
            </div>

                         {/* Price Section */}
             <div className="price-section">
                                <div className="price-info">
                   <div className="unit-price">
                     <span className="price-label">Unit Price:</span>
                     <span className="current-price">{formatPrice(product.price)}</span>
                   </div>
                                       <div className="total-price">
                      <span className="price-label">Total Price ({quantity} {quantity === 1 ? 'item' : 'items'}):</span>
                      <span className="total-price-amount">{formatPrice(`$${calculateTotalPrice()}`)}</span>
                    </div>
                 </div>
               {product.discount > 0 && product.originalPrice ? (
                 <>
                   <div className="original-price">{formatPrice(product.originalPrice)}</div>
                   <div className="discount-badge">-{product.discount}%</div>
                 </>
               ) : null}
             </div>

            {/* Flash Sale Section */}
            {product.discount > 0 ? (
              <div className="flash-sale-section">
                <div className="flash-sale-banner">
                  <i className="fas fa-bolt"></i> Flash sale
                </div>
                                 <div className="flash-sale-info">
                   <div className="slots-left">249 slots remaining</div>
                   <div className="time-left">Ends in 1 hour 56 minutes</div>
                   <div className="orders-count">1 customer ordered</div>
                 </div>
              </div>
            ) : null}

            {/* Quantity & Purchase Buttons */}
            <div className="purchase-section">
                             <div className="quantity-selector">
                 <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <div className="quantity-display">
                    {quantity}
                  </div>
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="buy-now-btn" onClick={handleBuyNow}>
                  MUA
                </button>
                                 <button className="add-to-cart-btn" onClick={handleAddToCart}>
                   <i className="fas fa-shopping-cart"></i> Add to Cart
                 </button>
              </div>
            </div>

            {/* Buy with More Savings */}
                         <div className="buy-more-section">
               <h3>Other Products</h3>
              <div className="combo-products">
                {otherProducts.map((otherProduct, index) => (
                  <div key={otherProduct.id} className="combo-item">
                    <Link to={`/product/${otherProduct.id}`} className="combo-image-link">
                      <img 
                        src={`/images/organic-img/${otherProduct.name.toLowerCase().replace(/\s+/g,'-')}.jpg`}
                        alt={otherProduct.name}
                        className="combo-image"
                      />
                    </Link>
                    <div className="combo-info">
                      <Link to={`/product/${otherProduct.id}`} className="combo-name-link">
                        <div className="combo-name">{otherProduct.name}</div>
                      </Link>
                      <div className="combo-price">
                        {formatPrice(otherProduct.price)}/{otherProduct.quantity}
                      </div>
                                            {otherProduct.discount > 0 && otherProduct.originalPrice ? (
                        <div className="combo-discount">
                          {formatPrice(otherProduct.originalPrice)} -{otherProduct.discount}%
                        </div>
                      ) : null}
                    </div>
                                         <Link to={`/product/${otherProduct.id}`}>
                      <button className="combo-buy-btn">Buy</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Quality Info */}
            <div className="info-boxes">
                             <div className="delivery-info">
                 <i className="fas fa-truck"></i>
                 If inventory changes, we will contact you before delivery
               </div>
               <div className="quality-guarantee">
                 <i className="fas fa-question-circle"></i>
                 NOT SATISFIED? 1 FOR 1 EXCHANGE
               </div>
            </div>
          </div>
        </div>

                
      </div>
    </main>
  )
}
