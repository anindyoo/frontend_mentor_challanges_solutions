import { createContext, useEffect, useState } from 'react';
import FormInput from '../form-input/FormInput';
import FormSidebar from '../form-sidebar/FormSidebar';
import { labelDetails } from '../form-input/PersonalInfoInput';
import { plansData } from '../form-input/PlanInput';
import iconThankYou from '../../assets/images/icon-thank-you.svg'
import FormStepButton from '../form-step-button/FormStepButton';

export const StepContext = createContext();
export const GlobalInputContext = createContext();
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default function FormContext() {
  const [nextButtonIsClicked, setNextButtonIsClicked] = useState(false);

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

  const screenSize = useScreenSize();
  
  return (
    <StepContext.Provider value={{ step, setStep }}>
      <GlobalInputContext.Provider value={{ globalInputState, setglobalInputState }}>
        {screenSize.width <= 1023 && <FormSidebar />}     
        <section className="
          lg:min-w-[58.75rem] 
          max-md:w-full max-md:mt-[6.25rem] max-md:px-4 max-md:absolute"
        >            
          <section className='
            flex justify-between rounded-2xl drop-shadow-[0_25px_25px_rgba(0,0,0,0.0477)] bg-white p-4
            max-md:w-full max-md:py-8 max-md:px-6'
          >           
            {screenSize.width > 1023 && <FormSidebar />}        
            {/* <FormSidebar /> */}
            <section className='
              lg:w-[30.125rem] lg:px-4 lg:mr-[4.25rem] 
              max-md:w-full'
            >    
              {step < 4 && <FormInput 
                nextButtonIsClicked={nextButtonIsClicked}
                setNextButtonIsClicked={setNextButtonIsClicked}/>}
              {step === 4 && (
                <section className='
                  flex flex-col justify-center items-center h-full
                  max-md:py-20'
                >
                  <img 
                    src={iconThankYou} 
                    alt="Thank you icon" 
                    className='
                      max-w-20 mb-8 
                      max-md:w-[3.5rem] max-md:mb-6'
                  />
                    <h1 className='
                      text-[2rem]/[1em] font-bold text-marineBlue mb-[1.125rem]
                      max-md:text-2xl max-md:mb-3.5'
                    >Thank you!</h1>
                    <p className='text-base text-coolGray text-center'>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
                </section>
              )}
            </section>
          </section>
        </section>   
        {screenSize.width <= 1023 && step < 4 && <FormStepButton
          setNextButtonIsClicked={setNextButtonIsClicked} />}     
      </GlobalInputContext.Provider>
    </StepContext.Provider>
  );
}