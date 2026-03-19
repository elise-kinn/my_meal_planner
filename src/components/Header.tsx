import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom"

import { CiLogout } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import { useUser } from "../store/store";

import ModaleConfirmation from "./ModaleConfirmation";

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

    const logoutButtonDisplay = () => {
        if(!isAuthenticated()) return
        if(!isOpen) return <button onClick={openModale} className="invisible-button"><CiLogout /></button>  
        if(isOpen) return <button onClick={openModale} className="invisible-button"><RxCross2 /></button>  
    }
    
    if(!modaleRoot) return null

    return(
        <header>
            <div>
                <h1>My Meal Planner</h1>
                {logoutButtonDisplay()}
                {   
                    isOpen && 
                    createPortal(
                        <ModaleConfirmation 
                            name="logout"
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