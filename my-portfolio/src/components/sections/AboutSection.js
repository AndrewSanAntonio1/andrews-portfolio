import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { skills, monthsOfExperience } from '../../data/skills';
import './AboutSection.css';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="about-section section" id="about">
      <div className="container">
        <SectionTitle
          subtitle="Get to know me"
          title="About Me"
        />

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-paragraph">
              I'm <span className="text-accent">Andrew San Antonio</span>, a passionate Full Stack Java Developer from Pasig City 
              and a 2nd-year college student at JRU. I enjoy building web applications using Java, Spring Boot, HTML, CSS, 
              and JavaScript, and I am also interested in game development and ethical hacking.
            </p>
            <p className="about-paragraph">
              I have experience working on projects involving data structures, UI design, and system development. 
              As a varsity chess player, I bring strategic thinking to my coding approach, and I also enjoy playing soccer 
              to stay active and balanced.
            </p>
            <p className="about-paragraph">
              My hobbies include coding, playing games, traveling, chess, and eating good food. My goal is to become a 
              professional Full Stack Java Developer and eventually work at <span className="text-accent">Google</span> while 
              continuing to build impactful projects and improve my technical skills.
            </p>

            <div className="about-stats">
              <motion.div
                className="stat-item"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="stat-number">{monthsOfExperience}</h3>
                <p className="stat-label">Months Experience</p>
              </motion.div>
              <motion.div
                className="stat-item"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="stat-number">10+</h3>
                <p className="stat-label">Projects Completed</p>
              </motion.div>
              <motion.div
                className="stat-item"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="stat-number">JRU</h3>
                <p className="stat-label">College Student</p>
              </motion.div>
            </div>
          </motion.div>

          <div className="about-skills" id="skills">
            <motion.h3
              className="skills-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Technologies I Work With
            </motion.h3>
            
            <motion.div
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-item"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(255, 107, 53, 0.2)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
