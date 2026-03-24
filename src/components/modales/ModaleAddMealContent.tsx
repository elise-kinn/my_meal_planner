import { useCallback, useEffect, useState, type ChangeEventHandler, type MouseEventHandler } from "react";
import { FaPlus , FaMinus } from "react-icons/fa6";

import { useUser } from "../../store/store";

import ModaleBase from "./ModaleBase";
import ModaleAddTypeContent from "./ModaleAddTypeContent";
import { FiPlus } from "react-icons/fi";

type TypesProp = {
    name_type:string
}[]

const ModaleAddMealContent = () => {
    const { id_user } = useUser()
    
    const [ types, setTypes ] = useState<TypesProp>([])

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

    const [ selectedType, setSelectedType ] = useState('0')
    const onChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => { setSelectedType(e.target.value) }

    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const openModale = () => setIsOpen(true)
    const closeModale = () => setIsOpen(false)

    const displayIngredients = () => {
        const inputs = []

        for(let i = 1; i <= ingredientsForms.length; i++){
            inputs.push(
                <div key={i}>
                    <label htmlFor={`ingredient-${i}`} className="visually-hidden">Ingrédient {i}</label>
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
    
    const fetchAllTypes = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/types/${id_user}`)
            if(res.status === 400) return  
            if(!res.ok) throw new Error('Error fetch GET types')

            const data = await res.json()
            setTypes(data.types)
        } catch (error) {
            console.error(error)
        }
    }, [id_user])
    
    useEffect(() => {fetchAllTypes()}, [fetchAllTypes])

    const handleSubmit = async() => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/types`, {
            method: "POST", 
            headers:{"Content-type": "application/json"},
            body: JSON.stringify({ ingredientsForms, mealTitle }) 
        })

        if(!res.ok) throw new Error('error fetch types')

        const response = await res.json()
        console.log(response)
    }

    return (
        <> 
        <div className="inputs-div">
            <label htmlFor="meal" className="visually-hidden">Nom du plat</label>
            <input 
                id='meal' 
                type="text" 
                placeholder="Lasages, Pâtes aux oignons" 
                onChange={handleMealTiteChange} 
                value={mealTitle} 
            />

            <div>
                <select name="type" id="type" onClick={fetchAllTypes} value={selectedType} onChange={onChangeSelect}>
                    <option value="0">Type du plat</option>
                    {
                        types.map((type, i) => (
                            <option value={i} key={type.name_type}>{type.name_type}</option>
                        ))
                    }
                </select>
                <button className="invisible-button" onClick={openModale}>
                    <FaPlus />
                </button>

                {
                    isOpen && 
                    <ModaleBase 
                        title='Ajouter un type' 
                        type='s'
                        onClose={closeModale}
                    >
                        <ModaleAddTypeContent />
                    </ModaleBase>
                }
                
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

        <button className="visible violet" onClick={handleSubmit}>
            <FiPlus/>
            Ajouter
        </button>
        </>
    )
}

export default ModaleAddMealContent