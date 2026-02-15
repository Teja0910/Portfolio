import React from 'react';

function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>TEJA MANI SUBHASH</h1>
        <h2>System Engineer & Full-Stack Developer</h2>
        <p className="tagline">Building scalable solutions | Automating processes | Delivering excellence</p>
        <button className="cta-button" onClick={scrollToContact}>GET IN TOUCH</button>
      </div>
      <div className="scroll-indicator"></div>
    </section>
  );
}

export default Hero;
