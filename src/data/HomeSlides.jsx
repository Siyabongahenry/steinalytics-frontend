// data/aboutSlides.jsx
import { FaRobot, FaChartLine, FaUsers, FaRocket } from "react-icons/fa";
import { AiOutlineFileExcel } from "react-icons/ai";

export const HomeSlides = [
  {
    title: "Mission",
    description:
      "At Steinalytics, our mission is to transform HR with automation and live data visualization.",
    component: <FaRobot className="text-blue-400 w-20 h-20 mx-auto" />
  },
  {
    title: "Capabilities",
    description:
      "Upload Excel files, generate automated reports, and visualize your HR data trends in real time.",
    component: <AiOutlineFileExcel className="text-green-400 w-20 h-20 mx-auto" />
  },
  {
    title: "Vision",
    description:
      "We are building the future tool for HR analytics — empowering organizations to make smarter decisions.",
    component: <FaChartLine className="text-yellow-400 w-20 h-20 mx-auto" />
  },
  {
    title: "Team",
    description:
      "Our passionate team is dedicated to solving HR challenges with technology and innovation.",
    component: <FaUsers className="text-purple-400 w-20 h-20 mx-auto" />
  },
  {
    title: "Founding",
    description:
      "Founded in 2025, Steinalytics was created to address HR challenges with automation and analytics.",
    component: <FaRocket className="text-pink-400 w-20 h-20 mx-auto" />
  }
];
