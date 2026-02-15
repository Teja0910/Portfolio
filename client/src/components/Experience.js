import React from 'react';

function Experience() {
  const experiences = [
    {
      title: 'System Engineer & Staging Analyst',
      company: 'Infinite Computer Solutions',
      date: 'August 2024 - Present | Hyderabad, Telangana',
      responsibilities: [
        'Configure Digital – Banking Web Platforms: Delivered and supported multiple client banking websites until go-live, contributing to backend development, staging operations, and post-deployment support.',
        'Backend & Integration Development: Developed and enhanced backend modules using .NET Core Web API and SQL Server, implemented business logic, fixed production issues, and onboarded the team on end-to-end business integration flows.',
        'Internal Tool Development: Designed and built an internal tracking tool from scratch that replaced multiple Excel-based trackers, improving team-wide visibility and reducing manual coordination overhead by 30% across a 70+ member team.',
        'Process Automation: Automated daily client inquiry tracking using PDA-generated Excel reports and handled Excel-based data validation and staging activities, eliminating manual status checks and ensuring up-to-date reporting for stakeholders.',
        'Conduent – Project Estimation Tool: Built a project estimation and analytics tool using WPF and SQL Server, enabling effort, cost, and timeline estimation with graphical dashboards and PDF-based summarized reports.'
      ]
    }
  ];

  return (
    <section id="experience">
      <h2 className="section-title">Professional Experience</h2>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <h3 className="experience-title">{exp.title}</h3>
              <p className="experience-company">{exp.company}</p>
              <p className="experience-date">{exp.date}</p>
            </div>
            <ul>
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
