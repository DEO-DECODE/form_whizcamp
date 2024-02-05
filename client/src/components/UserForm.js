// UserForm.jsx
import React, { useState } from "react";
import "../UserForm.css";
const UserForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    education: "",
    skills: [],
    workplace: "",
    hobbies: [],
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSkillsChange = (e) => {
    const { value } = e.target;
    const skillsArray = value.replace(/,/g, " ").split(/\s+/);
    setFormData((prevData) => ({
      ...prevData,
      skills: skillsArray,
    }));
  };

  const handleHobbiesChange = (e) => {
    const { value } = e.target;
    const hobbiesArray = value.replace(/,/g, " ").split(/\s+/);
    setFormData((prevData) => ({
      ...prevData,
      hobbies: hobbiesArray,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const responseData = await response.json(); // Log the response data
        console.log(responseData);

        if (responseData.errors) {
          // Handle validation errors
          const errorMessages = responseData.errors
            .map((error) => error.message)
            .join("\n");
          alert(`Validation Error:\n${errorMessages}`);
        } else {
          // Handle other types of errors
          alert(responseData.message || "Something went wrong");
        }

        return;
      }

      const data = await response.json();

      if (response.ok && data.success) {
        alert("User Registered");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          education: "",
          skills: "",
          workplace: "",
          hobbies: "",
          password: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h2 className="formHeading">Please Enter Your Details</h2>
        <div className="formName">
          <div className="firstName">
            <label className="form-label" htmlFor="name">
              First Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>

          <div className="lastName">
            <label className="form-label" htmlFor="name">
              Last Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="formSelect">
          <label className="form-label">Education:</label>
          <select
            className="form-select"
            name="education"
            value={formData.education}
            onChange={handleChange}
          >
            <option value="">Select Education</option>
            <option value="B.E">B.E</option>
            <option value="B.TECH">B.TECH</option>
            <option value="DIPLOMA">DIPLOMA</option>
          </select>
        </div>

        <div className="formText">
          <label className="form-label" htmlFor="skills">
            Skills:
          </label>
          <input
            type="text"
            id="skills"
            className="form-control"
            name="skills"
            value={formData.skills}
            onChange={handleSkillsChange}
          />
        </div>

        <div className="formText">
          <label className="form-label" htmlFor="address">
            Workplace:
          </label>
          <input
            type="text"
            id="address"
            className="form-control"
            name="workplace"
            value={formData.workplace}
            onChange={handleChange}
          />
        </div>
        <div className="formText">
          <label className="form-label" htmlFor="hobbies">
            Hobbies:
          </label>
          <input
            type="text"
            id="hobbies"
            className="form-control"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleHobbiesChange}
          />
        </div>
        <div className="formText">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="formText">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="formBtn">
          click to proceed
        </button>
      </form>
    </div>
  );
};

export default UserForm;
