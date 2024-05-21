// pages/multiStepForm.js

import React, { useState } from 'react';
import FirstForm from '../components/FirstForm';
import SecondForm from '../components/SecondForm';
import ThirdForm from '../components/ThirdForm';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <FirstForm onNextStep={handleNextStep} />;
      case 2:
        return <SecondForm onNextStep={handleNextStep} onPrevStep={handlePrevStep} />;
      case 3:
        return <ThirdForm onPrevStep={handlePrevStep} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderForm()}
    </div>
  );
};

export default MultiStepForm;
