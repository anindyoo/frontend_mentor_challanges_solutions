import { useContext, useState } from 'react';
import { StepContext } from '../form-context/FormContext';
import PersonalInfoInput from './PersonalInfoInput';
import colors from '../../utils/colors';
import PlanInput from './PlanInput';

export default function FormInput() { 
  const stepFromContext = useContext(StepContext).step;
  const setStepFromContext = useContext(StepContext).setStep;
  
  const [personalInfoData, setPersonalInfoData] = useState({});
  const [inputsError, setInputsError] = useState({});
  const [ planState, setPlanState ] = useState('arcade-monthly');
  const [ checkedState, setCheckedState ] = useState(false)
  const [nextButtonIsClicked, setNextButtonIsClicked] = useState(false);
  
  
  const handleNextStepClick = (event) => {
    event.preventDefault();
    setNextButtonIsClicked(true);
    
    const isError = () => {
      for (const key in personalInfoData) {
        if (inputsError[key] !== '') return true;
      }
      return false;
    }
    
    if (!isError() && stepFromContext < 3) {
      setStepFromContext(stepFromContext + 1);
    }
  }
  
  const handleBackClick = () => {
    setStepFromContext(stepFromContext - 1);
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

  const submitButtonClassName = `px-[1.625rem] py-4 text-[1rem]/[1em] rounded-md`;
  const submitButtonStyle = { 
    backgroundColor: colors.marineBlue,
    color: colors.alabaster,
  }

  return (
    <section className='min-w-[30.125rem] pt-10 px-4 mr-[4.25rem]'>
      <section className='flex flex-col justify-between h-full'>
        {formDetails.map((detail, index) => (
          stepFromContext === detail.number && (
            <section key={`form-detail-` + index}>
              <h1 
                className='text-[2rem]/[1em] font-bold mb-3'
                style={{ color: colors.marineBlue }}>{detail.title}</h1>
              <p 
                className='text-[1rem]/[1em] mb-11'
                style={{ color: colors.coolGray }}>{detail.description}</p>
              {stepFromContext === 0 && 
              <PersonalInfoInput 
                setPersonalInfoData={setPersonalInfoData}
                inputsError={inputsError}
                personalInfoData={personalInfoData}
                setInputsError={setInputsError}
                nextButtonIsClicked={nextButtonIsClicked}/>}
              {stepFromContext === 1 && 
              <PlanInput 
                planState={planState}
                setPlanState={setPlanState}
                checkedState={checkedState}
                setCheckedState={setCheckedState} />
              }
            </section>
          )
        ))}
        <section className='flex justify-between mb-4'>
          <button 
            type='button'
            onClick={handleBackClick}
            className={`font-medium ${stepFromContext === 0 && 'collapse'}`}
            style={{ color: colors.coolGray }}>Go Back</button>      
            <button 
              type={stepFromContext === 3 ? 'submit' : 'button'}
              onClick={stepFromContext === 3 ? null : handleNextStepClick}
              className={submitButtonClassName}
              style={submitButtonStyle}>{stepFromContext === 3 ? 'Confirm' : 'Next Step'}</button>
        </section>              
      </section>
    </section>
  );
}