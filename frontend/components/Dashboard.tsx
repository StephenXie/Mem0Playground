"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import {signOut} from "next-auth/react"
import { MessageSquare, Users, PlayCircle, ChevronDown, Send, RefreshCw } from 'lucide-react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

export default function Dashboard() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi there! I'm mem0.ai, your personal assistant. How can I help you today? 😊\n\nHere are a few things you can ask me:\n- ✍️ Remember my name is [Your Name].\n- 🏙 I live in [Your City].\n- ❓ What is my name?\n- 🏠 Where do I live?\n- 🤔 What do you remember about me?\n\nGo ahead, ask me anything! Let's make your experience extraordinary. ✨"
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      // Here you would typically send the message to your backend and wait for a response
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-2 h-14 border-b">
        <Image
              src="https://app.mem0.ai/images/light.svg"
              width={90}
              height={90}
              alt="Authentication"
              className="block ml-2 mt-2"
            />
        </div>
        <nav className="p-4">
          <button className="flex items-center w-full p-2 text-left text-gray-700 hover:bg-gray-100 rounded">
            <MessageSquare className="mr-3" size={20} />
            Dashboard
          </button>
          <button className="flex items-center w-full p-2 text-left text-gray-700 hover:bg-gray-100 rounded">
            <Users className="mr-3" size={20} />
            Users
          </button>
          <button className="flex items-center w-full p-2 text-left text-gray-700 hover:bg-gray-100 rounded">
            <PlayCircle className="mr-3" size={20} />
            Playground
          </button>
          <button onClick={() => signOut()} className="flex items-center w-full p-2 text-left text-gray-700 hover:bg-gray-100 rounded">
            <Users className="mr-3" size={20} />
            Log out
          </button>
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center justify-center w-full p-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
            <MessageSquare className="mr-2" size={16} />
            New Chat
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-semibold">stephen5-default-org</span>
            <ChevronDown size={20} className="mx-2" />
            <span className="text-gray-500">/</span>
            <span className="ml-2">default-project</span>
            <ChevronDown size={20} className="ml-2" />
          </div>
          <div>
            <button className="text-blue-600 hover:underline">Docs</button>
          </div>
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-auto p-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="font-semibold mb-2">No memories found.</h2>
        <p className="text-sm text-gray-600 mb-4">Your memories will appear here.</p>
        <button className="flex items-center justify-center w-full p-2 text-white bg-gray-800 rounded hover:bg-gray-700">
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </button>
      </div>
    </div>
  )
}