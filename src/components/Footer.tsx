import { useUser,  useView } from "../store/store"
import { useState } from "react";

import { MdArrowRight } from "react-icons/md"
import { FaPlus } from "react-icons/fa6";
import ModaleNav from "./ModaleNav";

const Footer = () => {
    const { isAuthenticated } = useUser()
    const { currentPage } = useView()

    const [isOpen, setIsOpen ] = useState<boolean>(false)
    const closeModale = () => setIsOpen(false)
    const openModale = () => setIsOpen(true)
    
    // const navItems = ["Planning", "Liste de course", "Liste des repas"]
    const navItems = [
        {
            page: "Planning",
            url: "planning"
        },
        {
            page: "Liste de course",
            url: "grocery_list"
        },
        {
            page: "Liste des repas",
            url: "meal_list"
        }
    ]

    if(!isAuthenticated()) return <footer />

    return(
        <footer>
            {   
                isOpen && <ModaleNav items={navItems} onClose={closeModale}/>
            }
            <button className="invisible-button" onClick={openModale}>
                <MdArrowRight />
                <p>{currentPage}</p>
            </button>

            <div id="plus-div"><FaPlus /></div>
        </footer>
    )
}

export default Footer