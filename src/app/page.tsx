import CategorySection from "./components/Home/Category";
import OurMission from "./components/Home/OurMission";
import FeaturedPosts from "./components/Home/FeaturedPosts";
import Hero from "./components/Home/Hero";
import StorySection from "./components/Home/DiscoverStory";
import AuthorsList from "./components/Home/AuhorsList";
import Logos from "./components/Home/Logos";
import Testimonials from "./components/Home/Testimolnials";
import JoinTeam from "./components/Home/JoinTeam";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
    <Hero />
    <div className="p-16">
    <FeaturedPosts />
    <OurMission />
    <CategorySection />
    <StorySection />
    <AuthorsList />
    <Logos />
    <Testimonials />
    <JoinTeam />
    </div>
  </div>
  
  );
}
