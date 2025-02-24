import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import DoctorCard from "../components/Doctors/DoctorCard";

const symptomOptions = [
  { value: "headache", label: "Headache" },
  { value: "blurred_vision", label: "Blurred Vision" },
  { value: "chest_pain", label: "Chest Pain" },
  { value: "shortness_of_breath", label: "Shortness of Breath" },
  { value: "fatigue", label: "Fatigue" },
  { value: "irregular_heartbeat", label: "Irregular Heartbeat" },
  { value: "dizziness", label: "Dizziness" },
  { value: "fainting", label: "Fainting" },
  { value: "swelling_in_legs", label: "Swelling in Legs" },
  { value: "rapid_weight_gain", label: "Rapid Weight Gain" },
  { value: "fever", label: "Fever" },
  { value: "throbbing_headache", label: "Throbbing Headache" },
  { value: "nausea", label: "Nausea" },
  { value: "light_sensitivity", label: "Light Sensitivity" },
  { value: "seizures", label: "Seizures" },
  { value: "loss_of_consciousness", label: "Loss of Consciousness" },
  { value: "confusion", label: "Confusion" },
  { value: "tremors", label: "Tremors" },
  { value: "stiffness", label: "Stiffness" },
  { value: "slow_movement", label: "Slow Movement" },
  { value: "numbness", label: "Numbness" },
  { value: "balance_issues", label: "Balance Issues" },
  { value: "vision_problems", label: "Vision Problems" },
  { value: "memory_loss", label: "Memory Loss" },
  { value: "mood_swings", label: "Mood Swings" },
  { value: "itchy_skin", label: "Itchy Skin" },
  { value: "redness", label: "Redness" },
  { value: "dry_patches", label: "Dry Patches" },
  { value: "thick_red_patches", label: "Thick Red Patches" },
  { value: "silvery_scales", label: "Silvery Scales" },
  { value: "pimples", label: "Pimples" },
  { value: "blackheads", label: "Blackheads" },
  { value: "oily_skin", label: "Oily Skin" },
  { value: "irregular_moles", label: "Irregular Moles" },
  { value: "skin_lesions", label: "Skin Lesions" },
  { value: "facial_redness", label: "Facial Redness" },
  { value: "swollen_bumps", label: "Swollen Bumps" },
  { value: "eye_irritation", label: "Eye Irritation" },
  { value: "frequent_urination", label: "Frequent Urination" },
  { value: "thirst", label: "Thirst" },
  { value: "weight_gain", label: "Weight Gain" },
  { value: "cold_intolerance", label: "Cold Intolerance" },
  { value: "weight_loss", label: "Weight Loss" },
  { value: "rapid_heartbeat", label: "Rapid Heartbeat" },
  { value: "sweating", label: "Sweating" },
  { value: "purple_stretch_marks", label: "Purple Stretch Marks" },
  { value: "darkening_skin", label: "Darkening Skin" },
  { value: "heartburn", label: "Heartburn" },
  { value: "regurgitation", label: "Regurgitation" },
  { value: "abdominal_pain", label: "Abdominal Pain" },
  { value: "bloating", label: "Bloating" },
  { value: "diarrhea", label: "Diarrhea" },
  { value: "constipation", label: "Constipation" },
  { value: "bloody_diarrhea", label: "Bloody Diarrhea" },
  { value: "cramps", label: "Cramps" },
  { value: "urgency_to_defecate", label: "Urgency to Defecate" },
  { value: "jaundice", label: "Jaundice" },
  { value: "wheezing", label: "Wheezing" },
  { value: "coughing", label: "Coughing" },
  { value: "chronic_cough", label: "Chronic Cough" },
  { value: "mucus_production", label: "Mucus Production" },
  { value: "persistent_cough", label: "Persistent Cough" },
  { value: "night_sweats", label: "Night Sweats" },
  { value: "dry_cough", label: "Dry Cough" },
  { value: "joint_pain", label: "Joint Pain" },
  { value: "swelling", label: "Swelling" },
  { value: "morning_stiffness", label: "Morning Stiffness" },
  { value: "butterfly_rash", label: "Butterfly Rash" },
  { value: "joint_stiffness", label: "Joint Stiffness" },
  { value: "widespread_pain", label: "Widespread Pain" },
  { value: "sleep_issues", label: "Sleep Issues" },
  { value: "pale_skin", label: "Pale Skin" },
  { value: "frequent_infections", label: "Frequent Infections" },
  { value: "prolonged_bleeding", label: "Prolonged Bleeding" },
  { value: "bruising", label: "Bruising" },
  { value: "easy_bruising", label: "Easy Bruising" },
  { value: "bleeding_gums", label: "Bleeding Gums" },
  { value: "petechiae", label: "Petechiae" },
  { value: "lump_in_breast", label: "Lump in Breast" },
  { value: "skin_changes", label: "Skin Changes" },
  { value: "nipple_discharge", label: "Nipple Discharge" },
  { value: "swollen_lymph_nodes", label: "Swollen Lymph Nodes" },
  { value: "blood_in_semen", label: "Blood in Semen" },
  { value: "pelvic_pain", label: "Pelvic Pain" },
  { value: "blood_in_stool", label: "Blood in Stool" },
  { value: "severe_flank_pain", label: "Severe Flank Pain" },
  { value: "blood_in_urine", label: "Blood in Urine" },
  { value: "hypertension", label: "Hypertension" },
  { value: "back_pain", label: "Back Pain" },
  { value: "painful_urination", label: "Painful Urination" },
  { value: "cloudy_urine", label: "Cloudy Urine" },
  { value: "difficulty_urinating", label: "Difficulty Urinating" },
  { value: "weak_stream", label: "Weak Stream" },
  { value: "bladder_issues", label: "Bladder Issues" },
  { value: "difficulty_maintaining_erection", label: "Difficulty Maintaining Erection" },
  { value: "reduced_libido", label: "Reduced Libido" },
  { value: "bone_fractures", label: "Bone Fractures" },
  { value: "loss_of_height", label: "Loss of Height" },
  { value: "spinal_curvature", label: "Spinal Curvature" },
  { value: "tingling", label: "Tingling" },
  { value: "vision_loss", label: "Vision Loss" },
  { value: "red_eyes", label: "Red Eyes" },
  { value: "eye_pain", label: "Eye Pain" },
  { value: "halos_around_lights", label: "Halos Around Lights" },
  { value: "itching", label: "Itching" },
  { value: "discharge", label: "Discharge" },
  { value: "central_vision_loss", label: "Central Vision Loss" },
  { value: "sore_throat", label: "Sore Throat" },
  { value: "loss_of_taste/smell", label: "loss of taste/smell" },
];

