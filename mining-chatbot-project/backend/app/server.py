from flask import Flask, render_template, request, jsonify, redirect, flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import traceback
import google.generativeai as genai
import os
import random

app = Flask(__name__)
CORS(app)
app.secret_key = 'AIzaSyDXRsAAH-54PT6659jIO1jJCmCJpPB7eh8'

# 📁 Correct SQLite DB Path
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'contacts.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 🗃️ Initialize DB
db = SQLAlchemy(app)

# 📇 Contact Form Model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    message = db.Column(db.Text, nullable=False)

# ✅ Create DB Tables
with app.app_context():
    db.create_all()

# 🔑 Gemini API Key Setup
genai.configure(api_key="AIzaSyDXRsAAH-54PT6659jIO1jJCmCJpPB7eh8")

# 📄 ROUTES
@app.route('/')
def home():
    return render_template('index.html', random=random.random)

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html', random=random.random)

@app.route('/articles')
def articles():
    return render_template('articles.html')

@app.route('/article/<int:id>')
def show_article(id):
    return render_template(f'article{id}.html')

@app.route('/faqs')
def faqs():
    return render_template('faqs.html')

@app.route('/documents')
def documents():
    return render_template('documents.html')

@app.route('/mining-locations')
def mining_locations():
    return render_template('mining-locations.html')  # <-- 🆕 New Map Route

# ✅ Contact Form Submission
@app.route('/submit-contact-form', methods=['POST'])
def submit_contact_form():
    try:
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        if not name or not email or not message:
            flash("❌ All fields are required.", "error")
            return redirect("/")

        new_contact = Contact(name=name, email=email, message=message)
        db.session.add(new_contact)
        db.session.commit()

        flash("✅ Message submitted successfully!", "success")
        return redirect("/")
    except Exception as e:
        traceback.print_exc()
        flash("❌ Submission failed. Please try again.", "error")
        return redirect("/")

@app.route('/submit-chat', methods=['POST'])
def submit_chat():
    try:
        user_input = request.json.get('message')

        if not user_input:
            return jsonify({'response': '⚠️ Please enter a message.'}), 400

        model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
        chat = model.start_chat(history=[])
        response = chat.send_message(user_input)

        return jsonify({'response': response.text})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'response': f"⚠️ Server error: {str(e)}"}), 500

@app.route('/admin/feedback')
def view_feedback():
    feedbacks = Contact.query.all()
    return render_template('feedback.html', feedbacks=feedbacks)

# 🔁 Run the app
if __name__ == '__main__':
    app.run(debug=True)
