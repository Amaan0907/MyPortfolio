import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SplitReveal from "../components/SplitReveal";
import { projects } from "../data/portfolio";

const colorMap = {
    maroon: "from-maroon to-[#4a0001]",
    cream: "from-cream to-[#e0a25f]",
    ink: "from-[#2a1a14] to-ink",
};

const ProjectRow = ({ project, onHover }) => (
    <a
        href={project.live || project.github}
        target="_blank"
        rel="noreferrer"
        data-cursor="grow"
        onMouseEnter={() => onHover(project)}
        onMouseLeave={() => onHover(null)}
        className="group relative flex flex-col md:flex-row md:items-center gap-3 md:gap-6 border-b border-off-white/10 py-8 md:py-10 transition-colors"
    >
        <span className="six-caps-regular text-2xl md:text-3xl text-off-white/30 md:w-16 shrink-0">
            {project.index}
        </span>

        <div className="flex-1">
            <h3 className="six-caps-regular text-[13vw] md:text-[4.2vw] leading-[0.9] tracking-wide text-off-white group-hover:text-cream transition-colors">
                {project.title}
            </h3>
            <p className="mt-1 text-sm md:text-base text-off-white/50 tracking-wide">{project.subtitle}</p>
            <p className="hidden md:block max-w-lg text-sm text-off-white/0 group-hover:text-off-white/60 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-out">
                {project.description}
            </p>
        </div>

        <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
            {project.stack.slice(0, 4).map((tech) => (
                <span
                    key={tech}
                    className="text-[10px] md:text-xs tracking-[0.1em] uppercase border border-off-white/15 rounded-full px-3 py-1 text-off-white/60"
                >
                    {tech}
                </span>
            ))}
        </div>

        <span className="hidden md:inline-flex items-center justify-center w-12 h-12 rounded-full border border-off-white/20 text-off-white shrink-0 group-hover:bg-cream group-hover:text-ink group-hover:border-cream transition-colors">
            ↗
        </span>
    </a>
);

const Projects = () => {
    const [active, setActive] = useState(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    return (
        <section
            id="projects"
            className="relative w-full bg-ink px-6 md:px-16 py-28 md:py-36"
            onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
        >
            <div className="max-w-6xl mx-auto">
                <span className="text-[11px] tracking-[0.3em] uppercase text-cream">02 / Selected Work</span>
                <SplitReveal
                    as="h2"
                    className="six-caps-regular text-[14vw] md:text-[6vw] leading-[0.9] tracking-wide mt-4 text-off-white"
                >
                    Projects worth a look
                </SplitReveal>

                <div className="mt-14 md:mt-16">
                    {projects.map((project) => (
                        <ProjectRow key={project.id} project={project} onHover={setActive} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{ left: pos.x, top: pos.y }}
                        className={`hidden md:flex pointer-events-none fixed z-30 -translate-x-1/2 -translate-y-1/2 w-64 h-40 rounded-2xl bg-linear-to-br ${colorMap[active.color]} shadow-2xl flex-col justify-between p-5`}
                    >
                        <span className="six-caps-regular text-3xl text-off-white/90">{active.title}</span>
                        <span className="text-[11px] tracking-[0.2em] uppercase text-off-white/70">
                            {active.year} · {active.live ? "Live Demo" : "View Code"}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
