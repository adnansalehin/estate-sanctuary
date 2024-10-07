import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, User, Home, Briefcase } from 'lucide-react'
import { initialConversations } from "@/utils/constants"
import { Conversation } from "@/app/types"

type ThreadListProps = {
  currentStage: number;
  isDarkTheme: boolean;
}

export function ThreadList({ currentStage, isDarkTheme }: ThreadListProps) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [expandedConversation, setExpandedConversation] = useState<number | null>(null)
  const [newThreadMessage, setNewThreadMessage] = useState("")
  const [newThreadRecipient, setNewThreadRecipient] = useState("")
  const [newThreadAttachment, setNewThreadAttachment] = useState<File | null>(null)

  const filteredConversations = conversations.filter(conv => conv.stage <= currentStage + 1)

  const toggleConversation = (id: number) => {
    setExpandedConversation(expandedConversation === id ? null : id)
  }

  const handleNewThreadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newThread: Conversation = {
      id: conversations.length + 1,
      date: new Date().toISOString().split('T')[0],
      sender: "Buyer",
      recipient: newThreadRecipient,
      message: newThreadMessage,
      stage: currentStage + 1,
      attachment: newThreadAttachment ? newThreadAttachment.name : undefined
    }
    setConversations([newThread, ...conversations])
    setNewThreadMessage("")
    setNewThreadRecipient("")
    setNewThreadAttachment(null)
  }

  return (
    <>
      <form onSubmit={handleNewThreadSubmit} className="mb-4 space-y-4">
        <div>
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            id="recipient"
            value={newThreadRecipient}
            onChange={(e) => setNewThreadRecipient(e.target.value)}
            className={isDarkTheme ? "bg-[#024e52] text-white" : "bg-gray-100 text-[#024e52]"}
            placeholder="Enter recipient"
            required
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={newThreadMessage}
            onChange={(e) => setNewThreadMessage(e.target.value)}
            className={isDarkTheme ? "bg-[#024e52] text-white" : "bg-gray-100 text-[#024e52]"}
            placeholder="Enter your message"
            required
          />
        </div>
        <div>
          <Label htmlFor="attachment">Attachment</Label>
          <Input
            id="attachment"
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null
              setNewThreadAttachment(file)
            }}
            className={isDarkTheme ? "bg-[#024e52] text-white" : "bg-gray-100 text-[#024e52]"}
          />
        </div>
        <Button type="submit">Add New Thread</Button>
      </form>
      <ul className="space-y-4">
        {filteredConversations.map((conversation) => (
          <li key={conversation.id} className={`border ${isDarkTheme ? 'border-gray-600' : 'border-gray-200'} rounded-lg overflow-hidden`}>
            <button
              onClick={() => toggleConversation(conversation.id)}
              className="flex items-center justify-between w-full p-4 text-left"
            >
              <div className="flex items-center gap-4">
                {conversation.sender === "Buyer" && <User className="w-6 h-6 text-blue-400" />}
                {conversation.sender === "Seller" && <Home className="w-6 h-6 text-green-400" />}
                {conversation.sender.includes("Solicitor") && <Briefcase className="w-6 h-6 text-yellow-400" />}
                {conversation.sender === "Surveyor" && <Briefcase className="w-6 h-6 text-purple-400" />}
                <div>
                  <p className="font-medium">{conversation.sender} to {conversation.recipient}</p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{conversation.date}</p>
                </div>
              </div>
              {expandedConversation === conversation.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedConversation === conversation.id && (
              <div className={`p-4 ${isDarkTheme ? 'bg-[#024e52]' : 'bg-gray-100'}`}>
                <p>{conversation.message}</p>
                {conversation.attachment && (
                  <p className="mt-2 text-sm text-white">Attachment: {conversation.attachment}</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}