from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained models for /predict
model_workout_type = pickle.load(open('model_workout_type.pkl', 'rb'))
model_calories_burned = pickle.load(open('model_calories_burned.pkl', 'rb'))
model_water_intake = pickle.load(open('model_water_intake.pkl', 'rb'))

# Load the trained models for /get_workout_plan
model_exercises = pickle.load(open('model_exercises.pkl', 'rb'))
model_sets = pickle.load(open('model_sets.pkl', 'rb'))
model_min_reps = pickle.load(open('model_min_reps.pkl', 'rb'))
model_max_reps = pickle.load(open('model_max_reps.pkl', 'rb'))
model_intensity = pickle.load(open('model_intensity.pkl', 'rb'))
model_duration = pickle.load(open('model_duration.pkl', 'rb'))

# Load label encoders
encoder_workout = pickle.load(open('encoder_workout.pkl', 'rb'))
encoder_muscle = pickle.load(open('encoder_muscle.pkl', 'rb'))
encoder_equipment = pickle.load(open('encoder_equipment.pkl', 'rb'))
encoder_experience = pickle.load(open('encoder_experience.pkl', 'rb'))
encoder_exercises = pickle.load(open('encoder_exercises.pkl', 'rb'))
encoder_intensity = pickle.load(open('encoder_intensity.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Convert user input into NumPy array
    user_data = np.array([[data['Age'], data['Gender'], data['Weight'], data['Height'], data['BMI']]])
    
    # Predict Workout Type
    prediction = model_workout_type.predict(user_data)[0]
    workout_type = encoder_workout.inverse_transform([prediction])[0]

    # Predict Calories Burned and Water Intake
    calories_burned = model_calories_burned.predict(user_data)[0]
    water_intake = model_water_intake.predict(user_data)[0]

    return jsonify({
        'Predicted Workout Type': workout_type,
        'Estimated Calories Burned': float(calories_burned),
        'Recommended Water Intake': float(water_intake)
    })

@app.route('/get_workout_plan', methods=['POST'])
def get_workout_plan():
    data = request.json
    workout_type = data.get("Workout_Type")
    muscle = data.get("Targeted_Muscle")
    equipment = data.get("Equipment_Available")
    experience = data.get("Experience", "Intermediate")

    # Encode user inputs
    try:
        encoded_workout = encoder_workout.transform([workout_type])[0]
    except ValueError:
        return jsonify({'error': f"Invalid Workout_Type: {workout_type}. Must be one of {list(encoder_workout.classes_)}"}), 400

    try:
        encoded_muscle = encoder_muscle.transform([muscle])[0]
    except ValueError:
        return jsonify({'error': f"Invalid Targeted_Muscle: {muscle}. Must be one of {list(encoder_muscle.classes_)}"}), 400

    try:
        encoded_equipment = encoder_equipment.transform([equipment])[0]
    except ValueError:
        return jsonify({'error': f"Invalid Equipment_Available: {equipment}. Must be one of {list(encoder_equipment.classes_)}"}), 400

    try:
        encoded_experience = encoder_experience.transform([experience])[0]
    except ValueError:
        return jsonify({'error': f"Invalid Experience: {experience}. Must be one of {list(encoder_experience.classes_)}"}), 400

    # Prepare input data as a DataFrame with feature names
    user_input = pd.DataFrame(
        [[encoded_workout, encoded_muscle, encoded_equipment, encoded_experience]],
        columns=['Workout_Type', 'Targeted_Muscle', 'Equipment', 'Experience']
    )

    # Predict workout details
    predicted_exercise = model_exercises.predict(user_input)[0]
    predicted_sets = model_sets.predict(user_input)[0]
    predicted_min_reps = model_min_reps.predict(user_input)[0]
    predicted_max_reps = model_max_reps.predict(user_input)[0]
    predicted_intensity = model_intensity.predict(user_input)[0]
    predicted_duration = model_duration.predict(user_input)[0]

    # Decode exercise name and intensity
    exercise_name = encoder_exercises.inverse_transform([predicted_exercise])[0]
    intensity_name = encoder_intensity.inverse_transform([predicted_intensity])[0]

    # Fallback: Ensure the predicted exercise matches the selected equipment
    equipment_exercise_map = {
        'Treadmill': ['Treadmill Running'],
        'Stationary Bike': ['Cycling (High Resistance)'],
        'Jump Rope': ['Jump Rope'],
        'Dumbbells': ['Jump Squats with Dumbbells', 'Dumbbell Shoulder Press', 'Dumbbell Curls', 'Barbell Lunges'],
        'Kettlebell': ['Kettlebell Swings'],
        'Barbell': ['Bench Press', 'Barbell Back Squat', 'Overhead Press', 'Close-Grip Bench Press', 'Barbell Lunges'],
        'Pull-Up Bar': ['Pull-Ups'],
        'Yoga Mat': ['Pigeon Pose', 'Downward Dog to Upward Dog Flow'],
        'Bench, Barbell': ['Close-Grip Bench Press'],
        'None (Bodyweight)': ['Jogging in Place', 'Burpees', 'Mountain Climbers', 'Seated Forward Bend', 'Doorway Chest Stretch']
    }

    if equipment in equipment_exercise_map and exercise_name not in equipment_exercise_map[equipment]:
        return jsonify({'error': f"The predicted exercise '{exercise_name}' is not compatible with the selected equipment '{equipment}'. Please select a different equipment or muscle group."}), 400

    return jsonify({
        'Exercise': exercise_name,
        'Sets': int(predicted_sets),
        'Min_Reps': int(predicted_min_reps),
        'Max_Reps': int(predicted_max_reps),
        'Intensity': intensity_name,
        'Duration': float(predicted_duration)
    })

if __name__ == '__main__':
    app.run(debug=True)
