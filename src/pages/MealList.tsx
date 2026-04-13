import { useNavigate } from "react-router-dom"
import { useUser } from "../store/store"
import { useCallback, useEffect, useState, type ChangeEventHandler } from "react"
import { FiPlus } from "react-icons/fi"
import ModaleBase from "../components/modales/ModaleBase"
import ModaleAddMealContent from "../components/modales/ModaleAddMealContent"

type MealsProp = {
    id_meal: number
    name_meal: string
    name_type: string
}

const MealList = () => {
    const { isAuthenticated, token } = useUser()
    const navigate = useNavigate()
    
    const [ isOpenAddModale, setIsOpenAddModale ] = useState<boolean>(false)
    const openAddModale = () => setIsOpenAddModale(true)
    const closeAddModale = () => setIsOpenAddModale(false)

    const [ input, setInput ] = useState<string>('')
    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInput(e.target.value)
    }

    const optionsArray = [
        {
            text : 'Par date de création',
            order_by: 'created_at'
        },
        {
            text : 'Par ordre alphabétique',
            order_by: 'name_meal'
        },
        {
            text : 'Par type',
            order_by: 'name_type'
        },
    ]

    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/')
        }
    })

    const handleClickAdd = () => {
        openAddModale()
    }

    const [ meals, setMeals ] = useState<MealsProp[]>([])
    const fetchMeals = useCallback(async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/meals`, {
                headers:{
                    "Content-type": "application/json", 
                    "authorization": `Bearer ${token}`
                }
            })
            if(!res.ok) throw new Error('ERROR GET MEALS')
            const data = await res.json()
            setMeals(data)
        } catch (error) {
            console.error(error)
        }
    }, [token])
    
    useEffect( () => { fetchMeals() }, [fetchMeals])

    return( 
        <main id='meal-list'>
            <h2>Mes repas</h2>

            <button className="visible violet" onClick={handleClickAdd}>
                <FiPlus/>
                Ajouter un repas
            </button>

            { isOpenAddModale && 
                <ModaleBase title="Créer un repas" type='xl' onClose={closeAddModale}>
                    <ModaleAddMealContent />
                </ModaleBase>
            }

            <div>
                <label htmlFor='search-meal' className="visually-hidden">Barre de recherche</label>
                <input 
                    type="text" 
                    id="search-meal"
                    placeholder="Rechercher un repas..."
                    value={input}
                    onChange={handleChangeInput}
                />
                    {/* TODO: Duplication de code ! (modale add in planning) */}
                <label htmlFor='select-list' className="visually-hidden">Sélectionner un ordre</label>
                <select id="select-list">
                    {optionsArray.map( option => (
                        <option value={option.order_by} key={option.order_by}>{option.text}</option>
                    ))}
                </select>
            </div>

            {meals.map( meal => (
                <div key={meal.id_meal}>
                    <p>{meal.name_meal}</p>
                </div>
            ))}

        </main>
    )  
} 

export default MealList