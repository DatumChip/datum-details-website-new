import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { GuidePlan } from './components/GuidePlan';
import { RiskVision } from './components/RiskVision';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ServicesPricing } from './components/ServicesPricing';

const Home: React.FC = () => (
  <main>
    <Hero />
    <ProblemSolution />
    <GuidePlan />
    <RiskVision />
    <Testimonials />
  </main>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen w-full overflow-x-hidden flex flex-col justify-between">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<ServicesPricing />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;