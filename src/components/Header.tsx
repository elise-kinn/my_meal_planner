import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom"

import { CiLogout } from "react-icons/ci";

import { useUser } from "../store/store";

import Modale from "./Modale";

const Header = () => {
    const navigate = useNavigate()
    const { logout, isAuthenticated } = useUser()
    const modaleRoot = document.querySelector('#modale-root')
    
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const closeModale = () => setIsOpen(false)
    const openModale = () => setIsOpen(true)

    const onLogout = () => {
        logout()
        navigate('/')
        closeModale()
    }

    const logoutButtonDisplay = isAuthenticated() 
        ? <button onClick={openModale} className="invisible-button"><CiLogout /></button>  
        : ''
    
    if(!modaleRoot) return null

    return(
        <header>
            <div>
                <h1>My Meal Planner</h1>
                {logoutButtonDisplay}
                {   
                    isOpen && 
                    createPortal(
                        <Modale 
                            text="Se déconnecter ?" 
                            button1Text="Oui, se déconnecter" 
                            button2Text="Non, rester connecté·e"
                            onConfirm={onLogout}
                            closeModale={closeModale}
                        />, modaleRoot
                    )
                    
                }
            </div>
        </header>
    )
}

export default Header