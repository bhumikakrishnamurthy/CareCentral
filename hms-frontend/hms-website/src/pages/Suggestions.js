import React, { useState, useEffect, Fragment } from "react";
import imageBanner from "../images/contactUs.jpg";
import Header from "../components/Header";

export default function Suggestions() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:5001/contact"); // Ensure your backend is running
        const data = await response.json();
        setContacts(data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);
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
          <h2>Suggestions</h2>
        </div>
      </div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {contacts.length === 0 ? (
          <p>No suggestions available.</p>
        ) : (
          contacts.map((contact, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <p>
                <strong>Suggestions:</strong> {contact.message}
              </p>
            </div>
          ))
        )}
      </div>
    
    </Fragment>
  );
}
