import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load the new dataset
df = pd.read_csv(r'C:\Users\jay11\OneDrive\Desktop\AI_gym_plan\AI-Based-Gym-Workout-Generator\dataset2.csv')

# Preprocess the dataset
# 1. Handle Duration: Convert to numerical average (e.g., "30-60 sec" -> 45, "20 min" -> 20)
def parse_duration(duration):
    if 'min' in duration:
        return float(duration.replace(' min', ''))  # e.g., "20 min" -> 20.0
    elif 'sec' in duration:
        if '-' in duration:
            # Handle ranges like "30-60 sec"
            low, high = map(int, duration.replace(' sec', '').split('-'))
            return (low + high) / 2  # Average of the range
        elif '/side' in duration:
            # Handle "60 sec/side" -> treat as 60 sec
            return float(duration.replace(' sec/side', ''))
        else:
            return float(duration.replace(' sec', ''))
    else:
        return 0.0  # For "0 min"

df['Duration'] = df['Duration'].apply(parse_duration)

# 2. Encode categorical variables
encoder_workout = LabelEncoder()
encoder_muscle = LabelEncoder()
encoder_equipment = LabelEncoder()
encoder_experience = LabelEncoder()
encoder_exercises = LabelEncoder()
encoder_intensity = LabelEncoder()

df['Workout_Type'] = encoder_workout.fit_transform(df['Workout_Type'])
df['Targeted_Muscle'] = encoder_muscle.fit_transform(df['Targeted_Muscle'])
df['Equipment'] = encoder_equipment.fit_transform(df['Equipment'])
df['Experience'] = encoder_experience.fit_transform(df['Experience'])
df['Exercises'] = encoder_exercises.fit_transform(df['Exercises'])
df['Intensity'] = encoder_intensity.fit_transform(df['Intensity'])

# Define features and targets
# Features: Workout_Type, Targeted_Muscle, Equipment, Experience
X = df[['Workout_Type', 'Targeted_Muscle', 'Equipment', 'Experience']]

# Targets: Exercises, Sets, Min_Reps, Max_Reps, Intensity, Duration
y_exercises = df['Exercises']  # Predicting Exercises
y_sets = df['Sets']  # Predicting Sets
y_min_reps = df['Min_Reps']  # Predicting Min_Reps
y_max_reps = df['Max_Reps']  # Predicting Max_Reps
y_intensity = df['Intensity']  # Predicting Intensity
y_duration = df['Duration']  # Predicting Duration

# Train-test split for each target
X_train, X_test, y_train_exercises, y_test_exercises = train_test_split(X, y_exercises, test_size=0.2, random_state=42)
X_train, X_test, y_train_sets, y_test_sets = train_test_split(X, y_sets, test_size=0.2, random_state=42)
X_train, X_test, y_train_min_reps, y_test_min_reps = train_test_split(X, y_min_reps, test_size=0.2, random_state=42)
X_train, X_test, y_train_max_reps, y_test_max_reps = train_test_split(X, y_max_reps, test_size=0.2, random_state=42)
X_train, X_test, y_train_intensity, y_test_intensity = train_test_split(X, y_intensity, test_size=0.2, random_state=42)
X_train, X_test, y_train_duration, y_test_duration = train_test_split(X, y_duration, test_size=0.2, random_state=42)

# Train the models
model_exercises = RandomForestClassifier(n_estimators=100, random_state=42)
model_exercises.fit(X_train, y_train_exercises)

model_sets = RandomForestClassifier(n_estimators=100, random_state=42)
model_sets.fit(X_train, y_train_sets)

model_min_reps = RandomForestClassifier(n_estimators=100, random_state=42)
model_min_reps.fit(X_train, y_train_min_reps)

model_max_reps = RandomForestClassifier(n_estimators=100, random_state=42)
model_max_reps.fit(X_train, y_train_max_reps)

model_intensity = RandomForestClassifier(n_estimators=100, random_state=42)
model_intensity.fit(X_train, y_train_intensity)

model_duration = RandomForestRegressor(n_estimators=100, random_state=42)  # Regressor for numerical Duration
model_duration.fit(X_train, y_train_duration)

# Save models and encoders
pickle.dump(model_exercises, open('model_exercises.pkl', 'wb'))
pickle.dump(model_sets, open('model_sets.pkl', 'wb'))
pickle.dump(model_min_reps, open('model_min_reps.pkl', 'wb'))
pickle.dump(model_max_reps, open('model_max_reps.pkl', 'wb'))
pickle.dump(model_intensity, open('model_intensity.pkl', 'wb'))
pickle.dump(model_duration, open('model_duration.pkl', 'wb'))

pickle.dump(encoder_workout, open('encoder_workout.pkl', 'wb'))
pickle.dump(encoder_muscle, open('encoder_muscle.pkl', 'wb'))
pickle.dump(encoder_equipment, open('encoder_equipment.pkl', 'wb'))
pickle.dump(encoder_experience, open('encoder_experience.pkl', 'wb'))
pickle.dump(encoder_exercises, open('encoder_exercises.pkl', 'wb'))
pickle.dump(encoder_intensity, open('encoder_intensity.pkl', 'wb'))

# Print confirmation
print("Training complete! ✅")
print("Models and encoders saved successfully.")