
import React, { useRef, useEffect } from 'react';
import { Map, BookOpen, Award, FileText, BrainCircuit, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LearningPathMapProps {
  className?: string;
}

const LearningPathMap: React.FC<LearningPathMapProps> = ({ className }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Landmarks data for the learning path
  const landmarks = [
    { id: 'entrance', name: 'بوابة الخزنة', icon: <Map />, position: { x: 10, y: 50 }, color: 'castle-magic', completed: true },
    { id: 'wisdom', name: 'برج الحكمة', icon: <BookOpen />, position: { x: 30, y: 20 }, color: 'castle-wisdom', completed: true },
    { id: 'tasks', name: 'قاعة المهام', icon: <FileText />, position: { x: 50, y: 35 }, color: 'castle-stone', completed: false },
    { id: 'temple', name: 'معبد الذكاء', icon: <BrainCircuit />, position: { x: 70, y: 15 }, color: 'castle-wisdom', completed: false },
    { id: 'heroes', name: 'سجل الأبطال', icon: <Award />, position: { x: 85, y: 60 }, color: 'castle-gold', completed: false }
  ];

  // Create path connections
  const connections = [
    { from: 'entrance', to: 'wisdom', completed: true },
    { from: 'wisdom', to: 'tasks', completed: false },
    { from: 'tasks', to: 'temple', completed: false },
    { from: 'temple', to: 'heroes', completed: false }
  ];

  // Animation effect for the map
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const landmarks = canvasRef.current.querySelectorAll('.landmark');
    landmarks.forEach((landmark, index) => {
      setTimeout(() => {
        landmark.classList.add('opacity-100', 'translate-y-0');
      }, index * 200);
    });
    
    const paths = canvasRef.current.querySelectorAll('.path');
    paths.forEach((path, index) => {
      setTimeout(() => {
        path.classList.add('after:scale-x-100');
      }, (index + 1) * 300);
    });
  }, []);

  return (
    <div className={cn("relative w-full h-[300px] rounded-xl overflow-hidden", className)}>
      {/* Background pattern */}
      <div className="absolute inset-0 petra-background opacity-20"></div>
      
      {/* Map container */}
      <div ref={canvasRef} className="relative w-full h-full">
        {/* User avatar */}
        <div className="absolute bottom-5 left-5 flex items-center">
          <div className="w-10 h-10 bg-[hsl(var(--castle-magic))] rounded-full flex items-center justify-center text-white animate-pulse">
            <User size={20} />
          </div>
          <div className="mr-2 bg-white rounded px-2 py-1 text-xs shadow-md">
            <p className="font-bold">أنت هنا</p>
          </div>
        </div>
        
        {/* Render connections */}
        {connections.map((connection) => {
          const fromLandmark = landmarks.find(l => l.id === connection.from);
          const toLandmark = landmarks.find(l => l.id === connection.to);
          
          if (!fromLandmark || !toLandmark) return null;
          
          return (
            <div 
              key={`${connection.from}-${connection.to}`}
              className={cn(
                "path absolute h-1 bg-[hsla(var(--castle-stone)/0.2)] after:absolute after:inset-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-1000",
                connection.completed ? "after:bg-[hsl(var(--castle-gold))]" : "after:bg-[hsl(var(--castle-stone))]"
              )}
              style={{
                left: `${fromLandmark.position.x}%`,
                top: `${fromLandmark.position.y}%`,
                width: `${Math.sqrt(
                  Math.pow(toLandmark.position.x - fromLandmark.position.x, 2) + 
                  Math.pow(toLandmark.position.y - fromLandmark.position.y, 2)
                )}%`,
                transform: `rotate(${Math.atan2(
                  toLandmark.position.y - fromLandmark.position.y,
                  toLandmark.position.x - fromLandmark.position.x
                ) * 180 / Math.PI}deg)`,
                transformOrigin: 'left center'
              }}
            />
          );
        })}
        
        {/* Render landmarks */}
        {landmarks.map((landmark) => (
          <div
            key={landmark.id}
            className={cn(
              "landmark absolute transform -translate-x-1/2 -translate-y-1/2 opacity-0 translate-y-2 transition-all duration-500",
              landmark.completed ? "z-20" : "z-10"
            )}
            style={{
              left: `${landmark.position.x}%`,
              top: `${landmark.position.y}%`
            }}
          >
            <div 
              className={cn(
                "flex flex-col items-center"
              )}
            >
              <div 
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
                  landmark.completed 
                    ? `bg-[hsl(var(--${landmark.color}))] text-white` 
                    : `bg-white text-[hsl(var(--${landmark.color}))] border-2 border-[hsl(var(--${landmark.color}))]`
                )}
              >
                {landmark.icon}
              </div>
              <div 
                className={cn(
                  "mt-1 px-2 py-1 rounded bg-white shadow-md text-center text-xs font-bold whitespace-nowrap",
                  landmark.completed ? "text-[hsl(var(--castle-magic))]" : "text-gray-600"
                )}
              >
                {landmark.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathMap;
