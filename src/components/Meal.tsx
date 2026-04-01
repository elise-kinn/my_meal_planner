import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ModaleBase from "./modales/ModaleBase";
import ModaleAddInPlanning from "./modales/ModaleAddInPlanning";

type meal = {
    mealType:string
    day:Date
}

const Meal = ({ mealType, day }: meal) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const closeModale = () =>  setIsOpen(false) 
    const openModale = () => setIsOpen(true)

    return (
        <div>
            <div className="title">
                <h5>{mealType}</h5>

                <button className="invisible-button" onClick={openModale}>
                    <FiPlus />
                </button>

                { 
                    isOpen && 
                        <ModaleBase 
                            title='Ajouter un plat'
                            type='xl'
                            onClose={closeModale}
                        >
                            <ModaleAddInPlanning 
                                day={day}
                                mealType={mealType}
                                onClose={closeModale}
                            />                            
                        </ModaleBase>
                }
            </div>
        </div>
    )
}

export default Meal