const SymptomForm = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [specialistDetails, setSpecialistDetails] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);
    setSpecialistDetails([]); // Reset previous results
  
    try {
      // 1st API Call: Predict disease and specialist
      const response = await axios.post("https://diseases-prediction-doctor-rb8g.onrender.com/predict", {
        symptoms: selectedSymptoms.map((s) => s.value),
      });
  
      setPrediction(response.data);
      console.log("Prediction Response:", response.data);
  
      // Extract specialist name
      const specialistName = response.data.specialist;
  
      // 2nd API Call: Fetch specialist details
      const specialistResponse = await axios.get(
        `https://diseases-prediction-doctor-recommendation.onrender.com/api/v1/doctors/doctorbyspeciality/${specialistName}`
      );
  
      console.log("Raw Specialist Response:", specialistResponse.data);
  
      // Sort doctors by rating (assuming higher rating is better)
      const sortedDoctors = specialistResponse.data.sort((a, b) => b.averageRating - a.averageRating);
  
      setSpecialistDetails(sortedDoctors);
      console.log("Sorted Specialist Details:", sortedDoctors);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch prediction or specialist details.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Disease Prediction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            options={symptomOptions}
            isMulti
            className="w-full"
            placeholder="Select symptoms"
            value={selectedSymptoms}
            onChange={setSelectedSymptoms}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading || selectedSymptoms.length === 0}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {prediction && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <p className="text-lg font-medium text-gray-700">
              <strong>Possible Disease:</strong> {prediction.disease}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Specialist:</strong> {prediction.specialist}
            </p>
          </div>
        )}
      </div>



      {/* Doctors List */}
      <div className="w-10/12 flex flex-col mt-10 justify-center items-center mx-auto">
      <h2 className='heading text-center'>High Rated Recommended Doctors </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-8 mt-6">
        {specialistDetails.length > 0 ? (
          specialistDetails.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No doctors available.
          </p>
        )}
      </div>
      </div>
    </div>
  );
};

export default SymptomForm;
