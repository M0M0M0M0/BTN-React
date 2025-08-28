import { useEffect, useMemo, useState } from 'react'
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
  const [activeCategory, setActiveCategory] = useState('all')

  const posts = useMemo(() => ([
    {
      id: 1,
      category: 'recipes',
      title: '5 Quick Organic Salad Recipes for Busy Weekdays',
      img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop',
      excerpt: 'Discover delicious and nutritious salad recipes you can prepare in under 15 minutes.'
    },
    {
      id: 2,
      category: 'tips',
      title: 'How to Store Organic Vegetables to Keep Them Fresh',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop',
      excerpt: 'Best storage methods to extend the life of your organic vegetables.'
    },
    {
      id: 3,
      category: 'guides',
      title: "Spring Produce Guide: What's in Season Now",
      img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      excerpt: 'Explore the best spring vegetables and fruits currently in season.'
    },
    {
      id: 4,
      category: 'stories',
      title: "My Journey to Organic Living: A Customer's Story",
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
      excerpt: 'Sarah’s transformation to organic living and how it changed her family’s health.'
    },
  ]), [])

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return posts
    return posts.filter(p => p.category === activeCategory)
  }, [posts, activeCategory])
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
            {[
              {key: 'all', label: 'All Posts'},
              {key: 'recipes', label: 'Easy Recipes'},
              {key: 'tips', label: 'Healthy Tips'},
              {key: 'guides', label: 'Seasonal Guides'},
              {key: 'stories', label: 'Customer Stories'}
            ].map(c => (
              <button
                key={c.key}
                className={`filter-btn ${activeCategory === c.key ? 'active' : ''}`}
                data-category={c.key}
                onClick={() => setActiveCategory(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div id="loading" className="loading" style={{ display: 'none' }}>
                <div className="spinner"></div>
                <p>Loading blog posts...</p>
              </div>

              <div id="blogGrid" className="blog-grid">
                {filteredPosts.map(post => (
                  <article key={post.id} className="blog-card" data-category={post.category}>
                    <div className="blog-card-image">
                      <img src={post.img} alt="" />
                      <div className="blog-category">{post.category === 'recipes' ? 'Easy Recipes' : post.category === 'tips' ? 'Healthy Tips' : post.category === 'guides' ? 'Seasonal Guides' : 'Customer Stories'}</div>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span><i className="fas fa-calendar"></i> March 2024</span>
                        <span><i className="fas fa-user"></i> By Admin</span>
                        <span><i className="fas fa-comments"></i> 0 Comments</span>
                      </div>
                      <h3 className="blog-title"><a href="#">{post.title}</a></h3>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                    </div>
                  </article>
                ))}
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
                    {[
                      {key: 'all', label: 'All Posts', count: 24},
                      {key: 'recipes', label: 'Easy Recipes', count: 8},
                      {key: 'tips', label: 'Healthy Tips', count: 6},
                      {key: 'guides', label: 'Seasonal Guides', count: 5},
                      {key: 'stories', label: 'Customer Stories', count: 5},
                    ].map(c => (
                      <li
                        key={c.key}
                        className={activeCategory === c.key ? 'active' : ''}
                        data-category={c.key}
                        onClick={() => setActiveCategory(c.key)}
                        style={{ cursor: 'pointer' }}
                      >
                        {c.label}
                        <span className="category-count">{c.count}</span>
                      </li>
                    ))}
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


