
export default function Option(props) {
    const {options, name, selectedOption, handleSelectionChange} = props

    return options.map((item, i)=> {
        return (
            <li role='option' key={i}>
                <input 
                    id={`${name}-${item}`} 
                    className='info-option' 
                    type='radio' 
                    name={name} 
                    value={item.toLowerCase()}
                    checked={selectedOption[name] === item} 
                    onChange={handleSelectionChange}
                    data-option={item}
                />

                <label htmlFor={`${name}-${item}`} className='info-option-label'>
                    {item}
                </label>
            </li>
        )
    })
}