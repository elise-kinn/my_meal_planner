import Meal from "./Meal"
import { format } from 'date-fns'

type day = {
    day:Date
}

const Day = ({ day }: day) => {
    const arrayMealTypes = ["Déjeuner", "Dîner"]
    const getWeekDay = (day:Date) => format(day, 'EEEE')

    return (
        <div>
            <h4>{getWeekDay(day)}</h4>
            
            <div>
                {arrayMealTypes.map(meal => (<Meal 
                    key={meal}
                    day={day}
                    mealType={meal} 
                />))}
            </div>
        </div>
    )
}

export default Day