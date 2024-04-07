import iconArcade from "../../assets/images/icon-arcade.svg";
import iconAdvanced from "../../assets/images/icon-advanced.svg";
import iconPro from "../../assets/images/icon-pro.svg";
import { useContext } from "react";
import { GlobalInputContext } from "../form-context/FormContext";

export const plansData = [
  {
    name: 'arcade',
    price: {
      monthly: 9,
      yearly: 90,
    },
    icon: iconArcade,      
  },
  {
    name: 'advanced',
    price: {
      monthly: 12,
      yearly: 120,
    },
    icon: iconAdvanced,      
  },
  {
    name: 'pro',
    price: {
      monthly: 15,
      yearly: 150,
    },
    icon: iconPro,      
  },
];

export default function PlanInput() {
  const globalInputContext = useContext(GlobalInputContext).globalInputState;
  const planContext = globalInputContext.plan;
  const setGlobalInputContext = useContext(GlobalInputContext).setglobalInputState;
  
  const handleRadioChange = (event) => {
    const checkedPlan = plansData.filter((plan) => plan.name === event.target.value)[0];
    setGlobalInputContext((prevInput) => ({
      ...prevInput,
      plan: {
        ...prevInput.plan,
        selectedPlan: event.target.value,
        price: checkedPlan.price,
      }
    }));
  };

  const handleYearlyToggleChange = () => {
    setGlobalInputContext((prevInput) => ({
      ...prevInput,
      plan: {
        ...prevInput.plan,
        selectedPlan: planContext.selectedPlan,
        yearlyToggle: !planContext.yearlyToggle,
      }
    }));
  };

  const isPlanStateEqualName = (name) => planContext.selectedPlan === (name) || planContext.selectedPlan === (name) ? true : false;

  return (
    <section className="flex flex-col gap-8">
      <section className="flex justify-between">
        {plansData.map((plan, index) => (
        <label 
          htmlFor={plan.name}
          key={'plan-' + index}
          className={`border-2 pb-4 pt-5 px-4 min-w-[8.625rem] min-h-[10rem] flex flex-col justify-between rounded-md bg-white border-lightGray hover:cursor-pointer hover:bg-alabaster hover:border-purplishBlue ${
            isPlanStateEqualName(plan.name) && `bg-alabaster border-purplishBlue`
          }`}
        >
          <img 
            src={plan.icon} 
            className="max-w-10"
            alt="Arcade icon" />
          <input 
            id={plan.name}
            type="radio" 
            name="plan-radio" 
            value={plan.name}
            onChange={handleRadioChange} 
            className="hidden" 
            defaultChecked={index === 0 && true} />
          <div>
            <p className="capitalize font-medium text-marineBlue">{plan.name}</p>
            <p className="text-sm text-coolGray">
              ${planContext.yearlyToggle ? `${plan.price.yearly}/yr` : `${plan.price.monthly}/mo`}
            </p>
            {planContext.yearlyToggle && (
              <p className="text-xs text-marineBlue">2 months free</p>
            )}
          </div>
        </label>
        ))}
      </section>
      <section className="flex justify-center bg-alabaster gap-6 text-sm py-4 font-medium">
        <label className="flex justify-center gap-6 relative inline-flex cursor-pointer select-none items-center">
          <p className={!planContext.yearlyToggle ? `text-marineBlue` : `text-coolGray`}>Monthly</p>
          <input
            type='checkbox'
            name='toggleDuration'
            className='sr-only'
            checked={planContext.yearlyToggle}
            onChange={handleYearlyToggleChange}
            required
          />
          <span className="slider mr-3 flex h-5 w-10 bg-marineBlue items-center rounded-full p-1 duration-200">
            <span
              className={`dot h-3.5 w-3.5 rounded-full bg-white duration-300 ${
                planContext.yearlyToggle ? 'translate-x-[1.125rem]' : ''
              }`}></span>
          </span>    
          <p className={planContext.yearlyToggle ? `text-marineBlue` : `text-coolGray`}>Yearly</p>
        </label>
      </section>
    </section>
  )
}