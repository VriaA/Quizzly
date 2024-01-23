
export default function Option(props) {
    const {options, name, selectedOption, handleSelectionChange} = props

    return options.map((item, i)=> {
        const value = item === 'Multiple Choice' ? 'multiple' : item === 'True / False' ? 'boolean' : item.toLowerCase()
        const optionNumber = i + 1

        return (
            <li role="option" aria-selected={selectedOption[name] === item} key={i}>
                <input 
                    id={`${name}-option-${optionNumber}`} 
                    className='quiz-customization-option' 
                    type='radio' 
                    name={name} 
                    value={value}
                    checked={selectedOption[name] === item} 
                    onChange={handleSelectionChange}
                    data-option={item}
                />

                <label htmlFor={`${name}-option-${optionNumber}`} className='quiz-customization-option-label'>
                    {item}
                </label>
            </li>
        )
    })
}