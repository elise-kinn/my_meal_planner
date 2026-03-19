import { MdArrowRight } from "react-icons/md"
import { FaPlus } from "react-icons/fa6";
import { useUser } from "../store/store"

const Footer = () => {
    const { isAuthenticated } = useUser()
    const url:string = window.location.pathname 

    const page = (url:string) => {
        switch(url){
            case '/planning':
                return 'Planning';
                break;
            default:
                return '';
                break
        }
    }

    if(!isAuthenticated()) return <footer></footer>

    return(
        <footer>
            <div>
                <MdArrowRight />
                <p>{page(url)}</p>
            </div>

            <div><FaPlus /></div>
        </footer>
    )
}

export default Footer