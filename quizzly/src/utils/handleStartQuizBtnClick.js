// COLLECTS DATA FROM THE QUIZ CUSTOMIZATION FORM & USES THAT DATA TO GET QUIZ QUESTIONS FROM THE OPEN TRIVIA DATABASE
export default function handleStartQuizBtnClick(params) {
    const {e, setLoading, setQuestions, setIsHomePage, setDialog} = params
    e.preventDefault()
    const formData = new FormData(e.target)
    const {category, difficulty, type} = Object.fromEntries(formData)
    
    getQuestions(category, difficulty, type, setLoading, setQuestions, setIsHomePage, setDialog)
}

// IF QUESTIONS ARE FETCHED SUCCESSFULY, 'isHomepage' IS SET TO FALSE. THIS ENSURES THAT THE QUIZ COMPONENT IS RENDERED INSTEAD OF THE HERO COMPONENT
// IF QUESTIONS ARE NOT FETCHED SUCCESSFULLY, AN ERROR MESSAGE IS RENDERED VIA THE DIALOG MODAL
// THE LOADER IS THEN HIDDEN  
  async function getQuestions(category, difficulty, type, setLoading, setQuestions, setIsHomePage, setDialog) {
      try {
        setLoading(true)
        const response = await fetch(`https://opentdb.com/api.php?amount=5${category !== 'category' ? `&category=${category}` : ''}${difficulty !== 'difficulty' ? `&difficulty=${difficulty}` : ''}${type !== 'type' ? `&type=${type}` : ''}`)
        handleResponseError(response)

        const data = await response.json()
        handleDataError(data)
        setQuestions(data.results)
        setIsHomePage(false)
        window.scroll(0, 0)
      } catch(error) {
        setIsHomePage(true)
        setDialog( {['textContent']: error.message, ['isOpen']: true} )
      } finally {
        setTimeout(()=> setLoading(false), 1000)
      }
  }

  // THROWS AN ERROR BASED ON THE ERROR CODE RECEIVED DURING THE FETCHING PROCESS
  function handleResponseError(response) {
    if(!response.ok) {
      if(response.status >= 500) {
        throw new Error('Error starting quiz. Unable to connect to the server.')
      } else if (response.status === 429) {
        throw new Error('Too many requests: Please try again later.');
      } else {
        throw new Error('Error starting quiz. Please check your internet connection and try again')
      }
    }
  }

  // THROWS AN ERROR BASED ON THE RESPONSE CODE RECEIVED FROM THE OPEN TRIVIA DATABASE
  function handleDataError(data) {
    const RESPONSE_CODE_NO_RESULTS = 1;
    const RESPONSE_CODE_TOO_MANY_REQUESTS = 5;

    if (data.response_code === RESPONSE_CODE_NO_RESULTS) {
      throw new Error(`No results found: The server returned no quiz questions. \nPlease select a different combination.`);
    } else if (data.response_code === RESPONSE_CODE_TOO_MANY_REQUESTS) {
      throw new Error('Too many requests: Please try again later.');
    }
  }