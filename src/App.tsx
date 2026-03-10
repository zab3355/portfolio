import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import './assets/fonts/fonts.css';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Blog from './pages/blog/blog';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import { lightTheme } from './shared/styles/lightTheme';
import { darkTheme } from './shared/styles/darkTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { mindexConstants, sandboxUnionConstants, theShoreConstants, weatherWatcherConstants, wegmansConstants, OsmoseConstants, SiConstants } from './shared/constants/constants';
import WorkTemplate from './pages/work/workTemplate';
import ProjectTemplate from './pages/work/ProjectTemplate';
import { miseData, nbcUniversalData } from './data/projectData';
import CustomCursor from './shared/components/CustomCursor';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CustomCursor />
      <ThemeProviderWrapper>
        <CssBaseline />
        <BrowserRouter>
          <Navbar onThemeChange={handleThemeChange} isDarkMode={isDarkMode} />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="/nbcUniversal" element={<ProjectTemplate {...nbcUniversalData} />} />
              <Route path="/mindex" element={<WorkTemplate {...mindexConstants} />} />
              <Route path="/sandboxUnion" element={<WorkTemplate {...sandboxUnionConstants} />} />
              <Route path="/wegmans" element={<WorkTemplate {...wegmansConstants} />} />
              <Route path="/osmose" element={<WorkTemplate {...OsmoseConstants} />} />
              <Route path="/si" element={<WorkTemplate {...SiConstants} />} />
              <Route path="/theShore" element={<WorkTemplate {...theShoreConstants} />} />
              <Route path="/weatherWatcher" element={<WorkTemplate {...weatherWatcherConstants} />} />
              <Route path="/mise" element={<ProjectTemplate {...miseData} />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </ThemeProviderWrapper>
    </ThemeProvider>

  );
};

export default App;