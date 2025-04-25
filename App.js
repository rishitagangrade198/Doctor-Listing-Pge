import React, { useState, useEffect } from "react";
import axios from "axios";  // Axios is used to make HTTP requests

function App() {
  // State for storing doctor data
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  // For search input
  const [consultationType, setConsultationType] = useState("");  // For radio button filter
  const [specialties, setSpecialties] = useState([]);  // For multi-select specialties
  const [sortBy, setSortBy] = useState("experience");  // Sort by fees or experience

  // Fetch doctor data when page loads
  useEffect(() => {
    axios
      .get("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json") // API URL
      .then((response) => {
        setDoctors(response.data);  // Set doctor data
        setFilteredDoctors(response.data);  // Set filtered doctors initially to all
      })
      .catch((error) => console.error(error));  // Handle any errors
  }, []);  // Empty dependency array means it runs only once when the component mounts

  // Handle search term change (filter doctors by name)
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);  // Set the search term

    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(term.toLowerCase())  // Filter by name
    );
    setFilteredDoctors(filtered);  // Update filtered doctors list
  };

  // Handle consultation type change (radio button filter)
  const handleConsultationChange = (event) => {
    const type = event.target.value;
    setConsultationType(type);  // Set selected consultation type

    let filtered = [...doctors];
    if (type) {
      filtered = filtered.filter(
        (doctor) => doctor.consultationType === type  // Filter by selected type
      );
    }
    setFilteredDoctors(filtered);  // Update filtered doctors list
  };

  // Handle specialty selection (multi-select filter)
  const handleSpecialtyChange = (event) => {
    const value = event.target.value;
    setSpecialties((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)  // Remove if already selected
        : [...prev, value]  // Add if not selected
    );
  };

  // Handle sorting by fees or experience
  const handleSort = (event) => {
    setSortBy(event.target.value);  // Set sorting preference (either "fees" or "experience")
  };

  // Sort doctors based on selected criteria (fees or experience)
  const sortedDoctors = filteredDoctors.sort((a, b) => {
    if (sortBy === "fees") {
      return a.fee - b.fee;  // Sort by fees (ascending)
    }
    return b.experience - a.experience;  // Sort by experience (descending)
  });

  return (
    <div>
      <h1>Doctor Listing</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Doctor"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Filters */}
      <div>
        <h3>Consultation Type</h3>
        <label>
          <input
            type="radio"
            value="Video Consult"
            checked={consultationType === "Video Consult"}
            onChange={handleConsultationChange}
          />
          Video Consult
        </label>
        <label>
          <input
            type="radio"
            value="In Clinic"
            checked={consultationType === "In Clinic"}
            onChange={handleConsultationChange}
          />
          In Clinic
        </label>
      </div>

      <div>
        <h3>Specialties</h3>
        {[
          "General Physician",
          "Dentist",
          "Dermatologist",
          "Paediatrician",
          "Gynaecologist",
          "ENT",
          "Diabetologist",
          "Cardiologist",
          "Physiotherapist",
          "Endocrinologist",
          "Orthopaedic",
          "Ophthalmologist",
          "Gastroenterologist",
          "Pulmonologist",
          "Psychiatrist",
          "Urologist",
          "Dietitian/Nutritionist",
          "Psychologist",
          "Sexologist",
          "Nephrologist",
          "Neurologist",
          "Oncologist",
          "Ayurveda",
          "Homeopath",
        ].map((specialty) => (
          <label key={specialty}>
            <input
              type="checkbox"
              value={specialty}
              onChange={handleSpecialtyChange}
            />
            {specialty}
          </label>
        ))}
      </div>

      <div>
        <h3>Sort By</h3>
        <label>
          <input
            type="radio"
            value="fees"
            checked={sortBy === "fees"}
            onChange={handleSort}
          />
          Fees (Ascending)
        </label>
        <label>
          <input
            type="radio"
            value="experience"
            checked={sortBy === "experience"}
            onChange={handleSort}
          />
          Experience (Descending)
        </label>
      </div>

      {/* Doctor Cards */}
      <div>
        {sortedDoctors.map((doctor) => (
          <div key={doctor.id}>
            <h2>{doctor.name}</h2>
            <p>Specialties: {doctor.specialty && Array.isArray(doctor.specialty) ? doctor.specialty.join(", ") : "No specialties available"}</p>
            <p>Experience: {doctor.experience} years</p>
            <p>Fees: ₹{doctor.fee}</p>
            <p>Consultation Type: {doctor.consultationType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
// Paste your React component code here after create-react-app
