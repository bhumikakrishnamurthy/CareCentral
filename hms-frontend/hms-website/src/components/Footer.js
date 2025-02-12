import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"


export default function Footer() {
  return (
    <footer >
<div className="footer">
    <div className="container">
      <div className="col-md-6 footer-left">
        <ul>
        <li><CustomLink to="/" >Home</CustomLink></li>
        <li><CustomLink to="/About">About</CustomLink></li>
        <li><CustomLink to="/Contact" >Contact</CustomLink></li>
        <li><CustomLink to="/Services" >Services</CustomLink></li>
        <li><CustomLink to="/Login" >Login </CustomLink></li>
        <li><CustomLink to="/SignUp">SignUp </CustomLink></li>
        <li><CustomLink to="https://www.health.harvard.edu/blog" external>Blog</CustomLink></li>
        </ul>
      </div>
      <div className="col-md-3 footer-middle">
        <h3>Address</h3>
        <div className="address">
          <p>R V College of Engineering, 
              R V Vidyanikethan Post, 
              Mysuru Road, Bengaluru - 560 059
          </p>
        </div>
        <div className="phone">
          <p>1234567890</p>
        </div>
      </div>
      <div className="col-md-3 footer-right">
        <h3>DBMS Project</h3>
        <p>A HealthCare Management System is a robust software solution tailored to optimize and simplify the management tasks within healthcare facilities. It facilitates the seamless handling of patient data, encompassing registration, medical history, appointments, treatments, and billing information, thereby ensuring efficient operations and improved patient care.</p>
      </div>
      <div className="clearfix"> </div> 
    </div>
  </div>
<div className="copyright">
    <div className="container">
      <div className="copyright-left">
      <p>© 2023 Patient Management System </p>
      </div>
      <div className="copyright-right">
        <ul>
          <li><a href="#" className="twitter"> </a></li>
          <li><a href="#" className="twitter facebook"> </a></li>
          <li><a href="#" className="twitter chrome"> </a></li>
          <li><a href="#" className="twitter pinterest"> </a></li>
          <li><a href="#" className="twitter linkedin"> </a></li>
          <li><a href="#" className="twitter dribbble"> </a></li>
        </ul>
      </div>
      <div className="clearfix"> </div>
      
    </div>

    </div>
</footer>
  )
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
