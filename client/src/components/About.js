import React from 'react';

function About() {
  const stats = [
    { number: '1+', label: 'Years Experience' },
    { number: '3+', label: 'Major Projects' },
    { number: '30%', label: 'Efficiency Boost' },
    { number: '70+', label: 'Team Members Impacted' }
  ];

  return (
    <section id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            I'm a results-driven System Engineer with expertise in full-stack development, backend architecture, 
            and process automation. Currently working at Infinite Computer Solutions, I specialize in delivering 
            enterprise-level banking platforms and developing internal tools that significantly improve team efficiency.
          </p>
          <p>
            My passion lies in solving complex technical challenges, automating workflows, and mentoring teams. 
            I've been recognized as a Highly Rated Performer for my consistent delivery, strong problem-solving 
            abilities, and commitment to knowledge sharing.
          </p>
          <p>
            With a strong foundation in .NET Core, React.js, and cloud technologies, I build scalable solutions 
            that drive business value and enhance user experiences.
          </p>
        </div>
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
