import { useState, type ChangeEventHandler } from "react"
import { FiPlus } from "react-icons/fi"
import { useUser } from "../../store/store"

type AlertProp = {
    message:string
    type: 'green' | 'red'
}|null

const ModaleAddTypeContent = () => {
    const { token } = useUser()
    const [ type, setType ] = useState<string>('')

    const [ alert, setAlert ] = useState<AlertProp|null>(null)

    const handleChangenput: ChangeEventHandler<HTMLInputElement> = (e) => setType(e.target.value)
    
    const handleClick = async() => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/types`, {
            method: "POST",
            body: JSON.stringify({ type }),
            headers:{
                "Content-type": "application/json", 
                "authorization": `Bearer ${token}`
            }
        })
        
        const data = await res.json()

        if(!res.ok) return setAlert({ message: data.message, type: 'red'})

        setType('')
        setAlert({ type: "green", message : data.message })
    }

    return(
        <>
        <label htmlFor="nouveau-type" className="visually-hidden">Nouveau type de plat</label>
        <input 
            id='nouveau-type' 
            type="text" 
            placeholder="Nouveau type de plat" 
            onChange={handleChangenput} 
            value={type} 
            autoComplete="off" 
            className={`${alert?.type === 'red' && "error-input"}`}
            maxLength={30}
        />

        { alert && <p className={`alert ${alert.type}`}>{alert.message}</p>}

        <button className="visible violet" onClick={handleClick}>
            <FiPlus/>
            Ajouter
        </button>
        </>
    )   
}

export default ModaleAddTypeContent