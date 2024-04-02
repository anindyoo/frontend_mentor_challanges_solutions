import { useEffect } from "react";
import colors from "../../utils/colors";

export default function PersonalInfoInput(props) {
  const { 
    personalInfoData,
    setPersonalInfoData,   
    inputsError,
    setInputsError, 
    nextButtonIsClicked} = props;

  const labelDetails = [
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
  ]

  const handleInputChange = (event) => {
    let eventName = event.target.name;
    let eventValue = event.target.value;
    
    setPersonalInfoData(previousValue => {
      return {
        ...previousValue,
        [eventName]: eventValue,
      }
    });

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

    setInputsError(previousError => {
      const formatError = formatValidation(eventName, eventValue);
      return {
        ...previousError,
        [eventName]: 
        eventValue === '' ? 'This field is required' 
        : formatError ? formatError 
        : '',
      }
    });

    event.target.style.borderColor = nextButtonIsClicked && inputsError[eventName] ? colors.strawberryRed : colors.marineBlue;
  }

  useEffect(() => {
    if (Object.keys(personalInfoData).length === 0){
      const initialErorrData = labelDetails.reduce((acc, current) => {
        return { ...acc, [current.id]: 'This field is required' };
      }, {});
      
      const initialPersonalInfoData = labelDetails.reduce((acc, current) => {
        return { ...acc, [current.id]: '' };
      }, {});
      
      setInputsError(initialErorrData);
      setPersonalInfoData(initialPersonalInfoData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <section className='flex flex-col gap-5'>
      {labelDetails.map((label, index) => (
        <div key={`label-` + index}>
          <div className="flex justify-between mb-1.5">
            <label 
              htmlFor="name" 
              className="text-sm font-regular "
              style={{ color: colors.marineBlue }}>{label.label}</label>
            <p 
            className="text-sm font-bold"
            style={{ color:colors.strawberryRed }}>{nextButtonIsClicked && inputsError[label.id]}</p>
          </div>          
          <input 
            type={label.type} 
            id={label.id} 
            name={label.id}
            value={Object.keys(personalInfoData).length !== 0 && personalInfoData[label.id]}
            onChange={handleInputChange}
            className="border w-full min-h-12 px-4 rounded-md font-medium focus:outline-none" 
            placeholder={label.placeholder}
            style={{ 
              borderColor: nextButtonIsClicked && inputsError[label.id] ? colors.strawberryRed : colors.lightGray,
              color: colors.marineBlue, 
            }}          
            onFocus={(event) => event.target.style.borderColor = nextButtonIsClicked && inputsError[label.id] ? colors.strawberryRed : colors.marineBlue} 
            onBlur={(event) => event.target.style.borderColor = nextButtonIsClicked && inputsError[label.id] ? colors.strawberryRed : colors.lightGray}
            />
        </div>
      ))}
    </section>
  );
}