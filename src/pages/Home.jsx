import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Category from "../components/Category";
import PromotionCard from "../components/PromotionCard";
import Hands from "../images/Hands.png";
import JoinNowSlider from "../components/JoinNowSlider";
import Footer from "../components/Footer";
import {
  AppShortcut,
  Campaign,
  Handshake,
  Layers,
  SportsEsports,
  TipsAndUpdates,
  Web,
  Work,
} from "@mui/icons-material";

function Home() {
  const categories = [
    {
      name: "Marketing & Communication",
      icon: Campaign,
    },
    {
      name: "Game Development",
      icon: SportsEsports,
    },
    {
      name: "Web Development",
      icon: Web,
    },
    {
      name: "Mobile Development",
      icon: AppShortcut,
    },
    {
      name: "Design & Development",
      icon: Layers,
    },
    {
      name: "Finance Management",
      icon: Handshake,
    },
    {
      name: "Business & Consulting",
      icon: Work,
    },
    {
      name: "Product Management",
      icon: TipsAndUpdates,
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <Header />
      <div className="w-full min-h-screen max-h-screen">
        <HeroSection />
      </div>
      {/* Categories Section */}
      <div className="flex flex-col space-y-9 w-full py-36">
        <div className="flex flex-col items-center justify-center w-full text-center space-y-5">
          <p className="text-heading font-heading text-3xl md:text-5xl">
            Get Work In Different Categories
          </p>
          <p className="max-w-full md:max-w-[50%] xl:max-w-[40%] text-text font-text xl:text-xl">
            Get the most exciting jobs from all around the world and grow your
            career fast with others.
          </p>
        </div>
        <div className="grid grid-cols-1 grid-rows-1  md:grid-cols-4 md:grid-rows-2 gap-3 overflow-x-auto overflow-y-hidden md:w-[80%] xl:w-[70%] self-center">
          {categories.map((category, index) => (
            <Category
              style={{ paddingBottom: 90 }}
              key={index}
              name={category.name}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
      {/* Promotion Card section */}
      <div className="flex self-center w-[90%] md:w-[80%]">
        <PromotionCard />
      </div>
      {/* Great work Section */}
      <div className="flex flex-col space-y-9 w-[80%] self-center py-36">
        <div className="flex flex-col items-center justify-center w-full text-center space-y-5">
          <p className="text-heading font-heading text-3xl md:text-5xl">
            Find Great Work
          </p>
          <p className="max-w-full md:max-w-[50%] xl:max-w-[40%] text-text font-text xl:text-xl">
            Meet clients you’re excited to work with and take your career or
            business to new heights.
          </p>
        </div>
        <div className="flex w-full space-x-4">
          <section className="flex-1 h-full">
            <JoinNowSlider />
          </section>
          <section className="flex-[1.5] object-cover hidden md:flex">
            <img
              className="w-full h-full"
              src={Hands}
              alt="person typing on keyboard"
            />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
