import Meal from "./Meal"
import { format } from 'date-fns'

type Day = {
    day:Date
    meals: MealProp[]
}

type MealProp = {
    name_meal:string
    type_meal: string
    date:string
}

const Day = ({ day, meals }: Day) => {
    const arrayMealTypes = ["Déjeuner", "Dîner"]
    const getWeekDay = (day:Date) => format(day, 'EEEE')
    const getMealsOfTheService = (type: string, meals: MealProp[]) => {
        if(!meals) return []
        return meals.filter(meal => meal.type_meal === type)
    }

    return (
        <div>
            <h4>{getWeekDay(day)}</h4>
            
            <div>
                {arrayMealTypes.map(meal => (<Meal 
                    key={meal}
                    day={day}
                    mealType={meal} 
                    meals={getMealsOfTheService(meal, meals)}
                />))}
            </div>
        </div>
    )
}

export default Day