import { useEffect, useState } from "react"

export default function CategoryOption(props) {

    const {selectedOption, handleSelectionChange, setLoading, setDialog} = props
    const [categories, setCategories] = useState(()=> [])

    // GETS QUIZ CATEGORIES FROM THE OPEN TRIVIA DATABASE
    useEffect(()=> {
        async function getCategories() {
            try {
                setLoading(true)
                const response = await fetch('https://opentdb.com/api_category.php')
                const categories = await response.json()
                setCategories([{id: 'category', name: 'Category'}, ...categories.trivia_categories])
                setTimeout(()=> setLoading(false), 1000)
            } catch (error) {
                setDialog( {
                    ['textContent']: 'Unable to load the page. Please verify your internet connection and try refreshing the page.', 
                    ['isOpen']: true} 
                    )
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
                    <li role='option' aria-selected={selectedOption.category === name} key={i}>
                        <input 
                            id={`category-option-${optionNumber}`} 
                            className='quiz-customization-option' 
                            type='radio' 
                            name='category' 
                            value={id}
                            checked={selectedOption.category === name} 
                            onChange={handleSelectionChange}
                            data-option={name}
                        />
                        <label htmlFor={`category-option-${optionNumber}`} className='quiz-customization-option-label'>
                            {name}
                        </label>
                    </li>
            )
        })
    }
}