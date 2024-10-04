"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  MessageSquare,
  Users,
  PlayCircle,
  ChevronDown,
  Send,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { queryLLM } from "@/lib/queryLLM";
import { getAllMemory, deleteMemory } from "@/lib/memoryAPI";
import Markdown from "react-markdown";
export default function Dashboard() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi there! I'm mem0.ai, your personal assistant. How can I help you today? 😊\n\nHere are a few things you can ask me:\n- ✍️ Remember my name is [Your Name].\n- 🏙 I live in [Your City].\n- ❓ What is my name?\n- 🏠 Where do I live?\n- 🤔 What do you remember about me?\n\nGo ahead, ask me anything! Let's make your experience extraordinary. ✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [tempInput, setTempInput] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [loading, setLoading] = useState(false);
  const [memories, setMemories] = useState([]);
  const openai_models = [
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-4-turbo",
    "gpt-3.5-turbo",
  ];
  const anthropic_models = [
    "claude-3-5-sonnet-20240620",
    "claude-3-opus-20240229",
    "claude-3-sonnet-20240229",
    "claude-3-haiku-20240307",
  ];

  const handleSend = async () => {
    var temp_input = input;
    setInput("");
    setTempInput(temp_input);
    setLoading(true);
    if (input.trim()) {
      console.log(messages);
      var response = await queryLLM(
        JSON.stringify([...messages, { role: "user", content: temp_input }]),
        session?.user?.email ?? "",
        model
      );
      setMessages([
        ...messages,
        { role: "user", content: temp_input },
        {
          role: "assistant",
          content: (response ?? "").toString(),
        },
      ]);
      // Here you would typically send the message to your backend and wait for a response
    }
    setLoading(false);
  };

  const getMemory = async () => {
    var memories = await getAllMemory(session?.user?.email ?? "");
    console.log(memories);
    setMemories(memories ?? []);
  };
  useEffect(() => {
    getMemory();
  }, []);

  const deleteMem = async (memory_id: string) => {
    var memories = await deleteMemory(session?.user?.email ?? "", memory_id);
    console.log(memories);
    setMemories(memories ?? []);
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
          <button
            onClick={() => signOut()}
            className="flex items-center w-full p-2 text-left text-gray-700 hover:bg-gray-100 rounded"
          >
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
            <Select value={model} onValueChange={(e) => setModel(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>OpenAI</SelectLabel>
                  {openai_models.map((model) => (
                    <SelectItem value={model}>{model}</SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Anthropic</SelectLabel>
                  {anthropic_models.map((model) => (
                    <SelectItem value={model}>{model}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <button className="text-blue-600 hover:underline">Docs</button>
          </div>
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === "user" ? "text-right" : ""}`}
            >
              <div
                className={`inline-block p-3 rounded-lg shadow-sm ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                } bg-black`}
              >
                {message.role === "user" ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <Markdown>{message.content}</Markdown>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <>
              <div key={messages.length} className="mb-4 text-right">
                <div className="inline-block p-3 rounded-lg bg-blue-600 text-white">
                  <p className="whitespace-pre-wrap">{tempInput}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="inline-block p-3 rounded-lg bg-gray-200 loader ml-2"></div>
              </div>
            </>
          )}
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
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
        <p className="text-sm text-gray-600 mb-4">
          Your memories will appear here.
        </p>
        <div className="flex flex-col space-y-3">
        {memories?.map((memory) => (
          <div className="flex flex-row">
            {memory["memory"]}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this memory and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteMem(memory["id"])}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
          </div>
        ))}
        </div>
        <button className="flex items-center justify-center w-full p-2 text-white bg-gray-800 rounded hover:bg-gray-700">
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </button>
      </div>
    </div>
  );
}
