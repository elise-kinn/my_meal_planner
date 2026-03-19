import { useEffect, useState, type ChangeEventHandler } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../store/store"

type form = {
    username: string,
    password: string
}

type error = {
    message: string, 
    input: string[]
}| null

const Login = () => {

    const { isAuthenticated, setToken, setId, setUsername } = useUser()
    const navigate = useNavigate()
    
    const [error, setError] = useState<error>(null)
    
    const [ formData, setFormData ] = useState<form>({
        username: "", 
        password: ""
    })

    const submitForm:React.SubmitEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault()
        setError(null)

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                method:"POST", 
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if(!res.ok) setError({ message: data.message, input: data.alertInput })

            const {id_user, username} = data.user

            setToken(data.token)
            setId(id_user)
            setUsername(username)   


        } catch (error) {
            console.error(error)
        }
    }

    const onChangeForm: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value})
    }

    useEffect(() => {
        if(isAuthenticated()) navigate('/planning')
    }, [isAuthenticated, navigate])

    return(
        <main>
            <h2>Connexion</h2>
            
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="username" className="visually-hidden">Nom d'utilisateur</label>
                    <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" className={`${error?.input.includes('username') && "error-input"}`} value={formData.username} onChange={onChangeForm}/>
                    
                    <label htmlFor="password" className="visually-hidden">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="Mot de passe" autoComplete="off" className={`${error?.input.includes('password') && "error-input"}`} value={formData.password} onChange={onChangeForm}/>

                    {error && <p className="error">{error.message}</p>}


                    <input type="submit" className="green small-button" value="Se connecter"/>
                </div>

                <Link to='/register' className="violet">Pas de compte ? S'inscrire</Link>
            </form>
        </main>
    )
}

export default Login