import { useState, useRef, useEffect } from 'react'
import { Send, ArrowLeft } from 'lucide-react'
import BuyerLayout from '../../layouts/BuyerLayout'
import api from '../../lib/api'

function fmtTime(value) {
  if (!value) return ''
  return new Date(value).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export default function BuyerMessages() {
  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId]           = useState(null)
  const [input, setInput]                 = useState('')
  const [messagesByConversation, setMessagesByConversation] = useState({})
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState('')
  const [sending, setSending]             = useState(false)
  const bottomRef = useRef()

  const currentUser = JSON.parse(localStorage.getItem('agrilink_user') || '{}')
  const active = conversations.find(c => c._id === activeId)
  const activeThread = activeId ? (messagesByConversation[activeId] || []) : []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [activeThread])

  useEffect(() => {
    let mounted = true
    async function loadConversations() {
      setLoading(true)
      setError('')
      try {
        const { data } = await api.get('/messages/conversations')
        const convs = (data.data?.conversations || []).map((conv) => {
          const other = conv.participants.find((p) => p._id !== currentUser._id)
          return {
            _id: conv._id,
            avatar: other ? `${other.firstName?.[0] || ''}${other.lastName?.[0] || ''}`.toUpperCase() : 'U',
            farmer: other ? `${other.firstName} ${other.lastName}` : 'Conversation',
            lga: other?.lga || '',
            produce: conv.relatedListing?.produce || 'Produce inquiry',
            lastMessage: conv.lastMessage || '',
            time: fmtTime(conv.lastMessageAt),
            unread: 0,
            recipientId: other?._id,
            relatedListingId: conv.relatedListing?._id,
          }
        })
        if (mounted) {
          setConversations(convs)
          if (!activeId && convs[0]) setActiveId(convs[0]._id)
        }
      } catch (err) {
        if (mounted) setError(err.response?.data?.message || 'Unable to load conversations.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadConversations()
    return () => { mounted = false }
  }, [currentUser._id])

  useEffect(() => {
    if (!activeId) return
    let mounted = true
    async function loadMessages() {
      try {
        const { data } = await api.get(`/messages/${activeId}`)
        if (mounted) {
          const thread = (data.data?.messages || []).map((msg) => ({
            from: msg.sender._id === currentUser._id ? 'buyer' : 'farmer',
            text: msg.text,
            time: fmtTime(msg.createdAt),
          }))
          setMessagesByConversation((prev) => ({ ...prev, [activeId]: thread }))
        }
      } catch (err) {
        if (mounted) setError(err.response?.data?.message || 'Unable to load messages.')
      }
    }
    loadMessages()
    return () => { mounted = false }
  }, [activeId, currentUser._id])

  async function sendMessage() {
    if (!input.trim() || !active || sending) return
    setSending(true)
    setError('')
    try {
      const { data } = await api.post('/messages', {
        recipientId: active.recipientId,
        text: input.trim(),
        listingId: active.relatedListingId,
      })
      const msg = data.data?.message
      setMessagesByConversation((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] || []), {
          from: 'buyer',
          text: msg?.text || input.trim(),
          time: fmtTime(msg?.createdAt),
        }],
      }))
      setConversations((prev) => prev.map((c) => c._id === activeId ? { ...c, lastMessage: input.trim(), time: 'Just now' } : c))
      setInput('')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send message.')
    } finally {
      setSending(false)
    }
  }

  function markRead(id) {
    setConversations(cs => cs.map(c => c._id === id ? { ...c, unread:0 } : c))
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
            {loading ? (
              <div className="p-5 text-[13px] text-(--text-muted)">Loading conversations…</div>
            ) : conversations.map(c => (
              <button key={c._id} onClick={() => { setActiveId(c._id); markRead(c._id) }}
                className={`w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-(--bg-subtle) transition-colors ${activeId===c._id ? 'bg-navy-50 dark:bg-navy-800/50' : ''}`}>
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
              {error && <p className="text-[13px] text-red-500">{error}</p>}
              {activeThread.map((msg, i) => (
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
              <button onClick={sendMessage} disabled={sending}
                className="w-11 h-11 rounded-xl bg-navy-600 hover:bg-navy-700 flex items-center justify-center text-white transition-colors shrink-0 disabled:opacity-70">
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
