import { useState } from "react";
import SmoothScroll from "./lib/SmoothScroll";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import TechMarquee from "./sections/TechMarquee";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

const App = () => {
    const [loaded, setLoaded] = useState(false);

    return (
        <SmoothScroll>
            <Preloader onComplete={() => setLoaded(true)} />
            <CustomCursor />
            <Navbar />
            <main className={loaded ? "opacity-100" : "opacity-0"}>
                <Hero />
                <About />
                <TechMarquee />
                <Projects />
                <Contact />
                <Footer />
            </main>
        </SmoothScroll>
    );
};

export default App;
