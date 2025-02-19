import React, { useState, Fragment } from "react";
import imageBanner from "../images/contactUs.jpg";
import Header from "../components/Header";

export default function Contact() {
  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    name:"",
    message:"",
    phnumber:""
  });
  

  // Handle input change
  const handleChange = (e) => {
    setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message); // Show success message
      setFormData({ name: "", message: "", email: "",phnumber:"" }); // Reset form
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  // Style objects
  const containerStyle = {
    textAlign: 'center',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '50px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    display: 'block',
  };

  const buttonStyle = {
    textAlign: 'center',
    width: '50%',
    padding: '15px',
    margin: '100px auto 200px',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    display: 'block', 
  };

  const h3Style = {
    textAlign: 'center',
    fontWeight: 'bold',
    display: 'block',
  };

  const bannerStyle = {
    backgroundSize: 'cover',
    height: '300px', // Adjust the initial height as needed
  };

  return (
    <Fragment>
      <Header />
      <div className="banner banner5">
        <div className="container">
          <h2>Contact</h2>
        </div>
      </div>
      <div style={containerStyle} className="contact">
        <div className="container">
          <img src={imageBanner} style={bannerStyle} alt="" />
          <div className="contact-info">
            <h3 style={h3Style} className="c-text">
              Feel Free to contact with us!!!
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="contact-grids">
            <div className="col-md-4 contact-grid-left">
              <h3 style={h3Style}>Name :</h3>
              <input
                style={inputStyle}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name here ..."
                required
              />
            </div>
            <div className="col-md-4 contact-grid-middle">
              <h3 style={h3Style}>Message :</h3>
              <input
                style={inputStyle}
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter Message here ..."
                required
              />
            </div>
            <div className="col-md-4 contact-grid-right">
              <h3 style={h3Style}>E-mail :</h3>
              <input
                style={inputStyle}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter E-mail here ..."
                required
              />
            </div>
            <div className="mt-3">
              <button style={buttonStyle} className="btn btn-success btn-block loginbtn" type="submit">
                Submit
              </button>
            </div>
            <div className="clearfix"></div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
