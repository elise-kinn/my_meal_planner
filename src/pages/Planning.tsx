import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/store";
import { getWeek, startOfWeek, addDays, setDefaultOptions } from "date-fns"
import { fr } from 'date-fns/locale';
setDefaultOptions({ locale: fr })

import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

import Day from "../components/Day";

const Planning = () => {
    const { isAuthenticated } = useUser()
    const navigate = useNavigate()

    const now = new Date()

    const [week, setWeek] = useState(getWeek(now))
    const startWeek = startOfWeek(now, { weekStartsOn: 1})
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startWeek, i) )

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
                />))}
            </section>
        </main>
    )
}

export default Planning