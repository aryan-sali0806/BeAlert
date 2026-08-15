function NewsCard({
  article,
  index,
  category
}) {

  const impactLabel =
    article.importance_score >= 90
      ? 'HIGH IMPACT'
      : article.importance_score >= 75
        ? 'SIGNIFICANT'
        : 'NOTABLE'


  return (

    <article
      className={
        index === 0
          ? 'news-card top-card'
          : 'news-card'
      }
    >

      {/* CARD TOP */}

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


      {/* CATEGORY */}

      <div className="news-category">
        {category}
      </div>


      {/* TITLE */}

      <h2>
        {article.title}
      </h2>


      {/* SUMMARY */}

      <p className="news-summary">
        {article.summary}
      </p>


      {/* WHY IT MATTERS */}

      <div className="why-card">

        <div className="why-title">
          WHY IT MATTERS
        </div>

        <p>
          {article.why_it_matters}
        </p>

      </div>


      {/* CARD FOOTER */}

      <div className="news-card-footer">

        <span>
          {impactLabel}
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
  )
}

export default NewsCard