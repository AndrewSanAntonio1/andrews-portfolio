import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import CustomCursor from './components/CustomCursor';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App">
          <CustomCursor />
          {isLoading ? (
            <LoadingScreen onComplete={handleLoadingComplete} />
          ) : (
            <>
              <Navbar />
              <main>
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <SkillsSection />
                <ContactSection />
              </main>
              <footer className="footer">
                <div className="container">
                  <p className="footer-text">
                    © {new Date().getFullYear()} Andrew San Antonio. All rights reserved.
                  </p>
                </div>
              </footer>
            </>
          )}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
