import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './App.css'

const categories = [
  { name: 'Artificial Intelligence', label: '🔥 AI' },
  { name: 'Technology', label: '💻 Tech' },
  { name: 'Finance', label: '💰 Finance' },
  { name: 'Space', label: '🚀 Space' },
  { name: 'Science', label: '🔬 Science' },
  { name: 'Gaming', label: '🎮 Gaming' },
  { name: 'Cybersecurity', label: '🔐 Cyber' },
  { name: 'Startups', label: '🚀 Startups' }
]

function App() {

  const [selectedCategory, setSelectedCategory] =
    useState('Artificial Intelligence')

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

      {/* HEADER */}

      <header className="header">

        <div className="brand">

          <div className="logo">
            N
          </div>

          <div>

            <h1>
              News Intelligence
            </h1>

            <p>
              AI-powered news, without the noise.
            </p>

          </div>

        </div>


        <button
          className="refresh-btn"
          onClick={getNews}
          disabled={loading}
        >

          {loading ? '↻' : '⟳'}

          <span>
            Refresh
          </span>

        </button>

      </header>


      {/* CATEGORY SELECTOR */}

      <div className="category-wrapper">

        <div className="category-scroll">

          {categories.map(category => (

            <button

              key={category.name}

              className={`category-button ${
                selectedCategory === category.name
                  ? 'active'
                  : ''
              }`}

              onClick={() =>
                setSelectedCategory(category.name)
              }

            >

              {category.label}

            </button>

          ))}

        </div>

      </div>


      {/* CATEGORY TITLE */}

      <section className="category-section">

        <p className="eyebrow">
          YOUR BRIEFING
        </p>


        <h2>

          {categories.find(
            c => c.name === selectedCategory
          )?.label}

          {' '}

          {selectedCategory
            .replace('Artificial Intelligence', 'Artificial Intelligence')
          }

        </h2>


        <p className="subtitle">

          Today's 5 most important stories

        </p>

      </section>


      {/* LOADING */}

      {loading && (

        <div className="loading">

          <div className="spinner"></div>

          <p>
            Analyzing today's news...
          </p>

        </div>

      )}


      {/* ERROR */}

      {error && !loading && (

        <div className="error-box">

          <h3>
            Something went wrong
          </h3>

          <p>
            {error}
          </p>

          <button onClick={getNews}>
            Try again
          </button>

        </div>

      )}


      {/* NEWS */}

      {!loading && !error && (

        <main className="news-container">

          {news.length === 0 ? (

            <div className="empty">

              <div className="empty-icon">
                📰
              </div>

              <h3>
                No news available yet
              </h3>

              <p>
                This category hasn't been processed yet.
              </p>

            </div>

          ) : (

            news.map((article, index) => (

              <article

                className={`news-card ${
                  index === 0
                    ? 'featured'
                    : ''
                }`}

                key={article.id}

              >

                <div className="rank">

                  {String(index + 1)
                    .padStart(2, '0')}

                </div>


                <div className="news-content">

                  <div className="card-top">

                    <span className="category-badge">

                      {selectedCategory}

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


                  <div className="why">

                    <div className="why-title">

                      🧠 Why it matters

                    </div>

                    <p>

                      {article.why_it_matters}

                    </p>

                  </div>


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

                      <span>
                        ↗
                      </span>

                    </a>

                  </div>

                </div>

              </article>

            ))

          )}

        </main>

      )}


      <footer>

        <p>

          Powered by

          {' '}

          <strong>
            n8n
          </strong>

          {' + '}

          <strong>
            Supabase
          </strong>

          {' + AI'}

        </p>

      </footer>

    </div>

  )
}


export default App