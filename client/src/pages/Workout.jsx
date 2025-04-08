import React, { useState } from 'react';
import axios from "axios";
import { Home } from "lucide-react";

function Workout() {
    const [formData, setFormData] = useState({
        Age: "",
        Gender: "",
        Weight: "",
        Height: ""
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateBMI = () => {
        const weight = parseFloat(formData.Weight);
        const height = parseFloat(formData.Height);

        if (weight && height) {
            return (weight / (height * height)).toFixed(1);
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Calculate BMI and add it to the data before sending
        const bmi = calculateBMI();
        const dataWithBMI = { ...formData, BMI: bmi };

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", dataWithBMI);
            setResult({
                ...response.data,
                calculatedBMI: bmi
            });
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const navigateToHome = () => {
        window.location.href = "/";
    };

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

                <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-800 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-center text-white">
                        Enter Your Details
                    </h2>

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="text-sm text-gray-300 mb-1 block">Age</label>
                                <input
                                    type="number"
                                    name="Age"
                                    placeholder="Enter your age"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition border border-gray-700"
                                />
                            </div>

                            <div className="relative">
                                <label className="text-sm text-gray-300 mb-1 block">Gender</label>
                                <select
                                    name="Gender"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none border border-gray-700"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
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
                                <label className="text-sm text-gray-300 mb-1 block">Weight (kg)</label>
                                <input
                                    type="number"
                                    name="Weight"
                                    placeholder="e.g., 70.5"
                                    step="0.01"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition border border-gray-700"
                                />
                            </div>

                            <div className="relative">
                                <label className="text-sm text-gray-300 mb-1 block">Height (m)</label>
                                <input
                                    type="number"
                                    name="Height"
                                    placeholder="e.g., 1.75"
                                    step="0.01"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition border border-gray-700"
                                />
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
                                    "Predict Workout"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Display Predicted Workout Type with Details */}
                {result && (
                    <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-800 shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
                            Your Personalized Workout Plan
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                                <h3 className="text-xl font-semibold mb-5 text-gray-100">Workout Recommendation</h3>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 bg-gray-800 p-5 rounded-lg border border-gray-700">
                                        <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Recommended Workout</p>
                                        <p className="text-2xl font-bold text-orange-500">{result["Predicted Workout Type"]}</p>
                                    </div>
                                    <div className="flex-1 bg-gray-800 p-5 rounded-lg border border-gray-700">
                                        <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Est. Calories Burned</p>
                                        <p className="text-2xl font-bold text-orange-500">{result["Estimated Calories Burned"]} kcal</p>
                                    </div>
                                    <div className="flex-1 bg-gray-800 p-5 rounded-lg border border-gray-700">
                                        <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Water Intake</p>
                                        <p className="text-2xl font-bold text-orange-500">
                                            {Number(result["Recommended Water Intake"]).toFixed(2)} liters
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700">
                                <h3 className="text-xl font-semibold mb-5 text-gray-100">Your Body Metrics</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                                        <p className="text-sm text-gray-400 mb-1">Age</p>
                                        <p className="text-xl font-bold text-white">{formData.Age}</p>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                                        <p className="text-sm text-gray-400 mb-1">Gender</p>
                                        <p className="text-xl font-bold text-white">{formData.Gender === "1" ? "Male" : "Female"}</p>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                                        <p className="text-sm text-gray-400 mb-1">Weight</p>
                                        <p className="text-xl font-bold text-white">{formData.Weight} kg</p>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                                        <p className="text-sm text-gray-400 mb-1">Height</p>
                                        <p className="text-xl font-bold text-white">{formData.Height} m</p>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                                        <p className="text-sm text-gray-400 mb-1">BMI</p>
                                        <p className="text-xl font-bold text-white">{result.calculatedBMI}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-6">
                                <button
                                    onClick={() => {
                                        setResult(null);
                                        setFormData("");
                                    }}
                                    className="text-gray-400 hover:text-orange-400 text-sm underline underline-offset-2"
                                >
                                    Reset and try again
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Workout;