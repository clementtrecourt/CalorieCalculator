import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const GradientButton = ({ children, onClick, isSelected, className }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 ${
      isSelected ? "bg-black text-white" : "bg-transparent border border-white"
    } ${className}`}
  >
    {children}
  </button>
);

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

const Input = ({ placeholder, className, value, onChange }) => (
  <input
    type="number"
    placeholder={placeholder}
    className={` w-full px-4 py-2 bg-transparent border border-white rounded-full text-white placeholder-white ${className}`}
    value={value}
    onChange={onChange}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

const CalorieCalculator = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [goal, setGoal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActivity, setIsOpenActivity] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select a Goal");
  const [total, setTotal] = useState("");
  const [selectedActivityOption, setSelectedActivityOption] = useState(
    "Select your activity level"
  );
  const [activity, setActivity] = useState("");

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdownActivity = () => {
    console.log("jkfads");
    setIsOpenActivity(!isOpenActivity);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setGoal(option);
    setIsOpen(false);
  };
  const handleOptionClickActivity = (activityOption) => {
    setSelectedActivityOption(activityOption);
    setActivity(activityOption);
    setIsOpenActivity(false);
  };
  const options = ["Lose weight", "Maintain Weight", "Bulk"];
  const activityOptions = [
    "Little to no exercise and work a desk job",
    "Light exercise 1-3 days per week",
    "Moderate exercise 3-5 days per week",
    "Heavy exercise 6-7 days per week",
    "Strenuous training 2 times a day",
  ];
  const calculateCalories = async () => {
    let calculatedBmr;
    if (gender === "male") {
      calculatedBmr =
        88.362 +
        13.397 * parseFloat(weight) +
        4.799 * parseFloat(height) -
        5.677 * parseFloat(age);
    } else {
      calculatedBmr =
        447.593 +
        9.247 * parseFloat(weight) +
        3.098 * parseFloat(height) -
        4.33 * parseFloat(age);
    }

    let calculatedActivityCoef;
    switch (activity) {
      case "Little to no exercise and work a desk job":
        calculatedActivityCoef = 1.2;
        break;
      case "Light exercise 1-3 days per week":
        calculatedActivityCoef = 1.375;
        break;
      case "Moderate exercise 3-5 days per week":
        calculatedActivityCoef = 1.55;
        break;
      case "Heavy exercise 6-7 days per week":
        calculatedActivityCoef = 1.725;
        break;
      case "Strenuous training 2 times a day":
        calculatedActivityCoef = 1.9;
        break;
      default:
        console.log("Activity level not recognized");
        calculatedActivityCoef = 1;
        break;
    }

    let totalCalories;
    if (goal === "Lose weight") {
      totalCalories = calculatedActivityCoef * calculatedBmr - 500;
    } else if (goal === "Maintain Weight") {
      totalCalories = calculatedActivityCoef * calculatedBmr;
    } else {
      totalCalories = calculatedActivityCoef * calculatedBmr + 500;
    }
    setTotal(totalCalories.toFixed(0));
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          gender,
          age,
          height,
          weight,
          goal,
          activity,
          totalCalories: totalCalories.toFixed(0),
        });
        navigate("/profile");
      } else {
        console.log("No user is signed in");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-500 to-orange-500">
      <div className="m-auto  bg-[#fff] bg-opacity-10 rounded-3xl shadow-xl  flex  relative ">
        <div className=" p-8 ">
          <h2 className="text-3xl font-bold text-white mb-6">
            Body Parameters
          </h2>

          <div className="flex space-x-4 mb-6">
            <GradientButton
              isSelected={gender === "male"}
              onClick={() => setGender("male")}
            >
              Male
            </GradientButton>
            <GradientButton
              isSelected={gender === "female"}
              onClick={() => setGender("female")}
            >
              Female
            </GradientButton>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Input
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Input
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <Input
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <button
              className="w-full px-4 py-2 bg-transparent border border-white rounded-full text-white flex justify-between items-center"
              onClick={toggleDropdownActivity}
            >
              {selectedActivityOption}
              <ChevronDown size={20} />
            </button>
            {isOpenActivity && (
              <div
                className="origin-top-right absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  {activityOptions.map((activityOptions) => (
                    <button
                      key={activityOptions}
                      onClick={() => handleOptionClickActivity(activityOptions)}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                    >
                      {activityOptions}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mb-6 relative">
            <button
              className="w-full px-4 py-2 bg-transparent border border-white rounded-full text-white flex justify-between items-center"
              onClick={toggleDropdown}
            >
              {selectedOption}
              <ChevronDown size={20} />
            </button>
            {isOpen && (
              <div
                className="origin-top-right absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            className="w-full px-6 py-3 bg-black text-white rounded-full font-semibold text-lg"
            onClick={calculateCalories}
          >
            Calculate →
          </button>
        </div>
        {total > 0 ? (
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Your result
            </h2>

            <div className="mb-8">
              <p className="text-white">To {goal} you should eat:</p>
              <p className="text-6xl font-bold text-white">{total} Kcal</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CalorieCalculator;
