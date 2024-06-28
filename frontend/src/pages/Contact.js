import React from 'react'
import Layout from '../components/layout/Layout'

const Contact = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight:"70vh"
        }}
      >
        <div className='contact-us' style={{ width: "50%" }}>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about the website, please contact
            us at:
          </p>
          <ul>
            <li>Email: pankajmandalplt58@gmail.com</li>
            <li>Phone: +91 9102741711</li>
            <li>Address: Surat, Gujarat</li>
          </ul>

          <p>
            Thank you for using Grabit. We are committed to
            protecting your privacy and ensuring a secure online experience.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Contact
