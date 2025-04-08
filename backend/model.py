import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv(r'C:\Users\jay11\OneDrive\Desktop\AI_gym_plan\AI-Based-Gym-Workout-Generator\dataset.csv')

# Encode categorical variables
encoder_gender = LabelEncoder()
df['Gender'] = encoder_gender.fit_transform(df['Gender'])  # Male=1, Female=0

encoder_workout = LabelEncoder()
df['Workout_Type'] = encoder_workout.fit_transform(df['Workout_Type'])

# Define features and targets
# Features for predicting Workout_Type, Calories_Burned, and Water_Intake
X = df[['Age', 'Gender', 'Weight (kg)', 'Height (m)', 'BMI']]

# Targets
y_workout_type = df['Workout_Type']
y_calories_burned = df['Calories_Burned']
y_water_intake = df['Water_Intake (liters)']

# Train-test split for each target
X_train_wt, X_test_wt, y_train_wt, y_test_wt = train_test_split(X, y_workout_type, test_size=0.2, random_state=42)
X_train_cb, X_test_cb, y_train_cb, y_test_cb = train_test_split(X, y_calories_burned, test_size=0.2, random_state=42)
X_train_wi, X_test_wi, y_train_wi, y_test_wi = train_test_split(X, y_water_intake, test_size=0.2, random_state=42)

# Train the models
model_workout_type = RandomForestClassifier(n_estimators=100, random_state=42)
model_workout_type.fit(X_train_wt, y_train_wt)

model_calories_burned = RandomForestRegressor(n_estimators=100, random_state=42)
model_calories_burned.fit(X_train_cb, y_train_cb)

model_water_intake = RandomForestRegressor(n_estimators=100, random_state=42)
model_water_intake.fit(X_train_wi, y_train_wi)

# Save models and encoders
pickle.dump(model_workout_type, open('model_workout_type.pkl', 'wb'))
pickle.dump(model_calories_burned, open('model_calories_burned.pkl', 'wb'))
pickle.dump(model_water_intake, open('model_water_intake.pkl', 'wb'))
pickle.dump(encoder_gender, open('encoder_gender.pkl', 'wb'))
pickle.dump(encoder_workout, open('encoder_workout1.pkl', 'wb'))

# Print confirmation
print("Model training complete! ✅")