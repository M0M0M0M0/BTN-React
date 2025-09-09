import { useEffect, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import '../../public/css/offers.css'

function useCountdown(msFromNow) {
  const [t, setT] = useState({ d: '00', h: '00', m: '00', s: '00' })
  useEffect(() => {
    const end = Date.now() + msFromNow
    const pad = n => String(n).padStart(2, '0')
    function tick() {
      let diff = end - Date.now()
      if (diff <= 0) return setT({ d: '00', h: '00', m: '00', s: '00' })
      const day = 86400000, hour = 3600000, min = 60000
      const d = Math.floor(diff / day); diff %= day
      const h = Math.floor(diff / hour); diff %= hour
      const m = Math.floor(diff / min); diff %= min
      const s = Math.floor(diff / 1000)
      setT({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [msFromNow])
  return t
}

export default function Offers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const t = useCountdown((3*24*60*60 + 12*60*60) * 1000)

  // Load offers data
  useEffect(() => {
    // Static offers data as fallback
    const staticOffers = [
      {
        id: "offer-1",
        name: "Fresh Vegetable Bundle",
        description: "Mixed seasonal vegetables including carrots, broccoli, spinach, and more!",
        image: "./images/organic-img/asparagus.jpg",
        category: "weekly",
        badge: "-25% OFF",
        badgeType: "discount",
        currentPrice: 18.99,
        originalPrice: 24.99,
        savings: 6.00,
        validUntil: "March 31, 2024",
        inStock: true,
        quantity: "1 bundle",
        featured: false
      },
      {
        id: "offer-2", 
        name: "Organic Broccoli Pack",
        description: "Fresh organic broccoli heads, perfect for healthy meals and salads!",
        image: "./images/organic-img/organic-broccoli.jpg",
        category: "weekly",
        badge: "-30% OFF",
        badgeType: "discount",
        currentPrice: 12.99,
        originalPrice: 18.50,
        savings: 5.51,
        validUntil: "April 2, 2024",
        inStock: true,
        quantity: "2 lbs",
        featured: false
      },
      {
        id: "offer-3",
        name: "Organic Apples",
        description: "Buy 1 bag of organic apples, get another bag absolutely free!",
        image: "./images/organic-img/cherries.jpg",
        category: "bogo",
        badge: "BOGO",
        badgeType: "bogo",
        currentPrice: 4.99,
        originalPrice: 9.98,
        savings: 4.99,
        validUntil: "April 5, 2024",
        inStock: true,
        quantity: "2 bags",
        featured: false
      },
      {
        id: "offer-4",
        name: "Fresh Strawberries",
        description: "Buy 1 pack of fresh strawberries, get another pack completely free!",
        image: "./images/organic-img/ripe-strawberries.jpg",
        category: "bogo",
        badge: "BOGO",
        badgeType: "bogo",
        currentPrice: 6.99,
        originalPrice: 13.98,
        savings: 6.99,
        validUntil: "April 7, 2024",
        inStock: true,
        quantity: "2 packs",
        featured: false
      },
      {
        id: "offer-5",
        name: "Organic Juice Pack",
        description: "6 bottles of assorted organic juices - orange, apple, carrot, and green juice.",
        image: "./images/organic-img/mixed-berry-juice.jpg",
        category: "bundles",
        badge: "LIMITED",
        badgeType: "limited",
        currentPrice: 29.99,
        originalPrice: 41.94,
        savings: 11.95,
        validUntil: "March 28, 2024",
        inStock: true,
        quantity: "6 bottles",
        featured: false
      },
      {
        id: "offer-6",
        name: "Dairy Essentials Bundle",
        description: "Complete dairy bundle including yogurt, milk, cheese, and butter from organic farms.",
        image: "./images/organic-img/greek-yogurt.jpg",
        category: "bundles",
        badge: "LIMITED",
        badgeType: "limited",
        currentPrice: 24.99,
        originalPrice: 35.50,
        savings: 10.51,
        validUntil: "March 30, 2024",
        inStock: true,
        quantity: "1 bundle",
        featured: false
      }
    ]
    
    setOffers(staticOffers)
    setLoading(false)
  }, [])

  // Read category from URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  // Update URL when category changes
  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory)
    setSearchParams({ category: newCategory })
  }

  // Handle add to cart
  const handleAddToCart = (offer) => {
    const product = {
      id: offer.id,
      name: offer.name,
      price: `$${offer.currentPrice.toFixed(2)}`,
      originalPrice: `$${offer.originalPrice.toFixed(2)}`,
      image: offer.image,
      category: offer.category,
      description: offer.description,
      quantity: offer.quantity
    }
    addToCart(product)
  }

  // Filter offers based on selected category
  const filteredOffers = offers.filter(offer => {
    if (selectedCategory === 'all') return true
    return offer.category === selectedCategory
  })

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <main className="offers-main">
      <section className="offers-hero">
        <div className="container">
          <h1>Special Offers</h1>
          <p>Don't miss out on our amazing deals and discounts on fresh organic produce</p>
          <div className="hero-actions mt-4">
            <Link to="/cart" className="btn btn-success btn-lg">
              <i className="fas fa-shopping-cart me-2"></i>
              View Cart
            </Link>
          </div>
        </div>
      </section>
              <section className="offers-section">
          <div className="container">
            <div className="featured-deal">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="featured-deal-content">
                    <div className="countdown-timer deal-countdown">
                      <h4><i className="fas fa-clock"></i> Limited Time Offer Ends In:</h4>
                      <div className="timer-display" id="countdownTimer">
                        <div className="timer-unit"><span className="number" id="days">{t.d}</span><span className="label">Days</span></div>
                        <div className="timer-unit"><span className="number" id="hours">{t.h}</span><span className="label">Hours</span></div>
                        <div className="timer-unit"><span className="number" id="minutes">{t.m}</span><span className="label">Minutes</span></div>
                        <div className="timer-unit"><span className="number" id="seconds">{t.s}</span><span className="label">Seconds</span></div>
                      </div>
                    </div>
                    <h2>🌟 Deal of the Week</h2>
                    <p>Premium Organic Fruit Box - 20 lbs of fresh seasonal fruits delivered to your door!</p>
                    <div className="featured-deal-price">
                      <span className="original">$89.99</span>
                      <span>$59.99</span>
                    </div>
                    <button 
                      className="deal-cta"
                      onClick={() => {
                        const featuredOffer = offers.find(offer => offer.featured)
                        if (featuredOffer) handleAddToCart(featuredOffer)
                      }}
                    >
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <img src="./images/organic-img/green-grapes.jpg" alt="Fruit Box" style={{ borderRadius: 15, maxWidth: '100%' }} />
                </div>
              </div>
            </div>

            <div className="offer-categories">
              <button 
                className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`} 
                onClick={() => handleCategoryChange('all')}
              >
                <i className="fas fa-star"></i> All Offers
              </button>
              <button 
                className={`category-btn ${selectedCategory === 'weekly' ? 'active' : ''}`} 
                onClick={() => handleCategoryChange('weekly')}
              >
                <i className="fas fa-calendar-week"></i> Weekly Discounts
              </button>
              <button 
                className={`category-btn ${selectedCategory === 'bogo' ? 'active' : ''}`} 
                onClick={() => handleCategoryChange('bogo')}
              >
                <i className="fas fa-plus"></i> Buy 1 Get 1
              </button>
              <button 
                className={`category-btn ${selectedCategory === 'bundles' ? 'active' : ''}`} 
                onClick={() => handleCategoryChange('bundles')}
              >
                <i className="fas fa-box"></i> Bundles
              </button>
              <button 
                className={`category-btn ${selectedCategory === 'clearance' ? 'active' : ''}`} 
                onClick={() => handleCategoryChange('clearance')}
              >
                <i className="fas fa-fire"></i> Clearance
              </button>
              <button 
                className={`category-btn ${selectedCategory === 'seasonal' ? 'active' : ''}`} 
                onClick={() => handleCategoryChange('seasonal')}
              >
                <i className="fas fa-leaf"></i> Seasonal Bundles
              </button>
              <button 
                className={`category-btn ${selectedCategory === 'gift' ? 'active' : ''}`} 
                onClick={() => handleCategoryChange('gift')}
              >
                <i className="fas fa-gift"></i> Gift Vouchers
              </button>
            </div>

          <div className="offers-grid" id="offersGrid">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading amazing offers...</p>
              </div>
            ) : filteredOffers.length === 0 ? (
              <div className="text-center py-5">
                <h4>No offers found in this category</h4>
                <p>Try selecting a different category or check back later for new offers!</p>
              </div>
            ) : (
              filteredOffers.map(offer => (
                <div key={offer.id} className="offer-card" data-category={offer.category}>
                  <div className={`offer-badge ${offer.badgeType}`}>{offer.badge}</div>
                  <div className="offer-image">
                    <img src={offer.image} alt={offer.name} />
                  </div>
                  <div className="offer-content">
                    <h3 className="offer-title">{offer.name}</h3>
                    <p className="offer-description">{offer.description}</p>
                    <div className="offer-price">
                      <span className="current">{formatPrice(offer.currentPrice)}</span>
                      <span className="original">{formatPrice(offer.originalPrice)}</span>
                      <span className="savings">Save {formatPrice(offer.savings)}</span>
                    </div>
                    <div className="offer-validity">
                      <i className="fas fa-clock"></i> {offer.validUntil}
                    </div>
                    <button 
                      className="claim-offer-btn"
                      onClick={() => handleAddToCart(offer)}
                      disabled={!offer.inStock}
                    >
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bundle-deals">
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--primary-green)', fontSize: '2.5rem' }}>Exclusive Bundle Deals</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Mix and match your favorites for maximum savings</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="bundle-card">
                <h3 className="bundle-title">Family Pack</h3>
                <div className="bundle-items">
                  <div className="bundle-item"><img src="./images/organic-img/ripe-strawberries.jpg" alt="Fruits" /><div>5 lbs Fruits</div></div>
                  <div className="bundle-item"><img src="./images/organic-img/organic-broccoli.jpg" alt="Vegetables" /><div>5 lbs Vegetables</div></div>
                  <div className="bundle-item"><img src="./images/organic-img/mango-smoothie.jpg" alt="Juice" /><div>4 Juices</div></div>
                </div>
                <div className="bundle-savings">Save $15</div>
                <div className="bundle-price">$45.99</div>
                <button 
                  className="claim-offer-btn"
                  onClick={() => {
                    const familyPack = offers.find(offer => offer.name === "Family Pack")
                    if (familyPack) handleAddToCart(familyPack)
                  }}
                >
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bundle-card">
                <h3 className="bundle-title">Health Boost</h3>
                <div className="bundle-items">
                  <div className="bundle-item"><img src="./images/organic-img/green-kale.jpg" alt="Superfoods" /><div>Superfoods</div></div>
                  <div className="bundle-item"><img src="./images/organic-img/greek-yogurt.jpg" alt="Supplements" /><div>Supplements</div></div>
                  <div className="bundle-item"><img src="./images/organic-img/green-tea-face-mask.jpg" alt="Tea" /><div>Herbal Teas</div></div>
                </div>
                <div className="bundle-savings">Save $20</div>
                <div className="bundle-price">$39.99</div>
                <button 
                  className="claim-offer-btn"
                  onClick={() => {
                    const healthBoost = offers.find(offer => offer.name === "Health Boost Bundle")
                    if (healthBoost) handleAddToCart(healthBoost)
                  }}
                >
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bundle-card">
                <h3 className="bundle-title">Snack Lover</h3>
                <div className="bundle-items">
                  <div className="bundle-item"><img src="./images/organic-img/oatmeal-cookies.jpg" alt="Cookies" /><div>Oatmeal Cookies</div></div>
                  <div className="bundle-item"><img src="./images/organic-img/coconut-chips.jpg" alt="Chips" /><div>Coconut Chips</div></div>
                  <div className="bundle-item"><img src="./images/organic-img/brown-rice-crackers.jpg" alt="Crackers" /><div>Rice Crackers</div></div>
                </div>
                <div className="bundle-savings">Save $10</div>
                <div className="bundle-price">$19.99</div>
                <button 
                  className="claim-offer-btn"
                  onClick={() => {
                    const snackLover = offers.find(offer => offer.name === "Snack Lover Bundle")
                    if (snackLover) handleAddToCart(snackLover)
                  }}
                >
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


