
import React, { useState, useEffect } from 'react';
import { Bot, Heart, Brain, Sparkles, MessageCircle, Volume2, VolumeX, Settings, Mic, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'nabata';
  timestamp: Date;
  emotion?: 'happy' | 'encouraging' | 'thoughtful' | 'excited';
}

interface EmotionalState {
  mood: 'happy' | 'neutral' | 'focused' | 'encouraging' | 'excited';
  energy: number; // 0-100
  empathy: number; // 0-100
}

const AdvancedNabata = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [emotionalState, setEmotionalState] = useState<EmotionalState>({
    mood: 'happy',
    energy: 85,
    empathy: 90
  });

  // رسائل ترحيبية ذكية
  const welcomeMessages = [
    "أهلاً وسهلاً! أنا نباطا، رفيقك في رحلة استكشاف البتراء. كيف يمكنني مساعدتك اليوم؟",
    "مرحباً بك في عالم الأنباط! هل تريد استكشاف أسرار البتراء معي؟",
    "السلام عليكم! أنا هنا لأرشدك عبر كنوز المعرفة النبطية."
  ];

  // اقتراحات ذكية
  const smartSuggestions = [
    "اشرح لي تاريخ البتراء",
    "كيف أحسن درجاتي؟",
    "ما هي التحديات المتاحة؟",
    "أرني مشاريع إبداعية"
  ];

  useEffect(() => {
    // رسالة ترحيب تلقائية
    if (messages.length === 0) {
      const welcomeMsg: Message = {
        id: '1',
        text: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
        sender: 'nabata',
        timestamp: new Date(),
        emotion: 'happy'
      };
      setMessages([welcomeMsg]);
    }
  }, []);

  useEffect(() => {
    // تحديث الحالة العاطفية بناءً على التفاعل
    const updateEmotionalState = () => {
      const now = new Date();
      const recentMessages = messages.filter(
        m => now.getTime() - m.timestamp.getTime() < 300000 // آخر 5 دقائق
      );

      if (recentMessages.length > 5) {
        setEmotionalState(prev => ({
          ...prev,
          mood: 'excited',
          energy: Math.min(100, prev.energy + 10)
        }));
      } else if (recentMessages.length === 0) {
        setEmotionalState(prev => ({
          ...prev,
          mood: 'neutral',
          energy: Math.max(50, prev.energy - 5)
        }));
      }
    };

    updateEmotionalState();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // محاكاة استجابة ذكية من نباطا
    setTimeout(() => {
      const response = generateIntelligentResponse(text);
      const nabataMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'nabata',
        timestamp: new Date(),
        emotion: response.emotion
      };

      setMessages(prev => [...prev, nabataMessage]);

      // تفعيل الصوت إذا كان مُمكناً
      if (voiceEnabled) {
        speakText(response.text);
      }
    }, 1000 + Math.random() * 2000);
  };

  const generateIntelligentResponse = (userText: string): { text: string; emotion: 'happy' | 'encouraging' | 'thoughtful' | 'excited' } => {
    const lowerText = userText.toLowerCase();

    if (lowerText.includes('تاريخ') || lowerText.includes('البتراء')) {
      return {
        text: "البتراء مدينة رائعة! بُنيت من قبل الأنباط في القرن الرابع قبل الميلاد. كانت محطة مهمة على طريق البخور والتوابل. هل تريد معرفة المزيد عن العمارة النبطية؟",
        emotion: 'excited'
      };
    }

    if (lowerText.includes('درجات') || lowerText.includes('تحسين') || lowerText.includes('دراسة')) {
      return {
        text: "رائع أنك تريد تحسين أدائك! أنصحك بمراجعة الدروس في برج الحكمة، وإكمال التحديات اليومية، والمشاركة في ميدان الأعمدة. هل تحتاج خطة دراسية شخصية؟",
        emotion: 'encouraging'
      };
    }

    if (lowerText.includes('تحدي') || lowerText.includes('لعبة') || lowerText.includes('مسابقة')) {
      return {
        text: "لديك العديد من التحديات الرائعة! يمكنك زيارة مركز التحديات لرؤية المتاح، أو تجربة ورشة الأنباط لإنشاء محتوى إبداعي. أي نوع من التحديات يثير اهتمامك؟",
        emotion: 'excited'
      };
    }

    if (lowerText.includes('مساعدة') || lowerText.includes('مشكلة')) {
      return {
        text: "أنا هنا لمساعدتك دائماً! يمكنني مساعدتك في الدروس، التحديات، أو أي استفسار تقني. فقط أخبرني بما تحتاجه وسأبذل قصارى جهدي لمساعدتك.",
        emotion: 'encouraging'
      };
    }

    // استجابة عامة ذكية
    const generalResponses = [
      {
        text: "هذا سؤال رائع! دعني أفكر في أفضل طريقة لمساعدتك. هل يمكنك إعطائي تفاصيل أكثر؟",
        emotion: 'thoughtful' as const
      },
      {
        text: "أقدر فضولك وحماسك للتعلم! هذا ما يجعل تجربة البتراء مميزة. كيف يمكنني دعم رحلتك التعليمية؟",
        emotion: 'happy' as const
      },
      {
        text: "ممتاز! أحب رؤية الطلاب متفاعلين ومتحمسين. دعنا نستكشف هذا الموضوع معاً!",
        emotion: 'excited' as const
      }
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
      };

      recognition.start();
    }
  };

  const getEmotionEmoji = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'encouraging': return '💪';
      case 'thoughtful': return '🤔';
      case 'excited': return '🎉';
      default: return '🤖';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'from-yellow-400 to-orange-400';
      case 'excited': return 'from-pink-400 to-red-400';
      case 'focused': return 'from-blue-400 to-indigo-400';
      case 'encouraging': return 'from-green-400 to-emerald-400';
      default: return 'from-gray-400 to-slate-400';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "w-16 h-16 rounded-full shadow-xl transition-all duration-300 hover:scale-110",
            `bg-gradient-to-r ${getMoodColor(emotionalState.mood)}`
          )}
        >
          <div className="relative">
            <Bot className="w-8 h-8 text-white" />
            {emotionalState.energy > 80 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[600px] shadow-2xl petra-card">
        <div className={cn(
          "p-4 rounded-t-lg bg-gradient-to-r text-white",
          getMoodColor(emotionalState.mood)
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-1 -right-1 text-lg">
                  {getEmotionEmoji(emotionalState.mood)}
                </div>
              </div>
              <div>
                <h3 className="font-bold">نباطا المتقدم</h3>
                <div className="flex items-center gap-2 text-xs opacity-80">
                  <Heart className="w-3 h-3" />
                  <span>طاقة: {emotionalState.energy}%</span>
                  <Brain className="w-3 h-3" />
                  <span>تعاطف: {emotionalState.empathy}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                ✕
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-0 h-[calc(100%-80px)] flex flex-col">
          {/* منطقة الرسائل */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg text-sm",
                    message.sender === 'user'
                      ? "bg-[hsl(var(--castle-magic))] text-white"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  {message.sender === 'nabata' && (
                    <div className="flex items-center gap-1 mb-1 text-xs opacity-70">
                      <span>{getEmotionEmoji(message.emotion)}</span>
                      <span>نباطا</span>
                      {isSpeaking && <Volume2 className="w-3 h-3 animate-pulse" />}
                    </div>
                  )}
                  <p>{message.text}</p>
                  <div className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString('ar-SA', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* اقتراحات سريعة */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-gray-500 mb-2">اقتراحات سريعة:</div>
              <div className="flex flex-wrap gap-1">
                {smartSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    onClick={() => sendMessage(suggestion)}
                    className="text-xs h-7"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* منطقة الإدخال */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(currentMessage)}
                placeholder="اكتب رسالتك..."
                className="flex-1"
                disabled={isListening}
              />
              
              <Button
                size="sm"
                variant="outline"
                onClick={startListening}
                disabled={isListening}
                className={cn(
                  "w-10",
                  isListening && "bg-red-100 text-red-600"
                )}
              >
                <Mic className={cn("w-4 h-4", isListening && "animate-pulse")} />
              </Button>
              
              <Button
                size="sm"
                onClick={() => sendMessage(currentMessage)}
                disabled={!currentMessage.trim()}
                className="bg-[hsl(var(--castle-magic))]"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {isListening && (
              <div className="mt-2 text-center">
                <Badge className="bg-red-100 text-red-600 animate-pulse">
                  🎤 أستمع إليك...
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedNabata;
