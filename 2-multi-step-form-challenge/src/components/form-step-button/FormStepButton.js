import { useContext } from "react";
import { GlobalInputContext, StepContext } from "../form-context/FormContext";

export default function FormStepButton(props) {
  const stepFromContext = useContext(StepContext).step;
  const setStepFromContext = useContext(StepContext).setStep;
  const globalInputContext = useContext(GlobalInputContext).globalInputState;

  const {setNextButtonIsClicked} = props;

  const handleNextStepClick = (event) => {
    event.preventDefault();
    setNextButtonIsClicked(true);
    
    const isError = () => {
      for (const key in globalInputContext.personalInfo.errors) {
        if (globalInputContext.personalInfo.errors[key] !== '') return true;
      }
      return false;
    }
    
    if (!isError() && stepFromContext < 4) {
      setStepFromContext(stepFromContext + 1);
    }
  }
  
  const handleBackClick = () => {
    setStepFromContext(stepFromContext - 1);
  }

  return (
    <section className="
      flex justify-between 
      lg:mb-4
      max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:bg-white max-md:py-4 max-md:px-4"
    >
      <button 
        type='button'
        onClick={handleBackClick}
        className={`font-medium text-coolGray ${stepFromContext === 0 && 'collapse'}`}>Go Back</button>      
      <button 
        type={stepFromContext === 3 ? 'submit' : 'button'}
        onClick={stepFromContext === 4 ? null : handleNextStepClick}
        className={`
          px-[1.625rem] py-4 text-[1rem]/[1em] rounded-md text-alabaster transition duration-200 ease-in
          max-md:py-3 max-md:px-4 max-md:text-sm
          ${
            stepFromContext < 3 ? `bg-marineBlue hover:bg-lightMarineBlue` : `bg-purplishBlue hover:bg-lightPurplishBlue`
          }
        `}
      >{stepFromContext === 3 ? 'Confirm' : 'Next Step'}</button>
    </section>  
  )
}