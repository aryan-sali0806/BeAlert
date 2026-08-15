import NewsCard from './NewsCard'

function NewsGrid({
  news,
  category
}) {
  return (

    <section className="news-grid">

      {news.map((article, index) => (

        <NewsCard
          key={article.id}
          article={article}
          index={index}
          category={category}
        />

      ))}

    </section>

  )
}

export default NewsGrid