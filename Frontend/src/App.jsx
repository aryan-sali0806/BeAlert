import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './App.css'

function App() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getNews()
  }, [])

  async function getNews() {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('category', 'Artificial Intelligence')
      .order('created_at', { ascending: false })
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

  return (
    <div className="app">

      {/* Header */}
      <header className="header">

        <div className="brand">
          <div className="logo">N</div>

          <div>
            <h1>News Intelligence</h1>
            <p>AI-powered news, without the noise.</p>
          </div>
        </div>

        <button
          className="refresh-btn"
          onClick={getNews}
          disabled={loading}
        >
          {loading ? '↻' : '⟳'}
          <span>Refresh</span>
        </button>

      </header>


      {/* Category */}
      <div className="category-section">

        <div>
          <p className="eyebrow">YOUR BRIEFING</p>

          <h2>
            <span className="fire">🔥</span>
            Artificial Intelligence
          </h2>

          <p className="subtitle">
            Today's 5 most important AI stories
          </p>
        </div>

      </div>


      {/* Loading */}
      {loading && (
        <div className="loading">

          <div className="spinner"></div>

          <p>Loading today's intelligence...</p>

        </div>
      )}


      {/* Error */}
      {error && !loading && (
        <div className="error-box">

          <h3>Something went wrong</h3>

          <p>{error}</p>

          <button onClick={getNews}>
            Try again
          </button>

        </div>
      )}


      {/* News */}
      {!loading && !error && (

        <main className="news-container">

          {news.length === 0 ? (

            <div className="empty">
              <div className="empty-icon">📰</div>

              <h3>No news available</h3>

              <p>
                Run your n8n workflow to generate today's briefing.
              </p>
            </div>

          ) : (

            news.map((article, index) => (

              <article
                className={`news-card ${index === 0 ? 'featured' : ''}`}
                key={article.id}
              >

                {/* Rank */}
                <div className="rank">
                  {String(index + 1).padStart(2, '0')}
                </div>


                {/* Content */}
                <div className="news-content">

                  <div className="card-top">

                    <span className="category-badge">
                      AI
                    </span>

                    <span className="score">
                      ⭐ {article.importance_score}
                    </span>

                  </div>


                  <h3 className="title">
                    {article.title}
                  </h3>


                  <p className="summary">
                    {article.summary}
                  </p>


                  {/* Why it matters */}
                  <div className="why">

                    <div className="why-title">
                      <span>🧠</span>
                      Why it matters
                    </div>

                    <p>
                      {article.why_it_matters}
                    </p>

                  </div>


                  {/* Footer */}
                  <div className="card-footer">

                    <span className="rank-label">
                      #{article.rank}
                    </span>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-btn"
                    >
                      Read original
                      <span>↗</span>
                    </a>

                  </div>

                </div>

              </article>

            ))

          )}

        </main>

      )}


      {/* Footer */}
      <footer>

        <p>
          Powered by <strong>n8n</strong> + <strong>Supabase</strong> + AI
        </p>

      </footer>

    </div>
  )
}

export default App