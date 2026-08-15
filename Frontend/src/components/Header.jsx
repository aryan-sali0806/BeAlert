function Header({ today, loading, onRefresh }) {
  return (
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


        {/* HEADER ACTIONS */}
        <div className="header-actions">

          <div className="date-display">

            <span className="date-label">
              TODAY
            </span>

            <span className="date-value">
              {today}
            </span>

          </div>


          <div className="live-indicator">

            <span className="live-dot"></span>

            LIVE

          </div>


          <button
            className="refresh-button"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Refresh news"
          >

            <span
              className={
                loading
                  ? 'refresh-icon spinning'
                  : 'refresh-icon'
              }
            >
              ↻
            </span>

          </button>

        </div>

      </div>


      <div className="header-line"></div>

    </header>
  )
}

export default Header