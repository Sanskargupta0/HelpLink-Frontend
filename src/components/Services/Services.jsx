import { FaChartLine, FaPiggyBank, FaBalanceScale } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";


const skillsData = [
  {
    name: "Expense Tracking",
    icon: <FaChartLine className="text-4xl text-primary" />,
    link: "#",
    description:
      "Easily monitor your daily, weekly, and monthly expenses to stay on top of your spending habits.",
    aosDelay: "0",
  },
  {
    name: "Smart Budgeting",
    icon: <GiWallet className="text-4xl text-primary" />,
    link: "#",
    description:
      "Create and manage budgets effortlessly, ensuring you allocate funds wisely for essential expenses and savings.",
    aosDelay: "300",
  },
  {
    name: "Investment Guidance",
    icon: <FaPiggyBank className="text-4xl text-primary" />,
    link: "#",
    description:
      "Get AI-driven insights and recommendations to make informed investment decisions for a secure future.",
    aosDelay: "500",
  },
  {
    name: "Debt Management",
    icon: <FaBalanceScale className="text-4xl text-primary" />,
    link: "#",
    description:
      "Track and manage your loans and EMIs efficiently, helping you clear debts faster and avoid financial stress.",
    aosDelay: "700",
  },
];

const Services = () => {
  return (
    <>
      <span id="about"></span>
      <div className="bg-gray-100 dark:bg-black dark:text-white py-12 sm:grid sm:place-items-center">
        <div className="container">
          {/* Header */}
          <div className="pb-12 text-center space-y-3">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold sm:text-3xl text-violet-950 dark:text-primary"
            >
              Explore Our Services
            </h1>
            <p
              data-aos="fade-up"
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              We are self-service data analytics software that lets you create
              visually.
            </p>
          </div>

          {/* services cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card space-y-3 sm:space-y-4 p-4"
              >
                <div>{skill.icon}</div>
                <h1 className="text-lg font-semibold">{skill.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          {/* button */}
          <div
            data-aos="fade-up"
            data-aos-delay="900"
            data-aos-offset="0"
            className="text-center mt-4 sm:mt-8"
          >
            <button className="primary-btn">Learn More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
