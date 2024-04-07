import { createContext, useState } from 'react';
import FormInput from '../form-input/FormInput';
import FormSidebar from '../form-sidebar/FormSidebar';
import { labelDetails } from '../form-input/PersonalInfoInput';
import { plansData } from '../form-input/PlanInput';
import iconThankYou from '../../assets/images/icon-thank-you.svg'

export const StepContext = createContext();
export const GlobalInputContext = createContext();

export default function FormContext() {
  const initialPersonalInfoData = labelDetails.reduce((personalInfo, current) => {
    return { ...personalInfo, [current.id]: '' };
  }, {});

  const initialErrorData = labelDetails.reduce((errors, current) => {
    return { ...errors, [current.id]: 'This field is required' };
  }, {});

  const intialPlanData = plansData[0];

  const [step, setStep] = useState(0);
  const [globalInputState, setglobalInputState] = useState({
    personalInfo: {
      inputs: initialPersonalInfoData,
      errors: initialErrorData,
    },
    plan: {
      selectedPlan: intialPlanData.name,
      price: {
        monthly: intialPlanData.price.monthly,
        yearly: intialPlanData.price.yearly,
      },
      yearlyToggle: false,
    },
    addOns: [],
    totalPrice: 0,
  });
  
  return (
    <StepContext.Provider value={{ step, setStep }}>
      <GlobalInputContext.Provider value={{ globalInputState, setglobalInputState }}>
            <section className="flex justify-between min-w-[58.75rem] p-4 rounded-2xl drop-shadow-[0_25px_25px_rgba(0,0,0,0.0477)] bg-white">          
                <FormSidebar />
                <section className='w-[30.125rem] px-4 mr-[4.25rem]'>    
                  {step < 4 && <FormInput />}
                  {step === 4 && (
                    <section className='flex flex-col justify-center items-center h-full'>
                      <img 
                        src={iconThankYou} 
                        alt="Thank you icon" 
                        className='max-w-20 mb-8'/>
                        <h1 className='text-[2rem]/[1em] font-bold text-marineBlue mb-[1.125rem]'>Thank you!</h1>
                        <p className='text-base text-coolGray text-center'>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
                    </section>
                  )}
                </section>
            </section>
        </GlobalInputContext.Provider>
    </StepContext.Provider>
  );
}