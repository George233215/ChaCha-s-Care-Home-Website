'use client'

import { FormEvent, useMemo, useRef, useState } from 'react'
import { Bot, MessageCircle, Send, X } from 'lucide-react'

type Role = 'user' | 'assistant'

type Message = {
  id: string
  role: Role
  content: string
}

const quickPrompts = [
  'What services do you offer?',
  'How do I schedule a visit?',
  'Do you provide 24/7 care?',
]

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message
  if (typeof error === 'string') return error
  return 'Assistant temporarily unavailable.'
}

function renderFormattedAssistantText(text: string) {
  const lines = text.split('\n')

  return lines.map((line, lineIndex) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)

    return (
      <p key={`line-${lineIndex}`} className="mb-1 last:mb-0">
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            const value = part.slice(2, -2)
            return (
              <strong key={`part-${lineIndex}-${partIndex}`} className="font-semibold text-foreground">
                {value}
              </strong>
            )
          }

          if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            const value = part.slice(1, -1)
            return (
              <span key={`part-${lineIndex}-${partIndex}`} className="font-medium text-foreground">
                {value}
              </span>
            )
          }

          return (
            <span key={`part-${lineIndex}-${partIndex}`}>
              {part}
            </span>
          )
        })}
      </p>
    )
  })
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello, welcome to Cha Cha's Care Home. I can help with services, visits, and general questions. How can I assist you today?",
    },
  ])
  const listRef = useRef<HTMLDivElement>(null)

  const hasUserMessage = useMemo(
    () => messages.some((m) => m.role === 'user'),
    [messages],
  )

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight
      }
    })
  }

  const sendMessage = async (content: string) => {
    const trimmed = content.trim()
    if (!trimmed || isSending) return

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: trimmed,
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setIsSending(true)
    scrollToBottom()

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok || !payload?.reply) {
        console.error('Chatbot request failed', {
          status: response.status,
          payload,
          lastUserMessage: trimmed,
        })
        throw new Error(payload?.error || 'Assistant temporarily unavailable.')
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content: payload.reply,
        },
      ])
      scrollToBottom()
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      const isMissingKey = errorMessage.includes('Missing Gemini API key')
      const isNetworkFailure =
        errorMessage.toLowerCase().includes('failed to fetch') ||
        errorMessage.toLowerCase().includes('networkerror')

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant-error`,
          role: 'assistant',
          content: isMissingKey
            ? 'Chat is not configured yet. Please add GEMINI_API_KEY in .env.local and restart the dev server.'
            : isNetworkFailure
              ? 'The chat server is temporarily unavailable. Please wait a few seconds and try again.'
            : 'I could not process that right now. Please call (804) 252-0967 or use the contact form for immediate help.',
        },
      ])
      if (!isMissingKey) {
        console.error(
          `Chat widget error: ${errorMessage} (lastUserMessage="${trimmed}")`,
        )
      }
      scrollToBottom()
    } finally {
      setIsSending(false)
    }
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await sendMessage(input)
  }

  return (
    <div className="fixed z-[70] bottom-4 right-4 sm:bottom-5 sm:right-5 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]">
      {isOpen && (
        <div className="mb-3 w-[min(350px,calc(100vw-1.5rem))] sm:w-[350px] rounded-2xl border border-primary/15 bg-white shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300">
          <div className="bg-gradient-to-r from-primary to-primary/90 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">Cha Cha&apos;s Assistant</p>
                <p className="text-xs text-white/85">Professional care guidance</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 hover:bg-white/15 transition-colors"
              aria-label="Close chat"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="h-[55vh] max-h-[360px] overflow-y-auto p-3 bg-gradient-to-b from-secondary/20 to-white">
            <div className="space-y-3">
              {!hasUserMessage && (
                <div className="space-y-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      disabled={isSending}
                      className="w-full text-left text-sm rounded-lg border border-primary/20 bg-white px-3 py-2 hover:bg-primary/5 transition-colors disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'ml-auto bg-primary text-white'
                      : 'mr-auto bg-white border border-border text-foreground'
                  }`}
                >
                  {message.role === 'assistant' ? renderFormattedAssistantText(message.content) : message.content}
                </div>
              ))}

              {isSending && (
                <div className="mr-auto bg-white border border-border text-foreground rounded-xl px-3 py-2 text-sm">
                  Thinking...
                </div>
              )}
            </div>
          </div>

          <form onSubmit={onSubmit} className="border-t border-border p-3 bg-white">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about services, visits, and care..."
                className="flex-1 rounded-lg border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="inline-flex items-center justify-center rounded-lg bg-primary text-white px-3 py-2 disabled:opacity-50 hover:bg-primary/90 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full bg-primary text-white shadow-lg px-4 py-3 hover:bg-primary/90 transition-colors"
        type="button"
        aria-label={isOpen ? 'Close assistant chat' : 'Open assistant chat'}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-semibold">{isOpen ? 'Close Chat' : 'Ask a Question'}</span>
      </button>
    </div>
  )
}
