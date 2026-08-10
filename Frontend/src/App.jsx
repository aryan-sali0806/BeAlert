import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './App.css'

const categories = [
  { name: 'Artificial Intelligence', label: 'AI' },
  { name: 'Technology', label: 'Tech' },
  { name: 'Finance', label: 'Finance' },
  { name: 'Space', label: 'Space' },
  { name: 'Science', label: 'Science' },
  { name: 'Gaming', label: 'Gaming' },
  { name: 'Cybersecurity', label: 'Cyber' },
  { name: 'Startups', label: 'Startups' }
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Artificial Intelligence')
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Cursor position state for dynamic spotlight effect
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    getNews()
  }, [selectedCategory])

  async function getNews() {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('category', selectedCategory)
      .order('importance_score', { ascending: false })
      .limit(5)

    if (error) {
      console.error(error)
      setError(error.message)
      setLoading(false)
      return
    }

    setNews(data || [])
    setLoading(false)
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="app">
      {/* =====================================
          CURSOR EFFECTS
      ===================================== */}
      <div 
        className="cursor-glow" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />
      <div 
        className="cursor-dot" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />

      {/* =====================================
          HEADER
      ===================================== */}
      <header className="site-header">
        <div className="header-inner">
          {/* BRAND */}
          <div className="brand">
            <div className="brand-logo">
              <span>NI</span>
            </div>
            <div className="brand-text">
              <div className="brand-title">
                NEWS <span>INTELLIGENCE</span>
              </div>
              <div className="brand-tagline">
                Understand what matters.
              </div>
            </div>
          </div>

          {/* HEADER RIGHT */}
          <div className="header-actions">
            <div className="date-display">
              <span className="date-label">TODAY</span>
              <span className="date-value">{today}</span>
            </div>

            <div className="live-indicator">
              <span className="live-dot"></span>
              LIVE
            </div>

            <button
              className="refresh-button"
              onClick={getNews}
              disabled={loading}
              aria-label="Refresh news"
            >
              <span className={loading ? 'refresh-icon spinning' : 'refresh-icon'}>
                ↻
              </span>
            </button>
          </div>
        </div>

        <div className="header-line"></div>
      </header>

      {/* =====================================
          CATEGORY NAV
      ===================================== */}
      <nav className="category-nav">
        <div className="category-inner">
          <div className="category-scroll">
            {categories.map((category) => (
              <button
                key={category.name}
                className={
                  selectedCategory === category.name
                    ? 'category active'
                    : 'category'
                }
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}
      <main className="main">
        <section className="briefing-header">
          <div>
            <div className="date">{today.toUpperCase()}</div>
            <h1>Your briefing</h1>
            <p>The stories worth your attention.</p>
          </div>

          <div className="story-total">
            <strong>{news.length}</strong>
            <span>TOP STORIES</span>
          </div>
        </section>

        {loading && (
          <div className="loading">
            <div className="loader"></div>
            <span>Curating your briefing...</span>
          </div>
        )}

        {error && !loading && (
          <div className="empty-state">
            <div className="empty-symbol">!</div>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button onClick={getNews}>Try again</button>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="empty-state">
            <div className="empty-symbol">+</div>
            <h2>Nothing here yet</h2>
            <p>This category hasn't been processed yet.</p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <section className="news-grid">
            {news.map((article, index) => (
              <article
                className={index === 0 ? 'news-card top-card' : 'news-card'}
                key={article.id}
              >
                <div className="news-card-top">
                  <span className="news-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="importance">
                    <span className="star">★</span>
                    {article.importance_score}
                  </span>
                </div>

                <div className="news-category">{selectedCategory}</div>

                <h2>{article.title}</h2>

                <p className="news-summary">{article.summary}</p>

                <div className="why-card">
                  <div className="why-title">WHY IT MATTERS</div>
                  <p>{article.why_it_matters}</p>
                </div>

                <div className="news-card-footer">
                  <span>
                    {article.importance_score >= 90
                      ? 'HIGH IMPACT'
                      : article.importance_score >= 75
                        ? 'SIGNIFICANT'
                        : 'NOTABLE'}
                  </span>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      {/* =====================================
          FOOTER
      ===================================== */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">NI</div>
            <div>
              <h3>News Intelligence</h3>
              <p>Less noise. More signal.</p>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>EXPLORE</h4>
              <button>AI</button>
              <button>Technology</button>
              <button>Finance</button>
              <button>Science</button>
            </div>

            <div className="footer-column">
              <h4>PRODUCT</h4>
              <button>About</button>
              <button>How it works</button>
              <button>Privacy</button>
              <button>Feedback</button>
            </div>

            <div className="footer-column">
              <h4>CONNECT</h4>
              <button>GitHub ↗</button>
              <button>LinkedIn ↗</button>
              <button>X ↗</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 News Intelligence</span>

          <span className="footer-status">
            <span></span>
            AI-curated intelligence
          </span>

          <span>Built for curious minds.</span>
        </div>
      </footer>
    </div>
  )
}

export default App