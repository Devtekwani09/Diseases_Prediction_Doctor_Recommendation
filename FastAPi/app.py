from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
# df = pd.read_csv(r"C:\Users\Neeraj\Desktop\final yr project\FastAPi\disease_specialist_data.csv", encoding='ISO-8859-1')
import os

# Get the current directory of the app
base_dir = os.path.dirname(os.path.abspath(__file__))

# Relative path to the CSV file in the same folder as app.py
csv_file_path = os.path.join(base_dir, 'disease_specialist_data.csv')

# Load the CSV file
df = pd.read_csv(csv_file_path, encoding='ISO-8859-1')


# Train vectorizer
vectorizer = TfidfVectorizer()
symptom_vectors = vectorizer.fit_transform(df["Related Symptoms"])  # Assuming "Related Symptoms" column exists

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def predict_disease(symptoms):
    symptoms = " ".join(symptoms).lower()  # Convert list to a string
    input_vector = vectorizer.transform([symptoms])
    similarities = cosine_similarity(input_vector, symptom_vectors)
    best_match_index = similarities.argmax()

    predicted_disease = df.iloc[best_match_index]["Disease Name"]
    specialist = df.iloc[best_match_index]["Specialist Type"]
    return predicted_disease, specialist

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get("symptoms", [])

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    disease, specialist = predict_disease(symptoms)
    return jsonify({"disease": disease, "specialist": specialist})

if __name__ == '__main__':
    app.run(port=8000, debug=True)
