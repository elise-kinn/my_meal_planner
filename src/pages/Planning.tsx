import { getWeek } from "date-fns"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import Day from "../components/Day";
import { useUser } from "../store/store";

const Planning = () => {
    const { isAuthenticated } = useUser()
    const navigate = useNavigate()

    const [week, setWeek] = useState(getWeek(new Date()))
    const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

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
                {weekDays.map(day => (<Day day={day} key={day}/>))}
            </section>
        </main>
    )
}

export default Planning