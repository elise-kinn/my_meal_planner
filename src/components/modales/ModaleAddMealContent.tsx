import { useState, type ChangeEventHandler, type MouseEventHandler } from "react";
import { FaPlus , FaMinus } from "react-icons/fa6";


// type content = {

// }

const ModaleAddMealContent = () => {
    const [ ingredientsForms, setIngredientsForms ] = useState<string[]>([''])
    const addIngredient = () => { 
        if(ingredientsForms.length < 15) setIngredientsForms([...ingredientsForms, ""]) 
            // TODO: else, message d'alerte + bouton +  grisé
    }
    const delIngredient = (index:number): MouseEventHandler<HTMLButtonElement> => () => {
        const updatedIngredients = ingredientsForms.filter((_, i) => {
            return i !== index
        })
        setIngredientsForms(updatedIngredients)
    }

    const handleChangeInput = (index: number): ChangeEventHandler<HTMLInputElement> => (e) => {
        const newIngredients = ingredientsForms.map( (ingredient, i) => {
            return i === index ? e.target.value : ingredient;
        })
        setIngredientsForms(newIngredients)
    }

    const [ mealTitle, setMealTitle] = useState<string>('')
    const handleMealTiteChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setMealTitle(e.target.value)
    }

    const displayIngredients = () => {
        const inputs = []

        for(let i = 1; i <= ingredientsForms.length; i++){
            inputs.push(
                <div key={i}>
                    <label htmlFor="ingredient" className="visually-hidden">Ingrédient {i}</label>
                    <input type="text" id={`ingredient-${i}`} placeholder={`Ingrédient ${i}`} value={ingredientsForms[i - 1]} onChange={handleChangeInput(i - 1)}/>

                    <button className="invisible-button plus" onClick={delIngredient(i - 1)}>
                        {i >= 2 &&
                            <FaMinus />
                        }
                    </button>

                </div>
            )
        }
        return inputs
    }

    // console.log(ingredientsForms)

    return (
        <> 
        <div className="inputs-div">
            <label htmlFor="meal" className="visually-hidden">Nom du plat</label>
            <input id='meal' type="text" placeholder="Lasages, Pâtes aux oignons" onChange={handleMealTiteChange} value={mealTitle} />

            <div>
                <select name="type" id="type">
                    <option value="0">Type du plat</option>
                </select>
                <FaPlus />
            </div>
        </div>
        
        <div className="inputs-div">
            <div>
                <h3>Ingrédients</h3>
                <button className='invisible-button' onClick={addIngredient}>
                    <FaPlus />
                </button>
            </div>

            {displayIngredients()}
        </div>
        </>
    )
}

export default ModaleAddMealContent