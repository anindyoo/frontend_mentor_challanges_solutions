import colors from "../../utils/colors"

export const addOnData = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    price: 2,
  },
];

export default function AddOnsInput(props) {
  const { addOnState, setAddOnState } = props;

  const handleCheckboxOnChange = (position) => {
    const updatedAddOnState = addOnState.map((addOn, index) =>
      position === index ? !addOn : addOn
    );

    setAddOnState(updatedAddOnState);
  }

  return (
    <section className="flex flex-col gap-4">    
      {addOnData.map((addOn, index) => (
        <label 
          htmlFor={addOn.name}
          key={`checkbox-` + index}
          className={`border flex items-center w-full justify-between px-6 py-5 rounded-md ${(addOnState[index] ? `bg-alabaster border-purplishBlue` : `bg-white border-lightGray`)}
          `}            
        >
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id={addOn.name} 
              className="relative peer shrink-0 appearance-none w-5 h-5 border rounded mt-1 border-lightGray checked:bg-purplishBlue checked:border-0" 
              checked={addOnState[index]}
              onChange={() => handleCheckboxOnChange(index)} 
            />        
            <svg
              className="absolute h-3.5 w-3.5 mt-1.5 ml-1 hidden peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={colors.white}
              stroke={colors.white}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
            <path 
              filrul="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"></path>
            </svg>
            <div className="ml-6">
              <p className="font-medium text-marineBlue">{addOn.name}</p>
             <p className="text-[0.938rem] text-coolGray">{addOn.description}</p>
            </div>
          </div>
          <p className="text-[0.938rem] text-purplishBlue">${addOn.price}/mo</p>
        </label>
      ))}
    </section>
  )
}