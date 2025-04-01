AI Workout Plan Predictor

This project is an AI-based workout plan predictor that uses machine learning to recommend workout types, give detailed workout plan, estimate calories burned, and suggest water intake based on user inputs. It also generates detailed workout plans based on user preferences.

Project Structure
- `dataset.csv`: Dataset for training the `/predict` models (Workout Type, Calories Burned, Water Intake).
- `dataset2.csv`: Dataset for training the `/get_workout_plan` models (Exercises, Sets, Reps, etc.).
- `model1.py`: Script to train models for the `/predict` endpoint.
- `app.py`: Flask backend to serve the API endpoints (`/predict` and `/get_workout_plan`).
- `app.js`: React frontend for the user interface.
- `App.css`: CSS styles for the React app.

Setup Instructions
Prerequisites
- Python 3.13
- Node.js and npm
- Git

