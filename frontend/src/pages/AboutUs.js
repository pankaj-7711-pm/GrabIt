import React from 'react'
import Layout from '../components/layout/Layout'

const AboutUs = () => {
    return (
      <Layout>
        <div
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ width: "70%" }}>
            <h3 style={{ fontSize: "3rem" }}>About Us</h3>
            <p style={{ textAlign: "justify", fontSize: "1.1rem" }}>
              Welcome to GrabIt, your go-to platform for local shopping and
              advertisements! We are dedicated to connecting local shops with
              customers in a more efficient and interactive way. Our mission is
              to help local businesses thrive by providing them with a space to
              showcase their products and special offers, while making it easier
              for customers to find the best deals and products in their area.
            </p>
          </div>
          <div style={{ width: "70%" }}>
            <h3 style={{ fontSize: "3rem" }}>Our Vision</h3>
            <p style={{ textAlign: "justify", fontSize: "1.1rem" }}>
              We envision a world where shopping locally is as convenient and
              rewarding as shopping online. By bridging the gap between local
              businesses and customers, we aim to support local economies and
              foster strong community connections.
            </p>
          </div>
          <div style={{ width: "70%" }}>
            <h3 style={{ fontSize: "3rem" }}>What We Offer</h3>
            <ul style={{ textAlign: "justify" }}>
              <li>
                <span>Support Local Businesses:</span>&nbsp;Discover a variety
                of local shops and see what products they offer. Each shop has
                its own dedicated page where you can browse through their
                inventory and find out about any special offers or discounts
                they might have.
              </li>
              <li>
                <span>Product Ratings:</span>&nbsp;Make informed purchasing
                decisions by checking out product ratings. Customers can rate
                and review both the shops and their products, helping you to
                choose the best options available.
              </li>
              <li>
                <span>Seller Ratings:</span>&nbsp;Learn from the experiences of
                other shoppers by viewing seller ratings. Our rating system
                ensures that you can trust the shops you buy from.
              </li>
              <li>
                <span>Live Chat:</span>&nbsp;Have questions about a product or a
                shop? Use our live chat feature to get in touch directly with
                the sellers. This helps you get the information you need without
                having to visit the shop in person, saving you time and reducing
                overcrowding.
              </li>
            </ul>
          </div>
          <div style={{ width: "70%" }}>
            <h3 style={{ fontSize: "3rem" }}>Why Choose Us?</h3>
            <ul style={{ textAlign: "justify" }}>
              <li>
                <span>Support Local Businesses:</span>&nbsp;By using our
                platform, you are directly supporting local businesses, helping
                them to grow and succeed in the competitive market.
              </li>
              <li>
                <span>Convenient Shopping:</span>&nbsp;With detailed shop
                listings, product ratings, and the ability to chat with sellers,
                shopping has never been easier or more convenient.
              </li>
              <li>
                <span>Trusted Reviews:</span>&nbsp;Our community-driven rating
                system ensures that you get honest and reliable reviews from
                real customers.
              </li>
              <li>
                <span>Exclusive Offers:</span>&nbsp;Stay updated on the latest
                offers and discounts from your favorite local shops.
              </li>
            </ul>
          </div>
          <div style={{ width: "70%" }}>
            <h3 style={{ fontSize: "3rem" }}>Join Our Community</h3>
            <p style={{ textAlign: "justify", fontSize: "1.1rem" }}>
              Whether you're a local shop looking to reach more customers or a
              customer seeking the best local deals, GrabIt is the
              place for you. Join our community today and start experiencing the
              benefits of smarter, more connected shopping! Thank you for
              visiting GrabIt. We look forward to serving you and
              making your shopping experience as enjoyable and seamless as
              possible.
            </p>
          </div>
        </div>
      </Layout>
    );
}
export default AboutUs
