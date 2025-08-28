import { useEffect } from 'react'
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

export default function Blog() {
  usePageStyles(['/css/blog.css'])
  return (
    <main className="blog-main">
      <section className="blog-hero">
        <div className="container">
          <h1>Our Blog</h1>
          <p>Discover healthy recipes, farming tips, and organic living insights from our experts</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="blog-filters">
            <button className="filter-btn active" data-category="all">All Posts</button>
            <button className="filter-btn" data-category="recipes">Easy Recipes</button>
            <button className="filter-btn" data-category="tips">Healthy Tips</button>
            <button className="filter-btn" data-category="guides">Seasonal Guides</button>
            <button className="filter-btn" data-category="stories">Customer Stories</button>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div id="loading" className="loading" style={{ display: 'none' }}>
                <div className="spinner"></div>
                <p>Loading blog posts...</p>
              </div>

              <div id="blogGrid" className="blog-grid">
                <article className="blog-card" data-category="recipes">
                  <div className="blog-card-image">
                    <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop" alt="" />
                    <div className="blog-category">Easy Recipes</div>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span><i className="fas fa-calendar"></i> March 15, 2024</span>
                      <span><i className="fas fa-user"></i> By Admin</span>
                      <span><i className="fas fa-comments"></i> 12 Comments</span>
                    </div>
                    <h3 className="blog-title"><a href="#">5 Quick Organic Salad Recipes for Busy Weekdays</a></h3>
                    <p className="blog-excerpt">Discover delicious and nutritious salad recipes that you can prepare in under 15 minutes using fresh organic ingredients from your local market.</p>
                    <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </article>
                <article className="blog-card" data-category="tips">
                  <div className="blog-card-image">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop" alt="" />
                    <div className="blog-category">Healthy Tips</div>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span><i className="fas fa-calendar"></i> March 12, 2024</span>
                      <span><i className="fas fa-user"></i> By Admin</span>
                      <span><i className="fas fa-comments"></i> 8 Comments</span>
                    </div>
                    <h3 className="blog-title"><a href="#">How to Store Organic Vegetables to Keep Them Fresh</a></h3>
                    <p className="blog-excerpt">Learn the best storage methods to extend the life of your organic vegetables and reduce waste while maintaining their nutritional value.</p>
                    <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </article>
              </div>

              <div className="blog-pagination">
                <a href="#" className="page-btn"><i className="fas fa-chevron-left"></i></a>
                <a href="#" className="page-btn active">1</a>
                <a href="#" className="page-btn">2</a>
                <a href="#" className="page-btn">3</a>
                <a href="#" className="page-btn"><i className="fas fa-chevron-right"></i></a>
              </div>
            </div>

            <div className="col-lg-4">
              <aside className="blog-sidebar">
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Search</h3>
                  <div className="search-box">
                    <input type="text" placeholder="Search blog posts..." id="blogSearch" />
                    <button type="submit"><i className="fas fa-search"></i></button>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">Categories</h3>
                  <ul className="category-list">
                    <li className="active" data-category="all">All Posts <span className="category-count">24</span></li>
                    <li data-category="recipes">Easy Recipes <span className="category-count">8</span></li>
                    <li data-category="tips">Healthy Tips <span className="category-count">6</span></li>
                    <li data-category="guides">Seasonal Guides <span className="category-count">5</span></li>
                    <li data-category="stories">Customer Stories <span className="category-count">5</span></li>
                  </ul>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">Recent Posts</h3>
                  <div className="recent-post">
                    <div className="recent-post-image">
                      <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=70&h=70&fit=crop" alt="" />
                    </div>
                    <div className="recent-post-content">
                      <h6>10 Benefits of Eating Organic Food</h6>
                      <div className="recent-post-date">March 18, 2024</div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">Popular Tags</h3>
                  <div className="tag-cloud">
                    <a href="#" className="tag">Organic</a>
                    <a href="#" className="tag">Healthy</a>
                    <a href="#" className="tag">Recipes</a>
                    <a href="#" className="tag">Fresh</a>
                    <a href="#" className="tag">Natural</a>
                    <a href="#" className="tag">Nutrition</a>
                    <a href="#" className="tag">Seasonal</a>
                    <a href="#" className="tag">Farm</a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


