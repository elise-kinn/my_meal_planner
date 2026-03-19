
type modaleProp = {
    text:string
    button1Text: string
    button2Text: string 
    onConfirm: () => void
    closeModale: () => void
} 

const Modale = ({ text, button1Text, button2Text, onConfirm, closeModale }: modaleProp) => {

    return ( 
        <div id="confirmation-modale">
            <p>{text}</p>
            <button className='visible green' onClick={onConfirm}>{button1Text}</button>
            <button className='visible violet' onClick={closeModale}>{button2Text}</button>
        </div>
    )
}

export default Modale