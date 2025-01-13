import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import PromoSection from '../components/PromoSection';
import FeaturedProducts from '../components/FeaturedProducts';
import NewArrivals from '../components/NewArrivals';
import Lookbook from '../components/Lookbook';
import Testimonials from '../components/Testimonials';
import InstagramFeed from '../components/InstagramFeed';
import NewsletterSignup from '../components/NewsletterSignup';
import JewelryCareTips from '../components/JewelryCareTips';
import GiftCards from '../components/GiftCards';
import SocialMediaLinks from '../components/SocialMediaLinks';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <HeroSection 
        title="Welcome to Lis Officiel"
        subtitle="Discover quality French-inspired jewelry for young women"
        buttonText="Shop Now"
        image="https://via.placeholder.com/1200x600"
      />
      <PromoSection 
        title="Limited Time Offer"
        subtitle="Get 20% off your first purchase with code LIS20"
        image="https://via.placeholder.com/1200x600"
      />
      <FeaturedProducts />
      <NewArrivals />
      <Lookbook 
        title="Lis Officiel Lookbook"
        subtitle="Find inspiration for your next jewelry purchase"
        image="https://via.placeholder.com/1200x600"
      />
      <Testimonials />
      <InstagramFeed />
      <NewsletterSignup />
      <JewelryCareTips />
      <GiftCards />
      <SocialMediaLinks />
      <Footer />
    </div>
  );
};

export default HomePage;
