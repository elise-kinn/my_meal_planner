import { useEffect, useState, type ChangeEventHandler, type MouseEventHandler } from "react";
import { useUser, useView } from "../../store/store";
import { format } from "date-fns";

type MealsProp = {
    id_meal: number
    name_meal: string
    name_type: string
}[]

type ModaleProp = {
    day:Date
    mealType: string
    onClose: () => void
} 

const ModaleAddInPlanning = ({ day, mealType, onClose }: ModaleProp) => {
    const { token } = useUser()
    const { setMealsPlanned, mealsPlanned } = useView()

    const formatedDate = format(day, 'yyyy-MM-dd')

    const [ alertId, setAlertId ] = useState<number | null>(null)

    const [ searchInput, setSearchInput ] = useState<string>('')
    const handleOnChangeSearchInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchInput(e.target.value)
    }
    
    const [ selectedOption, setSelectedOption ] = useState<string>('created_at')
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
    const handleChangeSelect : ChangeEventHandler<HTMLSelectElement> = (e) => {
        setSelectedOption(e.target.value)
    }
    
    const [ meals, setMeals ] = useState<MealsProp>([])

    //handle seach input
    useEffect(() => {
        const timer = setTimeout(async () => {
            try {

                const res = await fetch(`${import.meta.env.VITE_API_URL}/meals?search=${searchInput}&order=${selectedOption}` , {
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error('error GET meals');
                const data = await res.json();
                setMeals(data)
                
            } catch (error) {
                console.error(error);
            }
        }, 250); 

        return () => clearTimeout(timer);
        
    }, [searchInput, token, selectedOption]); 

    const handleAddMeal: MouseEventHandler<HTMLButtonElement> = async(e) => {
        const idMeal = e.currentTarget.id

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/services`, {
                method:"POST", 
                headers:{
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body:JSON.stringify({ idMeal, formatedDate, mealType })
            })

            if(res.status === 500) throw new Error('Error POST service')
            
            const data = await res.json()
            setMealsPlanned([...mealsPlanned, data])
            if(res.status === 400) return setAlertId(data) 
            onClose()
            
        } catch (error) {
            console.error(error)
        }
        
    }
        
    return (
        <>
        <div className="inputs-div">
            <label htmlFor="search" className="visually-hidden">Rechercher un plat</label>
            <input 
                id='search' 
                type="text" 
                placeholder="Lasagnes, Pâtes aux oignons..."
                value={searchInput}
                onChange={handleOnChangeSearchInput}
            />

            <select name="type" id="type" onChange={handleChangeSelect} value={selectedOption}>
                {optionsArray.map( (option) => (
                    <option value={option.order_by} key={option.order_by}>{option.text}</option>
                ))}
            </select>
        </div>

        <ul id="id-list">
            {meals.map( meal => (
                <li key={meal.name_meal} className={`${alertId === meal.id_meal ? 'alert-meal' : ''}`} >
                    <button 
                        className='invisible-button'
                        id={`${meal.id_meal}`} 
                        onClick={handleAddMeal}
                    >
                        {meal.name_meal}
                        <span>{meal.name_type}</span>
                    </button>
                </li>
            ))}
        </ul>
        </>
    )
}

export default ModaleAddInPlanning