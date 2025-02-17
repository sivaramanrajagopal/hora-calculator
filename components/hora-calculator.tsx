"use client"

import React, { useState, useEffect } from 'react';
import { Clock, Timer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const HoraCalculator = () => {
  // Initial States
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(
    currentTime.getHours().toString().padStart(2, '0') + ':' + 
    currentTime.getMinutes().toString().padStart(2, '0')
  );
  const [countdown, setCountdown] = useState({ hora: '', uba: '' });

  // Constants for planets
  const planets = {
    surya: { 
      name: 'சூரியன்', 
      color: 'bg-emerald-100 hover:bg-emerald-200',
      english: 'Sun'
    },
    sukra: { 
      name: 'சுக்ரன்', 
      color: 'bg-emerald-100 hover:bg-emerald-200',
      english: 'Venus'
    },
    budha: { 
      name: 'புதன்', 
      color: 'bg-emerald-100 hover:bg-emerald-200',
      english: 'Mercury'
    },
    chandra: { 
      name: 'சந்திரன்', 
      color: 'bg-yellow-200 hover:bg-yellow-300',
      english: 'Moon'
    },
    sani: { 
      name: 'சனி', 
      color: 'bg-rose-100 hover:bg-rose-200',
      english: 'Saturn'
    },
    guru: { 
      name: 'குரு', 
      color: 'bg-emerald-100 hover:bg-emerald-200',
      english: 'Jupiter'
    },
    cevvai: { 
      name: 'செவ்வாய்', 
      color: 'bg-rose-100 hover:bg-rose-200',
      english: 'Mars'
    }
  };

  // First, add this right after your planets declaration
const horaDescriptions = {
  surya: "குரிய ஹோரை --- அரசு அதிகாரிகளை சந்திக்க, பதவி ஏற்க, மருந்து உண்ண, உயில் எழுத, வேலைக்கு முயற்ச்சி செய்ய.",
  chandra: "சந்திர ஹோரை --- ஆடை, ஆபரணங்கள் அமைய, ப்ராயாணம் செய்ய, பாஸ்போர்ட் எடுக்க, மாடு வாங்க, வியாபாரம் செய்ய, கல்வி கற்க.",
  cevvai: "செவ்வாய் ஹோரை --- நிலம் தொடர்பான பணிகளை செய்ய, அடுப்பு அமைக்க, குளைக்கு தீ மூட்ட, போர் கருவிகள் செய்தல், போர் தொடங்குதல், மருந்து உண்ண.",
  budha: "புதன் ஹோரை --- புதிய கணக்குகள் எழுத, கடித போக்குவரத்து, தேர்வு எழுத, ஜோதிடம், அறிவியல் ஆராய்ச்சிகளில் ஈடுபட, பெண் பார்க்க, தரகு வேலை மேற்கோள்ள.",
  guru: "குரு ஹோரை --- சேமிப்பு கணக்கு தொடங்க, முதலீடுகள் செய்ய, பெரிய மனிதர்களை சந்தித்து பேச, குருவை சந்தித்து ஆசி பெற, கப காரியங்கள் செய்ய, பயிர் செய்ய.",
  sukra: "சுக்கிர ஹோரை --- ஆடை, ஆபரணங்கள் வாங்க, வாகனங்கள் வாங்க, கால்நடைகள் வாங்க, திருமணம் குறித்து பேச, எதிர் பாலினத்தாரை சந்தித்து பேச, விருந்து உண்ண, கலைகள் பயில.",
  sani: "சனி ஹோரை --- இரும்பு பொருட்கள் வாங்க, மின் சாதனங்கள் தொடர்பான பணிகளுக்கு, எர் உழ, எருவிட."
};

// Find the return statement and add this section before the main grid:
<div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm space-y-2">
  <h3 className="font-semibold text-lg mb-2 text-gray-800 border-b pb-1">
    எந்த கிழமையில் எந்த ஹோரையில் எந்த வேலையை செய்தால் என்ன பலன்கள் கிடைக்கும் என்பது குறித்து விரிவாக அறிந்து கொள்ளலாம்
  </h3>
  {Object.entries(horaDescriptions).map(([key, desc]) => (
    <div key={key} className="bg-white p-2 rounded border text-gray-700">
      {desc}
    </div>
  ))}
</div>
  // Uba Horai sequences for each main Horai
  const ubaHoraiSequences = {
    surya: ['surya', 'chandra', 'cevvai', 'budha', 'guru'],
    sukra: ['sukra', 'sani', 'surya', 'chandra', 'cevvai'],
    budha: ['budha', 'guru', 'sukra', 'sani', 'surya'],
    chandra: ['chandra', 'cevvai', 'budha', 'guru', 'sukra'],
    sani: ['sani', 'surya', 'chandra', 'cevvai', 'budha'],
    guru: ['guru', 'sukra', 'sani', 'surya', 'chandra'],
    cevvai: ['cevvai', 'budha', 'guru', 'sukra', 'sani']
  };

  // Main Horai sequences
  const planetSequences = {
    0: ['surya', 'sukra', 'budha', 'chandra', 'sani', 'guru', 'cevvai'],
    1: ['chandra', 'sani', 'guru', 'cevvai', 'surya', 'sukra', 'budha'],
    2: ['cevvai', 'surya', 'sukra', 'budha', 'chandra', 'sani', 'guru'],
    3: ['budha', 'chandra', 'sani', 'guru', 'cevvai', 'surya', 'sukra'],
    4: ['guru', 'cevvai', 'surya', 'sukra', 'budha', 'chandra', 'sani'],
    5: ['sukra', 'budha', 'chandra', 'sani', 'guru', 'cevvai', 'surya'],
    6: ['sani', 'guru', 'cevvai', 'surya', 'sukra', 'budha', 'chandra']
  };


  const weekDays = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
  const weekDaysEnglish = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get current Uba Horai
  const getCurrentUbaHorai = (mainHoraiPlanet, minutes) => {
    const ubaIndex = Math.floor((minutes % 60) / 12);
    return ubaHoraiSequences[mainHoraiPlanet][ubaIndex];
  };

  // Get Horai sequence
  const getHoraSequence = (date) => {
    const dayOfWeek = date.getDay();
    const baseSequence = planetSequences[dayOfWeek];
    const fullSequence = [];
    
    for (let i = 0; i < 24; i++) {
      fullSequence.push(baseSequence[i % 7]);
    }
    
    return fullSequence;
  };

  const getTimeRange = (hour) => {
    const startHour = (hour + 6) % 24;
    const endHour = (startHour + 1) % 24;
    
    const formatHour = (h) => {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}${ampm}`;
    };
    
    return `${formatHour(startHour)}-${formatHour(endHour)}`;
  };

  const getSelectedHora = () => {
    const [hours] = selectedTime.split(':').map(Number);
    const adjustedHour = (hours + 18) % 24;
    const sequence = getHoraSequence(selectedDate);
    return sequence[adjustedHour];
  };

  const getDayHoras = (date) => {
    const sequence = getHoraSequence(date);
    return {
      day: sequence.slice(0, 12),    // 6 AM to 6 PM
      night: sequence.slice(12, 24)   // 6 PM to 6 AM
    };
  };

  // Event Handlers
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setSelectedDate(newDate);
    }
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Timer Effect with Uba Horai
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Calculate main Horai countdown
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      const remainingMinutes = 59 - currentMinute;
      const remainingSeconds = 59 - currentSecond;
      
      // Calculate Uba Horai countdown
      const currentUbaMinute = currentMinute % 12;
      const remainingUbaMinutes = 11 - currentUbaMinute;
      
      setCountdown({
        hora: `${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`,
        uba: `${remainingUbaMinutes}:${remainingSeconds.toString().padStart(2, '0')}`
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const HoraCell = ({ planetKey, hour, isCurrentHour }) => {
    const planet = planets[planetKey];
    const timeRange = getTimeRange(hour);
    const currentMinutes = currentTime.getMinutes();
    const currentUbaHorai = isCurrentHour ? getCurrentUbaHorai(planetKey, currentMinutes) : null;
    
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help group">
            <Card className={`${planet.color} ${isCurrentHour ? 'ring-2 ring-blue-500' : ''}`}>
              <CardContent className="p-1.5 text-center relative">
                <div className="text-sm font-semibold mb-0.5">{planet.name}</div>
                <div className="text-xs text-gray-600">{timeRange}</div>
                {isCurrentHour && (
                  <>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Timer className="w-3 h-3 text-white animate-spin" />
                    </div>
                    <div className="text-xs mt-1 font-medium text-blue-600 border-t border-blue-200">
                      {planets[currentUbaHorai].name}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            </div>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} className="bg-white p-0 border-2 border-gray-200 shadow-lg" side="top">
            <div className="p-3 min-w-[200px]">
              <div className="font-semibold mb-2 text-gray-800 border-b pb-1">உப ஹோரை வரிசை</div>
              <div className="space-y-2">
                {ubaHoraiSequences[planetKey].map((uba, index) => (
                  <div key={index} className="text-sm flex justify-between items-center">
                    <span className="text-gray-600">{index * 12}-{(index + 1) * 12} நிமிடங்கள்:</span>
                    <span className="font-medium text-gray-800">{planets[uba].name}</span>
                  </div>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const { day, night } = getDayHoras(selectedDate);
  const [selectedHours] = selectedTime.split(':').map(Number);
  const currentHour = (selectedHours + 18) % 24;

  return (
    <div className="max-w-3xl mx-auto p-2 md:p-4 space-y-2 bg-white">
    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
      <div className="text-center w-full md:w-auto">
        <h1 className="text-lg md:text-xl font-bold text-orange-600">
          ஓம் மகாகணபதியே நம:
        </h1>
        <h2 className="text-base md:text-lg font-semibold text-gray-700">
          தினசரி ஹோரை & உப ஹோரை
        </h2>
      </div>

      <div className="bg-blue-50 rounded-lg p-2 w-full md:w-auto">
        <div className="text-xs text-gray-600">தற்போதைய ஹோரை</div>
        <div className="text-sm font-semibold">{planets[getSelectedHora()].name}</div>
        <div className="text-xs text-gray-500">{getTimeRange(currentHour)}</div>
        <div className="text-xs text-blue-600 mt-1">
          உப ஹோரை: {planets[getCurrentUbaHorai(getSelectedHora(), currentTime.getMinutes())].name}
        </div>
      </div>
    </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 mb-2">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <div className="flex gap-2">
            <input 
              type="date" 
              className="p-1.5 border rounded w-full md:w-auto text-sm"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
            <input
              type="time"
              className="p-1.5 border rounded w-full md:w-auto text-sm"
              value={selectedTime}
              onChange={handleTimeChange}
            />
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-semibold">{weekDaysEnglish[selectedDate.getDay()]}</span>
            <span className="text-gray-600">{weekDays[selectedDate.getDay()]}</span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1 bg-blue-50 p-1.5 rounded w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs md:text-sm">அடுத்த ஹோரை: {countdown.hora}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4" />
            <span className="text-xs md:text-sm">அடுத்த உப ஹோரை: {countdown.uba}</span>
          </div>
        </div>
        
      </div>
    
      <div className="space-y-2">
        <div className="bg-white rounded-lg p-2 border">
          <h2 className="text-sm md:text-base font-semibold mb-1.5">பகல் (6 AM - 6 PM)</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
            {day.map((planet, index) => (
              <HoraCell 
                key={index}
                planetKey={planet}
                hour={index}
                isCurrentHour={currentHour === index}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-2 border">
          <h2 className="text-sm md:text-base font-semibold mb-1.5">இரவு (6 PM - 6 AM)</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
            {night.map((planet, index) => (
              <HoraCell 
                key={index}
                planetKey={planet}
                hour={index + 12}
                isCurrentHour={currentHour === (index + 12)}
              />
            ))}
          </div>
        </div>
      </div>
  {/* Descriptions section at the bottom */}
  <div className="bg-gray-50 rounded-lg p-4 mt-6 text-sm space-y-2">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 border-b pb-1">
          எந்த கிழமையில் எந்த ஹோரையில் எந்த வேலையை செய்தால் என்ன பலன்கள் கிடைக்கும் என்பது குறித்து விரிவாக அறிந்து கொள்ளலாம்
        </h3>
        {Object.entries(horaDescriptions).map(([key, desc]) => (
          <div key={key} className="bg-white p-2 rounded border text-gray-700">
            {desc}
          </div>
        ))}
      </div>
    </div>
  );
};
export default HoraCalculator;