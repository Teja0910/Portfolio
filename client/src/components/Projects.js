import React from 'react';

function Projects() {
  const projects = [
    {
      title: 'Infinite Status Dashboard',
      description: 'A full-stack internal enterprise tool designed from scratch using ASP.NET Core MVC for tracking real-time project and team status. The dashboard replaced multiple manual Excel trackers, improved visibility across a large team, and reduced duplicate data maintenance.',
      tags: ['ASP.NET Core MVC', 'Azure', 'SQL Server', 'Excel Integration']
    },
    {
      title: 'Client Inquiry Automation',
      description: 'Automated daily client inquiry tracking by extracting data using PDA tools and processing it through VB scripts in Excel. This system generates structured and up-to-date reports, eliminating manual status checks and ensuring accurate daily reporting for stakeholders.',
      tags: ['VB Scripts', 'Excel Automation', 'PDA Tools', 'Reporting']
    },
    {
      title: 'Project Estimation Tool',
      description: 'A desktop-based estimation tool using WPF and SQL Server to calculate project effort, cost, resources, and timelines. Features graphical visualizations and generates summarized reports with PDF export functionality to support project planning and decision-making.',
      tags: ['WPF', 'SQL Server', 'Data Visualization', 'PDF Export']
    }
  ];

  return (
    <section id="projects">
      <h2 className="section-title">Key Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-header">
              <h3>{project.title}</h3>
            </div>
            <div className="project-body">
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
