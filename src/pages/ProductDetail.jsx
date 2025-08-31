import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
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

export default function ProductDetail() {
  usePageStyles(['/css/layout.css', '/css/product-detail.css'])
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    // Fetch product data
    fetch('/json/products.json')
      .then(r => r.json())
      .then(data => {
        const foundProduct = data.products.find(p => p.id === parseInt(id))
        setProduct(foundProduct)
        
        // Get related products (same category, exclude current product)
        const related = data.products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4)
        setRelatedProducts(related)
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



  if (loading) {
    return (
      <main className="section main">
        <div className="container">
          <div className="loading">Loading product details...</div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="section main">
        <div className="container">
          <div className="error">Product not found</div>
        </div>
      </main>
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
                 <p>Grown and harvested at certified organic farms, ensuring quality and food safety. Products are strictly controlled from planting to reaching consumers.</p>
               </div>

               <div className="info-section">
                 <h4>Introduction</h4>
                 <p>{product.description}</p>
               </div>

               <div className="info-section">
                 <h4>Product Description</h4>
                 <p>Products are carefully selected to ensure the highest freshness and quality. The production process complies with international standards for food safety and environmental protection.</p>
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
                {relatedProducts.slice(0, 3).map((relatedProduct, index) => (
                  <div key={relatedProduct.id} className="combo-item">
                    <img 
                      src={`/images/organic-img/${relatedProduct.name.toLowerCase().replace(/\s+/g,'-')}.jpg`}
                      alt={relatedProduct.name}
                      className="combo-image"
                    />
                    <div className="combo-info">
                      <div className="combo-name">{relatedProduct.name}</div>
                      <div className="combo-price">
                        {formatPrice(relatedProduct.price)}/{relatedProduct.quantity}
                      </div>
                                            {relatedProduct.discount > 0 && relatedProduct.originalPrice ? (
                        <div className="combo-discount">
                          {formatPrice(relatedProduct.originalPrice)} -{relatedProduct.discount}%
                        </div>
                      ) : null}
                    </div>
                                         <button className="combo-buy-btn">Buy</button>
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

        {/* Related Products */}
                 <div className="related-products-section">
           <h2>Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="related-product-card">
                <img 
                  src={`/images/organic-img/${relatedProduct.name.toLowerCase().replace(/\s+/g,'-')}.jpg`}
                  alt={relatedProduct.name}
                  className="related-product-image"
                />
                <div className="related-product-info">
                  <h4>{relatedProduct.name}</h4>
                  <div className="related-product-price">
                    {formatPrice(relatedProduct.price)}/{relatedProduct.quantity}
                  </div>
                  {relatedProduct.discount > 0 && relatedProduct.originalPrice ? (
                    <div className="related-product-discount">
                      {formatPrice(relatedProduct.originalPrice)} -{relatedProduct.discount}%
                    </div>
                  ) : null}
                                     <button className="related-buy-btn">BUY</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
