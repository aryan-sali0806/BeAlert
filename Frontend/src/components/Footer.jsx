function Footer() {
  return (

    <footer className="site-footer">

      <div className="footer-inner">


        {/* BRAND */}

        <div className="footer-brand">

          <div className="footer-logo">
            NI
          </div>

          <div>

            <h3>
              News Intelligence
            </h3>

            <p>
              Less noise. More signal.
            </p>

          </div>

        </div>


        {/* FOOTER LINKS */}

        <div className="footer-links">


          {/* EXPLORE */}

          <div className="footer-column">

            <h4>
              EXPLORE
            </h4>

            <button>
              AI
            </button>

            <button>
              Technology
            </button>

            <button>
              Finance
            </button>

            <button>
              Science
            </button>

          </div>


          {/* PRODUCT */}

          <div className="footer-column">

            <h4>
              PRODUCT
            </h4>

            <button>
              About
            </button>

            <button>
              How it works
            </button>

            <button>
              Privacy
            </button>

            <button>
              Feedback
            </button>

          </div>


          {/* CONNECT */}

          <div className="footer-column">

            <h4>
              CONNECT
            </h4>

            <button>
              GitHub ↗
            </button>

            <button>
              LinkedIn ↗
            </button>

            <button>
              X ↗
            </button>

          </div>

        </div>

      </div>


      {/* FOOTER BOTTOM */}

      <div className="footer-bottom">

        <span>
          © 2026 News Intelligence
        </span>


        <span className="footer-status">

          <span></span>

          AI-curated intelligence

        </span>


        <span>
          Built for curious minds.
        </span>

      </div>

    </footer>

  )
}

export default Footer