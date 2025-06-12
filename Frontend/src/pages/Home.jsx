import React, { useEffect, useRef, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import ai from '../assets/ai.gif'
import user from  '../assets/user.gif'

const Home = () => {
  const { authUser, askAssistant, logout } = useAuthStore()
  const [userText, setuserText] = useState('')
  const [aiText, setaiText] = useState('')

  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const isRecognizingRef = useRef(false)
  const [isListening, setIsListening] = useState(false)
  const synth = window.speechSynthesis

  const handleLogout = async() => {
    const response = await logout() 
    if(response){
      console.log('logged out')

    }
  }
  const speak = (text, callback) => {
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'en-US'
    isSpeakingRef.current = true
    speech.onend = () => {
      isSpeakingRef.current = false
      if (callback) callback()
      else startRecognition()
    }
    synth.speak(speech)
  }
  

  const handleCommand = (data) => {
    const { type, userInput, result } = data
    switch (type) {
      case 'google_search':
        window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, '_blank')
        break
      case 'youtube_search':
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, '_blank')
        break
      case 'youtube_play':
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}&sp=EgIQAQ%253D%253D`, '_blank')
        break
      case 'facebook_open':
        window.open('https://www.facebook.com', '_blank')
        break
      case 'instagram_open':
        window.open('https://www.instagram.com', '_blank')
        break
      case 'calculator_open':
        window.open('https://www.google.com/search?q=calculator', '_blank')
        break
      case 'weather-show':
        window.open(`https://www.google.com/search?q=weather+${encodeURIComponent(userInput || '')}`, '_blank')
        break
      case 'general':
        speak(result || 'No result provided.')
        break
      default:
        console.log('Unknown command type.')
    }
  }

  const initRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = true

    recognition.onstart = () => {
      isRecognizingRef.current = true
      setIsListening(true)
      console.log('Speech recognition started')
    }

    recognition.onend = () => {
      isRecognizingRef.current = false
      setIsListening(false)
      console.log('Speech recognition ended')
      if (!isSpeakingRef.current && isListening) {
        setTimeout(startRecognition, 1000)
      }
    }

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error)
      isRecognizingRef.current = false
      setIsListening(false)
    
      if ((event.error === 'no-speech' || event.error === 'audio-capture') && !isSpeakingRef.current) {
        console.log('Retrying due to no speech...')
        setTimeout(startRecognition, 1000) // retry after short delay
      }
    
      if (event.error === 'abort' && !isSpeakingRef.current) {
        setTimeout(startRecognition, 1000)
      }
    }
    

    recognition.onresult = async (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim()
      console.log('Heard:', command)
      if (command.toLowerCase().includes(authUser.assistantName.toLowerCase())) {
        setuserText(command)
        setaiText('')
        recognition.stop()
        isRecognizingRef.current = false
        setIsListening(false)
        const data = await askAssistant({ command })
        console.log('Response:', data)
        handleCommand(data)
        setuserText('')
        setaiText(data.result || 'No response from assistant.')
        speak(data.result)
      }
    }

    recognitionRef.current = recognition
  }

  const startRecognition = () => {
    if (recognitionRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        if (error.name !== 'InvalidStateError') {
          console.error('Recognition start error:', error)
        }
      }
    }
  }

  const stopRecognition = () => {
    if (recognitionRef.current && isRecognizingRef.current) {
      recognitionRef.current.stop()
      isRecognizingRef.current = false
      setIsListening(false)
    }
  }

  const toggleAssistant = () => {
    if (isListening) {
      stopRecognition()
    } else {
      speak(`Hello ${authUser.name}, how can I assist you today?`, () => {
        startRecognition()
      })
    }
  }
  

  useEffect(() => {
    initRecognition()
    return () => {
      stopRecognition()
      recognitionRef.current = null
    }
  }, [askAssistant, authUser.assistantName])

  return (
    <div className='min-h-screen bg-gradient-to-tr from-cyan-500 to-blue-500 flex flex-col items-center justify-center p-4 font-sans text-white'>
      <div className='bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 max-w-2xl w-full shadow-lg hover:scale-105 transition-transform duration-300'>
        <h1 className='text-3xl text-black font-semibold mb-4 text-center'>Welcome, {authUser.name}!</h1>
        <div className='flex flex-col md:flex-row items-center md:items-start'>
          <img
            src={authUser.assistantImage}
            alt={`${authUser.assistantName} Image`}
            className='w-48 h-48 object-cover rounded-full shadow-lg mb-4 md:mb-0 md:mr-6'
          />
          <div className='text-center md:text-left'>
            <h2 className='text-xl text-black font-semibold mb-2'>Your Assistant: {authUser.assistantName}</h2>
            <p className='mb-2 text-black'>Email: {authUser.email}</p>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <button
          onClick={toggleAssistant}
          className={`px-6 py-3 rounded text-white font-semibold transition ${
            isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isListening ? 'Stop' : 'Start'}
        </button>
        <button className='ml-4 px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition'
          onClick={() => {
            stopRecognition()
            handleLogout()
          }} >
          LogOut
        </button>
      </div>
      {!aiText && <img src={user} alt='User' className='w-32 h-32 mt-6' />}
      {aiText && <img src={ai} alt='AI' className='w-32 h-32 mt-6' />}
    </div>
  )
}

export default Home
