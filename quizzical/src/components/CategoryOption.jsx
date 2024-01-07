import { useEffect, useState } from "react"

export default function CategoryOption(props) {

    const {selectedOption, handleSelectionChange} = props
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(()=> [])

    useEffect(()=> {
        async function getCategories() {
            try {
                const response = await fetch('https://opentdb.com/api_category.php')
                const categories = await response.json()
                setCategories([{id:'', name: 'Random'}, ...categories.trivia_categories])
            } catch (error) {
                alert('Error:' + error.message)
            } finally {
                setLoading(false)
            }
        }
        if(categories.length === 0) {
            getCategories()
        }
    }, [])

    if(categories.length > 0) {
        return categories.map( (category, i)=> {
            const {id, name} = category

            return (
                    <li role='option' tabIndex={0} key={i}>
                        <input 
                            id={`category-${name}`} 
                            className='info-option' 
                            type='radio' 
                            name='category' 
                            value={id}
                            checked={selectedOption.category === name} 
                            onChange={handleSelectionChange}
                            data-option={name}
                        />
                        <label htmlFor={`category-${name}`} className='info-option-label'>
                            {name}
                        </label>
                    </li>
            )
        })
    }
}
