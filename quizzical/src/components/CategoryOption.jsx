import { useEffect, useState } from "react"

export default function CategoryOption(props) {

    const {selectedOption, handleSelectionChange, loading, setLoading} = props
    const [categories, setCategories] = useState(()=> [])

    useEffect(()=> {
        async function getCategories() {
            try {
                setLoading(true)
                const response = await fetch('https://opentdb.com/api_category.php')
                const categories = await response.json()
                setCategories([{id: 'category', name: 'Category'}, ...categories.trivia_categories])
            } catch (error) {
                alert('Error:' + error.message)
            } finally {
                setTimeout(()=> setLoading(false), 1000)
            }
        }
        if(categories.length === 0) {
            getCategories()
        }
    }, [])

    if(categories.length > 0) {
        return categories.map( (category, i)=> {
            const {id, name} = category
            const optionNumber = i + 1
            return (
                    <li key={i}>
                        <input 
                            id={`category-option-${optionNumber}`} 
                            className='info-option' 
                            type='radio' 
                            name='category' 
                            value={id}
                            checked={selectedOption.category === name} 
                            onChange={handleSelectionChange}
                            data-option={name}
                        />
                        <label htmlFor={`category-option-${optionNumber}`} className='info-option-label'>
                            {name}
                        </label>
                    </li>
            )
        })
    }
}