# **Mining Chatbot Project**

## **Project Overview**

The **Mining Chatbot Project** is a web application designed to provide information about the mining industry. It features a chatbot that can interact with users, deliver real-time data, and respond to queries related to mining. The chatbot is built using **HTML**, **CSS**, **JavaScript** for the frontend, and **Flask** for the backend.

This project aims to help users access detailed case studies, articles, FAQs, documents, and real-time video content in the mining sector.

## **Technologies Used**

- **Frontend**: 
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Bootstrap (for responsiveness)

- **Backend**:
  - Flask (Python Web Framework)
  - APIs for chatbot interaction
  - Web scraping (for mining data)

- **Deployment**: 
  - AWS (for hosting and deploying the project)
  - GitHub (for version control)

---

## **Project Structure**

/mining-chatbot-project
│
├── /assets
│   ├── /images
│   ├── /videos
│   └── /icons
│
├── /css
│   ├── /common
│   │   └── style.css           # Common styles for all pages
│   ├── /chatbot
│   │   └── chatbot.css         # Chatbot-specific styles
│   ├── /home
│   │   └── home.css            # Home page styles
│   ├── /articles
│   │   └── articles.css        # Articles page styles
│   ├── /faqs
│   │   └── faqs.css            # FAQs page styles
│   ├── /documents
│   │   └── documents.css       # Documents page styles
│   └── /navbar
│       └── navbar.css          # Navbar styles
│
├── /js
│   ├── /common
│   │   └── script.js           # Common JS for all pages
│   ├── /chatbot
│   │   └── chatbot.js          # Chatbot-specific JS
│   ├── /home
│   │   └── home.js             # Home page JS
│   ├── /articles
│   │   └── articles.js         # Articles page JS
│   ├── /faqs
│   │   └── faqs.js             # FAQs page JS
│   ├── /documents
│   │   └── documents.js        # Documents page JS
│   └── /navbar
│       └── navbar.js           # Navbar-specific JS
│
├── /backend
│   ├── /app
│   │   └── server.py           # Flask backend
│   ├── /templates
│   │   ├── index.html          # Backend template for the homepage
│   │   └── chatbot.html        # Backend template for the chatbot page
│   └── /static
│       ├── /images
│       └── /css
│           └── backend.css     # Backend specific styles (if needed)
│
├── index.html                  # Home page (Frontend)
├── chatbot.html                # Chatbot page (Frontend)
├── articles.html               # Articles page (Frontend)
├── faqs.html                   # FAQs page (Frontend)
└── documents.html              # Documents page (Frontend)


---

## **Setup Instructions**

### Prerequisites
- Install **Python** (>= 3.8)
- Install **Node.js** (>= 14.0)
- **Git** for version control

### 1. **Clone the Repository**:

git clone https://github.com/your-username/mining-chatbot-project.git
   cd mining-chatbot-project

   
python3 -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate


pip install -r backend/requirements.txt

npm install
python backend/app/server.py

