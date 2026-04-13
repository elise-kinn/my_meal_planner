import { useRef, useEffect, type RefObject } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent, MotionValue } from "motion/react"
import { useUser, useView } from "../store/store";

import { ImBin } from "react-icons/im";
import { GrStatusPlaceholder } from "react-icons/gr";
import { FaRegPenToSquare } from "react-icons/fa6";


type MealLineProp = {
    meal:{
        id_meal_user: number
        name_meal:string
        type_meal: string
        date:string
    }
}

function useCloseDrag(ref:RefObject<HTMLElement | null>, x:MotionValue<number>) {
  useEffect(() => {
    function handleClickOutside(e:MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) x.set(0)
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref, x]);
}

const MealLine = ({ meal }: MealLineProp) => {
    const { token } = useUser()
    const { setMealsPlanned, mealsPlanned } = useView()

    const x = useMotionValue(0)
    const opacity = useTransform( x, [ 0, -25 ], [ 1, 0.1 ] )
    const widthBin = useTransform( x, [ 0, -60 ], [ 0, 60 ] )
    const widthPen = useTransform(x, [ 0, -25 ], [ 0, 23.33 ])
    const iconOpacity = useTransform( x,[ 0, -25 ], [ 0, 1 ] )

    useMotionValueEvent( x, 'change', () => {
        if(x.get() > -100) return
        x.set(0)
        return onDelete()
    })

    const wrapperRef = useRef(null)
    useCloseDrag(wrapperRef, x)

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
            // TODO: gestion res du back ?
            // const data = await res.json()
            // console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <li ref={wrapperRef}>
            <motion.div
                drag="x"
                dragConstraints={{ left: -25, right: 0 }}
                style={{ opacity, x }}
                
            >
                <GrStatusPlaceholder/>
                <p>{meal.name_meal}</p>
            </motion.div>

            <motion.button 
                className="pen invisible-button"
                id={`${meal.id_meal_user}`}
                onClick={onDelete}
                style={{ width: widthPen }}
            >
                <motion.i style={{ opacity: iconOpacity }} >
                    <FaRegPenToSquare />
                </motion.i>
            </motion.button>

            <motion.button 
                className="bin invisible-button"
                id={`${meal.id_meal_user}`}
                onClick={onDelete}
                style={{ width: widthBin }}
            >

                <motion.i style={{ opacity: iconOpacity }} className="red">
                    <ImBin />
                </motion.i>
            </motion.button>
        </li>
    )
}


export default MealLine