import React from 'react';

function Achievements() {
  const achievements = [
    {
      title: '🏆 Highly Rated Performer of the Year',
      description: 'Recognized for consistent delivery, exceptional problem-solving skills, and strong sense of ownership across multiple projects and initiatives.'
    },
    {
      title: '⭐ Star Performer of the Month',
      description: 'Awarded for outstanding contributions, innovative solutions, and going above and beyond in delivering high-quality work.'
    },
    {
      title: '💡 Process Automation Champion',
      description: 'Successfully automated critical workflows, reducing manual effort by 30% and ensuring accurate, timely reporting for stakeholders.'
    },
    {
      title: '👥 Knowledge Sharing & Mentorship',
      description: 'Proactively trained juniors, peers, and tech leads, sharing comprehensive business and technical knowledge to improve team capabilities.'
    },
    {
      title: '🎯 Client Success Partner',
      description: 'Known for strong problem-solving ability and quickly identifying root causes, resulting in fewer client escalations and timely issue resolution.'
    },
    {
      title: '🚀 Innovation Driver',
      description: 'Developed internal tools from scratch that transformed team workflows and improved efficiency across a 70+ member organization.'
    }
  ];

  return (
    <section id="achievements" className="achievements-section">
      <h2 className="section-title">Achievements & Recognition</h2>
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-card">
            <h4>{achievement.title}</h4>
            <p>{achievement.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Achievements;
