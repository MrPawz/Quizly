import React, { useState, useEffect } from 'react';
import { 
  Store, Trophy, Coins, Star, Settings, Check, Lock, 
  Home as HomeIcon, Compass, Gamepad2, PlusCircle, 
  Users, BarChart, User, ChevronRight, Play, BookOpen,
  Search, Heart, Clock, Shield, Calendar, Hash, Image as ImageIcon,
  Flame, Zap, Monitor, Globe, HelpCircle, AlertTriangle, List, 
  LogOut, Edit3, Share2, MoreVertical, SearchIcon,
  Bell, Link as LinkIcon, Key, Moon, Volume2, Smartphone
} from 'lucide-react';

// --- DATA & ASSETS ---
const SKINS = [
  { id: 'basic-red', name: 'Red Square', rarity: 'Common', price: 0, shape: 'rect', color: '#ef4444', face: 'smile' },
  { id: 'basic-blue', name: 'Blue Circle', rarity: 'Common', price: 50, shape: 'circle', color: '#3b82f6', face: 'neutral' },
  { id: 'rare-green', name: 'Green Triangle', rarity: 'Rare', price: 150, shape: 'triangle', color: '#10b981', face: 'cool' },
  { id: 'epic-purple', name: 'Purple Hex', rarity: 'Epic', price: 400, shape: 'hexagon', color: '#8b5cf6', face: 'happy' },
  { id: 'legend-gold', name: 'Golden Star', rarity: 'Legendary', price: 1000, shape: 'star', color: '#fbbf24', face: 'cool' }
];

