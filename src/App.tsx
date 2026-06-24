import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import './assets/fonts/fonts.css';
import Layout from './components/Layout';
import { lightTheme } from './shared/styles/lightTheme';
import { darkTheme } from './shared/styles/darkTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { mindexConstants, sandboxUnionConstants, theShoreConstants, weatherWatcherConstants, wegmansConstants, OsmoseConstants, SiConstants } from './shared/constants/constants';
import { miseData, nbcUniversalData } from './data/projectData';
import CustomCursor from './shared/components/CustomCursor';
import AppLoader from './shared/components/AppLoader';
import { AppLoadProvider } from './context/AppLoadContext';

const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/blog/blog'));
const BlogDetail = lazy(() => import('./pages/blog/blogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const WorkTemplate = lazy(() => import('./pages/work/workTemplate'));
const ProjectTemplate = lazy(() => import('./pages/work/ProjectTemplate'));

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
          <AppLoadProvider>
            <AppLoader />
            <Navbar onThemeChange={handleThemeChange} isDarkMode={isDarkMode} />
            <Suspense fallback={null}>
              <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogDetail />} />
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
          </Suspense>
          </AppLoadProvider>
        </BrowserRouter>
        <Footer />
      </ThemeProviderWrapper>
    </ThemeProvider>

  );
};

export default App;