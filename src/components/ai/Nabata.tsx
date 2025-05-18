
import { useState, useEffect } from 'react';
import { MessageSquare, Send, XCircle, Sparkles, BrainCircuit, Bot, Stars, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NabataProps {
  className?: string;
}

const Nabata = ({ className }: NabataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'nabata', thinking?: boolean}>>([
    {
      text: 'مرحباً! أنا نباطا، مساعدك الشخصي في رحلتك التعليمية. كيف يمكنني مساعدتك اليوم؟',
      sender: 'nabata'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [mood, setMood] = useState<'neutral' | 'happy' | 'curious'>('neutral');
  const { toast } = useToast();

  // Personality phrases for nabata
  const nabataResponses = {
    greeting: [
      'أهلاً بك في قلعة Betc! أنا نباطا، مرشدك في رحلة المعرفة.',
      'مرحباً! يسعدني أن أكون دليلك في استكشاف عالم البتراء الرقمي.',
      'السلام عليكم! أنا نباطا، صديقك الذكي في رحلة التعلم.'
    ],
    thinking: [
      'أفكر في إجابة مناسبة...',
      'أبحث في قواعد المعرفة النبطية...',
      'أستحضر حكمة الأنباط...'
    ],
    help: [
      'يمكنني مساعدتك في فهم معايير BTEC، أو إرشادك خلال القلعة، أو الإجابة على أسئلتك التعليمية.',
      'أستطيع توجيهك في رحلة التعلم، شرح المفاهيم الصعبة، أو تقديم نصائح للنجاح في المهام.',
      'خبرتي تشمل التقييم الذكي، البحث في المصادر، وتقديم تغذية راجعة مفيدة.'
    ]
  };

  const toggleChat = () => {
    setIsExpanded(prev => !prev);
  };

  // Get random response based on category
  const getRandomResponse = (category: keyof typeof nabataResponses) => {
    const responses = nabataResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Analyze user input to determine Nabata's response
  const analyzeInput = (text: string): string => {
    const lowercaseText = text.toLowerCase();
    
    if (lowercaseText.includes('مرحبا') || lowercaseText.includes('أهلا') || lowercaseText.includes('السلام')) {
      setMood('happy');
      return getRandomResponse('greeting');
    }
    
    if (lowercaseText.includes('ساعد') || lowercaseText.includes('مساعدة') || lowercaseText.includes('كيف يمكنك')) {
      setMood('curious');
      return getRandomResponse('help');
    }
    
    // Default responses for other inputs
    const defaultResponses = [
      'شكراً على رسالتك! سيتم تفعيل نباطا بالكامل مع ذكاء اصطناعي متقدم في التحديث القادم. ترقبوا المزيد من التفاعل الذكي قريباً!',
      'أعمل على تحسين قدراتي باستمرار لمساعدتك بشكل أفضل. سأكون أكثر ذكاءً في الإصدار القادم من قلعة Betc.',
      'يسعدني تفاعلك! جاري تطوير قدراتي التحليلية للإجابة على أسئلتك بدقة أكبر في المستقبل القريب.'
    ];
    
    setMood('neutral');
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const updatedMessages = [...messages, { text: input, sender: 'user' as const }];
    setMessages(updatedMessages);
    setInput('');
    
    // Show thinking state
    setIsThinking(true);
    const thinkingMessage = { 
      text: getRandomResponse('thinking'), 
      sender: 'nabata' as const, 
      thinking: true 
    };
    
    setMessages([...updatedMessages, thinkingMessage]);
    
    // Simulate Nabata response (in a real application, this would connect to an AI service)
    setTimeout(() => {
      setIsThinking(false);
      setMessages(current => 
        current.filter(msg => !msg.thinking).concat([
          { 
            text: analyzeInput(input), 
            sender: 'nabata' 
          }
        ])
      );
    }, 1500);
  };

  // Display toast when Nabata is minimized while in a conversation
  useEffect(() => {
    if (!isExpanded && messages.length > 1 && messages[messages.length - 1].sender === 'nabata') {
      toast({
        title: "نباطا",
        description: "يمكنك متابعة المحادثة في أي وقت!",
      });
    }
  }, [isExpanded, messages, toast]);

  return (
    <div className={cn("fixed z-50", className)}>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "w-14 h-14 rounded-full bg-[hsl(var(--castle-magic))] text-white flex items-center justify-center shadow-lg transition-all",
          mood === 'happy' && "bg-[hsl(var(--castle-gold))]",
          mood === 'curious' && "bg-[hsl(var(--castle-wisdom))]",
          "hover:bg-opacity-90"
        )}
        aria-label="فتح المساعد الذكي نباطا"
      >
        {isExpanded ? <XCircle size={24} /> : (
          mood === 'happy' ? <Stars size={24} /> :
          mood === 'curious' ? <BrainCircuit size={24} /> :
          <Bot size={24} />
        )}
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
                "p-2 rounded-lg max-w-[85%] transition-all", 
                msg.sender === 'user' 
                  ? "bg-[hsl(var(--castle-magic))] text-white self-end" 
                  : "bg-[hsla(var(--castle-stone)/0.2)] self-start",
                msg.thinking && "opacity-60 animate-pulse"
              )}
            >
              {msg.thinking && (
                <div className="flex items-center gap-2">
                  <span>{msg.text}</span>
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                  </span>
                </div>
              )}
              {!msg.thinking && msg.text}
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
              disabled={isThinking}
            />
            <button
              onClick={handleSendMessage}
              className={cn(
                "bg-[hsl(var(--castle-magic))] text-white px-3 py-2 rounded-r-md transition-opacity",
                isThinking ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
              )}
              disabled={isThinking}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <p className="text-xs text-center text-gray-500">نباطا في مرحلة التطوير التجريبي</p>
            <button 
              className="text-xs text-[hsl(var(--castle-magic))] hover:underline flex items-center"
              onClick={() => setMessages([{
                text: 'مرحباً! أنا نباطا، مساعدك الشخصي في رحلتك التعليمية. كيف يمكنني مساعدتك اليوم؟',
                sender: 'nabata'
              }])}
            >
              <History size={12} className="mr-1" />
              محادثة جديدة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nabata;
