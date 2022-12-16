const Setting = ({label, val, up, down}) => {

return(
    <div className="lapText" style={{display: 'flex', alignItems: 'center'}}>
                    <button className='greenButton' onClick={up}>+</button>
                        {label} {val}
                    <button className='greenButton' onClick={down}>-</button>
    </div>
);

}

export default Setting;