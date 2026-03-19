import { FiPlus } from "react-icons/fi";

type meal = {
    meal:string
}

const Meal = ({meal}: meal) => {

    return (
        <div>
            <div className="title">
                <h5>{meal}</h5>
                <button className="invisible-button"><FiPlus /></button>
            </div>
        </div>
    )
}

export default Meal