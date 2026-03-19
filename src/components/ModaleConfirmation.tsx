type modaleProp = {
    name:string
    text:string
    button1Text: string
    button2Text: string 
    onConfirm: () => void
    closeModale: () => void
} 

const ModaleConfirmation = ({ text, button1Text, button2Text, onConfirm, closeModale, name }: modaleProp) => {

    return ( 
        <>
        <div className="modale" id={name}>
            <p>{text}</p>
            <button className='visible green' onClick={onConfirm}>{button1Text}</button>
            <button className='visible violet' onClick={closeModale}>{button2Text}</button>
        </div>
        <div onClick={closeModale} className="background-modale"/>
        </>
    )
}

export default ModaleConfirmation