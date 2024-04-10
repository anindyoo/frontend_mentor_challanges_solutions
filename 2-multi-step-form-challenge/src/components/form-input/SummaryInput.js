import { useContext } from "react";
import { GlobalInputContext } from "../form-context/FormContext";

export default function SummaryInput(props) {
  const { setStepFromContext } = props

  const globalInputContext = useContext(GlobalInputContext).globalInputState;
  const yearlyToggle = globalInputContext.plan.yearlyToggle;
  const planPrice = globalInputContext.plan.price;
  const addOnsContext = globalInputContext.addOns;

  const handleChangeClick = (event) => {
    event.preventDefault();
    setStepFromContext(1)
  };
  
  const priceDurationFinal = (price) => yearlyToggle ? price.yearly : price.monthly;

  const currencyFormat = (price) => yearlyToggle ? `$` + price.yearly + '/yr' : `$` + price.monthly + '/mo';

  const planPriceFinal = priceDurationFinal(planPrice);
  const addOnsPriceSum = addOnsContext.reduce((allAddOn, currentAddOn) => allAddOn + priceDurationFinal(currentAddOn.price), 0);  

  const totalPrice = planPriceFinal + addOnsPriceSum;

  return (
    <section className="flex flex-col">
      <section className="
        flex bg-alabaster px-6 py-5 w-full flex-col
        max-md:px-4"
      >
        <section className="flex items-center justify-between w-full">
          <div>
            <p className="capitalize text-base text-marineBlue font-medium">{`
              ${globalInputContext.plan.selectedPlan} (${
                globalInputContext.plan.yearlyToggle ? `Yearly` : `Monthly`
              })
            `}</p>
            <button
              className="underline text-sm text-coolGray hover:text-purplishBlue"
              onClick={handleChangeClick}>Change</button>
          </div>
          <p className="text-base text-marineBlue font-medium">
            {currencyFormat(planPrice)}            
          </p>
        </section>
        {addOnsContext.length > 0 && <hr className="mt-6 mb-5 border-lightGray max-md:my-3.5"/>}
        <section className="flex flex-col gap-5 max-md:gap-4">
          {addOnsContext.map((addOn) => (
            <div 
              key={addOn.id}
              className="flex justify-between text-sm text-coolGray"
            >   
              <p>{addOn.name}</p>       
              <p className="text-marineBlue">+{currencyFormat(addOn.price)}</p>
            </div>        
          ))}
        </section>
      </section>
      <section className="
        flex justify-between items-center pt-7 px-6
        max-md:px-4"
      >
        <p className="text-sm text-coolGray">
          {`Total (per ${yearlyToggle ? `year` : `month`})`}
        </p>
        <p className="text-xl text-purplishBlue font-bold max-md:text-base">
          {`$${totalPrice}/${yearlyToggle ? `yr` : `mo`}`}
        </p>
      </section>
    </section>
  );
}