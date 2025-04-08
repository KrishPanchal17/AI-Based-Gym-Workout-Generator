import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
    const navigate = useNavigate();

    const navigateToPredict = () => {
        navigate("/predict");
    };

    const navigateToRecommend = () => {
        navigate("/get_workout_plan");
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const buttonHover = {
        rest: { scale: 1 },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const pulseAnimation = {
        scale: [1, 1.02, 1],
        transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex justify-center items-center p-4 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-orange-600 filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-red-600 filter blur-3xl"></div>
                </div>
            </div>

            <motion.div
                className="max-w-4xl w-full relative z-10"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-12"
                    variants={fadeIn}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 10,
                            ease: "easeInOut",
                            repeat: Infinity
                        }}
                    >
                        AI WORKOUT PLAN PREDICTOR
                    </motion.h1>
                    <motion.p
                        className="text-gray-300 text-lg max-w-2xl mx-auto"
                        variants={fadeIn}
                    >
                        Get personalized workout recommendations based on your body metrics and fitness goals
                    </motion.p>
                </motion.div>

                {/* Main Container */}
                <motion.div
                    className="bg-gray-900/80 border border-gray-800/80 rounded-2xl shadow-2xl overflow-hidden p-8"
                    variants={fadeIn}
                    animate={pulseAnimation}
                >
                    <div className="space-y-6">
                        <motion.h2
                            className="text-2xl font-semibold mb-6 text-center"
                            variants={fadeIn}
                        >
                            Choose an Option
                        </motion.h2>

                        {/* Two Main Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.button
                                onClick={navigateToPredict}
                                className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-8 px-6 rounded-lg overflow-hidden flex flex-col items-center justify-center group"
                                variants={buttonHover}
                                initial="rest"
                                whileHover="hover"
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-white/10 group-hover:opacity-100 transition-opacity"></div>
                                <motion.div
                                    className="text-2xl mb-2 relative z-10"
                                    animate={{
                                        textShadow: ["0 0 8px rgba(255,255,255,0)", "0 0 15px rgba(255,255,255,0.5)", "0 0 8px rgba(255,255,255,0)"]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity
                                    }}
                                >
                                    Predict Workout
                                </motion.div>
                                <p className="text-sm text-gray-200 relative z-10">Find your ideal workout type based on body metrics</p>
                                <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-0 group-hover:w-full transition-all duration-300"></div>
                            </motion.button>

                            <motion.button
                                onClick={navigateToRecommend}
                                className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-8 px-6 rounded-lg overflow-hidden flex flex-col items-center justify-center group"
                                variants={buttonHover}
                                initial="rest"
                                whileHover="hover"
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <motion.div
                                    className="text-2xl mb-2 relative z-10"
                                    animate={{
                                        textShadow: ["0 0 8px rgba(255,255,255,0)", "0 0 15px rgba(255,255,255,0.5)", "0 0 8px rgba(255,255,255,0)"]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: 1.5
                                    }}
                                >
                                    Get Workout Plan
                                </motion.div>
                                <p className="text-sm text-gray-200 relative z-10">Get a detailed workout plan based on your preferences</p>
                                <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-0 group-hover:w-full transition-all duration-300"></div>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        {
                            title: "Personalized",
                            desc: "Workouts tailored to your specific body metrics and fitness level",
                            delay: 0.3
                        },
                        {
                            title: "AI-Powered",
                            desc: "Machine learning algorithms analyze your data for optimal workout plans",
                            delay: 0.5
                        },
                        {
                            title: "Detailed Plans",
                            desc: "Get complete workout routines with sets, reps, and intensity guidelines",
                            delay: 0.7
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/80 hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden group"
                            variants={fadeIn}
                            transition={{ delay: feature.delay }}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.2)" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <motion.div
                                className="text-orange-500 text-xl font-bold mb-3 relative z-10"
                                animate={{
                                    color: ["#f97316", "#ef4444", "#f97316"]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: index
                                }}
                            >
                                {feature.title}
                            </motion.div>
                            <p className="text-gray-300 relative z-10">{feature.desc}</p>
                            <div className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default HomePage;