import { Link } from "react-router-dom"
import { useView } from "../store/store"

type modaleProp = {
    items: {
        page:string
        url:string
    }[]
    onClose: () => void
} 

const ModaleNav = ({ items, onClose }: modaleProp) => {
    const { setCurrentPage } = useView()
    const onClick = (page: string) => {
        onClose()
        setCurrentPage(page)
    }

    return ( 
        <>
        <nav id="mobile" className="modale">
            <ul>
                {items.map(item => (
                    <li key={item.page}>
                        <Link to={`/${item.url}`} onClick={() => onClick(item.page)}>{item.page}</Link>
                    </li>
                ))}
            </ul>
        </nav>
        <div onClick={onClose} className="background-modale"/>
        </>
    )
}

export default ModaleNav