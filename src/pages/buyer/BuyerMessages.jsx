import { useState, useRef, useEffect } from 'react'
import { Send, ArrowLeft } from 'lucide-react'
import BuyerLayout from '../../layouts/BuyerLayout'
import { messages as initialMessages } from '../../data/buyerData'

export default function BuyerMessages() {
  const [conversations, setConversations] = useState(initialMessages)
  const [activeId, setActiveId]           = useState(null)
  const [input, setInput]                 = useState('')
  const bottomRef = useRef()

  const active = conversations.find(c => c.id === activeId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [active?.thread])

  function sendMessage() {
    if (!input.trim()) return
    setConversations(cs => cs.map(c => c.id === activeId
      ? { ...c, thread:[...c.thread, { from:'buyer', text:input.trim(), time:'Just now' }], lastMessage:input.trim(), unread:0 }
      : c
    ))
    setInput('')
  }

  function markRead(id) {
    setConversations(cs => cs.map(c => c.id === id ? { ...c, unread:0 } : c))
  }

  return (
    <BuyerLayout title="Messages">
      <div className="flex h-[calc(100vh-64px)]">

        {/* Conversation list */}
        <div className={`w-full sm:w-75 lg:w-80 border-r border-(--border) bg-(--bg) flex flex-col shrink-0 ${activeId ? 'hidden sm:flex' : 'flex'}`}>
          <div className="px-5 py-4 border-b border-(--border)">
            <h2 className="font-display text-[20px] font-medium text-navy-700 dark:text-navy-100">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-(--border)">
            {conversations.map(c => (
              <button key={c.id} onClick={() => { setActiveId(c.id); markRead(c.id) }}
                className={`w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-(--bg-subtle) transition-colors ${activeId===c.id ? 'bg-navy-50 dark:bg-navy-800/50' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[14px] shrink-0">{c.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[14px] font-medium text-(--text) truncate">{c.farmer}</p>
                    <span className="text-[11.5px] text-(--text-muted) shrink-0">{c.time}</span>
                  </div>
                  <p className="text-[12.5px] text-(--text-muted) truncate mt-0.5">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-navy-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        {active ? (
          <div className={`flex-1 flex flex-col ${activeId ? 'flex' : 'hidden sm:flex'}`}>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 h-16 border-b border-(--border) bg-(--bg) shrink-0">
              <button onClick={() => setActiveId(null)} className="sm:hidden p-1.5 -ml-1 text-(--text-muted) hover:text-(--text)">
                <ArrowLeft size={20} />
              </button>
              <div className="w-9 h-9 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[13px] shrink-0">{active.avatar}</div>
              <div>
                <p className="text-[14.5px] font-medium text-(--text)">{active.farmer}</p>
                <p className="text-[12px] text-(--text-muted)">{active.lga} · re: {active.produce}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3 bg-(--bg-subtle)">
              {active.thread.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed
                    ${msg.from === 'buyer'
                      ? 'bg-navy-600 text-white rounded-br-sm'
                      : 'bg-(--bg) text-(--text) border border-(--border) rounded-bl-sm'}`}>
                    <p>{msg.text}</p>
                    <p className={`text-[11px] mt-1 ${msg.from === 'buyer' ? 'text-white/60' : 'text-(--text-muted)'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-(--border) bg-(--bg) flex items-center gap-3 shrink-0">
              <input
                type="text" placeholder="Type a message…"
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 h-11 px-4 rounded-xl border border-(--border-mid) bg-(--bg-subtle) text-(--text) placeholder:text-(--text-muted) text-[15px] outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all"
              />
              <button onClick={sendMessage}
                className="w-11 h-11 rounded-xl bg-navy-600 hover:bg-navy-700 flex items-center justify-center text-white transition-colors shrink-0">
                <Send size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden sm:flex items-center justify-center text-center">
            <div>
              <div className="w-14 h-14 rounded-full bg-(--bg-subtle) flex items-center justify-center mx-auto mb-4 text-(--text-muted)">
                <Send size={24} strokeWidth={1.5} />
              </div>
              <p className="text-[15px] text-(--text-muted)">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </BuyerLayout>
  )
}
