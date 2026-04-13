import { useUser,  useView } from "../store/store"
import { useEffect, useState } from "react";

import { MdArrowRight } from "react-icons/md"
import { FaPlus } from "react-icons/fa6";

import ModaleNav from "./modales/ModaleNav";
import ModaleBase from "./modales/ModaleBase";
import ModaleAddMealContent from "./modales/ModaleAddMealContent";

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

const Footer = () => {
    const { isAuthenticated } = useUser()
    const { currentPage, setCurrentPage } = useView()

    const [isOpenNav, setIsOpenNav ] = useState<boolean>(false)
    const closeModaleNav = () => setIsOpenNav(false)
    const openModaleNav = () => setIsOpenNav(true)

    const [isOpenPlus, setIsOpenPlus ] = useState<boolean>(false)
    const closeModalePlus = () => setIsOpenPlus(false)
    const openModalePlus = () => setIsOpenPlus(true) 
    const url = window.location.pathname.slice(1)

    useEffect(() => {
        const found = navItems.find(el => el.url === url);
        
        if (found) {
            setCurrentPage(found.page);
        }
    }, [url, setCurrentPage]);


    if(!isAuthenticated()) return <footer />

    return(
        <footer>
            { isOpenNav && <ModaleNav items={navItems} onClose={closeModaleNav}/> }
            <button className="invisible-button" onClick={openModaleNav}>
                <MdArrowRight />
                <p>{currentPage}</p>
            </button>

            { 
                isOpenPlus &&  
                    <ModaleBase 
                        title='Créer un plat'
                        type='xl'
                        onClose={closeModalePlus}
                    >
                        <ModaleAddMealContent />
                    </ModaleBase>
            }

            <button id="plus-button" onClick={openModalePlus}>
                <FaPlus />
            </button>
        </footer>
    )
}

export default Footer