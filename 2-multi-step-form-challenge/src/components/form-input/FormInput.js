import { useContext } from 'react';
import { StepContext, useScreenSize } from '../form-context/FormContext';
import PersonalInfoInput from './PersonalInfoInput';
import PlanInput from './PlanInput';
import AddOnsInput from './AddOnsInput';
import SummaryInput from './SummaryInput';
import FormStepButton from '../form-step-button/FormStepButton';

export default function FormInput(props) { 
  const stepFromContext = useContext(StepContext).step;
  const setStepFromContext = useContext(StepContext).setStep;

  const { nextButtonIsClicked, setNextButtonIsClicked } = props;

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

  const screenSize = useScreenSize();

  return (
    <form 
      action="" 
      onSubmit={handleSubmit} 
      encType='multipart/form-data'
      className='h-full'
    >
      <section className='flex flex-col justify-between h-full lg:pt-10 max-md:p-0'>
        {formDetails.map((detail, index) => (
          stepFromContext === detail.number && (
            <section key={`form-detail-` + index}>
              <h1 className='
                font-bold mb-3 text-marineBlue 
                lg:text-[2rem]/[1em]
                max-md:m-0 max-md:text-2xl max-md:mb-[0.875rem]'
              >{detail.title}</h1>
              <p className='lg:text-[1rem]/[1em] mb-11 text-coolGray max-md:mb-6'>{detail.description}</p>
              {stepFromContext === 0 && <PersonalInfoInput nextButtonIsClicked={nextButtonIsClicked} />}
              {stepFromContext === 1 && <PlanInput />}
              {stepFromContext === 2 && <AddOnsInput />}
              {stepFromContext === 3 && <SummaryInput setStepFromContext={setStepFromContext} />}
            </section>
          )
        ))}
        {screenSize.width > 1023 && <FormStepButton 
          setNextButtonIsClicked={setNextButtonIsClicked} />}
      </section>
    </form>             
  );
}