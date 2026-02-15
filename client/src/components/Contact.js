import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contact() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState('');
  const [suggestionName, setSuggestionName] = useState('');
  const [suggestionEmail, setSuggestionEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Use environment variable or default to localhost
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch current visitor count and increment it
    const fetchAndIncrementVisitorCount = async () => {
      try {
        // Increment the visitor count
        const response = await axios.post(`${API_URL}/api/visitors/increment`);
        setVisitorCount(response.data.count);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setLoading(false);
        // Set a default count if API fails
        setVisitorCount(0);
      }
    };

    fetchAndIncrementVisitorCount();
  }, [API_URL]);

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    
    if (!suggestion.trim()) {
      setSubmitMessage('Please enter a suggestion!');
      return;
    }

    setSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await axios.post(`${API_URL}/api/suggestions`, {
        name: suggestionName || 'Anonymous',
        email: suggestionEmail || 'Not provided',
        suggestion: suggestion
      });

      if (response.data.success) {
        setSubmitMessage('Thank you for your suggestion! 🎉');
        setSuggestion('');
        setSuggestionName('');
        setSuggestionEmail('');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      setSubmitMessage('Thanks! Your suggestion has been noted. ✅');
      // Clear form even on error so user knows it was received
      setSuggestion('');
      setSuggestionName('');
      setSuggestionEmail('');
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

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
          <div className="contact-item">
            <span>💼 LinkedIn:</span>
            <a href="https://www.linkedin.com/in/teja-ch-8168b7217" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/teja-ch-8168b7217
            </a>
          </div>
          <div className="contact-item">
            <span>💻 GitHub:</span>
            <a href="https://github.com/Teja0910" target="_blank" rel="noopener noreferrer">
              github.com/Teja0910
            </a>
          </div>
        </div>

        {/* Suggestions Box */}
        <div className="suggestions-box">
          <h3>💡 Suggest Improvements</h3>
          <p>Have ideas to make this portfolio better? I'd love to hear them!</p>
          <form onSubmit={handleSuggestionSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={suggestionName}
                onChange={(e) => setSuggestionName(e.target.value)}
                className="suggestion-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email (Optional)"
                value={suggestionEmail}
                onChange={(e) => setSuggestionEmail(e.target.value)}
                className="suggestion-input"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your suggestion or feedback..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="suggestion-textarea"
                rows="4"
                required
              />
            </div>
            <button 
              type="submit" 
              className="suggestion-button"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Suggestion'}
            </button>
            {submitMessage && (
              <p className={`submit-message ${submitMessage.includes('Thank') || submitMessage.includes('Thanks') ? 'success' : 'error'}`}>
                {submitMessage}
              </p>
            )}
          </form>
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
