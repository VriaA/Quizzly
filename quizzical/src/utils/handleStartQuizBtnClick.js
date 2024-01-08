export default function handleStartQuizBtnClick(e, setLoading) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const {category, difficulty, type} = Object.fromEntries(formData)
    
    getQuestions(category, difficulty, type, setLoading)
  }

  async function getQuestions(category, difficulty, type, setLoading) {
      try {
        setLoading(true)
        const response = await fetch(`https://opentdb.com/api.php?amount=5${category !== 'category' ? `&category=${category}` : ''}${difficulty !== 'difficulty' ? `&difficulty=${difficulty}` : ''}${type !== 'type' ? `&type=${type}` : ''}`)
        handleResponseError(response)

        const data = await response.json()
        handleDataError(data)
        console.log(data)
      } catch(error) {
        alert(error.message)
      } finally {
        setTimeout(()=> setLoading(false), 1000)
      }
  }

  function handleResponseError(response) {
    if(!response.ok) {
      if(response.status >= 500) {
        throw new Error('Error starting quiz. Unable to connect to the server.')
      } else {
        throw new Error('Error starting quiz. Please check your internet connection and try again')
      }
    }
  }

  function handleDataError(data) {
    const RESPONSE_CODE_NO_RESULTS = 1;
    const RESPONSE_CODE_TOO_MANY_REQUESTS = 5;

    if (data.response_code === RESPONSE_CODE_NO_RESULTS) {
      throw new Error('No results found: The server returned no quiz questions.');
    } else if (data.response_code === RESPONSE_CODE_TOO_MANY_REQUESTS) {
      throw new Error('Too many requests: Please refresh the page and try again later.');
    }
  }