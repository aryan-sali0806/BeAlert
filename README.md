# 🧠 News Intelligence

> **Less noise. More signal.**

News Intelligence is an AI-powered news aggregation and intelligence platform that automatically collects recent news from multiple domains, uses AI to identify the most important stories, summarizes them, explains **why they matter**, and presents the results through a modern web interface.

Instead of making users scroll through hundreds of headlines, News Intelligence turns a large stream of news into a concise **Top 5 briefing for each category**.

---

## ✨ What It Does

News Intelligence currently supports multiple domains such as:

* 🤖 Artificial Intelligence
* 💻 Technology
* 💰 Finance
* 🚀 Space
* 🔬 Science
* 🎮 Gaming
* 🔐 Cybersecurity
* 🚀 Startups

For each category, the system:

1. Fetches recent articles from Google News RSS feeds.
2. Filters the collected articles.
3. Sends the articles to an OpenAI model.
4. Uses AI to identify the most significant stories.
5. Removes/reduces duplicate stories.
6. Generates concise summaries.
7. Generates a **"Why It Matters"** explanation.
8. Assigns an importance score.
9. Stores the processed stories in Supabase.
10. Displays the top stories in the frontend.

---

# 🏗️ Architecture

```text
                         ┌──────────────────┐
                         │   Google News    │
                         │      RSS         │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │       n8n        │
                         │                  │
                         │ Schedule Trigger │
                         │       ↓          │
                         │ Category Loop    │
                         │       ↓          │
                         │ RSS Reader       │
                         │       ↓          │
                         │ Article Filter   │
                         │       ↓          │
                         │   OpenAI AI      │
                         │       ↓          │
                         │ Parse / Rank     │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     Supabase     │
                         │                  │
                         │     news table   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   React Frontend │
                         │                  │
                         │  News Cards      │
                         │  Categories      │
                         │  Briefings       │
                         └──────────────────┘
```

---

# 🧩 Tech Stack

| Layer                | Technology      |
| -------------------- | --------------- |
| Frontend             | React           |
| Styling              | CSS             |
| Database             | Supabase        |
| Automation / Backend | n8n             |
| News Source          | Google News RSS |
| AI Processing        | OpenAI API      |
| Deployment           | TBD             |
| Mobile               | Planned         |

---

# 🤖 AI Processing

The OpenAI node acts as the intelligence layer of the system.

The workflow provides the model with a collection of recent articles and asks it to analyze them.

The model performs tasks such as:

### 1. Deduplication

Multiple publications may report the same event.

For example:

```text
OpenAI launches new model
OpenAI announces latest AI model
New OpenAI model released
```

The AI can recognize these as the same underlying story.

### 2. Importance Ranking

The model evaluates the significance of each story based on factors such as:

* Impact
* Industry relevance
* Public significance
* Recency
* Overall importance

### 3. Summarization

Each selected article receives a concise summary.

### 4. Why It Matters

The system goes beyond summarization by generating an explanation of why the story is relevant.

Example:

```text
WHY IT MATTERS

The development could significantly affect the AI
industry by changing competition, regulation, or
the adoption of new AI technologies.
```

### 5. Importance Score

Each article receives an importance score, for example:

```text
98 → High Impact
91 → High Impact
84 → Significant
76 → Significant
68 → Notable
```

---

# ⚙️ n8n Workflow

n8n is used as the backend automation and data-processing layer.

A simplified version of the workflow is:

```text
Schedule Trigger
        ↓
Categories
        ↓
Loop Over Items
        ↓
Build RSS URL
        ↓
RSS Read
        ↓
Limit Articles
        ↓
Prepare Articles
        ↓
OpenAI
        ↓
Parse AI JSON
        ↓
Supabase
        ↓
Next Category
```

### Schedule Trigger

Runs the workflow automatically at a configured interval.

For example:

```text
Every 24 hours
```

### RSS Read

Fetches recent articles from the Google News RSS feed.

### Limit Articles

Reduces the number of articles sent to the AI.

For example:

```text
100 RSS articles
       ↓
30 articles
       ↓
OpenAI
```

This keeps AI processing manageable.

### OpenAI

Analyzes the collected articles and selects the most important stories.

### Supabase

Stores the final processed articles.

---

# 🗄️ Database

Supabase stores the processed news.

The main table is:

```text
news
```

Example schema:

| Column             | Description              |
| ------------------ | ------------------------ |
| `id`               | Unique article ID        |
| `category`         | News category            |
| `rank`             | Article ranking          |
| `title`            | Article title            |
| `summary`          | AI-generated summary     |
| `why_it_matters`   | AI-generated explanation |
| `importance_score` | AI importance score      |
| `url`              | Original article URL     |
| `created_at`       | Database timestamp       |

