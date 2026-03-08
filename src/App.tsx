import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import './assets/fonts/fonts.css';
import Home from './pages/home';
import Portfolio from './pages/portfolio';
import Blog from './pages/blog/blog';
import Contact from './pages/contact';
import Layout from './components/layout';
import { lightTheme } from './shared/styles/lightTheme';
import { darkTheme } from './shared/styles/darkTheme';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { ThemeProviderWrapper } from './context/ThemeContext';
import PersonalTemplate from './pages/personal/personalTemplate';
import { mindexConstants, underConstructionConstants, sandboxUnionConstants, theShoreConstants, weatherWatcherConstants, wegmansConstants, OsmoseConstants, SiConstants } from './shared/constants/constants';
import WorkTemplate from './pages/work/workTemplate';
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
              <Route path="/nbcUniversal" element={<WorkTemplate {...underConstructionConstants} />} />
              <Route path="/mindex" element={<WorkTemplate {...mindexConstants} />} />
              <Route path="/sandboxUnion" element={<WorkTemplate {...sandboxUnionConstants} />} />
              <Route path="/wegmans" element={<WorkTemplate {...wegmansConstants} />} />
              <Route path="/osmose" element={<WorkTemplate {...OsmoseConstants} />} />
              <Route path="/si" element={<WorkTemplate {...SiConstants} />} />
              <Route path="/theShore" element={<WorkTemplate {...theShoreConstants} />} />
              <Route path="/weatherWatcher" element={<WorkTemplate {...weatherWatcherConstants} />} />
              <Route path="/theShore" element={<PersonalTemplate {...theShoreConstants} />} />
              <Route path="/weatherWatcher" element={<PersonalTemplate {...weatherWatcherConstants} />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </ThemeProviderWrapper>
    </ThemeProvider>

  );
};

export default App;