import React, { useEffect, useRef, useState } from 'react'
import useAuthStore from '../store/useAuthStore'

const Home = () => {
  const { authUser, askAssistant } = useAuthStore()

  const recognitionRef = useRef(null)
  const [isListening, setIsListening] = useState(false)

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'en-US'
    window.speechSynthesis.speak(speech)
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = true

    recognition.onresult = async (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim()
      console.log('Heard:', command)

      if (command.toLowerCase().includes(authUser.assistantName.toLowerCase())) {
        const data = await askAssistant({ command })
        console.log('Response:', data)
        speak(data.result)
      }
    }

    recognitionRef.current = recognition
  }, [askAssistant, authUser.assistantName])

  const toggleAssistant = () => {
    if (!isListening) {
      recognitionRef.current?.start()
      setIsListening(true)
      console.log('Started listening...')
    } else {
      recognitionRef.current?.stop()
      setIsListening(false)
      console.log('Stopped listening.')
    }
  }

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
      </div>
    </div>
  )
}

export default Home
