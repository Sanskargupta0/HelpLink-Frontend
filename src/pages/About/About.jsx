import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9ff] to-[#f1f5ff] text-gray-800 px-6 sm:px-12 py-12">
      {/* Header */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold text-center text-blue-600 mb-6"
      >
        About Us
      </motion.h1>

      {/* Section Wrapper */}
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="p-6 bg-white shadow-xl rounded-2xl border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to <span className="font-bold text-blue-500">Fund</span>, a
            next-generation crowdfunding platform built to empower ideas and
            fuel change. We connect creators, innovators, and passionate
            backers to bring bold visions to life.
          </p>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="p-6 bg-white shadow-xl rounded-2xl border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make crowdfunding accessible, transparent, and
            impactful. We believe every idea deserves a chance — from
            small-scale passion projects to world-changing innovations.
          </p>
        </motion.div>

        {/* Why We Created Fund */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="p-6 bg-white shadow-xl rounded-2xl border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">
            Why We Created Fund
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Traditional platforms felt outdated — high fees, complex processes,
            and limited transparency. We created{" "}
            <span className="font-bold text-blue-500">Fund</span> to redefine
            crowdfunding with stunning design, clear impact tracking, and a
            focus on community-driven support.
          </p>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="p-6 bg-white shadow-xl rounded-2xl border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a future where bold ideas know no limits — where
            creators find backers who believe in their purpose, and every
            project leaves a positive mark on the world.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="p-6 bg-blue-600 text-white rounded-2xl shadow-xl text-center"
        >
          <h2 className="text-2xl font-bold mb-3">Join Us Today</h2>
          <p className="mb-4">
            Become part of a movement that funds the future. Explore, support,
            and bring dreams to life.
          </p>
          <a
            href="/projects"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full transition transform hover:scale-105"
          >
            Explore Projects
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;