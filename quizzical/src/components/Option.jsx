
export default function Option(props) {
    const {options, name, selectedOption, handleSelectionChange} = props

    return options.map((item, i)=> {
        const value = item === 'Multiple Choice' ? 'multiple' : item === 'True / False' ? 'boolean' : item.toLowerCase()

        return (
            <li role="option" aria-selected={selectedOption[name] === item} key={i}>
                <input 
                    id={`${name}-${item}`} 
                    className='info-option' 
                    type='radio' 
                    name={name} 
                    value={value}
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