The `url` field is intended to be unique so the same article isn't stored multiple times.

---

# 🎨 Frontend

The frontend is built using React.

The current interface provides:

### Category Navigation

Users can switch between:

```text
AI
Tech
Finance
Space
Science
Gaming
Cyber
Startups
```

### AI Briefing

The application displays the top stories for the selected category.

### News Cards

Each article is displayed as an individual card containing:

* Ranking
* Importance score
* Category
* Headline
* AI summary
* Why it matters
* Impact classification
* Link to the original article

### Responsive Design

The layout adapts to different screen sizes.

Desktop:

```text
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Story 1  │ │ Story 2  │ │ Story 3  │
└──────────┘ └──────────┘ └──────────┘

┌──────────┐ ┌──────────┐
│ Story 4  │ │ Story 5  │
└──────────┘ └──────────┘
```

Mobile:

```text
┌────────────────┐
│    Story 1     │
└────────────────┘

┌────────────────┐
│    Story 2     │
└────────────────┘

┌────────────────┐
│    Story 3     │
└────────────────┘
```

---

# 🚀 Getting Started

## Prerequisites

Install:

* Node.js
* npm
* A Supabase account
* An n8n account
* An OpenAI API key

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/news-intelligence.git

cd news-intelligence
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Supabase

Create a Supabase project and create the `news` table.

Example:

```sql
create table news (
    id bigint generated by default as identity primary key,
    category text,
    rank integer,
    title text,
    summary text,
    why_it_matters text,
    importance_score integer,
    url text unique,
    created_at timestamp with time zone default now()
);
```

---

## 4. Configure Supabase in React

Create your Supabase client:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
```

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Never commit your `.env` file to GitHub.**

---

# 🔐 Environment Variables

Your `.gitignore` should include:

```gitignore
node_modules/
dist/
.env
.env.local
.env.*.local
```

API keys and secrets should never be committed to the repository.

---

# 🔄 How News Flows Through the System

A typical execution looks like:

```text
Google News
     │
     │ recent articles
     ▼
RSS Read
     │
     │ ~100 articles
     ▼
Limit Articles
     │
     │ ~30 articles
     ▼
OpenAI
     │
     ├── Analyze
     ├── Deduplicate
     ├── Rank
     ├── Summarize
     └── Explain importance
     │
     ▼
Top 5 Stories
     │
     ▼
Supabase
     │
     ▼
React
     │
     ▼
👤 User
```

---

# 📱 Planned Mobile App

The long-term goal is to make News Intelligence available as a downloadable mobile application.

The planned architecture is:

```text
             📱 Mobile App
                   │
                   ▼
              Supabase
                   ▲
                   │
              n8n Backend
                   │
          ┌────────┴────────┐
          ▼                 ▼
     Google News          OpenAI
```

The existing React frontend can eventually be adapted into a mobile application using technologies such as React Native or Capacitor.

---

# 🛣️ Roadmap

## MVP

* [x] Google News RSS integration
* [x] Multiple news categories
* [x] n8n workflow
* [x] OpenAI article analysis
* [x] Top 5 article selection
* [x] AI summaries
* [x] "Why It Matters"
* [x] Importance scoring
* [x] Supabase database
* [x] React frontend
* [x] Responsive news cards
* [ ] Robust duplicate handling
* [ ] Automated scheduled execution

## Next

* [ ] User accounts
* [ ] Personalized categories
* [ ] Saved articles
* [ ] Article detail page
* [ ] Search
* [ ] Related stories
* [ ] Publication/source information
* [ ] Article timestamps
* [ ] Better duplicate/event clustering
* [ ] News source diversity
* [ ] Push notifications

## Future

* [ ] Mobile application
* [ ] Personalized AI briefing
* [ ] Morning news digest
* [ ] Breaking-news alerts
* [ ] User preference learning
* [ ] Trend detection
* [ ] Topic tracking
* [ ] Multi-language support
* [ ] Advanced news credibility analysis

---

# 🎯 Vision

Traditional news aggregators answer:

> **"What happened?"**

News Intelligence aims to answer:

> **"What happened, how important is it, and why should I care?"**

The goal is to transform the overwhelming amount of information available online into a concise, intelligent, personalized briefing.

---

# 📌 Project Status

**Status:** 🚧 MVP in development

The current version successfully demonstrates the core pipeline:

```text
News → AI → Intelligence → Database → UI
```

The project is currently focused on improving reliability, duplicate handling, personalization, and the mobile experience.

---

## 💡 Core Idea

> **Don't give users more news. Give them better intelligence.**
