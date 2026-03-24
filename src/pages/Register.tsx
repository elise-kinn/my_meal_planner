import { useState } from "react"
import { Link } from "react-router-dom"

type form = {
    username: string
    password: string
    confPassword: string
    RGPD: boolean
}

type error = {
    message: string
    input: string[]
}| null

const Register = () => {

    const [error, setError] = useState<error>(null)

    const [formData, setFormData] = useState<form>({
        username: "", 
        password: "", 
        confPassword: "", 
        RGPD: false
    })

    const submitform: React.SubmitEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault();
        setError(null)

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
                method:"POST", 
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if(!res.ok) setError({ message: data.message, input: data.alertInput})
        } catch (error) {
            console.error(error)
        }
    }

    const onChangeForm: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value, checked} = e.target
        if(name === 'RGPD') return setFormData({ ...formData, [name]: checked})
        setFormData({ ...formData, [name]: value })
    }

    return(
        <main>
            <h2>Inscription</h2>
            
            <form onSubmit={submitform}>
                <div>
                    <label htmlFor="username" className="visually-hidden">Nom d'utilisateur</label>
                    <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" className={`${error?.input.includes('username') && "error-input"}`} value={formData.username} onChange={onChangeForm}/>

                    {error?.input.includes('username') && <p className="alert red">{error.message}</p>}
                    
                    <label htmlFor="password" className="visually-hidden">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="Mot de passe" autoComplete="off" className={`${error?.input.includes('password') && "error-input"}`} value={formData.password} onChange={onChangeForm}/>

                    {error?.input.includes('password') && <p className="alert red">{error.message}</p>}

                    <label htmlFor="confPassword" className="visually-hidden">Confirmation de mot de passe</label>
                    <input type="password" name="confPassword" id="confPassword" placeholder="Confirmation de mot de passe" autoComplete="off" className={`${error?.input.includes('confPassword') && "error-input"}`} value={formData.confPassword} onChange={onChangeForm}/>

                    {error?.input.includes('confPassword') && <p className="alert red">{error.message}</p>}

                    <div>
                        <input type="checkbox" name="RGPD" id="RGPD" checked={formData.RGPD} onChange={onChangeForm}/>
                        <label htmlFor="RGPD">J'accepte les conditions d'utilisation du site</label>
                    </div>

                    {error?.input.includes('RGPD') && <p className="alert red">Accepter les conditions d'utilisation du site est obligatoire pour créer un compte</p>}
                    
                    <input type="submit" className="green small-button" value="S'inscrire"/>
                </div>

                <Link to='/' className="visible violet">Déjà un compte ? Se connecter</Link>

            </form>
        </main>
    )
}

export default Register