import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import { projects } from '../../data/projects';
import './ProjectsSection.css';

const ProjectsSection = () => {
  return (
    <section className="projects-section section" id="projects">
      <div className="container">
        <SectionTitle
          subtitle="My Work"
          title="Featured Projects"
        />

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Card key={project.id} className="project-card">
              <div className="project-image-container">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="project-image"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x400/2a2a2a/ff6b35?text=${encodeURIComponent(project.title)}`;
                  }}
                />
                <motion.div
                  className="project-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Project
                  </a>
                </motion.div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {project.tags && project.tags.length > 0 && (
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
