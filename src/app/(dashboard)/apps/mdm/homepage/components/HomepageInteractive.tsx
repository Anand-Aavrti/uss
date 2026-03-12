'use client';
import React from 'react';
import HeroSection from './HeroSection';
import Featuresshowcase from './Featuresshowcase';
import Securitydeepdive from './Securitydeepdive';
import Platformcompatibility from './Platformcompatibility';
import Testimonials from './Testimonials';
import Trustedbycarousel from './Trustedbycarousel';

export default function HomepageInteractive() {
  return (
    <div>
      <HeroSection />
      <Featuresshowcase />
      <Securitydeepdive />
      <Platformcompatibility />
      <Testimonials />
      <Trustedbycarousel />
    </div>
  );
}
