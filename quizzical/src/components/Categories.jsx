import { useEffect, useState } from "react"

export default function Categories(props) {

    const {isDarkTheme} = props
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(()=> [])

    useEffect(()=> {
        async function getCategories() {
            try {
                const response = await fetch('https://opentdb.com/api_category.php')
                const categories = await response.json()
                setCategories(categories.trivia_categories)
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

    function getNewListItems() {
        return categories.map( (category, i)=> {
            const {id, name} = category

            return (
                    <li role='option' tabIndex={0} key={i + 2}>
                        <input id={`category-${i + 2}`} className='info-option' type='radio' name='category' value={id}/>
                        <label htmlFor={`category-${i + 2}`} className='info-option-label'>
                            {name}
                        </label>
                    </li>
            )
        })
    }

    function CategoriesHTML() {
        if(categories.length > 0) {

            return [
                <li role='option' tabIndex={0} key={1}>
                    <input id='category-1' className='info-option' type='radio' name='category'value={'random'} defaultChecked={true}/>
                    <label htmlFor='category-1' className='info-option-label'>
                    Random
                    </label>
                </li>,
                ...getNewListItems()
            ]
        }
    }

    return (
        <ul id='category-dropdown' className={`info-dropdown hidden ${isDarkTheme && 'info-dropdown-dark'}`} role='listbox' aria-labelledby='category-trigger-name'>
            <CategoriesHTML />
        </ul>
    )
}
