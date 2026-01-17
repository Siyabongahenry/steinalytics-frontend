// pages/HomePage.jsx
import { FaRobot, FaChartLine, FaLock, FaGlobe } from "react-icons/fa";
import { AiOutlineFileExcel } from "react-icons/ai";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero */}
      <section className="text-center py-20 px-6">
       <h1 className="text-5xl font-bold text-blue-400 mb-6">
          Automate HR Analytics with Steinalytics
        </h1>

        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          Upload Excel files, generate automated reports, and visualize live HR data trends instantly.
        </p>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <AiOutlineFileExcel className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Automated Reports</h3>
          <p className="text-gray-400">Turn raw Excel files into actionable HR insights.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <FaChartLine className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Live Visualization</h3>
          <p className="text-gray-400">See trends and patterns in real time.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <FaLock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Secure Storage</h3>
          <p className="text-gray-400">Upload data safely into our database.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <FaGlobe className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Future Ready</h3>
          <p className="text-gray-400">Built to scale with tomorrow’s HR challenges.</p>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="text-center py-16 bg-gray-800 mt-12">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to transform HR analytics?
        </h2>
        <p className="text-gray-400 mb-6">
          Join us on our journey to smarter HR decisions.
        </p>
        <Link to="/upload" className="bg-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
