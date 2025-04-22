
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import CastleButton from "@/components/castle/CastleButton";
import { MessageSquare, User, Send, Bot, Sparkles } from "lucide-react";
import { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: getAIResponse(newMessage),
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <CastleLayout>
      <CastleBanner
        title="غرفة الدردشة"
        subtitle="تواصل مع المساعد الذكي للإجابة على استفساراتك"
        icon={<MessageSquare />}
        variant="magic"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <CastleCard className="min-h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            
            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 p-2 border border-[hsl(var(--border))] rounded-md"
                  placeholder="اكتب رسالتك هنا..."
                />
                <CastleButton 
                  onClick={handleSendMessage}
                  variant="magic"
                  icon={<Send size={18} />}
                >
                  إرسال
                </CastleButton>
              </div>
            </div>
          </CastleCard>
        </div>
        
        <div className="lg:col-span-1">
          <CastleCard title="مساعد Betc الذكي" icon={<Sparkles />} variant="magic">
            <div className="space-y-4 text-sm">
              <p>المساعد الذكي مدعوم بتقنية GPT-4o ويمكنه الإجابة على استفساراتك في مجالات:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--castle-magic))]">•</span>
                  <span>معايير BTEC وكيفية تطبيقها</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--castle-magic))]">•</span>
                  <span>استراتيجيات تحسين المهام الدراسية</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--castle-magic))]">•</span>
                  <span>البحث عن مصادر ومراجع موثوقة</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--castle-magic))]">•</span>
                  <span>تطبيق نظريات ونماذج الأعمال</span>
                </li>
              </ul>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">أسئلة مقترحة:</h4>
                <div className="space-y-2">
                  <button className="text-xs text-right w-full hover:text-[hsl(var(--castle-magic))]" onClick={() => setNewMessage("كيف أحقق معيار Distinction في المهام؟")}>
                    كيف أحقق معيار Distinction في المهام؟
                  </button>
                  <button className="text-xs text-right w-full hover:text-[hsl(var(--castle-magic))]" onClick={() => setNewMessage("ما هي أفضل طريقة لتحليل PESTEL؟")}>
                    ما هي أفضل طريقة لتحليل PESTEL؟
                  </button>
                  <button className="text-xs text-right w-full hover:text-[hsl(var(--castle-magic))]" onClick={() => setNewMessage("أريد مصادر موثوقة عن إدارة الموارد البشرية")}>
                    أريد مصادر موثوقة عن إدارة الموارد البشرية
                  </button>
                </div>
              </div>
            </div>
          </CastleCard>
        </div>
      </div>
    </CastleLayout>
  );
};

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div className={`flex gap-3 ${message.sender === "user" ? "justify-start" : "justify-start"}`}>
      <div className={`rounded-full p-2 ${
        message.sender === "user" 
          ? "bg-[hsla(var(--primary)/0.1)]" 
          : "bg-[hsla(var(--castle-magic)/0.1)]"
      }`}>
        {message.sender === "user" ? (
          <User size={20} className="text-[hsl(var(--primary))]" />
        ) : (
          <Bot size={20} className="text-[hsl(var(--castle-magic))]" />
        )}
      </div>
      
      <div className={`rounded-lg p-3 max-w-[80%] ${
        message.sender === "user" 
          ? "bg-[hsla(var(--primary)/0.1)]" 
          : "bg-[hsla(var(--castle-magic)/0.1)]"
      }`}>
        <div className="text-sm">{message.text}</div>
        <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
      </div>
    </div>
  );
};

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    text: "مرحباً بك في غرفة دردشة قلعة Betc! كيف يمكنني مساعدتك اليوم؟",
    timestamp: "10:00",
  },
];

const getAIResponse = (message: string): string => {
  // Simple response logic
  if (message.includes("معيار") || message.includes("Distinction")) {
    return "لتحقيق معيار Distinction، عليك إظهار فهم عميق للموضوع، تطبيق المفاهيم بشكل إبداعي، تقديم تحليل نقدي، واستخدام أمثلة واقعية مدعومة بمصادر موثوقة. يجب أن يكون عملك متماسكاً ومنظماً، مع استنتاجات وتوصيات مبنية على تحليل دقيق.";
  }
  
  if (message.includes("PESTEL") || message.includes("بيستل")) {
    return "لإجراء تحليل PESTEL فعال، اتبع هذه الخطوات: 1) حدد العوامل السياسية مثل الاستقرار الحكومي والتشريعات، 2) ادرس العوامل الاقتصادية كالتضخم والبطالة، 3) حلل العوامل الاجتماعية مثل التركيبة السكانية، 4) ابحث في العوامل التكنولوجية كالابتكارات، 5) استكشف العوامل البيئية مثل تغير المناخ، 6) حدد العوامل القانونية كقوانين المنافسة. استخدم بيانات حديثة من مصادر موثوقة لكل عامل.";
  }
  
  if (message.includes("مصادر") || message.includes("موارد بشرية")) {
    return "إليك مصادر موثوقة عن إدارة الموارد البشرية: 1) كتاب 'إدارة الموارد البشرية' لجاري ديسلر، 2) مجلة Harvard Business Review، 3) منصة CIPD للموارد البشرية، 4) تقارير منظمة العمل الدولية، 5) دراسات حالة من شركات مثل Google وMicrosoft. هل ترغب في معرفة المزيد عن أي من هذه المصادر؟";
  }
  
  return "شكراً على سؤالك. يمكنني مساعدتك في الإجابة على استفسارات حول معايير BTEC، استراتيجيات تحسين المهام الدراسية، البحث عن مصادر موثوقة، وتطبيق نظريات الأعمال. هل يمكنك توضيح سؤالك أكثر؟";
};

export default ChatPage;
