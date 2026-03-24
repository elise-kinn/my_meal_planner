import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

type ModaleProp = {
    title: string
    type:string
    onClose: () => void
    children: React.ReactNode
}

function ModaleBase({ title, type, onClose, children }: ModaleProp){
    const modaleRoot = document.querySelector('#modale-root')
    if(!modaleRoot) return null

    // const [ formData, setFormData ] = useState<T>()

    return ( 
        createPortal(
            <>
            <div className={`modale add ${type}`}>
                <div id='title-div'>
                    <h2>{title}</h2>
                    <button className="invisible-button" onClick={onClose}>
                        <RxCross2 />
                     </button>
                </div>

                {children}

                {/* <button className="visible violet" onClick={handleClick}>
                    <FiPlus/>
                    {button}
                </button> */}
                    
            </div>
            <div onClick={onClose} className="background-modale"/>
            </>, modaleRoot
        )
    )
}

export default ModaleBase