
export default function Option(props) {
    const {options, name, selectedOption, handleSelectionChange} = props

    return options.map((item, i)=> {
        const value = item === 'Multiple Choice' ? 'multiple' : item === 'True / False' ? 'boolean' : item.toLowerCase()
        const optionNumber = i + 1

        return (
            <li key={i}>
                <input 
                    id={`${name}-option-${optionNumber}`} 
                    className='info-option' 
                    type='radio' 
                    name={name} 
                    value={value}
                    checked={selectedOption[name] === item} 
                    onChange={handleSelectionChange}
                    data-option={item}
                />

                <label htmlFor={`${name}-option-${optionNumber}`} className='info-option-label'>
                    {item}
                </label>
            </li>
        )
    })
}