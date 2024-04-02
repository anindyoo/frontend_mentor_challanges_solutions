import { createContext, useState } from 'react';
import colors from '../../utils/colors';
import FormInput from '../form-input/FormInput';
import FormSidebar from '../form-sidebar/FormSidebar';

export const StepContext = createContext();
// export const PersonalInfoContext = createContext();

export default function FormContext() {
  const [step, setStep] = useState(0);
  // const [personalInfoData, setPersonalInfoData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('mhmmm mhmhmhmhhm')
  }
  
  return (
    <StepContext.Provider value={{ step, setStep }}>
      {/* <PersonalInfoContext.Provider value={{ personalInfoData, setPersonalInfoData }}> */}
        <form action="" onSubmit={handleSubmit} encType='multipart/form-data'>
          <section 
            className="flex justify-between min-w-[58.75rem] p-4 rounded-2xl drop-shadow-[0_25px_25px_rgba(0,0,0,0.0477)]"
            style={{ backgroundColor: `${colors.white}` }}>          
              <FormSidebar />
              <FormInput />
          </section>
        </form>  
      {/* </PersonalInfoContext.Provider> */}
    </StepContext.Provider>
  );
}