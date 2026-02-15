import React from 'react';

function Skills() {
  const skillCategories = [
    {
      category: 'Backend',
      skills: ['.NET Core', 'ASP.NET Core Web API', 'MVC', 'C#', 'EF Core', 'LINQ', 'ADO.NET']
    },
    {
      category: 'Frontend',
      skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3']
    },
    {
      category: 'Databases',
      skills: ['SQL Server', 'PostgreSQL']
    },
    {
      category: 'Tools & Technologies',
      skills: ['Git', 'IIS', 'Azure', 'Excel Automation', 'REST APIs']
    },
    {
      category: 'Core Concepts',
      skills: ['Data Structures', 'OOP', 'API Design', 'Debugging', 'Automation']
    }
  ];

  return (
    <section id="skills">
      <h2 className="section-title">Technical Skills</h2>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.category}</h3>
            <div className="skill-list">
              {category.skills.map((skill, idx) => (
                <span key={idx} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
