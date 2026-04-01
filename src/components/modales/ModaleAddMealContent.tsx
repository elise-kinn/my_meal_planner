import { useCallback, useEffect, useState, type ChangeEventHandler, type MouseEventHandler } from "react";
import { FaPlus , FaMinus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

import { useUser } from "../../store/store";

import ModaleBase from "./ModaleBase";
import ModaleAddTypeContent from "./ModaleAddTypeContent";
import ModaleConfirmation from "./ModaleConfirmation";

type TypesProp = {
    name_type:string
    id_type: number
}[]

type ErrorProp = {
    message:string
    input:string[]
}|null

const ModaleAddMealContent = () => {
    const { id_user, token } = useUser()
    
    const [ error, setError ] = useState<ErrorProp>(null)

    const [ mealTitle, setMealTitle] = useState<string>('')
    const handleMealTiteChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setMealTitle(e.target.value)
    }

    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const openModale = () => setIsOpen(true)
    const closeModale = () => setIsOpen(false)

    const [ selectedType, setSelectedType ] = useState<string>('0')
    const onChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => { 
        setSelectedType(e.target.value) 
    }

    const [ types, setTypes ] = useState<TypesProp>([])
    
    const fetchAllTypes = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/types/${id_user}`, {
                headers:{
                    "Content-type": "application/json", 
                    "authorization": `Bearer ${token}`
                }
            })
            if(res.status === 400) return  
            if(!res.ok) throw new Error('Error fetch GET types')

            const data = await res.json()
            setTypes(data.types)
        } catch (error) {
            console.error(error)
        }
    }, [id_user, token])
    
    useEffect(() => {fetchAllTypes()}, [fetchAllTypes])

    const [ ingredientsForms, setIngredientsForms ] = useState<string[]>([''])
    const addIngredientInput = () => { 
        if(ingredientsForms.length < 15) setIngredientsForms([...ingredientsForms, ""]) 
            // TODO: else, message d'alerte + bouton +  grisé
    }
    const delIngredientInput = (index:number): MouseEventHandler<HTMLButtonElement> => () => {
        const updatedIngredients = ingredientsForms.filter((_, i) => {
            return i !== index
        })
        setIngredientsForms(updatedIngredients)
    }

    const handleChangeIngredientInput = (index: number): ChangeEventHandler<HTMLInputElement> => (e) => {
        const newIngredients = ingredientsForms.map( (ingredient, i) => {
            return i === index ? e.target.value : ingredient;
        })
        setIngredientsForms(newIngredients)
    }

    const displayIngredientsInput = () => {
        const inputs = []

        for(let i = 1; i <= ingredientsForms.length; i++){
            inputs.push(
                <div key={i}>
                    <label htmlFor={`ingredient-${i}`} className="visually-hidden">Ingrédient {i}</label>
                    <input type="text" id={`ingredient-${i}`} placeholder={`Ingrédient ${i}`} value={ingredientsForms[i - 1]} onChange={handleChangeIngredientInput(i - 1)}/>

                    <button className="invisible-button plus" onClick={delIngredientInput(i - 1)}>
                        {i >= 2 &&
                            <FaMinus />
                        }
                    </button>

                </div>
            )
        }
        return inputs
    }

    const [ isOpenConfirmation, setOpenConfirmation ] = useState<boolean>(false)
    const openConfirmationModale = () => setOpenConfirmation(true)
    const closeConfirmationModale = () => setOpenConfirmation(false)

    const handleSubmit = async(confirmation:boolean) => {
        if(!confirmation){
            const isEveryIngredientEmpty = ingredientsForms.every(ingredient => ingredient.trim() === '')
            const isMealTitleEmpty = mealTitle === ''
            const isTypeSelected = selectedType === '0'
            if(isEveryIngredientEmpty && !isMealTitleEmpty && !isTypeSelected) return openConfirmationModale()
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/meals`, {
                method: "POST", 
                headers:{
                    "Content-type": "application/json", 
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ ingredientsForms, mealTitle, selectedType }) 
            })
    
            const data = await res.json()
            if(!res.ok) setError({ message: data.message, input: data.alertInput})

            setIngredientsForms([''])
            setMealTitle('')
            setSelectedType('0')
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleConfirmationModale = () => {
        handleSubmit(true)
        closeConfirmationModale()
    }

    return (
        <> 
        <div className="inputs-div">
            <label htmlFor="meal" className="visually-hidden">Nom du plat</label>
            <input 
                id='meal' 
                className={`${error?.input?.includes('title') && "error-input"}`} 
                type="text" 
                placeholder="Lasages, Pâtes aux oignons" 
                onChange={handleMealTiteChange} 
                value={mealTitle} 
            />

            {error?.input.includes('title') && <p className="alert red">{error.message}</p>}

            <div>
                <select 
                    id="type" 
                    className={`${error?.input?.includes('select') && "error-input"}`} 
                    name="type" 
                    onClick={fetchAllTypes} 
                    value={selectedType} 
                    onChange={onChangeSelect}
                >
                    <option value="0">Type du plat</option>
                    {
                        types.map((type) => (
                            <option value={type.id_type} key={type.id_type}>{type.name_type}</option>
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
                {error?.input.includes('select') && <p className="alert red">Veuillez choisir un type</p>}
        </div>
        
        <div className="inputs-div">
            <div>
                <h3>Ingrédients</h3>
                <button className='invisible-button' onClick={addIngredientInput}>
                    <FaPlus />
                </button>
            </div>

            {displayIngredientsInput()}
        </div>

        {isOpenConfirmation && 
            <ModaleConfirmation 
                name="no-ingredient" 
                text="Votre plat ne contient aucun ingrédient"
                button1Text="Créer sans ingrédient"
                button2Text="Retour"
                onConfirm={handleConfirmationModale}
                closeModale={closeConfirmationModale}
            />
        }

        {/* TODO: Ajouter un + en bas des inputs */}

        <button className="visible violet" onClick={() => handleSubmit(false)}>
            <FiPlus/>
            Ajouter
        </button>
        </>
    )
}

export default ModaleAddMealContent