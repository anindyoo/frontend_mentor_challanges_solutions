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
    <aside className="bg-bgSidebarDesktop min-h-[35.5rem] min-w-[17.125rem] px-8 py-10">
      {stepDetails.map((step, index) => (
        <div 
          key={`step-` + index} 
          className="sidebar-info flex mb-7 text-alabaster"
        >
          <div 
            className={` border rounded-full w-8 h-8 text-center mr-4 ${
              step.number === 3 && stepFromContext === 4 ? `bg-lightBlue text-purplishBlue border-lightBlue`
              : checkCurrentStep(index) ? `bg-lightBlue text-purplishBlue border-lightBlue` 
              : 'bg-purplishBlue text-alabaster border-alabaster'
            }`}
          >
            <p className="text-[0.938rem] font-bold mt-1">{step.number + 1}</p>
          </div>
          <div className='flex justify-between flex-col'>
            <p className='text-xs/[1em] font-thin'>STEP {step.number + 1}</p>
            <p className='text-s/[1em] font-bold tracking-[.02em]'>{step.detail}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}