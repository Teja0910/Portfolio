import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contact() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current visitor count and increment it
    const fetchAndIncrementVisitorCount = async () => {
      try {
        // Increment the visitor count
        const response = await axios.post('/api/visitors/increment');
        setVisitorCount(response.data.count);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setLoading(false);
      }
    };

    fetchAndIncrementVisitorCount();
  }, []);

  return (
    <section id="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-content">
        <p>
          I'm always interested in hearing about new opportunities, collaborations, or just having a chat 
          about technology and innovation. Feel free to reach out!
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <span>📧 Email:</span>
            <a href="mailto:tejamanisubhash.ch@gmail.com">tejamanisubhash.ch@gmail.com</a>
          </div>
          <div className="contact-item">
            <span>📱 Phone:</span>
            <a href="tel:+919121956692">+91 9121956692</a>
          </div>
          <div className="contact-item">
            <span>📍 Location:</span>
            <span>Hyderabad, Telangana, India</span>
          </div>
        </div>

        {/* Visitor Counter */}
        <div className="visitor-counter">
          <h3>Portfolio Visitors</h3>
          {loading ? (
            <div className="loading"></div>
          ) : (
            <div className="visitor-count">{visitorCount.toLocaleString()}</div>
          )}
          <p>Thank you for visiting my portfolio!</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
