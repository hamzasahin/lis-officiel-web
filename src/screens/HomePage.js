import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import PromoSection from '../components/PromoSection';
import NewArrivals from '../components/NewArrivals';
import Lookbook from '../components/Lookbook';
import Testimonials from '../components/Testimonials';
import NewsletterSignup from '../components/NewsletterSignup';
import JewelryCareTips from '../components/JewelryCareTips';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturedProducts />
      <PromoSection 
        title="Timeless Elegance"
        subtitle="Discover our exclusive collection of handcrafted pieces"
        description="Each piece in our collection is meticulously crafted to bring out your inner radiance. 
                    From classic designs to contemporary statements, find the perfect piece that speaks to your style."
        image="/images/promo-jewelry.jpg"
      />
      <NewArrivals />
      <Lookbook 
        title="Style Stories"
        subtitle="Find inspiration in our curated lookbook"
        description="See how our pieces come to life in everyday moments and special occasions. 
                    Let our styling guide inspire your next jewelry statement."
      />
      <Testimonials />
      <NewsletterSignup />
      <JewelryCareTips />
    </div>
  );
};

export default HomePage;
