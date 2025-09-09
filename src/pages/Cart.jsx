import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import '../../public/css/cart.css'

// Component for handling product images
function ProductImage({ item }) {
  const getImageSrc = () => {
    // If item has image property (from Offers), use it directly
    if (item.image && (item.image.startsWith('./images/') || item.image.startsWith('/images/'))) {
      console.log('Using offer image:', item.image, 'for item:', item.name)
      return item.image
    }
    
    // Generate path from product name for Products page items
    const imageName = item.name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
    const generatedPath = `./images/organic-img/${imageName}.jpg`
    console.log('Generated image path:', generatedPath, 'for item:', item.name)
    return generatedPath
  }
  
  const handleError = (e) => {
    console.error('Image failed to load:', e.target.src, 'for item:', item.name)
  }
  
  const imageSrc = getImageSrc()
  
  return (
    <img 
      src={imageSrc} 
      alt={item.name}
      onError={handleError}
      data-src={imageSrc}
      title={`Image source: ${imageSrc}`}
    />
  )
}

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Parse USD price (remove $ and convert to number)
      const priceInUSD = parseFloat(item.price.replace(/[^\d.]/g, ''))
      return total + (priceInUSD * item.quantity)
    }, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.1 // 10% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  // Remove item from cart
  const removeItem = (id) => {
    removeFromCart(id)
  }

  // Handle checkout
  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm!')
      clearCart()
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="section main layout-section">
      {/* Hero Section */}
      <section className="cart-hero">
        <div className="cart-hero-content">
          <h1>YOUR SHOPPING CART</h1>
          <p>Review and checkout your selected items</p>
        </div>
      </section>

      <div className="cart-container">
        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Your Cart is Empty</h2>
            <p>You don't have any items in your cart yet</p>
            <Link to="/product" className="btn btn-success btn-lg">
              <i className="fas fa-shopping-bag me-2"></i>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              <div className="cart-header">
                <h2>Items in Cart ({cartItems.length} items)</h2>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={clearCart}
                >
                  <i className="fas fa-trash me-1"></i>
                  Clear All
                </button>
              </div>

              <div className="cart-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <ProductImage item={item} />
                    </div>
                    
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      
                    </div>

                    <div className="cart-item-price">
                      <span className="price">{formatPrice(parseFloat(item.price.replace(/[^\d.]/g, '')))}</span>
                      {item.originalPrice && (
                        <span className="original-price">{formatPrice(parseFloat(item.originalPrice.replace(/[^\d.]/g, '')))}</span>
                      )}
                    </div>

                    <div className="cart-item-quantity">
                      <div className="quantity-controls">
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      <span className="item-total">
                        {formatPrice(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity)}
                      </span>
                    </div>

                    <div className="cart-item-actions">
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeItem(item.id)}
                        title="Remove item"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax (10%):</span>
                  <span>{formatPrice(calculateTax())}</span>
                </div>
                
                <hr />
                
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>

                <div className="summary-actions">
                  <Link to="/product" className="btn btn-outline-success">
                    <i className="fas fa-arrow-left me-2"></i>
                    Continue Shopping
                  </Link>
                  
                  <button 
                    className="btn btn-success btn-lg"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-credit-card me-2"></i>
                        Checkout
                      </>
                    )}
                  </button>
                </div>

                <div className="payment-methods">
                  <h5>Payment Methods</h5>
                  <div className="payment-icons">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fas fa-mobile-alt"></i>
                    <i className="fas fa-university"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
