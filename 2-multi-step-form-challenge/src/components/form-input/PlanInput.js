import colors from "../../utils/colors";
import iconArcade from "../../assets/images/icon-arcade.svg";
import iconAdvanced from "../../assets/images/icon-advanced.svg";
import iconPro from "../../assets/images/icon-pro.svg";

function RadioCardLabel(props) {
  const {
    name,
    priceMonthly,
    priceYearly,
    icon,
    planState,
    setPlanState,
    checkedState,
  } = props;

  const handleRadioChange = (event) => {
    console.log(event.target.value)
    setPlanState(event.target.value)
  };

  const isPlanStateEqualName = planState === (name + '-monthly') || planState === (name + '-yearly') ? true : false;
  
  
  return (
    <>
      <label 
        htmlFor={name}
        className="border-2 pb-4 pt-5 px-4 min-w-[8.625rem] min-h-[10rem] flex flex-col justify-between rounded-md"
        style={{ 
          backgroundColor: isPlanStateEqualName ? colors.alabaster : colors.white,
          borderColor: isPlanStateEqualName ? colors.purplishBlue : colors.lightGray,
        }}>
        <img 
          src={icon} 
          className="max-w-10"
          alt="Arcade icon" />
        <input 
          id={name}
          type="radio" 
          name="plan-radio" 
          value={name + '-' + (checkedState ? 'yearly' : 'monthly')}
          onChange={handleRadioChange} 
          className="hidden" 
          defaultChecked={isPlanStateEqualName ? true : false} />
        <div>
          <p
            className="capitalize font-medium"
            style={{ color: colors.marineBlue }} >{name}</p>
          <p
            className="text-sm"
            style={{ color: colors.coolGray}} >${checkedState ? priceYearly : priceMonthly}/mo</p>
          {checkedState && (
            <p
            className="text-xs"
            style={{ color: colors.marineBlue }} >2 months free</p>
          )}
        </div>
      </label>
    </>
  )
}

export default function PlanInput(props) {
  const { 
    planState, 
    setPlanState,
    checkedState,
    setCheckedState,
  } = props;

  const plans = [
    {
      name: 'arcade',
      priceMonthly: '9',
      priceYearly: '90',
      icon: iconArcade,      
    },
    {
      name: 'advanced',
      priceMonthly: '12',
      priceYearly: '120',
      icon: iconAdvanced,      
    },
    {
      name: 'pro',
      priceMonthly: '15',
      priceYearly: '150',
      icon: iconPro,      
    },
  ];

  const handleCheckboxChange = () => {
    const onlyPlan = planState.split('-')[0];
    setCheckedState(checkedState ? false : true);
    setPlanState(checkedState ? (onlyPlan + '-monthly') : (onlyPlan + '-yearly'));
  }

  return (
    <section className="flex flex-col gap-8">
      <section className="flex justify-between">
        {plans.map((plan, index) => (
          <RadioCardLabel
            key={'plan-' + index} 
            name={plan.name}
            priceMonthly={plan.priceMonthly}
            priceYearly={plan.priceYearly}
            icon={plan.icon}
            planState={planState}
            setPlanState={setPlanState}
            checkedState={checkedState} />
        ))}
      </section>
      <section 
        className="flex justify-center gap-6 text-sm py-4 font-medium"
        style={{ backgroundColor: colors.alabaster }}>
        <label className='flex justify-center gap-6 relative inline-flex cursor-pointer select-none items-center'>
          <p style={{ color: !checkedState ? colors.marineBlue : colors.coolGray}}>Monthly</p>
          <input
            type='checkbox'
            name='toggleDuration'
            className='sr-only'
            checked={checkedState}
            onChange={handleCheckboxChange}
          />
          <span
            className="slider mr-3 flex h-5 w-10 items-center rounded-full p-1 duration-200"
            style={{ backgroundColor: colors.marineBlue }} >
            <span
              className={`dot h-3.5 w-3.5 rounded-full bg-white duration-300 ${
                checkedState ? 'translate-x-[1.125rem]' : ''
              }`}></span>
          </span>    
          <p style={{ color: checkedState ? colors.marineBlue : colors.coolGray}}>Yearly</p>
        </label>
      </section>
    </section>
  )
}