const QUESTIONS = [
  { q: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Rome"], answer: "Paris" },
  { q: "What is 8 x 7?", options: ["54", "56", "64", "42"], answer: "56" },
  { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"], answer: "Da Vinci" },
  { q: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Saturn", "Jupiter"], answer: "Jupiter" },
  { q: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Osmium", "Oganesson"], answer: "Oxygen" },
  { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi"], answer: "Mitochondria" }
];

const NAV_ITEMS = [
  { id: 'home', icon: HomeIcon, label: 'Home' },
  { id: 'explore', icon: Compass, label: 'Explore' },
  { id: 'play', icon: Gamepad2, label: 'Play' },
  { id: 'create', icon: PlusCircle, label: 'Create' },
  { id: 'friends', icon: Users, label: 'Friends' },
  { id: 'leaderboards', icon: BarChart, label: 'Leaderboards' },
  { id: 'shop', icon: Store, label: 'Shop' },
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const CATEGORIES = ["Science", "Math", "History", "English", "Geography", "Pop Culture", "Coding", "Art"];

const PUBLIC_QUIZZES = [
  { id: 1, title: 'World Geography', author: 'Quizly Official', plays: '1.2k', questions: 15, color: 'bg-blue-100 text-blue-600' },
  { id: 2, title: 'Basic Algebra', author: 'Quizly Official', plays: '850', questions: 10, color: 'bg-green-100 text-green-600' },
  { id: 3, title: 'Animal Trivia', author: 'Quizly Official', plays: '3.4k', questions: 20, color: 'bg-orange-100 text-orange-600' },
  { id: 4, title: 'Pop Culture 2023', author: 'Quizly Official', plays: '5.1k', questions: 25, color: 'bg-purple-100 text-purple-600' },
];

const LEADERBOARD = [];

const FRIENDS = [];

const BADGES = [
  { id: 1, name: 'First Win', desc: 'Win your first game', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  { id: 2, name: 'Quiz Creator', desc: 'Create 5 quizzes', icon: PlusCircle, color: 'text-blue-500', bg: 'bg-blue-100' },
  { id: 3, name: 'Social Butterfly', desc: 'Add 10 friends', icon: Users, color: 'text-pink-500', bg: 'bg-pink-100' },
  { id: 4, name: 'High Roller', desc: 'Earn 1000 coins', icon: Coins, color: 'text-orange-500', bg: 'bg-orange-100' },
];

// --- REUSABLE COMPONENTS ---

const SkinIcon = ({ shape, color, face, size = 48, className = "" }) => {
  const renderShape = () => {
    switch(shape) {
      case 'rect': return <rect x="4" y="4" width="40" height="40" rx="8" fill={color} />;
      case 'circle': return <circle cx="24" cy="24" r="20" fill={color} />;
      case 'triangle': return <polygon points="24,4 44,44 4,44" fill={color} rx="4" strokeLinejoin="round" strokeWidth="2" stroke={color} />;
      case 'hexagon': return <polygon points="24,2 44,12 44,36 24,46 4,36 4,12" fill={color} strokeLinejoin="round" strokeWidth="2" stroke={color}/>;
      case 'star': return <polygon points="24,2 31,16 46,18 35,29 38,44 24,36 10,44 13,29 2,18 17,16" fill={color} strokeLinejoin="round" strokeWidth="2" stroke={color}/>;
      default: return <rect x="4" y="4" width="40" height="40" rx="8" fill={color} />;
    }
  };

  const renderFace = () => {
    switch(face) {
      case 'smile': return (
        <g fill="#ffffff">
          <circle cx="16" cy="20" r="3" />
          <circle cx="32" cy="20" r="3" />
          <path d="M 16 30 Q 24 38 32 30" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
      case 'neutral': return (
        <g fill="#ffffff">
          <circle cx="16" cy="20" r="3" />
          <circle cx="32" cy="20" r="3" />
          <line x1="18" y1="32" x2="30" y2="32" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
      case 'cool': return (
        <g fill="#ffffff">
          <rect x="12" y="17" width="12" height="6" rx="2" />
          <rect x="24" y="17" width="12" height="6" rx="2" />
          <line x1="10" y1="20" x2="38" y2="20" stroke="#ffffff" strokeWidth="2" />
          <path d="M 18 32 Q 24 34 30 32" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
      case 'happy': return (
        <g fill="#ffffff">
          <path d="M 13 22 Q 16 17 19 22" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 29 22 Q 32 17 35 22" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 16 28 Q 24 40 32 28 Z" fill="#ffffff" />
        </g>
      );
      default: return null;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={`drop-shadow-md ${className}`}>
      {renderShape()}
      {renderFace()}
    </svg>
  );
};


// --- SEPARATED VIEW COMPONENTS ---

const HomeView = ({ setView, currentSkinData, level }) => (
  <div className="space-y-12 max-w-6xl mx-auto">
    {/* Welcome Banner */}
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-10 md:p-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
      <div>
        <h1 className="text-4xl font-black mb-2">Welcome back!</h1>
        <p className="text-blue-100 mb-6 text-lg">Ready to learn, play, and compete today?</p>
        <button 
          onClick={() => setView('play')}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2 text-lg"
        >
          <Play size={20} /> Play Now
        </button>
      </div>
      <div className="mt-6 md:mt-0 relative">
        <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <SkinIcon {...currentSkinData} size={140} className="animate-bounce relative z-10" />
      </div>
    </div>

    {/* Daily Challenge Banner */}
    <div 
      className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between cursor-pointer hover:shadow-lg transition-all border border-orange-300"
      onClick={() => setView('play')}
    >
      <div className="flex items-center gap-5 mb-4 md:mb-0">
        <div className="bg-white/20 p-4 rounded-2xl"><Flame size={36} className="text-yellow-200" /></div>
        <div>
          <h3 className="text-2xl font-black flex items-center gap-2">Daily Challenge: Solar System</h3>
          <p className="text-orange-100 font-medium">Everyone gets the same quiz. Earn double XP! Ends in 14h.</p>
        </div>
      </div>
      <button className="bg-white text-orange-600 font-bold px-6 py-3 rounded-xl shadow-sm w-full md:w-auto hover:bg-orange-50 transition-colors">Join Event</button>
    </div>

    {/* Learning Dashboard */}
    <div>
      <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <BarChart className="text-blue-500" /> Learning Dashboard
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors">
          <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Accuracy</span>
          <p className="text-4xl font-black text-green-500 mt-2">84%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors">
          <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Quizzes Played</span>
          <p className="text-4xl font-black text-blue-500 mt-2">42</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors">
          <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Top Subject</span>
          <p className="text-3xl font-black text-purple-500 mt-2 truncate">Science</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors">
          <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Daily Streak</span>
          <p className="text-4xl font-black text-orange-500 mt-2 flex items-center gap-2"><Flame size={28} /> 5</p>
        </div>
      </div>
    </div>
  </div>
);

const PlayView = ({ setCoins, setXp, showToast }) => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, results
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [roomCode, setRoomCode] = useState('');

  const startGame = () => {
    setGameState('playing');
    setCurrentQIndex(0);
    setScore(0);
    setFeedback(null);
  };

  const handleAnswer = (option) => {
    const isCorrect = option === QUESTIONS[currentQIndex].answer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
      setCoins(c => c + 15);
      setXp(x => x + 25);
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQIndex + 1 < QUESTIONS.length) {
        setCurrentQIndex(currentQIndex + 1);
      } else {
        setGameState('results');
      }
    }, 1000);
  };

  if (gameState === 'menu') {
    return (
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Join Room Section */}
        <div className="bg-blue-600 p-10 md:p-14 rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <Gamepad2 size={200} className="absolute -right-10 -bottom-10 text-blue-500 opacity-50" />
          <div className="flex-1 relative z-10 text-center md:text-left">
            <h2 className="text-4xl font-black text-white mb-3">Join a Live Game</h2>
            <p className="text-blue-100 text-lg">Enter a room code from your teacher or friend to compete on the live leaderboard!</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
            <input 
              type="text" 
              placeholder="Game Code" 
              className="bg-white border-4 border-blue-400 rounded-2xl px-6 py-4 font-black text-center text-2xl w-full sm:w-48 outline-none focus:border-yellow-400 uppercase tracking-widest text-slate-800" 
              value={roomCode} 
              onChange={e=>setRoomCode(e.target.value)} 
            />
            <button 
              onClick={() => showToast("Connecting to room...")}
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black px-8 py-4 rounded-2xl transition-all shadow-[0_6px_0_rgb(202,138,4)] hover:translate-y-1 hover:shadow-[0_2px_0_rgb(202,138,4)] text-xl"
            >
              Join
            </button>
          </div>
        </div>

        {/* Other Modes */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-8">More Ways to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:border-green-400 hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 group" onClick={startGame}>
              <div className="bg-green-100 text-green-500 p-5 rounded-2xl mb-5 group-hover:scale-110 transition-transform"><Monitor size={40} /></div>
              <h3 className="font-black text-xl text-slate-800">Practice Mode</h3>
              <p className="text-slate-500 mt-2 font-medium">Play solo and earn XP at your own pace without a timer.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:border-purple-400 hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 group" onClick={() => showToast("Host Dashboard Opening...")}>
              <div className="bg-purple-100 text-purple-500 p-5 rounded-2xl mb-5 group-hover:scale-110 transition-transform"><Users size={40} /></div>
              <h3 className="font-black text-xl text-slate-800">Host Game</h3>
              <p className="text-slate-500 mt-2 font-medium">Create a room and broadcast your screen for players to join.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:border-orange-400 hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 group" onClick={() => showToast("Flashcards loading...")}>
              <div className="bg-orange-100 text-orange-500 p-5 rounded-2xl mb-5 group-hover:scale-110 transition-transform"><List size={40} /></div>
              <h3 className="font-black text-xl text-slate-800">Flashcards</h3>
              <p className="text-slate-500 mt-2 font-medium">Study any quiz by flipping cards to memorize the answers.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const q = QUESTIONS[currentQIndex];
    const isCorrectFeed = feedback === 'correct';
    const isWrongFeed = feedback === 'incorrect';

    return (
      <div className={`flex flex-col items-center justify-center h-full min-h-[70vh] transition-colors duration-300 rounded-3xl p-6 md:p-12 ${isCorrectFeed ? 'bg-green-100' : isWrongFeed ? 'bg-red-100' : 'bg-white shadow-sm border border-slate-100'}`}>
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center mb-10">
            <div className="bg-slate-100 px-5 py-2 rounded-full font-bold text-slate-600">Question {currentQIndex + 1} of {QUESTIONS.length}</div>
            <div className="bg-blue-100 px-5 py-2 rounded-full font-bold text-blue-600 flex items-center gap-2"><Star size={18}/> Score: {score}</div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-800 mb-12 leading-tight">
            {q.q}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {q.options.map((opt, i) => {
              const bgColors = ["bg-red-500 hover:bg-red-600 border-red-600", "bg-blue-500 hover:bg-blue-600 border-blue-600", "bg-yellow-400 hover:bg-yellow-500 border-yellow-500", "bg-green-500 hover:bg-green-600 border-green-600"];
              const baseColor = bgColors[i % 4];

              return (
                <button
                  key={i}
                  disabled={feedback !== null}
                  onClick={() => handleAnswer(opt)}
                  className={`p-6 md:p-8 text-xl md:text-2xl font-bold rounded-2xl border-b-4 transition-all text-white shadow-sm
                    ${feedback === null ? `${baseColor} hover:-translate-y-1 hover:shadow-md` : 
                      opt === q.answer ? 'bg-green-500 border-green-600 scale-105' : 
                      'bg-slate-200 border-slate-300 text-slate-400 opacity-50'
                    }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[70vh]">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border-4 border-slate-100">
        <Trophy size={100} className="mx-auto text-yellow-400 mb-6 drop-shadow-lg" />
        <h2 className="text-4xl font-black text-slate-800 mb-2">Quiz Complete!</h2>
        <p className="text-xl text-slate-600 mb-8 font-medium">You scored <span className="font-black text-blue-500">{score}</span> out of {QUESTIONS.length}</p>
        
        <div className="flex justify-center gap-6 mb-10 bg-slate-50 py-6 rounded-2xl border border-slate-100">
          <div className="flex flex-col items-center">
            <Coins className="text-yellow-500 mb-2" size={32} />
            <span className="font-black text-2xl text-slate-700">+{score * 15}</span>
            <span className="text-sm font-bold text-slate-400">Coins</span>
          </div>
          <div className="w-px bg-slate-200"></div>
          <div className="flex flex-col items-center">
            <Star className="text-purple-500 mb-2" size={32} />
            <span className="font-black text-2xl text-slate-700">+{score * 25}</span>
            <span className="text-sm font-bold text-slate-400">XP</span>
          </div>
        </div>

        <button 
          onClick={() => setGameState('menu')}
          className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold text-xl transition-all shadow-[0_4px_0_rgb(15,23,42)] hover:translate-y-1 hover:shadow-none"
        >
          Back to Play Menu
        </button>
      </div>
    </div>
  );
};

const ExploreView = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('discover');

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-4xl font-black mb-2">Explore Quizzes</h2>
          <p className="text-blue-100 text-lg">Discover millions of quizzes created by the community.</p>
        </div>
        <div className="relative w-full md:w-96 text-slate-800">
          <SearchIcon className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search topics, creators..." 
            className="w-full bg-white rounded-full py-3 pl-12 pr-4 outline-none font-bold shadow-inner focus:ring-4 focus:ring-blue-400/50 transition-all"
          />
        </div>
      </div>

      {/* Categories Row */}
      <div>
        <h3 className="font-bold text-slate-600 mb-3 uppercase tracking-wider text-sm">Categories</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((c, i) => (
            <button key={i} className="bg-white border border-slate-200 px-5 py-2.5 rounded-full font-bold text-slate-600 whitespace-nowrap hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm">
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {['discover', 'favorites', 'recent'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`pb-4 px-6 font-bold text-lg border-b-4 transition-colors capitalize ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Quiz Grid */}
      <div>
        {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PUBLIC_QUIZZES.map(quiz => (
              <div key={quiz.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-blue-400 transition-all hover:-translate-y-1 cursor-pointer group relative flex flex-col h-full">
                <button className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors" onClick={(e) => { e.stopPropagation(); showToast("Added to Favorites!"); }}><Heart size={20} /></button>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner ${quiz.color}`}>
                  <BookOpen size={28} />
                </div>
                <h4 className="font-bold text-xl text-slate-800 mb-1 group-hover:text-blue-600 line-clamp-2">{quiz.title}</h4>
                <p className="text-sm text-slate-500 mb-6 flex-1">By <span className="font-bold">{quiz.author}</span></p>
                
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 border-t border-slate-100 pt-4 mt-auto">
                  <span className="flex items-center gap-1"><List size={14}/> {quiz.questions} Qs</span>
                  <span className="flex items-center gap-1"><Play size={14}/> {quiz.plays} plays</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab !== 'discover' && (
          <div className="text-center py-20">
             <Compass size={64} className="mx-auto text-slate-200 mb-4" />
             <h3 className="text-xl font-bold text-slate-600">No {activeTab} quizzes yet!</h3>
             <p className="text-slate-400 mt-2">Start playing to build up your library.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CreateView = ({ showToast }) => {
  const [tab, setTab] = useState('editor'); // editor, settings, drafts

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 mb-1">Quiz Creator</h2>
          <p className="text-slate-500 font-medium">Build your own custom learning experience.</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-2">
          <Check size={18} /> Publish Quiz
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col min-h-[60vh]">
        {/* Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50 px-6 pt-4">
          <button onClick={()=>setTab('editor')} className={`pb-3 px-6 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 ${tab === 'editor' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><Edit3 size={18}/> Editor</button>
          <button onClick={()=>setTab('settings')} className={`pb-3 px-6 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 ${tab === 'settings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><Settings size={18}/> Settings</button>
          <button onClick={()=>setTab('drafts')} className={`pb-3 px-6 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 ${tab === 'drafts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><BookOpen size={18}/> Drafts (2)</button>
        </div>

        <div className="p-6 md:p-8 flex-1 bg-white">
          {tab === 'editor' && (
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Question Text</label>
                  <textarea placeholder="Type your question here..." className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 font-bold text-lg h-32 resize-none text-slate-800"></textarea>
                </div>
                <div className="w-48 hidden md:flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-blue-500 cursor-pointer transition-colors" onClick={() => showToast("Image upload simulated.")}>
                  <ImageIcon size={32} className="mb-2" />
                  <span className="font-bold text-sm">Add Image</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                   <label className="block text-sm font-bold text-slate-600 uppercase tracking-wide">Answers</label>
                   <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full border border-green-100">Select correct answer</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Red', 'Blue', 'Yellow', 'Green'].map((color, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute left-0 top-0 bottom-0 w-12 rounded-l-2xl flex items-center justify-center text-white font-bold bg-${color.toLowerCase()}-500`}></div>
                      <input type="text" placeholder={`Answer ${i+1}`} className={`w-full bg-white border-2 border-slate-200 rounded-2xl pl-16 pr-12 py-4 outline-none focus:border-${color.toLowerCase()}-500 font-bold text-slate-700`} />
                      <button className="absolute right-3 top-3.5 w-8 h-8 rounded-full border-2 border-slate-200 hover:border-green-500 flex items-center justify-center text-transparent hover:text-green-500 transition-colors">
                        <Check size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-600 outline-none">
                  <option>20 Seconds</option>
                  <option>30 Seconds</option>
                  <option>60 Seconds</option>
                </select>
                <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-600 outline-none">
                  <option>Standard Difficulty</option>
                  <option>Easy Mode</option>
                  <option>Hard Mode</option>
                </select>
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Quiz Title</label>
                <input type="text" placeholder="e.g., Ultimate Space Trivia" className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 font-bold text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea placeholder="What is this quiz about?" className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 font-medium h-24 resize-none"></textarea>
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Privacy</label>
                 <div className="flex gap-4">
                    <button className="flex-1 border-2 border-blue-500 bg-blue-50 text-blue-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Globe size={18}/> Public</button>
                    <button className="flex-1 border-2 border-slate-200 text-slate-500 hover:border-slate-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2"><LockIcon size={18}/> Private</button>
                 </div>
              </div>
            </div>
          )}

          {tab === 'drafts' && (
            <div className="space-y-4">
               {['History 101', 'Math Pop Quiz'].map((draft, i) => (
                 <div key={i} className="border border-slate-200 rounded-2xl p-5 flex justify-between items-center hover:border-blue-300 cursor-pointer">
                    <div>
                      <h4 className="font-bold text-lg text-slate-800">{draft}</h4>
                      <p className="text-sm text-slate-500 font-medium">Last edited 2 days ago &bull; 5 Questions</p>
                    </div>
                    <button className="bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-lg hover:bg-slate-200">Edit</button>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ShopView = ({ coins, unlockedSkins, setUnlockedSkins, equippedSkin, setEquippedSkin, setCoins, showToast }) => {
  const [shopTab, setShopTab] = useState('avatars'); // avatars, themes, frames

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 mb-1">Locker & Shop</h2>
          <p className="text-slate-500 font-medium">Customize your entire Quizly experience.</p>
        </div>
        <div className="bg-yellow-400 text-yellow-900 px-6 py-2.5 rounded-full font-black flex items-center gap-2 shadow-sm border-2 border-yellow-500">
          <Coins size={22} /> {coins}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[60vh]">
        <div className="flex border-b border-slate-100 bg-slate-50 px-6 pt-4">
          <button onClick={()=>setShopTab('avatars')} className={`pb-3 px-6 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 ${shopTab === 'avatars' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><User size={18}/> Avatars</button>
          <button onClick={()=>setShopTab('themes')} className={`pb-3 px-6 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 ${shopTab === 'themes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><Monitor size={18}/> Themes</button>
          <button onClick={()=>setShopTab('frames')} className={`pb-3 px-6 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 ${shopTab === 'frames' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><ImageIcon size={18}/> Profile Frames</button>
        </div>

        <div className="p-8 md:p-10">
          {shopTab === 'avatars' && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {SKINS.map(skin => {
                const isOwned = unlockedSkins.includes(skin.id);
                const isEquipped = equippedSkin === skin.id;

                const handlePurchaseOrEquip = () => {
                  if (isEquipped) return;
                  if (isOwned) {
                    setEquippedSkin(skin.id);
                    showToast(`Equipped ${skin.name}!`);
                  } else {
                    if (coins >= skin.price) {
                      setCoins(c => c - skin.price);
                      setUnlockedSkins([...unlockedSkins, skin.id]);
                      setEquippedSkin(skin.id);
                      showToast(`Purchased ${skin.name}!`);
                    } else {
                      showToast("Not enough coins!");
                    }
                  }
                };

                return (
                  <div key={skin.id} className={`relative flex flex-col items-center p-5 rounded-2xl border-4 transition-all ${
                    isEquipped ? 'border-green-500 bg-green-50 shadow-md' : 
                    isOwned ? 'border-slate-200 bg-white hover:border-blue-400 cursor-pointer shadow-sm' : 
                    'border-slate-100 bg-slate-50 hover:border-slate-300 cursor-pointer'
                  }`} onClick={handlePurchaseOrEquip}>
                    
                    {!isOwned && (
                      <div className="absolute top-3 right-3 text-slate-400 bg-slate-200 p-1.5 rounded-full">
                        <Lock size={14} />
                      </div>
                    )}
                    {isEquipped && (
                      <div className="absolute top-3 right-3 text-white bg-green-500 p-1.5 rounded-full">
                        <Check size={14} />
                      </div>
                    )}

                    <SkinIcon shape={skin.shape} color={skin.color} face={skin.face} size={72} className="mb-5 mt-2" />
                    
                    <h3 className="font-bold text-slate-800 text-center mb-1">{skin.name}</h3>
                    <p className={`text-xs font-black uppercase tracking-wider mb-4 px-3 py-1 rounded-full ${
                      skin.rarity === 'Legendary' ? 'text-orange-600 bg-orange-100' :
                      skin.rarity === 'Epic' ? 'text-purple-600 bg-purple-100' :
                      skin.rarity === 'Rare' ? 'text-blue-600 bg-blue-100' : 'text-slate-500 bg-slate-200'
                    }`}>{skin.rarity}</p>

                    {isEquipped ? (
                      <span className="text-green-700 font-black text-sm bg-green-200 px-4 py-2 rounded-xl w-full text-center">EQUIPPED</span>
                    ) : isOwned ? (
                      <button className="text-slate-700 font-black text-sm bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-xl w-full transition-colors">EQUIP</button>
                    ) : (
                      <button className={`font-black text-sm px-4 py-2 rounded-xl w-full flex items-center justify-center gap-1.5 transition-colors ${
                        coins >= skin.price ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}>
                        <Coins size={16} /> {skin.price}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {shopTab !== 'avatars' && (
            <div className="text-center py-20 max-w-md mx-auto">
               <div className="w-24 h-24 bg-purple-100 text-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                 <Store size={48} />
               </div>
               <h3 className="text-2xl font-black text-slate-800 mb-2">More items coming soon!</h3>
               <p className="text-slate-500 font-medium">We are stocking the shelves with amazing {shopTab} to personalize your account. Check back in the next update!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileView = ({ currentSkinData, level, xp, coins }) => (
  <div className="max-w-6xl mx-auto space-y-12">
    {/* Profile Header */}
    <div className="bg-white rounded-3xl p-10 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-10 md:gap-14 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      
      <div className="bg-white p-4 rounded-3xl shadow-lg border-4 border-slate-50 relative z-10">
        <SkinIcon {...currentSkinData} size={140} />
      </div>
      
      <div className="flex-1 text-center md:text-left relative z-10 pt-4 md:pt-16">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
           <h2 className="text-4xl font-black text-slate-800">Player_One</h2>
           <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full text-sm">Quiz Apprentice</span>
        </div>
        <p className="text-slate-500 font-medium mb-6">Joined November 2026 &bull; ID: #9842</p>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <div className="bg-blue-50 px-6 py-4 rounded-2xl border border-blue-100 flex items-center gap-4 w-40">
            <div className="bg-blue-200 text-blue-600 p-2 rounded-xl"><Star size={24}/></div>
            <div>
               <span className="text-blue-500 text-xs font-bold uppercase tracking-wider block">Level</span>
               <span className="text-2xl font-black text-blue-700 leading-none">{level}</span>
            </div>
          </div>
          <div className="bg-orange-50 px-6 py-4 rounded-2xl border border-orange-100 flex items-center gap-4 w-40">
            <div className="bg-orange-200 text-orange-600 p-2 rounded-xl"><Flame size={24}/></div>
            <div>
               <span className="text-orange-500 text-xs font-bold uppercase tracking-wider block">Streak</span>
               <span className="text-2xl font-black text-orange-700 leading-none">5</span>
            </div>
          </div>
          <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-100 flex items-center gap-4 w-40">
            <div className="bg-green-200 text-green-600 p-2 rounded-xl"><Check size={24}/></div>
            <div>
               <span className="text-green-600 text-xs font-bold uppercase tracking-wider block">Win Rate</span>
               <span className="text-2xl font-black text-green-700 leading-none">78%</span>
            </div>
          </div>
        </div>
      </div>
      
      <button className="absolute top-6 right-6 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl backdrop-blur-sm transition-colors">
        <Share2 size={20} />
      </button>
    </div>

    {/* Badges Section */}
    <div>
      <div className="flex justify-between items-end mb-6 px-2">
        <h3 className="text-2xl font-bold text-slate-800">Achievement Badges</h3>
        <span className="text-blue-500 font-bold cursor-pointer hover:underline">View All</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {BADGES.map(badge => (
          <div key={badge.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-inner ${badge.bg} ${badge.color}`}>
              <badge.icon size={36} />
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-1">{badge.name}</h4>
            <p className="text-sm text-slate-500 font-medium">{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SettingsView = ({ showToast }) => {
  const [tab, setTab] = useState('general');

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Settings Navigation */}
      <div className="w-full md:w-72 space-y-4">
         <h2 className="text-2xl font-black text-slate-800 mb-6 px-4">Settings</h2>
         <button onClick={()=>setTab('general')} className={`w-full text-left px-5 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors ${tab === 'general' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}><Settings size={18}/> Account Info</button>
         <button onClick={()=>setTab('privacy')} className={`w-full text-left px-5 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors ${tab === 'privacy' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}><Shield size={18}/> Privacy & Security</button>
         <button onClick={()=>setTab('notifications')} className={`w-full text-left px-5 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors ${tab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}><Bell size={18}/> Notifications</button>
         <button onClick={()=>setTab('connections')} className={`w-full text-left px-5 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors ${tab === 'connections' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}><LinkIcon size={18}/> Connected Apps</button>
         <button onClick={()=>setTab('safety')} className={`w-full text-left px-5 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors ${tab === 'safety' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}><AlertTriangle size={18}/> Safety & Rules</button>
         
         <div className="pt-8 mt-8 border-t border-slate-200">
           <button className="w-full text-left px-5 py-3 rounded-xl font-bold flex items-center gap-3 text-red-500 hover:bg-red-50 transition-colors"><LogOut size={18}/> Log Out</button>
         </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 bg-white rounded-3xl p-10 md:p-12 shadow-sm border border-slate-100 min-h-[50vh]">
        {tab === 'general' && (
          <div className="space-y-8">
            <div>
               <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Profile Details</h3>
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-bold text-slate-600 mb-2">Username</label>
                   <input type="text" defaultValue="Player_One" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none font-bold text-slate-800" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-600 mb-2">Email</label>
                   <div className="flex gap-4">
                     <input type="email" defaultValue="student@school.edu" disabled className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 outline-none font-bold text-slate-500 cursor-not-allowed" />
                     <button className="bg-slate-100 text-slate-600 font-bold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors" onClick={() => showToast("Change email sent!")}>Update</button>
                   </div>
                 </div>
               </div>
            </div>
            <div>
               <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Preferences</h3>
               
               <div className="flex items-center justify-between py-3 border-b border-slate-50">
                 <div className="flex items-center gap-4">
                   <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Globe size={20} /></div>
                   <div>
                     <h4 className="font-bold text-slate-800">Language</h4>
                     <p className="text-sm text-slate-500">English (US)</p>
                   </div>
                 </div>
                 <button className="text-blue-600 font-bold hover:underline" onClick={() => showToast("Language selection opened.")}>Change</button>
               </div>
               
               <div className="flex items-center justify-between py-3 border-b border-slate-50">
                 <div className="flex items-center gap-4">
                   <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Moon size={20} /></div>
                   <div>
                     <h4 className="font-bold text-slate-800">App Theme</h4>
                     <p className="text-sm text-slate-500">Light Mode</p>
                   </div>
                 </div>
                 <button className="text-blue-600 font-bold hover:underline" onClick={() => showToast("Theme settings opened.")}>Change</button>
               </div>

               <div className="flex items-center justify-between py-3">
                 <div className="flex items-center gap-4">
                   <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Volume2 size={20} /></div>
                   <div>
                     <h4 className="font-bold text-slate-800">Sound Effects</h4>
                     <p className="text-sm text-slate-500">Play sounds during gameplay.</p>
                   </div>
                 </div>
                 <div className="w-14 h-8 bg-blue-500 rounded-full p-1 cursor-pointer"><div className="bg-white w-6 h-6 rounded-full translate-x-6"></div></div>
               </div>
            </div>
          </div>
        )}

        {tab === 'privacy' && (
          <div className="space-y-8">
             <div>
               <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Privacy</h3>
               
               <div className="flex items-center justify-between py-3 border-b border-slate-50">
                 <div>
                   <h4 className="font-bold text-slate-800">Public Profile</h4>
                   <p className="text-sm text-slate-500">Allow others to view your stats and badges.</p>
                 </div>
                 <div className="w-14 h-8 bg-blue-500 rounded-full p-1 cursor-pointer"><div className="bg-white w-6 h-6 rounded-full translate-x-6"></div></div>
               </div>
               
               <div className="flex items-center justify-between py-3 border-b border-slate-50">
                 <div>
                   <h4 className="font-bold text-slate-800">Allow Friend Requests</h4>
                   <p className="text-sm text-slate-500">People can send you friend requests.</p>
                 </div>
                 <div className="w-14 h-8 bg-blue-500 rounded-full p-1 cursor-pointer"><div className="bg-white w-6 h-6 rounded-full translate-x-6"></div></div>
               </div>

               <div className="flex items-center justify-between py-3">
                 <div>
                   <h4 className="font-bold text-slate-800">Hide Recently Played</h4>
                   <p className="text-sm text-slate-500">Do not show quizzes you've played on your profile.</p>
                 </div>
                 <div className="w-14 h-8 bg-slate-300 rounded-full p-1 cursor-pointer"><div className="bg-white w-6 h-6 rounded-full"></div></div>
               </div>
             </div>

             <div>
               <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Security</h3>
               
               <div className="flex items-center justify-between py-3 border-b border-slate-50">
                 <div className="flex items-center gap-4">
                   <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><Key size={20} /></div>
                   <div>
                     <h4 className="font-bold text-slate-800">Password</h4>
                     <p className="text-sm text-slate-500">Last changed 3 months ago</p>
                   </div>
                 </div>
                 <button className="bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors" onClick={() => showToast("Password reset emailed.")}>Change</button>
               </div>
               
               <div className="flex items-center justify-between py-3 border-b border-slate-50">
                 <div className="flex items-center gap-4">
                   <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><Smartphone size={20} /></div>
                   <div>
                     <h4 className="font-bold text-slate-800">Two-Factor Authentication</h4>
                     <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                   </div>
                 </div>
                 <button className="bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors" onClick={() => showToast("2FA Setup opened.")}>Enable</button>
               </div>
             </div>
          </div>
        )}

        {tab === 'notifications' && (
          <div className="space-y-6">
             <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Notification Preferences</h3>
             
             <div className="flex items-center justify-between py-3 border-b border-slate-50">
               <div>
                 <h4 className="font-bold text-slate-800">Game Invites</h4>
                 <p className="text-sm text-slate-500">Get notified when friends challenge you to a game.</p>
               </div>
               <div className="w-14 h-8 bg-blue-500 rounded-full p-1 cursor-pointer"><div className="bg-white w-6 h-6 rounded-full translate-x-6"></div></div>
             </div>
             
             <div className="flex items-center justify-between py-3 border-b border-slate-50">
               <div>
                 <h4 className="font-bold text-slate-800">Friend Requests</h4>
                 <p className="text-sm text-slate-500">Get notified when someone adds you.</p>
               </div>
               <div className="w-14 h-8 bg-blue-500 rounded-full p-1 cursor-pointer"><div className="bg-white w-6 h-6 rounded-full translate-x-6"></div></div>
             </div>

             <div className="flex items-center justify-between py-3 border-b border-slate-50">
               <div>
                 <h4 className="font-bold text-slate-800">Daily Challenges</h4>
                 <p className="text-sm text-slate-500">Reminders to keep your learning streak alive.</p>
               </div>
               <div className="w-14 h-8 bg-blue-500 rounded-full p-1 cursor-pointer"><div className="bg-white w-6 h-6 rounded-full translate-x-6"></div></div>
             </div>

             <div className="flex items-center justify-between py-3">
               <div>
                 <h4 className="font-bold text-slate-800">Quizly Newsletter</h4>
                 <p className="text-sm text-slate-500">Updates, new features, and creator spotlights.</p>
               </div>
               <div className="w-14 h-8 bg-slate-300 rounded-full p-1 cursor-pointer"><div className="bg-white w-6 h-6 rounded-full"></div></div>
             </div>
          </div>
        )}

        {tab === 'connections' && (
          <div className="space-y-6">
             <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Connected Accounts</h3>
             <p className="text-slate-500 mb-6">Connect other accounts to log in faster and share quizzes easily.</p>

             <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-4">
                   <div className="bg-red-100 text-red-500 p-3 rounded-xl font-bold">G</div>
                   <div>
                      <h4 className="font-bold text-slate-800">Google</h4>
                      <p className="text-sm text-green-500 font-bold">Connected</p>
                   </div>
                </div>
                <button className="text-slate-500 font-bold hover:text-red-500 transition-colors" onClick={() => showToast("Google disconnected.")}>Disconnect</button>
             </div>

             <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-4">
                   <div className="bg-blue-100 text-blue-600 p-3 rounded-xl font-bold">C</div>
                   <div>
                      <h4 className="font-bold text-slate-800">Clever</h4>
                      <p className="text-sm text-slate-500 font-bold">Not Connected</p>
                   </div>
                </div>
                <button className="bg-slate-100 text-slate-600 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-200 transition-colors" onClick={() => showToast("Connecting Clever...")}>Connect</button>
             </div>

             <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-4">
                   <div className="bg-sky-100 text-sky-500 p-3 rounded-xl font-bold">M</div>
                   <div>
                      <h4 className="font-bold text-slate-800">Microsoft</h4>
                      <p className="text-sm text-slate-500 font-bold">Not Connected</p>
                   </div>
                </div>
                <button className="bg-slate-100 text-slate-600 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-200 transition-colors" onClick={() => showToast("Connecting Microsoft...")}>Connect</button>
             </div>
          </div>
        )}

        {tab === 'safety' && (
          <div className="space-y-6">
             <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Safety & Community</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 p-5 rounded-2xl cursor-pointer hover:border-blue-400 transition-colors">
                   <HelpCircle className="text-blue-500 mb-3" size={28} />
                   <h4 className="font-bold text-slate-800 mb-1">Community Guidelines</h4>
                   <p className="text-sm text-slate-500">Learn what is acceptable on Quizly.</p>
                </div>
                <div className="border border-slate-200 p-5 rounded-2xl cursor-pointer hover:border-blue-400 transition-colors">
                   <Shield className="text-purple-500 mb-3" size={28} />
                   <h4 className="font-bold text-slate-800 mb-1">Terms of Service</h4>
                   <p className="text-sm text-slate-500">Read our platform rules and policies.</p>
                </div>
             </div>

             <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-800 mb-2">Report an Issue</h4>
                <p className="text-sm text-red-600 mb-4">If you encounter inappropriate behavior or content, please report it immediately.</p>
                <button className="bg-white border border-red-200 text-red-600 font-bold px-5 py-2.5 rounded-xl hover:bg-red-100 transition-colors">Contact Support</button>
             </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          <button onClick={() => showToast("Settings saved!")} className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-xl transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const LeaderboardsView = ({ currentSkinData, xp }) => (
  <div className="max-w-5xl mx-auto space-y-12">
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-16 text-yellow-900 shadow-lg relative overflow-hidden">
      <Trophy size={160} className="absolute -right-10 -bottom-10 opacity-20 text-white transform -rotate-12" />
      <Trophy size={56} className="mb-4 text-white drop-shadow-md" />
      <h2 className="text-5xl font-black mb-2 relative z-10 text-white drop-shadow-sm">Global Top Players</h2>
      <p className="font-bold relative z-10 text-yellow-100 text-lg">Climb the ranks by earning XP and winning matches!</p>
    </div>

    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-2">
      {LEADERBOARD.length === 0 && (
        <div className="text-center py-16">
           <Trophy size={64} className="mx-auto text-slate-200 mb-4" />
           <h3 className="text-xl font-bold text-slate-600">No players ranked yet!</h3>
           <p className="text-slate-400 mt-2">Play some quizzes and earn XP to claim the #1 spot.</p>
        </div>
      )}
      {LEADERBOARD.map((player) => (
        <div key={player.rank} className="flex items-center p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer">
          <div className="w-16 text-center">
            <span className={`text-2xl font-black ${
              player.rank === 1 ? 'text-yellow-500' : 
              player.rank === 2 ? 'text-slate-400' : 
              player.rank === 3 ? 'text-orange-400' : 'text-slate-300'
            }`}>#{player.rank}</span>
          </div>
          <div className="ml-2 bg-slate-100 p-2 rounded-xl mr-5">
             <SkinIcon {...player.skin} size={40} />
          </div>
          <h4 className="font-bold text-slate-800 text-xl flex-1">{player.name}</h4>
          <div className="flex items-center gap-2 text-purple-600 bg-purple-50 px-5 py-2 rounded-full font-bold shadow-sm border border-purple-100">
            <Star size={18} /> {player.score} XP
          </div>
        </div>
      ))}
      
      {/* Current Player Rank */}
      <div className="mt-4 border-t-4 border-dashed border-slate-100 pt-4">
        <div className="flex items-center p-4 bg-blue-50 rounded-2xl border-2 border-blue-100">
          <div className="w-16 text-center">
            <span className="text-2xl font-black text-blue-600">#42</span>
          </div>
          <div className="ml-2 bg-white p-2 rounded-xl mr-5 shadow-sm">
             <SkinIcon {...currentSkinData} size={40} />
          </div>
          <h4 className="font-bold text-blue-900 text-xl flex-1">You</h4>
          <div className="flex items-center gap-2 text-purple-600 bg-white px-5 py-2 rounded-full font-bold shadow-sm">
            <Star size={18} /> {xp} XP
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FriendsView = ({ showToast }) => (
  <div className="max-w-5xl mx-auto space-y-10">
    <div className="flex justify-between items-end mb-6">
      <div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">Friends</h2>
        <p className="text-slate-500 font-medium">Connect, challenge, and play together.</p>
      </div>
      <button onClick={() => showToast("Search opened!")} className="bg-blue-100 text-blue-600 font-bold px-6 py-2.5 rounded-xl hover:bg-blue-200 transition-colors flex items-center gap-2">
        <PlusCircle size={20} /> Add Friend
      </button>
    </div>

    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      {FRIENDS.length === 0 && (
        <div className="text-center py-20">
           <Users size={64} className="mx-auto text-slate-200 mb-4" />
           <h3 className="text-xl font-bold text-slate-600">No friends yet!</h3>
           <p className="text-slate-400 mt-2">Click "Add Friend" to start building your network.</p>
        </div>
      )}
      {FRIENDS.map((friend, idx) => (
        <div key={friend.id} className={`flex items-center justify-between p-6 hover:bg-slate-50 transition-colors ${idx !== FRIENDS.length - 1 ? 'border-b border-slate-100' : ''}`}>
          <div className="flex items-center gap-5">
            <div className="bg-slate-100 p-2.5 rounded-2xl border border-slate-200 shadow-inner">
              <SkinIcon {...friend.skin} size={48} />
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-xl">{friend.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-3 h-3 rounded-full shadow-sm ${friend.status === 'Online' ? 'bg-green-500' : friend.status === 'In a Game' ? 'bg-yellow-400' : 'bg-slate-300'}`}></div>
                <span className="text-sm font-bold text-slate-500">{friend.status}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="bg-slate-100 text-slate-600 p-3 rounded-xl hover:bg-slate-200 transition-colors"><MoreVertical size={20}/></button>
             <button 
               onClick={() => showToast(`Challenged ${friend.name}!`)}
               disabled={friend.status === 'Offline'}
               className={`font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors ${
                 friend.status !== 'Offline' 
                   ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                   : 'bg-slate-100 text-slate-400 cursor-not-allowed'
               }`}
             >
               <Gamepad2 size={20} /> Challenge
             </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


// --- MAIN APP ---

export default function App() {
  // Global State
  const [view, setView] = useState('home');
  const [coins, setCoins] = useState(150);
  const [xp, setXp] = useState(250);
  const [unlockedSkins, setUnlockedSkins] = useState(['basic-red']);
  const [equippedSkin, setEquippedSkin] = useState('basic-red');
  const [toast, setToast] = useState(null);

  // Derived stats
  const level = Math.floor(xp / 100) + 1;
  const xpForNext = (level) * 100;
  const currentSkinData = SKINS.find(s => s.id === equippedSkin) || SKINS[0];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-800">
      
      {/* Sidebar Navigation */}
      <nav className="w-20 lg:w-72 bg-white border-r border-slate-200 flex flex-col justify-between sticky top-0 h-screen transition-all z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
          <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8 border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-10">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Gamepad2 size={28} />
            </div>
            <span className="hidden lg:block ml-4 font-black text-3xl text-slate-800 tracking-tight">Quizly</span>
          </div>

          <div className="p-4 lg:p-6 flex-1 space-y-8">
            {/* Main Nav */}
            <div>
              <p className="hidden lg:block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-4">Menu</p>
              <div className="space-y-1.5">
                {NAV_ITEMS.slice(0, 4).map(item => (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                      view === item.id 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'
                    }`}
                  >
                    <item.icon size={22} className={view === item.id ? 'text-blue-600' : 'text-slate-400'} />
                    <span className="hidden lg:block text-base">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Social Nav */}
            <div>
              <p className="hidden lg:block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-4">Social</p>
              <div className="space-y-1.5">
                {NAV_ITEMS.slice(4, 6).map(item => (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                      view === item.id 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'
                    }`}
                  >
                    <item.icon size={22} className={view === item.id ? 'text-blue-600' : 'text-slate-400'} />
                    <span className="hidden lg:block text-base">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Nav */}
            <div>
              <p className="hidden lg:block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-4">Personal</p>
              <div className="space-y-1.5">
                {NAV_ITEMS.slice(6, 9).map(item => (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                      view === item.id 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'
                    }`}
                  >
                    <item.icon size={22} className={view === item.id ? 'text-blue-600' : 'text-slate-400'} />
                    <span className="hidden lg:block text-base">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mini profile at bottom of sidebar */}
        <div className="p-4 lg:p-6 border-t border-slate-100 bg-slate-50/50 hidden lg:flex items-center gap-4 hover:bg-slate-100 cursor-pointer transition-colors" onClick={() => setView('profile')}>
          <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-200">
            <SkinIcon {...currentSkinData} size={36} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-black text-[15px] text-slate-800 truncate">Player_One</p>
            <p className="text-xs text-blue-600 font-black uppercase tracking-wider mt-0.5">Level {level}</p>
          </div>
          <Settings size={20} className="text-slate-400" />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
          <h2 className="text-2xl font-black text-slate-800 capitalize hidden md:block">
            {view === 'home' ? 'Dashboard' : view}
          </h2>

          <div className="flex items-center gap-4 md:gap-6 ml-auto">
            {/* Coins */}
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-200 shadow-sm cursor-pointer hover:bg-yellow-100 transition-colors" onClick={() => setView('shop')}>
              <Coins size={22} className="text-yellow-500" />
              <span className="font-black text-yellow-700">{coins}</span>
            </div>
            
            {/* XP Bar */}
            <div className="hidden sm:flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-purple-300 transition-colors" onClick={() => setView('profile')}>
              <Star size={22} className="text-purple-500" />
              <div className="w-32 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${(xp % 100)}%` }}
                />
              </div>
              <span className="font-bold text-slate-500 text-sm w-12">Lvl {level}</span>
            </div>

            {/* Profile Avatar Click */}
            <div 
              className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors border-2 border-slate-200 shadow-inner"
              onClick={() => setView('profile')}
            >
              <SkinIcon {...currentSkinData} size={32} />
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="p-8 md:p-12 lg:p-16 flex-1 overflow-y-auto">
          {view === 'home' && <HomeView setView={setView} currentSkinData={currentSkinData} coins={coins} level={level} xp={xp} />}
          {view === 'play' && <PlayView setCoins={setCoins} setXp={setXp} showToast={showToast} />}
          {view === 'shop' && <ShopView coins={coins} setCoins={setCoins} unlockedSkins={unlockedSkins} setUnlockedSkins={setUnlockedSkins} equippedSkin={equippedSkin} setEquippedSkin={setEquippedSkin} showToast={showToast} />}
          {view === 'explore' && <ExploreView showToast={showToast} />}
          {view === 'create' && <CreateView showToast={showToast} />}
          {view === 'friends' && <FriendsView showToast={showToast} />}
          {view === 'leaderboards' && <LeaderboardsView currentSkinData={currentSkinData} xp={xp} />}
          {view === 'profile' && <ProfileView currentSkinData={currentSkinData} level={level} xp={xp} coins={coins} />}
          {view === 'settings' && <SettingsView showToast={showToast} />}
        </div>
      </main>

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-4 animate-[bounce_1s_ease-in-out_infinite]">
          <div className="bg-green-500 p-1 rounded-full"><Check size={18} className="text-white" /></div>
          <span className="text-lg">{toast}</span>
        </div>
      )}
    </div>
  );
}