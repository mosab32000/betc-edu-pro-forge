
import { useState } from 'react';
import { MessageSquare, Send, XCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NabataProps {
  className?: string;
}

const Nabata = ({ className }: NabataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'nabata'}>>([
    {
      text: 'مرحباً! أنا نباطا، مساعدك الشخصي في رحلتك التعليمية. كيف يمكنني مساعدتك اليوم؟',
      sender: 'nabata'
    }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsExpanded(prev => !prev);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const updatedMessages = [...messages, { text: input, sender: 'user' as const }];
    setMessages(updatedMessages);
    setInput('');
    
    // Simulate Nabata response (in a real application, this would connect to an AI service)
    setTimeout(() => {
      setMessages(current => [
        ...current, 
        { 
          text: 'شكراً على رسالتك! سيتم تفعيل نباطا قريباً مع ذكاء اصطناعي متقدم. ترقبوا التحديث القادم!', 
          sender: 'nabata' 
        }
      ]);
    }, 1000);
  };

  return (
    <div className={cn("fixed z-50", className)}>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-[hsl(var(--castle-magic))] text-white flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all"
        aria-label="فتح المساعد الذكي نباطا"
      >
        {isExpanded ? <XCircle size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <div 
        className={cn(
          "absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg border border-[hsl(var(--border))] shadow-xl transition-all duration-300 overflow-hidden",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-wisdom))] p-3 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[hsl(var(--castle-gold))]" />
            <h3 className="font-bold">نباطا - المساعد الذكي</h3>
          </div>
          <p className="text-xs opacity-80">مرشدك الشخصي في رحلتك التعليمية</p>
        </div>

        {/* Messages Container */}
        <div className="h-80 overflow-y-auto p-3 flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={cn(
                "p-2 rounded-lg max-w-[85%]", 
                msg.sender === 'user' 
                  ? "bg-[hsl(var(--castle-magic))] text-white self-end" 
                  : "bg-[hsla(var(--castle-stone)/0.2)] self-start"
              )}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-[hsl(var(--border))]">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="اكتب رسالتك هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3 py-2 border border-[hsl(var(--border))] rounded-l-md focus:outline-none focus:border-[hsl(var(--castle-magic))]"
            />
            <button
              onClick={handleSendMessage}
              className="bg-[hsl(var(--castle-magic))] text-white px-3 py-2 rounded-r-md hover:opacity-90 transition-opacity"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-center mt-2 text-gray-500">نباطا في مرحلة التطوير التجريبي</p>
        </div>
      </div>
    </div>
  );
};

export default Nabata;
