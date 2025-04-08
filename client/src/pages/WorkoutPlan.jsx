import React from 'react';
import axios from "axios";
import { useState } from 'react';
import { Home } from "lucide-react";

function WorkoutPlan() {
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [workoutForm, setWorkoutForm] = useState({
        Workout_Type: "",
        Targeted_Muscle: "",
        Equipment_Available: "",
        Experience: ""
    });

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

    const handleWorkoutSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/get_workout_plan", workoutForm);
            setWorkoutPlan(response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const navigateToHome = () => {
        window.location.href = "/";
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
        "Yoga": ["Full Body"]
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 text-white flex flex-col items-center p-4">
            {/* Home Button */}
            <div className="absolute top-4 left-4">
                <button
                    onClick={navigateToHome}
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center group shadow-lg border border-gray-700"
                    aria-label="Go to home page"
                >
                    <Home
                        size={24}
                        className="text-orange-500 group-hover:text-orange-400 transition-colors"
                    />
                </button>
            </div>

            <div className="container max-w-5xl mx-auto pt-10 pb-16">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                        AI WORKOUT PLAN PREDICTOR
                    </h1>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Get personalized workout recommendations based on your body metrics and fitness goals
                    </p>
                </div>

                {/* Workout Plan Form */}
                <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-800 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-center text-white">
                        Get a Detailed Workout Plan
                    </h2>

                    <form onSubmit={handleWorkoutSubmit} className="space-y-6 max-w-3xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="text-sm text-gray-300 mb-1 block">Workout Type</label>
                                <select
                                    name="Workout_Type"
                                    onChange={handleWorkoutChange}
                                    required
                                    className="w-full bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none border border-gray-700"
                                >
                                    <option value="">Select Workout Type</option>
                                    {workoutTypeOptions.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-6 text-gray-400">
                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-sm text-gray-300 mb-1 block">Targeted Muscle</label>
                                <select
                                    name="Targeted_Muscle"
                                    onChange={handleWorkoutChange}
                                    required
                                    disabled={!workoutForm.Workout_Type}
                                    className={`w-full bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none border border-gray-700 ${!workoutForm.Workout_Type ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select Targeted Muscle</option>
                                    {availableMuscleGroups.map((muscle) => (
                                        <option key={muscle} value={muscle}>{muscle}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-6 text-gray-400">
                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="text-sm text-gray-300 mb-1 block">Equipment Available</label>
                                <select
                                    name="Equipment_Available"
                                    onChange={handleWorkoutChange}
                                    required
                                    className="w-full bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none border border-gray-700"
                                >
                                    <option value="">Select Equipment</option>
                                    {equipmentOptions.map((equipment) => (
                                        <option key={equipment} value={equipment}>{equipment}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-6 text-gray-400">
                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-sm text-gray-300 mb-1 block">Experience Level</label>
                                <select
                                    name="Experience"
                                    onChange={handleWorkoutChange}
                                    required
                                    disabled={!workoutForm.Equipment_Available}
                                    className={`w-full bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none border border-gray-700 ${!workoutForm.Equipment_Available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select Experience Level</option>
                                    {availableExperienceLevels.map((exp) => (
                                        <option key={exp} value={exp}>{exp}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-6 text-gray-400">
                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Get Workout Plan"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Display Workout Plan Results */}
                {workoutPlan && (
                    <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-800 shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
                            Your Personalized Workout Plan
                        </h2>

                        {workoutPlan.error ? (
                            <div className="bg-red-900/30 p-4 rounded-lg border border-red-800 text-red-300">
                                <p>{workoutPlan.error}</p>
                            </div>
                        ) : workoutPlan.message ? (
                            <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                                <p>{workoutPlan.message}</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Workout Exercise Details */}
                                <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-5 text-gray-100">Exercise Details</h3>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1 bg-gradient-to-br from-orange-600/20 to-red-600/20 p-5 rounded-lg border border-orange-700/30">
                                            <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Exercise</p>
                                            <p className="text-2xl font-bold text-orange-500">{workoutPlan.Exercise}</p>
                                        </div>
                                        <div className="flex-1 bg-gray-800 p-5 rounded-lg border border-gray-700">
                                            <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Sets</p>
                                            <p className="text-2xl font-bold text-orange-500">{workoutPlan.Sets}</p>
                                        </div>
                                        <div className="flex-1 bg-gray-800 p-5 rounded-lg border border-gray-700">
                                            <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Reps</p>
                                            <p className="text-2xl font-bold text-orange-500">{workoutPlan.Min_Reps} - {workoutPlan.Max_Reps}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Workout Parameters */}
                                <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-5 text-gray-100">Workout Parameters</h3>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                                            <p className="text-sm text-gray-400 mb-1">Workout Type</p>
                                            <p className="text-xl font-bold text-white">{workoutForm.Workout_Type}</p>
                                        </div>
                                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                                            <p className="text-sm text-gray-400 mb-1">Targeted Muscle</p>
                                            <p className="text-xl font-bold text-white">{workoutForm.Targeted_Muscle}</p>
                                        </div>
                                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                                            <p className="text-sm text-gray-400 mb-1">Equipment</p>
                                            <p className="text-xl font-bold text-white">{workoutForm.Equipment_Available}</p>
                                        </div>
                                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                                            <p className="text-sm text-gray-400 mb-1">Experience</p>
                                            <p className="text-xl font-bold text-white">{workoutForm.Experience}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Intensity and Duration */}
                                <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-5 text-gray-100">Workout Metrics</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 p-5 rounded-lg border border-orange-700/30">
                                            <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Intensity</p>
                                            <p className="text-2xl font-bold text-orange-500">{workoutPlan.Intensity}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 p-5 rounded-lg border border-orange-700/30">
                                            <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Duration</p>
                                            <p className="text-2xl font-bold text-orange-500">{workoutPlan.Duration} min</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-6">
                                    <button
                                        onClick={() => {
                                            setWorkoutPlan(null);
                                            setWorkoutForm({
                                                Workout_Type: "",
                                                Targeted_Muscle: "",
                                                Equipment_Available: "",
                                                Experience: ""
                                            });
                                        }}
                                        className="text-gray-400 hover:text-orange-400 text-sm underline underline-offset-2"
                                    >
                                        Reset and try again
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkoutPlan;