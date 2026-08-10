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
  const [selectedCategory, setSelectedCategory] = useState(
    'Artificial Intelligence'
  )

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

      {/* ================= HEADER ================= */}

      <header className="header">

        <div className="brand">

          <div className="brand-mark">
            NI
          </div>

          <div className="brand-name">
            NEWS
            <span>INTELLIGENCE</span>
          </div>

        </div>

        <div className="header-right">

          <div className="live-status">
            <span></span>
            LIVE
          </div>

          <button
            className="refresh"
            onClick={getNews}
            disabled={loading}
            aria-label="Refresh news"
          >
            ↻
          </button>

        </div>

      </header>


      {/* ================= CATEGORY NAV ================= */}

      <nav className="category-nav">

        <div className="category-scroll">

          {categories.map((category) => (

            <button
              key={category.name}
              className={
                selectedCategory === category.name
                  ? 'category active'
                  : 'category'
              }
              onClick={() =>
                setSelectedCategory(category.name)
              }
            >
              {category.label}
            </button>

          ))}

        </div>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="main">

        {/* Briefing header */}

        <section className="briefing-header">

          <div>

            <div className="date">
              {today.toUpperCase()}
            </div>

            <h1>
              Your briefing
            </h1>

            <p>
              The stories worth your attention.
            </p>

          </div>

          <div className="story-total">

            <strong>
              {news.length}
            </strong>

            <span>
              STORIES
            </span>

          </div>

        </section>


        {/* ================= LOADING ================= */}

        {loading && (

          <div className="loading">

            <div className="loader"></div>

            <span>
              Curating your briefing...
            </span>

          </div>

        )}


        {/* ================= ERROR ================= */}

        {error && !loading && (

          <div className="empty-state">

            <div className="empty-symbol">
              !
            </div>

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

            <button onClick={getNews}>
              Retry
            </button>

          </div>

        )}


        {/* ================= EMPTY ================= */}

        {!loading &&
          !error &&
          news.length === 0 && (

            <div className="empty-state">

              <div className="empty-symbol">
                +
              </div>

              <h2>
                Nothing here yet
              </h2>

              <p>
                This category hasn't been processed yet.
              </p>

            </div>

          )}


        {/* ================= NEWS GRID ================= */}

        {!loading &&
          !error &&
          news.length > 0 && (

            <section className="news-grid">

              {news.map((article, index) => (

                <article
                  className={
                    index === 0
                      ? 'news-card top-card'
                      : 'news-card'
                  }
                  key={article.id}
                >

                  {/* Card top */}

                  <div className="news-card-top">

                    <span className="news-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="importance">

                      <span className="star">
                        ★
                      </span>

                      {article.importance_score}

                    </span>

                  </div>


                  {/* Category */}

                  <div className="news-category">
                    {selectedCategory}
                  </div>


                  {/* Title */}

                  <h2>
                    {article.title}
                  </h2>


                  {/* Summary */}

                  <p className="news-summary">
                    {article.summary}
                  </p>


                  {/* Why it matters */}

                  <div className="why-card">

                    <div className="why-title">
                      WHY IT MATTERS
                    </div>

                    <p>
                      {article.why_it_matters}
                    </p>

                  </div>


                  {/* Footer */}

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

                      Read

                      <span>
                        ↗
                      </span>

                    </a>

                  </div>

                </article>

              ))}

            </section>

          )}

      </main>


      {/* ================= BOTTOM NAV ================= */}

      <nav className="bottom-nav">

        <button className="bottom-active">

          <span>
            ◉
          </span>

          Briefing

        </button>

        <button>

          <span>
            ☆
          </span>

          Saved

        </button>

        <button>

          <span>
            ⌕
          </span>

          Explore

        </button>

        <button>

          <span>
            ☰
          </span>

          More

        </button>

      </nav>

    </div>
  )
}

export default App