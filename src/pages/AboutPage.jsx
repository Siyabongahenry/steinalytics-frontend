// pages/AboutPage.jsx
import { FaRobot, FaChartLine, FaUsers, FaRocket } from "react-icons/fa";
import { AiOutlineFileExcel } from "react-icons/ai";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-400">
            About Steinalytics
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Founded in 2025, Steinalytics is building the future of HR analytics —
          combining automation and live data visualization to help organizations
          make smarter decisions.
        </p>
      </section>

      {/* Mission / Capabilities / Vision */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition">
          <FaRobot className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-400">
            Simplify HR challenges through automation and powerful analytics.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition">
          <AiOutlineFileExcel className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Capabilities</h2>
          <p className="text-gray-400">
            Upload Excel files, generate automated reports, and visualize live
            HR data trends.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition">
          <FaChartLine className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-400">
            We are building the future tool for HR analytics — empowering
            organizations worldwide.
          </p>
        </div>
      </section>

      {/* Team & Founding */}
      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition">
          <FaUsers className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Team</h2>
          <p className="text-gray-400">
            A passionate group of innovators dedicated to solving HR challenges
            with technology.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition">
          <FaRocket className="w-16 h-16 text-pink-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Founding</h2>
          <p className="text-gray-400">
            Steinalytics was founded in 2025 to address HR challenges with
            automation and analytics.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gray-800 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Ready to see the future of HR analytics?
        </h2>
        <p className="text-gray-400 mb-6">
          Join us on our journey to transform HR with automation and
          visualization.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
