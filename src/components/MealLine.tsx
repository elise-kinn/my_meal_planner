import { motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react"
import { ImBin } from "react-icons/im";
import { useUser, useView } from "../store/store";

type MealLineProp = {
    meal:{
        id_meal_user: number
        name_meal:string
        type_meal: string
        date:string
    }
}

const MealLine = ({ meal }: MealLineProp) => {
    const { token } = useUser()
    const { setMealsPlanned, mealsPlanned } = useView()

    const x = useMotionValue(0)
    const opacity = useTransform( x, [ 0, -25 ], [ 1, 0 ] )
    const width = useTransform( x, [ 0, -25 ], [ 0, 23.33 ] )
    const iconOpacity = useTransform( x,[ 0, -25 ], [ 0,1 ] )

    useMotionValueEvent( x, 'change',  () => {
        console.log('opacity : ', opacity.get())
    })

    const onDelete = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/services/${meal.id_meal_user}`, {
                headers:{
                    "Content-type": "application/json", 
                    "authorization": `Bearer ${token}`
                }, 
                method:"DELETE"
            })
            if(!res.ok) throw new Error(' ERROR DELETE SERVICE ')
            setMealsPlanned( mealsPlanned.filter(m => m.id_meal_user !== meal.id_meal_user ) )
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <li>
            <motion.p
                drag="x"
                dragConstraints={{ left: -25, right: 0 }}
                style={{ opacity, x }}
            >
                {meal.name_meal}
            </motion.p>
            
            <motion.button 
                className="bin invisible-button"
                id={`${meal.id_meal_user}`}
                onClick={onDelete}
                style={{ width }}
            >
                <motion.i style={{ opacity: iconOpacity }}>
                    <ImBin />
                </motion.i>
            </motion.button>
        </li>
    )
}

export default MealLine