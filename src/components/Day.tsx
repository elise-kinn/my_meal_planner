import Meal from "./Meal"

type day = {
    day:string
}

const Day = ({day}: day) => {
    const mealsNames = ["Déjeuner", "Diner"]
    return (
        <div>
            <h4>{day}</h4>
            <div>
                {mealsNames.map(meal => ( <Meal meal={meal} key={meal} />))}
            </div>
        </div>
    )
}

export default Day