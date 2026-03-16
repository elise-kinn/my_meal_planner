import { Link } from "react-router-dom"

const Login = () => {
    return(
        <main>
            <h2>Connexion</h2>
            
            <form>
                <div>
                    <label htmlFor="username" className="visually-hidden">Nom d'utilisateur</label>
                    <input type="text" name="username" id="username" placeholder="Nom d'utilisateur"/>
                    
                    <label htmlFor="password" className="visually-hidden">Mot de passe</label>
                    <input type="text" name="password" id="password" placeholder="Mot de passe"/>

                    <button className="green small-button">Se connecter</button>
                </div>

                <Link to='/register' className="violet">Pas de compte ? S'inscrire</Link>
            </form>
        </main>
    )
}

export default Login