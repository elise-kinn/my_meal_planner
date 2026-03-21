import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";


type modale = {
    title: string
    button: string
    onClose: () => void
    children: React.ReactNode
}

const ModaleAddMeal = ({ title, button, onClose, children }: modale) => {
    const modaleRoot = document.querySelector('#modale-root')
    if(!modaleRoot) return null

    return ( 
        createPortal(
            <>
            <div className="modale add">
                <div id='title-div'>
                    <h2>{title}</h2>
                    <button className="invisible-button" onClick={onClose}>
                        <RxCross2 />
                    </button>
                </div>

                {children}

                <button className="visible violet" >
                    <FiPlus/>
                    {button}
                </button>
                    
            </div>
            <div onClick={onClose} className="background-modale"/>
            </>, modaleRoot
        )
    )
}

export default ModaleAddMeal