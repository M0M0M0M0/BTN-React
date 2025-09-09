import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../../public/css/aboutus.css'

export default function AboutUs() {
  const location = useLocation()

  // Handle smooth scrolling to sections when hash is present in URL
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }
    }
  }, [location.hash])

  // Handle smooth scrolling for anchor links within the page
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <main className="section main layout-section">
      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="aboutus-hero-content">
          <h1>ABOUT US</h1>
          <p>Discover our journey in organic farming and sustainable agriculture</p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="aboutus-quick-nav">
        <div className="aboutus-container">
          <nav className="aboutus-nav-menu">
            <a href="#our-story" onClick={(e) => handleAnchorClick(e, '#our-story')}>Our Story</a>
            <a href="#farming-practices" onClick={(e) => handleAnchorClick(e, '#farming-practices')}>Farming Practices</a>
            <a href="#meet-farmers" onClick={(e) => handleAnchorClick(e, '#meet-farmers')}>Meet the Farmers</a>
            <a href="#quality-standards" onClick={(e) => handleAnchorClick(e, '#quality-standards')}>Quality Standards</a>
            <a href="#careers" onClick={(e) => handleAnchorClick(e, '#careers')}>Careers</a>
          </nav>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="aboutus-story">
        <div className="aboutus-container">
          <div className="aboutus-story-content">
            <h2>OUR STORY</h2>
            <h4><em>- From farm to your table -</em></h4>
            <p>
              We are <span className="aboutus-highlight">Organic Farm</span> which is original and sustainable to our roots.
              Founded with a vision to provide the freshest, healthiest organic produce to our community.
            </p>
            <p>
              Our journey began when we realized the importance of sustainable farming practices and the need 
              for chemical-free, nutritious food. We started small but with big dreams - to revolutionize 
              how people think about their food.
            </p>
            <p>
              Today, we are proud to be one of the leading organic farms in the region, serving thousands 
              of families with fresh, organic produce grown with love and care.
            </p>
            <div className="aboutus-signature">
              <div>
                <strong>Nguyen Minh Hieu</strong><br />
                <em>Director Organic</em>
              </div>
            </div>
          </div>
          <div className="aboutus-story-image">
            <img src="./img/about_v1_9.jpg" alt="Our Farm Story" />
          </div>
        </div>
      </section>

      {/* Farming Practices Section */}
      <section id="farming-practices" className="aboutus-practices">
        <div className="aboutus-container">
          <div className="aboutus-practices-header">
            <h2>FARMING PRACTICES</h2>
            <h4><em>- Sustainable and organic methods -</em></h4>
          </div>
          <div className="aboutus-practices-grid">
            <div className="aboutus-practice-item">
              <div className="aboutus-practice-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Organic Certification</h3>
              <p>All our products are 100% certified organic, grown without synthetic pesticides, herbicides, or fertilizers.</p>
            </div>
            <div className="aboutus-practice-item">
              <div className="aboutus-practice-icon">
                <i className="fas fa-recycle"></i>
              </div>
              <h3>Sustainable Methods</h3>
              <p>We practice crop rotation, composting, and natural pest control to maintain soil health and biodiversity.</p>
            </div>
            <div className="aboutus-practice-item">
              <div className="aboutus-practice-icon">
                <i className="fas fa-tint"></i>
              </div>
              <h3>Water Conservation</h3>
              <p>Efficient irrigation systems and rainwater harvesting help us minimize water usage while maximizing crop yield.</p>
            </div>
            <div className="aboutus-practice-item">
              <div className="aboutus-practice-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Natural Growth</h3>
              <p>We let nature take its course, allowing crops to grow at their natural pace for maximum nutrition and flavor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Farmers Section */}
      <section id="meet-farmers" className="aboutus-farmers">
        <div className="aboutus-container">
          <div className="aboutus-farmers-header">
            <h2>MEET THE FARMERS</h2>
            <h4><em>- The people behind your food -</em></h4>
          </div>
          <div className="aboutus-farmers-grid">
            <div className="aboutus-farmer-card">
              <div className="aboutus-farmer-image">
                <img src="./images/lamtruong.jpg" alt="Nguyen Minh Hieu" />
              </div>
              <div className="aboutus-farmer-info">
                <h3>Nguyen Minh Hieu</h3>
                <p className="aboutus-farmer-role">Director & Lead Farmer</p>
                <p>With over 15 years of experience in organic farming, Hieu leads our team with passion and expertise.</p>
              </div>
            </div>
            <div className="aboutus-farmer-card">
              <div className="aboutus-farmer-image">
                <img src="./images/field.jpg" alt="Farm Team" />
              </div>
              <div className="aboutus-farmer-info">
                <h3>Our Farm Team</h3>
                <p className="aboutus-farmer-role">Dedicated Workers</p>
                <p>A team of passionate individuals who work tirelessly to bring you the freshest organic produce.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Safety Standards Section */}
      <section id="quality-standards" className="aboutus-standards">
        <div className="aboutus-container">
          <div className="aboutus-standards-content">
            <div className="aboutus-standards-text">
              <h2>QUALITY & SAFETY STANDARDS</h2>
              <h4><em>- Your health is our priority -</em></h4>
              <div className="aboutus-standards-list">
                <div className="aboutus-standard-item">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Regular Testing</h4>
                    <p>All our produce undergoes rigorous testing for pesticides, heavy metals, and contaminants.</p>
                  </div>
                </div>
                <div className="aboutus-standard-item">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Cold Chain Management</h4>
                    <p>From harvest to delivery, we maintain optimal temperature to preserve freshness and nutrition.</p>
                  </div>
                </div>
                <div className="aboutus-standard-item">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Certified Facilities</h4>
                    <p>Our processing and packaging facilities meet the highest international food safety standards.</p>
                  </div>
                </div>
                <div className="aboutus-standard-item">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <h4>Traceability</h4>
                    <p>Every product can be traced back to its source, ensuring complete transparency in our supply chain.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aboutus-standards-image">
              <img src="./images/anhtrangtrai.jpg" alt="Quality Standards" />
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="aboutus-careers">
        <div className="aboutus-container">
          <div className="aboutus-careers-content">
            <h2>CAREERS</h2>
            <h4><em>- Join our growing team -</em></h4>
            <p>
              We're always looking for passionate individuals who share our vision of sustainable agriculture 
              and healthy living. Join us in making a difference in the food industry.
            </p>
            <div className="aboutus-careers-benefits">
              <div className="aboutus-benefit-item">
                <i className="fas fa-heart"></i>
                <h4>Meaningful Work</h4>
                <p>Contribute to a healthier world through sustainable farming</p>
              </div>
              <div className="aboutus-benefit-item">
                <i className="fas fa-users"></i>
                <h4>Great Team</h4>
                <p>Work with passionate, like-minded individuals</p>
              </div>
              <div className="aboutus-benefit-item">
                <i className="fas fa-graduation-cap"></i>
                <h4>Learning Opportunities</h4>
                <p>Continuous learning and skill development programs</p>
              </div>
            </div>
            <div className="aboutus-careers-cta">
              <a href="#" className="aboutus-cta-button">VIEW OPEN POSITIONS</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="aboutus-testimonial">
        <div className="aboutus-testimonial-content">
          <div className="aboutus-avatar">
            <img src="./images/lamtruong.jpg" alt="Customer Testimonial" />
          </div>
          <h2>THE BEST ORGANIC STORE!</h2>
          <p className="aboutus-quote">
            Cảm ơn vì những sản phẩm tuyệt vời bạn giao mỗi tuần… <br />
            Tôi đã giới thiệu cho tất cả mọi người về cửa hàng thực phẩm sạch online tuyệt vời này!
          </p>
          <div className="aboutus-stars">★ ★ ★ ★ ★</div>
          <p className="aboutus-author"><strong>CA SỸ LAM TRƯỜNG</strong></p>
        </div>
      </section>
    </main>
  )
}