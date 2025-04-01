import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
    const [formData, setFormData] = useState({
        Age: "",
        Gender: "",
        Weight: "",
        Height: "",
        BMI: ""
    });

    const [workoutForm, setWorkoutForm] = useState({
        Workout_Type: "",
        Targeted_Muscle: "",
        Equipment_Available: "",
        Experience: ""
    });

    const [result, setResult] = useState(null);
    const [workoutPlan, setWorkoutPlan] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWorkoutChange = (e) => {
        const { name, value } = e.target;
        if (name === "Workout_Type") {
            // Reset Targeted_Muscle when Workout_Type changes to ensure a valid selection
            setWorkoutForm({ ...workoutForm, Workout_Type: value, Targeted_Muscle: "" });
        } else if (name === "Equipment_Available") {
            // Reset Experience when Equipment changes to ensure a valid selection
            setWorkoutForm({ ...workoutForm, Equipment_Available: value, Experience: "" });
        } else {
            setWorkoutForm({ ...workoutForm, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData);
            setResult(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleWorkoutSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/get_workout_plan", workoutForm);
            setWorkoutPlan(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Dropdown options (must match dataset exactly)
    const workoutTypeOptions = [
        "Cardio",
        "HIIT",
        "Strength",
        "Muscle Building",
        "Flexibility",
        "Yoga"
    ];

    const muscleGroupsByWorkoutType = {
        "Cardio": ["Full Body"],
        "HIIT": ["Full Body", "Legs, Core", "Core"],
        "Strength": ["Chest", "Back", "Legs", "Shoulders"],
        "Muscle Building": ["Biceps", "Shoulders", "Chest, Triceps", "Legs"],
        "Flexibility": ["Hamstrings, Lower Back", "Hips, Glutes", "Full Body", "Shoulders, Chest"],
        "Yoga": ["Full Body"]  // Added Yoga to match dataset
    };

    const equipmentOptions = [
        "None (Bodyweight)", "Treadmill", "Stationary Bike", "Jump Rope", "Dumbbells", 
        "Kettlebell", "Barbell", "Pull-Up Bar", "Yoga Mat", "Bench, Barbell"
    ];

    const experienceByEquipment = {
        "None (Bodyweight)": ["Beginner", "Intermediate"],
        "Treadmill": ["Intermediate"],
        "Stationary Bike": ["Advanced"],
        "Jump Rope": ["Beginner"],
        "Dumbbells": ["Intermediate", "Beginner"],
        "Kettlebell": ["Advanced"],
        "Barbell": ["Beginner", "Advanced", "Intermediate"],
        "Pull-Up Bar": ["Intermediate"],
        "Yoga Mat": ["Intermediate", "Advanced"],
        "Bench, Barbell": ["Advanced"]
    };

    // Filter muscle groups based on the selected Workout_Type
    const availableMuscleGroups = workoutForm.Workout_Type && muscleGroupsByWorkoutType[workoutForm.Workout_Type]
        ? muscleGroupsByWorkoutType[workoutForm.Workout_Type]
        : [];

    // Filter experience levels based on the selected Equipment_Available
    const availableExperienceLevels = workoutForm.Equipment_Available && experienceByEquipment[workoutForm.Equipment_Available]
        ? experienceByEquipment[workoutForm.Equipment_Available]
        : [];

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>AI Workout Plan Predictor</h1>

            {/* First Form - Predict Workout Type */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input type="number" name="Age" placeholder="Age" onChange={handleChange} required style={inputStyle} />
                
                <select name="Gender" onChange={handleChange} required style={selectStyle}>
                    <option value="">Select Gender</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                </select>

                <input type="number" name="Weight" placeholder="Weight (kg)" step="0.01" onChange={handleChange} required style={inputStyle} />
                <input type="number" name="Height" placeholder="Height (m)" step="0.01" onChange={handleChange} required style={inputStyle} />
                <input type="number" name="BMI" placeholder="BMI" step="0.1" onChange={handleChange} required style={inputStyle} />
                <button type="submit" style={buttonStyle}>Predict Workout</button>
            </form>

            {/* Display Predicted Workout Type with Details */}
            {result && (
                <div style={resultStyle}>
                    <h2>Prediction Result</h2>
                    <p><strong>Predicted Workout Type:</strong> {result["Predicted Workout Type"]}</p>
                    <p><strong>Estimated Calories Burned:</strong> {result["Estimated Calories Burned"]} kcal</p>
                    <p><strong>Recommended Water Intake:</strong> {result["Recommended Water Intake"]} liters</p>
                    <p><strong>Your Inputs:</strong></p>
                    <ul>
                        <li>Age: {formData.Age}</li>
                        <li>Gender: {formData.Gender === "1" ? "Male" : "Female"}</li>
                        <li>Weight: {formData.Weight} kg</li>
                        <li>Height: {formData.Height} m</li>
                        <li>BMI: {formData.BMI}</li>
                    </ul>
                </div>
            )}

            {/* Second Form - Get Detailed Workout Plan */}
            <h2>Get a Detailed Workout Plan</h2>
            <form onSubmit={handleWorkoutSubmit} style={{ marginBottom: "20px" }}>
                <select name="Workout_Type" onChange={handleWorkoutChange} required style={selectStyle}>
                    <option value="">Select Workout Type</option>
                    {workoutTypeOptions.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <select name="Targeted_Muscle" onChange={handleWorkoutChange} required style={selectStyle} disabled={!workoutForm.Workout_Type}>
                    <option value="">Select Targeted Muscle</option>
                    {availableMuscleGroups.map((muscle) => (
                        <option key={muscle} value={muscle}>{muscle}</option>
                    ))}
                </select>

                <select name="Equipment_Available" onChange={handleWorkoutChange} required style={selectStyle}>
                    <option value="">Select Equipment</option>
                    {equipmentOptions.map((equipment) => (
                        <option key={equipment} value={equipment}>{equipment}</option>
                    ))}
                </select>

                <select name="Experience" onChange={handleWorkoutChange} required style={selectStyle} disabled={!workoutForm.Equipment_Available}>
                    <option value="">Select Experience Level</option>
                    {availableExperienceLevels.map((exp) => (
                        <option key={exp} value={exp}>{exp}</option>
                    ))}
                </select>

                <button type="submit" style={buttonStyle}>Get Workout Plan</button>
            </form>

            {/* Display Workout Plan with Details */}
            {workoutPlan && (
                <div style={resultStyle}>
                    <h2>Your Workout Plan</h2>
                    {workoutPlan.error ? (
                        <p style={{ color: 'red' }}>{workoutPlan.error}</p>
                    ) : workoutPlan.message ? (
                        <p>{workoutPlan.message}</p>
                    ) : (
                        <div>
                            <p><strong>Exercise:</strong> {workoutPlan.Exercise}</p>
                            <p><strong>Sets:</strong> {workoutPlan.Sets}</p>
                            <p><strong>Reps:</strong> {workoutPlan.Min_Reps} - {workoutPlan.Max_Reps}</p>
                            <p><strong>Workout Type:</strong> {workoutForm.Workout_Type}</p>
                            <p><strong>Targeted Muscle:</strong> {workoutForm.Targeted_Muscle}</p>
                            <p><strong>Equipment:</strong> {workoutForm.Equipment_Available}</p>
                            <p><strong>Experience:</strong> {workoutForm.Experience}</p>
                            <p><strong>Intensity:</strong> {workoutPlan.Intensity}</p>
                            <p><strong>Duration:</strong> {workoutPlan.Duration} min</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const inputStyle = { padding: "10px", margin: "5px", width: "200px" };
const selectStyle = { padding: "10px", margin: "5px", width: "220px" };
const buttonStyle = { padding: "10px 20px", margin: "5px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" };
const resultStyle = { border: "1px solid #ccc", padding: "15px", marginTop: "20px", borderRadius: "5px" };

export default App;
