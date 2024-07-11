import React, { useState } from "react";
import PropTypes from "prop-types";

const StyledInput = ({ label, type = "number" }) => {
  return (
    <div className="w-full max-w-xs mb-4">
      <input
        type={type}
        className="w-full px-4 py-2 text-lg text-white bg-transparent border-2 border-white border-opacity-50 rounded-lg focus:outline-none focus:border-opacity-100 transition-all duration-300 placeholder-white placeholder-opacity-70"
        placeholder={label}
      />
    </div>
  );
};

StyledInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

const GenderButton = ({ label, isSelected, onClick }) => {
  return (
    <button
      className={`px-6 py-2 text-lg rounded-lg transition-all duration-300 ${
        isSelected
          ? "bg-white text-purple-600 font-bold"
          : "bg-transparent text-white border-2 border-white border-opacity-50 hover:border-opacity-100"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

GenderButton.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Calculator = () => {
  const [gender, setGender] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 via-red-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Paramètres Corporels
        </h1>

        <div className="flex justify-center space-x-4 mb-6">
          <GenderButton
            label="Homme"
            isSelected={gender === "homme"}
            onClick={() => setGender("homme")}
          />
          <GenderButton
            label="Femme"
            isSelected={gender === "femme"}
            onClick={() => setGender("femme")}
          />
        </div>

        <StyledInput label="Age" />
        <StyledInput label="Taille (cm)" />
        <StyledInput label="Poids (kg)" />
      </div>
    </div>
  );
};

export default Calculator;
