import { useContext } from "react";
import { GlobalInputContext } from "../form-context/FormContext";

export const labelDetails = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'e.g. Stephen King',
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'e.g. stephenking@lorem.com',
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'e.g. +1 234 567 890',
  },
];

export default function PersonalInfoInput(props) {
  const {nextButtonIsClicked} = props;

  const globalInputContext = useContext(GlobalInputContext).globalInputState;
  const setGlobalInputContext = useContext(GlobalInputContext).setglobalInputState;

  const handleInputChange = (event) => {
    let eventName = event.target.name;
    let eventValue = event.target.value;

    const formatValidation = (name, value) => {
      switch(name) {
        case 'email':
          const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return emailRegex.test(value) ? '' : 'Invalid email format!';
          case 'phone':
            const phoneTrimmed = value.replace(/\s/g, '');
            const phoneRegex = /^(\+)?\d{10,15}$/;            
            return phoneRegex.test(phoneTrimmed) ? '' : 'Invalid phone number format!';          
        default:
      }
    }
    
    const formatError = formatValidation(eventName, eventValue);
    
    setGlobalInputContext((prevInputType) => ({
      ...prevInputType,
      personalInfo: {
        ...prevInputType.personalInfo,
        inputs: {
          ...prevInputType.personalInfo.inputs,
          [eventName]: eventValue,
        },
        errors: {
          ...prevInputType.personalInfo.errors,
          [eventName]: 
              eventValue === '' ? 'This field is required' 
              : formatError ? formatError 
              : '',
        }
      },
    }));
  }
  
  return (
    <section className='flex flex-col gap-5'>
      {labelDetails.map((label, index) => (
        <div key={`label-` + index}>
          <div className="flex justify-between mb-1.5">
            <label 
              htmlFor={label.id}
              className="text-sm font-regular text-marineBlue"
            >{label.label}</label>
            <p 
              className="text-sm font-bold text-strawberryRed"
            >{nextButtonIsClicked && globalInputContext.personalInfo.errors[label.id]}</p>
          </div>          
          <input 
            type={label.type} 
            id={label.id} 
            name={label.id}
            value={globalInputContext.personalInfo.inputs[label.id]}
            onChange={handleInputChange}
            placeholder={label.placeholder}
            className={`border w-full min-h-12 px-4 rounded-md font-medium text-marineBlue focus:outline-none border-lightGray ${
              nextButtonIsClicked && globalInputContext.personalInfo.errors[label.id] ?  `border-strawberryRed` : `border-marineBlue`
            }`}
            required />
        </div>
      ))}
    </section>
  );
}