import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/store";
import { getWeek, startOfWeek, addDays, setDefaultOptions, format } from "date-fns"
import { fr } from 'date-fns/locale';
setDefaultOptions({ locale: fr })

import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

import Day from "../components/Day";

type MealProp = {
    name_meal: string
    type_meal: string
    date: string
}

const Planning = () => {
    const { isAuthenticated, token } = useUser()
    const navigate = useNavigate()

    const now = new Date()

    const [week, setWeek] = useState(getWeek(now))
    const startWeek = startOfWeek(now, { weekStartsOn: 1})
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startWeek, i) )
    const getFormatedDate = (date:Date) => format(date, 'yyyy-MM-dd') 
    const firstDayFormated = getFormatedDate(weekDays[0])
    const lastDayFormated = getFormatedDate(weekDays[6])

    const getMealsOfTheDay = (day:Date, meals:MealProp[]) => {
        if(!meals) return []
        return meals.filter( meal => meal.date === getFormatedDate(day))
    }

    const [ meals, setMeals ] = useState<MealProp[]>([])

    const fetchMealsOfTheService = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/services?start=${firstDayFormated}&end=${lastDayFormated}`, {
                headers:{
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })
            if(!res.ok) throw new Error('ERROR GET MEALS_USERS')
            
            const data = await res.json()
            setMeals(data)
        } catch (error) {
            console.error(error)
        }
    },[token, firstDayFormated, lastDayFormated])

    useEffect( () => { fetchMealsOfTheService() }, [fetchMealsOfTheService])

    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/')
        }
    })

    return(
        <main id="planning">
            <div id="div-title">
                <button className="invisible-button" onClick={() => setWeek(week - 1)}><IoMdArrowDropleft/></button>
                <h2>Mon planning</h2>
                <button className="invisible-button" onClick={() => setWeek(week + 1)}><IoMdArrowDropright/></button>
            </div>
            
            <h3>Semaine {week}</h3>

            <section>
                {weekDays.map(day => (<Day 
                    key={day.getDay()}
                    day={day}
                    meals={getMealsOfTheDay(day, meals)}
                />))}
            </section>
        </main>
    )
}

export default Planning