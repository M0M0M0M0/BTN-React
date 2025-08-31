import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// Attach page-scoped CSS dynamically
function usePageStyles(hrefs) {
  useEffect(() => {
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
  usePageStyles(['/css/offers.css'])
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const t = useCountdown((3*24*60*60 + 12*60*60) * 1000)

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

  return (
    <main className="offers-main">
      <section className="offers-hero">
        <div className="container">
          <h1>Special Offers</h1>
          <p>Don't miss out on our amazing deals and discounts on fresh organic produce</p>
          <div className="countdown-timer">
            <h4><i className="fas fa-clock"></i> Limited Time Offer Ends In:</h4>
            <div className="timer-display" id="countdownTimer">
              <div className="timer-unit"><span className="number" id="days">{t.d}</span><span className="label">Days</span></div>
              <div className="timer-unit"><span className="number" id="hours">{t.h}</span><span className="label">Hours</span></div>
              <div className="timer-unit"><span className="number" id="minutes">{t.m}</span><span className="label">Minutes</span></div>
              <div className="timer-unit"><span className="number" id="seconds">{t.s}</span><span className="label">Seconds</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="offers-section">
        <div className="container">
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

          <div className="featured-deal">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="featured-deal-content">
                  <h2>🌟 Deal of the Week</h2>
                  <p>Premium Organic Fruit Box - 20 lbs of fresh seasonal fruits delivered to your door!</p>
                  <div className="featured-deal-price">
                    <span className="original">$89.99</span>
                    <span>$59.99</span>
                  </div>
                  <button className="deal-cta"><i className="fas fa-shopping-cart"></i> Claim This Deal</button>
                </div>
              </div>
              <div className="col-md-4 text-end">
                <img src="/images/organic-img/green-grapes.jpg" alt="Fruit Box" style={{ borderRadius: 15, maxWidth: '100%' }} />
              </div>
            </div>
          </div>

          <div className="offers-grid" id="offersGrid">
            {selectedCategory === 'all' || selectedCategory === 'weekly' ? (
            <div className="offer-card" data-category="weekly">
              <div className="offer-badge">-25% OFF</div>
              <div className="offer-image">
                <img src="/images/organic-img/asparagus.jpg" alt="Fresh Vegetables" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Fresh Vegetable Bundle</h3>
                <p className="offer-description">Mixed seasonal vegetables including carrots, broccoli, spinach, and more!</p>
                <div className="offer-price">
                  <span className="current">$18.99</span>
                  <span className="original">$24.99</span>
                  <span className="savings">Save $6</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid until: March 31, 2024</div>
                <button className="claim-offer-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'weekly' ? (
            <div className="offer-card" data-category="weekly">
              <div className="offer-badge">-30% OFF</div>
              <div className="offer-image">
                <img src="/images/organic-img/organic-broccoli.jpg" alt="Organic Broccoli" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Organic Broccoli Pack</h3>
                <p className="offer-description">Fresh organic broccoli heads, perfect for healthy meals and salads!</p>
                <div className="offer-price">
                  <span className="current">$12.99</span>
                  <span className="original">$18.50</span>
                  <span className="savings">Save $5.51</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid until: April 2, 2024</div>
                <button className="claim-offer-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'bogo' ? (
            <div className="offer-card" data-category="bogo">
              <div className="offer-badge new">BOGO</div>
              <div className="offer-image">
                <img src="/images/organic-img/cherries.jpg" alt="Organic Apples" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Organic Apples</h3>
                <p className="offer-description">Buy 1 bag of organic apples, get another bag absolutely free!</p>
                <div className="offer-price">
                  <span className="current">$4.99</span>
                  <span className="original">$9.98</span>
                  <span className="savings">50% Off</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid until: April 5, 2024</div>
                <button className="claim-offer-btn"><i className="fas fa-plus"></i> Claim BOGO</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'bogo' ? (
            <div className="offer-card" data-category="bogo">
              <div className="offer-badge new">BOGO</div>
              <div className="offer-image">
                <img src="/images/organic-img/ripe-strawberries.jpg" alt="Fresh Strawberries" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Fresh Strawberries</h3>
                <p className="offer-description">Buy 1 pack of fresh strawberries, get another pack completely free!</p>
                <div className="offer-price">
                  <span className="current">$6.99</span>
                  <span className="original">$13.98</span>
                  <span className="savings">50% Off</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid until: April 7, 2024</div>
                <button className="claim-offer-btn"><i className="fas fa-plus"></i> Claim BOGO</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'bundles' ? (
            <div className="offer-card" data-category="bundles">
              <div className="offer-badge limited">LIMITED</div>
              <div className="offer-image">
                <img src="/images/organic-img/mixed-berry-juice.jpg" alt="Juice Bundle" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Organic Juice Pack</h3>
                <p className="offer-description">6 bottles of assorted organic juices - orange, apple, carrot, and green juice.</p>
                <div className="offer-price">
                  <span className="current">$29.99</span>
                  <span className="original">$41.94</span>
                  <span className="savings">Save $12</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid until: March 28, 2024</div>
                <button className="claim-offer-btn"><i className="fas fa-box"></i> Get Bundle</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'bundles' ? (
            <div className="offer-card" data-category="bundles">
              <div className="offer-badge limited">LIMITED</div>
              <div className="offer-image">
                <img src="/images/organic-img/greek-yogurt.jpg" alt="Dairy Bundle" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Dairy Essentials Bundle</h3>
                <p className="offer-description">Complete dairy bundle including yogurt, milk, cheese, and butter from organic farms.</p>
                <div className="offer-price">
                  <span className="current">$24.99</span>
                  <span className="original">$35.50</span>
                  <span className="savings">Save $10.51</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid until: March 30, 2024</div>
                <button className="claim-offer-btn"><i className="fas fa-box"></i> Get Bundle</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'clearance' ? (
            <div className="offer-card" data-category="clearance">
              <div className="offer-badge">-40% OFF</div>
              <div className="offer-image">
                <img src="/images/organic-img/dried-mango-slices.jpg" alt="Dried Fruits" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Organic Dried Fruits</h3>
                <p className="offer-description">Mix of organic dried fruits - perfect for snacking or baking!</p>
                <div className="offer-price">
                  <span className="current">$12.99</span>
                  <span className="original">$21.99</span>
                  <span className="savings">Save $9</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid until: March 25, 2024</div>
                <button className="claim-offer-btn"><i className="fas fa-fire"></i> Quick Buy</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'clearance' ? (
            <div className="offer-card" data-category="clearance">
              <div className="offer-badge">-35% OFF</div>
              <div className="offer-image">
                <img src="/images/organic-img/oatmeal-cookies.jpg" alt="Organic Cookies" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Organic Oatmeal Cookies</h3>
                <p className="offer-description">Delicious organic oatmeal cookies with natural sweeteners and whole grains.</p>
                <div className="offer-price">
                  <span className="current">$8.99</span>
                  <span className="original">$13.85</span>
                  <span className="savings">Save $4.86</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid until: March 26, 2024</div>
                <button className="claim-offer-btn"><i className="fas fa-fire"></i> Quick Buy</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'seasonal' ? (
            <div className="offer-card" data-category="seasonal">
              <div className="offer-badge seasonal">SEASONAL</div>
              <div className="offer-image">
                <img src="/images/organic-img/seasonal-fruits.jpg" alt="Seasonal Fruits" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Seasonal Fruit Collection</h3>
                <p className="offer-description">Fresh seasonal fruits handpicked from local farms - strawberries, peaches, and more!</p>
                <div className="offer-price">
                  <span className="current">$34.99</span>
                  <span className="original">$49.99</span>
                  <span className="savings">Save $15</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Limited seasonal availability</div>
                <button className="claim-offer-btn"><i className="fas fa-leaf"></i> Get Seasonal</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'seasonal' ? (
            <div className="offer-card" data-category="seasonal">
              <div className="offer-badge seasonal">SEASONAL</div>
              <div className="offer-image">
                <img src="/images/organic-img/green-kale.jpg" alt="Spring Vegetables" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">Spring Vegetable Mix</h3>
                <p className="offer-description">Fresh spring vegetables including kale, spinach, and early season greens.</p>
                <div className="offer-price">
                  <span className="current">$22.99</span>
                  <span className="original">$32.50</span>
                  <span className="savings">Save $9.51</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Limited spring availability</div>
                <button className="claim-offer-btn"><i className="fas fa-leaf"></i> Get Seasonal</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'gift' ? (
            <div className="offer-card" data-category="gift">
              <div className="offer-badge gift">GIFT</div>
              <div className="offer-image">
                <img src="/images/organic-img/gift-basket.jpg" alt="Gift Voucher" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">$50 Gift Voucher</h3>
                <p className="offer-description">Perfect gift for health-conscious friends and family. Redeemable on all organic products!</p>
                <div className="offer-price">
                  <span className="current">$45.00</span>
                  <span className="original">$50.00</span>
                  <span className="savings">Save $5</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid for 1 year</div>
                <button className="claim-offer-btn"><i className="fas fa-gift"></i> Buy Gift Card</button>
              </div>
            </div>
            ) : null}

            {selectedCategory === 'all' || selectedCategory === 'gift' ? (
            <div className="offer-card" data-category="gift">
              <div className="offer-badge gift">GIFT</div>
              <div className="offer-image">
                <img src="/images/organic-img/coconut-chips.jpg" alt="Gift Basket" />
              </div>
              <div className="offer-content">
                <h3 className="offer-title">$100 Gift Voucher</h3>
                <p className="offer-description">Premium gift voucher for larger orders. Perfect for families and bulk purchases!</p>
                <div className="offer-price">
                  <span className="current">$85.00</span>
                  <span className="original">$100.00</span>
                  <span className="savings">Save $15</span>
                </div>
                <div className="offer-validity"><i className="fas fa-clock"></i> Valid for 1 year</div>
                <button className="claim-offer-btn"><i className="fas fa-gift"></i> Buy Gift Card</button>
              </div>
            </div>
            ) : null}
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
                  <div className="bundle-item"><img src="/images/organic-img/ripe-strawberries.jpg" alt="Fruits" /><div>5 lbs Fruits</div></div>
                  <div className="bundle-item"><img src="/images/organic-img/organic-broccoli.jpg" alt="Vegetables" /><div>5 lbs Vegetables</div></div>
                  <div className="bundle-item"><img src="/images/organic-img/mango-smoothie.jpg" alt="Juice" /><div>4 Juices</div></div>
                </div>
                <div className="bundle-savings">Save $15</div>
                <div className="bundle-price">$45.99</div>
                <button className="claim-offer-btn"><i className="fas fa-users"></i> Get Family Pack</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bundle-card">
                <h3 className="bundle-title">Health Boost</h3>
                <div className="bundle-items">
                  <div className="bundle-item"><img src="/images/organic-img/green-kale.jpg" alt="Superfoods" /><div>Superfoods</div></div>
                  <div className="bundle-item"><img src="/images/organic-img/greek-yogurt.jpg" alt="Supplements" /><div>Supplements</div></div>
                  <div className="bundle-item"><img src="/images/organic-img/green-tea-face-mask.jpg" alt="Tea" /><div>Herbal Teas</div></div>
                </div>
                <div className="bundle-savings">Save $20</div>
                <div className="bundle-price">$39.99</div>
                <button className="claim-offer-btn"><i className="fas fa-heart"></i> Boost Health</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bundle-card">
                <h3 className="bundle-title">Snack Lover</h3>
                <div className="bundle-items">
                  <div className="bundle-item"><img src="/images/organic-img/oatmeal-cookies.jpg" alt="Cookies" /><div>Oatmeal Cookies</div></div>
                  <div className="bundle-item"><img src="/images/organic-img/coconut-chips.jpg" alt="Chips" /><div>Coconut Chips</div></div>
                  <div className="bundle-item"><img src="/images/organic-img/brown-rice-crackers.jpg" alt="Crackers" /><div>Rice Crackers</div></div>
                </div>
                <div className="bundle-savings">Save $10</div>
                <div className="bundle-price">$19.99</div>
                <button className="claim-offer-btn"><i className="fas fa-cookie-bite"></i> Grab Snacks</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


