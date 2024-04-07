import { useContext, useState } from 'react';
import { GlobalInputContext, StepContext } from '../form-context/FormContext';
import PersonalInfoInput from './PersonalInfoInput';
import PlanInput from './PlanInput';
import AddOnsInput from './AddOnsInput';
import SummaryInput from './SummaryInput';

export default function FormInput() { 
  const stepFromContext = useContext(StepContext).step;
  const setStepFromContext = useContext(StepContext).setStep;
  const globalInputContext = useContext(GlobalInputContext).globalInputState;

  const [nextButtonIsClicked, setNextButtonIsClicked] = useState(false);
  
  
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

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  
  const formDetails = [
    {
      number: 0,
      title: 'Personal info',
      description: 'Please provide your name, email address. and phone number.',
    },
    {
      number: 1,
      title: 'Select your plan',
      description: 'You have the option of monthly or yearly billing.',
    },
    {
      number: 2,
      title: 'Pick add-ons',
      description: 'Add-ons help enhance your gaming experience.',
    },
    {
      number: 3,
      title: 'Finishing up ',
      description: 'Double-check everything looks OK before confirming.',
    },
  ];

  return (
    <form 
      action="" 
      onSubmit={handleSubmit} 
      encType='multipart/form-data'
      className='h-full'
    >
      <section className='flex flex-col justify-between h-full pt-10'>
        {formDetails.map((detail, index) => (
          stepFromContext === detail.number && (
            <section key={`form-detail-` + index}>
              <h1 className='text-[2rem]/[1em] font-bold mb-3 text-marineBlue'>{detail.title}</h1>
              <p className='text-[1rem]/[1em] mb-11 text-coolGray'>{detail.description}</p>
              {stepFromContext === 0 && <PersonalInfoInput nextButtonIsClicked={nextButtonIsClicked} />}
              {stepFromContext === 1 && <PlanInput />}
              {stepFromContext === 2 && <AddOnsInput />}
              {stepFromContext === 3 && <SummaryInput setStepFromContext={setStepFromContext} />}
            </section>
          )
        ))}
        <section className="flex justify-between mb-4">
          <button 
            type='button'
            onClick={handleBackClick}
            className={`font-medium text-coolGray ${stepFromContext === 0 && 'collapse'}`}>Go Back</button>      
            <button 
              type={stepFromContext === 3 ? 'submit' : 'button'}
              onClick={stepFromContext === 4 ? null : handleNextStepClick}
              className={`px-[1.625rem] py-4 text-[1rem]/[1em] rounded-md text-alabaster ${
                stepFromContext < 3 ? `bg-marineBlue hover:bg-lightMarineBlue` : `bg-purplishBlue hover:bg-lightPurplishBlue`
              }`}
            >{stepFromContext === 3 ? 'Confirm' : 'Next Step'}</button>
        </section> 
      </section>
    </form>             
  );
}