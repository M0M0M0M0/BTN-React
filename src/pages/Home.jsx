import { Link } from 'react-router-dom'
import { useEffect } from 'react'
// Attach page-scoped CSS dynamically to avoid cross-page overrides
function usePageStyles(hrefs) {
  useEffect(() => {
    const links = hrefs.map(href => {
      const el = document.createElement('link')
      el.rel = 'stylesheet'
      el.href = href
      document.head.appendChild(el)
      return el
    })
    return () => {
      links.forEach(el => document.head.removeChild(el))
    }
  }, [hrefs.join('|')])
}

export default function Home() {
  usePageStyles([
    '/css/layout.css',
    '/css/content1.css',
    '/css/content2.css',
    '/css/content3.css'
  ])
  return (
    <main className="section main">
      <div className="hero">
        <div className="hero-content">
          <h5>ORGANE FARM</h5>
          <h1>Taste from the farm</h1>
          <p>Organic products grown with love</p>
          <Link to="/product" className="hero-content-button">SHOP NOW</Link>
        </div>
      </div>

      <section className="our-story">
        <div className="story-box">
          <h2>OUR STORY</h2>
          <h4><em>- Discover our beautiful farm -</em></h4>
          <p>
            We are <span className="highlight">Organic Farm</span> which is original and sustainable to our roots.
          </p>
          <p>
            Our vision is practicing healthy crop rotation, encouraging a diverse ecosystem around the fields,
            efficiently using local water sources and carefully selecting produce varieties that grow well and taste great.
          </p>
          <p>Together we are changing our food system!</p>
          <div className="signature">
            <div>
              <strong>Nguyen Minh Hieu</strong><br />
              <em>Director Organic</em>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="transition-section1"></div>
        <div className="product-section-menu">
          <div className="title">
            <h2>NEW PRODUCTS</h2>
            <p><em>- Featured products -</em></p>
          </div>
          <div className="filters">
            <button className="active" data-category="all">ALL</button>
            <button data-category="fruits">FRUITS</button>
            <button data-category="vegetables">VEGETABLES</button>
            <button data-category="juice">JUICE</button>
            <button data-category="dairy">DAIRY</button>
            <button data-category="processed-food">PROCESSED FOOD</button>
            <button data-category="skin-care">SKIN CARE</button>
          </div>
        </div>
        <div className="transition-section2"></div>
        <div className="product-grid container">
          <div className="product-card">
            <div className="heart">♥</div>
            <img src="./images/anhrauma.jpg" alt="Gotu Kola" />
            <h4>Gotu Kola</h4>
            <p>36.000Đ</p>
          </div>
          <div className="product-card">
            <div className="heart">♥</div>
            <img src="./images/anhbapcai.jpg" alt="Cabbage" />
            <h4>Cabbage</h4>
            <p>15.000Đ</p>
          </div>
          <div className="product-card">
            <div className="heart">♥</div>
            <img src="./images/anhkhoailang.jpg" alt="Sweet Potato" />
            <h4>Sweet Potato</h4>
            <p>20.000Đ</p>
          </div>
          <div className="product-card">
            <div className="heart">♥</div>
            <img src="./images/anhcafe.jpg" alt="Coffee" />
            <h4>Coffee</h4>
            <p>15.000Đ</p>
          </div>
          <div className="product-card">
            <div className="heart">♥</div>
            <img src="./images/anhchanleo.jpg" alt="Passion Fruit" />
            <h4>Passion Fruit</h4>
            <p>35.000Đ</p>
          </div>
          <div className="product-card">
            <div className="heart">♥</div>
            <img src="./images/anhduahau.jpg" alt="Watermelon" />
            <h4>Wartermelon</h4>
            <p>45.000Đ</p>
          </div>
        </div>
      </section>

      <div className="transition-section1"></div>
      <div className="content2">
        <div className="farmservices_content2">
          <div className="container">
            <section className="farmservices">
              <h2>FARM SERVICES</h2>
              <h4><i>- The best services for you -</i></h4>
              <div className="farmservices_item">
                <b>Organic Products</b>
                <hr className="hr1" />
                <p>We offer the season's best mix of 100% certified-organic produce and hand-crafted farm products</p>
                <a href="#"><i>Read more</i></a>
              </div>
              <div className="farmservices_item">
                <b>RFS Machines</b>
                <br />
                <hr className="hr1" />
                <p>Tractors, combines, forage harvesters, balers, mower conditioners, sprayers, trailers,… All is for hired</p>
                <a href="#"><i>Read more</i></a>
              </div>
              <div className="farmservices_item">
                <b>Food Strategy</b>
                <br />
                <hr className="hr1" />
                <p>Create a broader network of organizations & businesses contributing to our food system</p>
                <a href="#"><i>Read more</i></a>
              </div>
              <div className="farmservices_item">
                <b>Water Management</b>
                <br />
                <hr className="hr1" />
                <p>Minimize water costs and efficiently distribute water, help farmers see improvements in yields</p>
                <a href="#"><i>Read more</i></a>
              </div>
              <img src="./img/about_v1_9.jpg" alt="" />
            </section>
          </div>
        </div>
        <div className="transition-section2"></div>
        <div className="container">
          <div className="dealoftheday">
            <div className="d-a">
              <img src="./img/object-04.jpg" alt="Vitamin C Face Wash" />
              <div className="price-tag">Only<br />15.00$</div>
            </div>
            <div className="d-b">
              <h2>DEAL OF THE DAY</h2>
              <h4><em>Vitamin C Face Wash</em></h4>
              <p>
                The Vitamin C Face Wash is the initial step in your skincare regimen and is the first step towards perfect skin. Loads of antioxidants, natural citrus oils.
              </p>
              <div className="add-to-cart">
                <a href="#">ADD TO CART</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="transition-section1"></div>
      <section className="testimonial">
        <div className="avatar">
          <img src="./images/lamtruong.jpg" />
        </div>
        <h2>THE BEST ORGANIC STORE!</h2>
        <p className="quote">
          Cảm ơn vì những sản phẩm tuyệt vời bạn giao mỗi tuần… <br />
          Tôi đã giới thiệu cho tất cả mọi người về cửa hàng thực phẩm sạch online tuyệt vời này!
        </p>
        <div className="stars">★ ★ ★ ★ ★</div>
        <p className="author"><strong>CA SỸ LAM TRƯỜNG</strong></p>
      </section>
      <div className="transition-section2"></div>
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-post">
            <img src="./images/a1.jpg" />
            <p className="date">17 Tháng 07, 2025</p>
            <h3>Tại sao bạn nên ăn bơ</h3>
            <p className="desc">Ai cũng biết tôi thích ăn. Món yêu thích nhất của tôi? Bơ. Tôi phát cuồng vì chúng!</p>
            <a href="#">/ XEM THÊM</a>
          </div>
          <div className="blog-post">
            <img src="./images/a2.jpg" />
            <p className="date">17 Tháng 07, 2025</p>
            <h3>5 bước để sống khỏe tim mạch</h3>
            <p className="desc">Chế độ ăn hợp lý giúp giảm nguy cơ bệnh tim bằng cách giảm cholesterol, huyết áp,...</p>
            <a href="#">/ XEM THÊM</a>
          </div>
          <div className="blog-post">
            <img src="./images/a3.jpg" />
            <p className="date">17 Tháng 07, 2025</p>
            <h3>Thức ăn hữu cơ cho trẻ</h3>
            <p className="desc">Chọn thịt và sữa hữu cơ giúp con bạn tránh tiếp xúc hóa chất gây hại.</p>
            <a href="#">/ XEM THÊM</a>
          </div>
        </div>
      </section>
    </main>
  )
}


