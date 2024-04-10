import { useContext } from 'react';
import { StepContext } from '../form-context/FormContext.js';

export default function FormSidebar() {
  const stepFromContext = useContext(StepContext).step;

  const stepDetails = [
    {
      number: 0,
      detail: 'YOUR INFO',
    },
    {
      number: 1,
      detail: 'SELECT PLAN',
    },
    {
      number: 2,
      detail: 'ADD-ONS',
    },
    {
      number: 3,
      detail: 'SUMMARY',
    },
  ];

  const checkCurrentStep = (step) => stepFromContext === step;
  
  return (
    <aside className="
      flex flex-col bg-bgSidebarDesktop 
      lg:min-h-[35.5rem] lg:min-w-[17.125rem] lg:px-8 lg:py-10 
      max-md:w-screen max-md:h-[10.75rem] max-md:bg-bgSidebarMobile max-md:bg-cover max-md:pt-8 max-md:flex-row max-md:justify-center max-md:gap-4
    ">
      {stepDetails.map((step, index) => (
        <div 
          key={`step-` + index} 
          className="sidebar-info flex mb-7 text-alabaster"
        >
          <div 
            className={`
              border rounded-full w-8 h-8 text-center 
              lg:mr-4 
              ${
                step.number === 3 && stepFromContext === 4 ? `bg-lightBlue text-purplishBlue border-lightBlue`
                : checkCurrentStep(index) ? `bg-lightBlue text-marineBlue border-lightBlue` 
                : 'bg-purplishBlue text-alabaster border-alabaster'
              }
            `}
          >
            <p className="text-[0.938rem] font-bold mt-1">{step.number + 1}</p>
          </div>
          <div className='flex justify-between flex-col'>
            <p className='text-xs/[1em] font-thin max-md:hidden'>STEP {step.number + 1}</p>
            <p className='text-s/[1em] font-bold tracking-[.02em] max-md:hidden'>{step.detail}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}