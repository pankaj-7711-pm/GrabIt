import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div
        style={{
          padding: "2px 2rem",
          // width: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "2rem",
            // width: "70%",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // flexDirection: "column",
            textAlign:"justify"
          }}
          className="privacy-policy"
        >
          <h1>Privacy Policy</h1>

          <h2>Introduction</h2>
          <p>
            Welcome to GrabIt! Your privacy is critically important to us. This
            Privacy Policy outlines the types of information we collect from
            you, how we use that information, and the steps we take to ensure
            your data is protected.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            When you register on our website, we may collect personal
            information such as:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Physical address</li>
          </ul>

          <h3>Non-Personal Information</h3>
          <p>
            We may also collect non-personal information about your interaction
            with our website. This information may include:
          </p>
          <ul>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages visited on our site</li>
            <li>Time and date of visits</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <h3>Personal Information</h3>
          <p>We use your personal information to:</p>
          <ul>
            <li>Create and manage your account</li>
            <li>Provide customer support</li>
            <li>Send promotional emails and updates</li>
            <li>Respond to your inquiries and requests</li>
          </ul>

          <h3>Non-Personal Information</h3>
          <p>Non-personal information helps us improve our website by:</p>
          <ul>
            <li>Analyzing usage trends</li>
            <li>Customizing content and layout</li>
            <li>Enhancing user experience</li>
          </ul>

          <h2>Sharing Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties except in the following
            circumstances:
          </p>
          <ul>
            <li>With your consent</li>
            <li>
              To trusted third parties who assist us in operating our website,
              conducting our business, or serving you, so long as those parties
              agree to keep this information confidential
            </li>
            <li>
              When we believe release is appropriate to comply with the law,
              enforce our site policies, or protect ours or others' rights,
              property, or safety
            </li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. These measures include:
          </p>
          <ul>
            <li>Secure server environments</li>
            <li>Encryption of sensitive information</li>
            <li>Regular security audits</li>
          </ul>
          <p>
            Despite these measures, no method of transmission over the internet
            or method of electronic storage is 100% secure. Therefore, we cannot
            guarantee absolute security.
          </p>

          <h2>Changes to Our Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>

          
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
