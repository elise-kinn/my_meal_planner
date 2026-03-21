import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ModaleAddMeal from "./modales/ModaleAddMeal";

type meal = {
    meal:string
}

const Meal = ({meal}: meal) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const closeModale = () =>  setIsOpen(false) 
    const openModale = () => setIsOpen(true)

    return (
        <div>
            <div className="title">
                <h5>{meal}</h5>

                <button className="invisible-button" onClick={openModale}>
                    <FiPlus />
                </button>

                { 
                    isOpen && 
                        <ModaleAddMeal 
                            title='Ajouter un plat'
                            button='Ajouter'
                            onClose={closeModale}
                        >
                            <div className="inputs-div">
                                <input type="text" placeholder="Lasagnes, Pâtes aux oignons..."/>
                                <select name="type" id="type">
                                    <option value="0">Par ordre alphabétique</option>
                                    <option value="1">Par type</option>
                                    <option value="3">Par date de création</option>
                                </select>
                            </div>

                            <div>
                                Liste...
                            </div>
                        </ModaleAddMeal>
                }
            </div>
        </div>
    )
}

export default Meal