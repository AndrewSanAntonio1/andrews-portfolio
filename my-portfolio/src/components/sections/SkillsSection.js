import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { skillProficiency } from '../../data/skillProficiency';
import './SkillsSection.css';

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
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
    <section className="skills-section section" id="skills-proficiency">
      <div className="container">
        <SectionTitle
          subtitle="My Expertise"
          title="Skills Proficiency"
        />

        <motion.div
          className="skills-proficiency-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillProficiency.map((skill) => (
            <motion.div
              key={skill.id}
              className="skill-proficiency-item"
              variants={itemVariants}
            >
              <div className="skill-header">
                <h4 className="skill-name">{skill.name}</h4>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar-container">
                <motion.div
                  className="skill-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1,
                    delay: 0.3,
                    ease: "easeOut"
                  }}
                />
              </div>
              <span className="skill-category">{skill.category}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
