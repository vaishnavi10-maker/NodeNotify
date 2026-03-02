import React, { useEffect, useState } from 'react';
import { Play, Pause, Clock, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import DailyProblems from "./DailyProblems";
import {   getUser } from '../api/dashboardApi';

const HeroSection = () => {

  // const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const fetchData = async () => {

   const [ userRes] = await Promise.allSettled([ getUser()]);

  //   if (taskRes.status === "fulfilled") {
  //     setTasks(taskRes.value.data);
  //   } else {
  //     console.log(taskRes.reason);
  //   }

    if (userRes.status === "fulfilled") {
      setUser(userRes.value.data);
    } else {
      console.log(userRes.reason);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  const progress = (seconds % 360) / 360;
  const dashOffset = circumference - progress * circumference;
  // const handleComplete = async (id) => {
  //   await completeTask(id);
  //   fetchData();
  // };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-medium text-gray-900">Welcome, {user.name || "User"}</h1>
      </header>

      {/* Top Stats Row */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-6 flex gap-8 items-end">
          <StatBar label="Interviews" percent="15%" color="bg-gray-800" />
          <StatBar label="Hired" percent="15%" color="bg-yellow-400" />
          <StatBar label="Project time" percent="60%" color="bg-gray-200" isStriped />
          <StatBar label="Output" percent="10%" color="bg-gray-100" />
        </div>
        <div className="col-span-6 flex justify-end gap-12">
          <BigStat number="197" label=" Problems" />
          <BigStat number="3" label="Daily Dsa" />
          <BigStat number="100%" label="Accuracy" />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-12 gap-6">

        {/* Profile Card */}
        <div className="col-span-3 bg-white/40 backdrop-blur-lg rounded-[2.5rem] p-6 relative overflow-hidden h-95 border border-white/50">
          <img
            src={user.profilePic || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"}
            alt="Profile"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-xs opacity-80">{user.role || "DSA Enthusiast"}</p>
          </div>
          <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-medium border border-white/30">
            🔥 {user.streak || 0} Day Streak
          </div>
        </div>

        {/* Progress Chart */}
        <div className="col-span-3 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 font-medium">Progress</p>
              <h2 className="text-4xl font-bold mt-1">6.1 h <span className="text-xs font-normal text-gray-400 block mt-1">Work Time this week</span></h2>
            </div>
            <div className="p-2 bg-gray-50 rounded-full"><ChevronRight size={18} /></div>
          </div>
          <div className="flex items-end justify-between h-32 mt-8">
            {[20, 45, 60, 30, 80, 40, 10].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-2.5 rounded-full ${i === 4 ? 'bg-yellow-400 h-24' : 'bg-gray-900 h-16'}`} style={{ height: `${h}%` }}></div>
                <span className="text-[10px] text-gray-400 uppercase">{'smttwfs'[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time Tracker */}
        <div className="col-span-3 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-gray-500 font-medium">Time tracker</p>
            <div className="p-2 bg-gray-50 rounded-full"><ChevronRight size={18} /></div>
          </div>
          <div className="relative flex justify-center items-center py-4">
            <svg className="w-32 h-32 -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="text-yellow-400"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-bold">{formatTime(seconds)}</span>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Work Time</p>
            </div>
          </div>
         <div className="flex justify-center gap-4 mt-2">

  {/* Play Button */}
  <button
    onClick={() => setIsRunning(true)}
    className="
    p-3 border rounded-full 
    transition-all duration-300
    hover:bg-yellow-400
    hover:scale-110
    hover:shadow-[0_8px_25px_rgba(250,204,21,0.45)]
    active:scale-95
    group
    "
  >
    <Play
      size={16}
      className="text-gray-800 group-hover:text-black transition-colors"
      fill="currentColor"
    />
  </button>

  {/* Pause Button */}
  <button
    onClick={() => setIsRunning(false)}
    className="
    p-3 border rounded-full
    transition-all duration-300
    hover:bg-gray-900
    hover:scale-110
    hover:shadow-[0_8px_25px_rgba(0,0,0,0.35)]
    active:scale-95
    group
    "
  >
    <Pause
      size={16}
      className="text-gray-800 group-hover:text-white transition-colors"
      fill="currentColor"
    />
  </button>

</div>
        </div>

        {/* Onboarding Section */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white rounded-4xl p-6 border border-gray-100">
            <DailyProblems />
            {/* <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Onboarding</span>
                    <span className="text-2xl font-bold">18%</span>
                </div> */}
            {/* <div className="flex gap-1 h-10">
                    <div className="flex-[0.3] bg-yellow-400 rounded-l-lg flex items-center px-3 text-[10px] font-bold">Task</div>
                    <div className="flex-[0.4] bg-gray-800"></div>
                    <div className="flex-[0.3] bg-gray-200 rounded-r-lg"></div>
                </div> */}
          </div>

          {/* <div className="bg-gray-800 text-white rounded-[2rem] p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-light">Onboarding Task</p>
                    <span className="text-2xl font-medium">
                {tasks.filter(t => t.completed).length}/{tasks.length}
              </span>
                </div> */}

          {/* <div className="space-y-4">

              {tasks.map(task => (
                <TaskItem
                  key={task._id}
                  title={task.title}
                  time={task.time}
                  completed={task.completed}
                  onClick={() => handleComplete(task._id)}
                />
              ))}

            </div>
            </div> */}
        </div>
         
      </div>
    </div>
  );
};

// Sub-components
const StatBar = ({ label, percent, color, isStriped }) => (
  <div className="w-24">
    <p className="text-xs text-gray-500 mb-2">{label}</p>
    <div className={`h-10 w-full rounded-full ${color} ${isStriped ? 'bg-linear-to-r from-gray-200 via-white to-gray-200 bg-size-[10px_10px]' : ''} flex items-center justify-center`}>
      <span className={`text-[10px] font-bold ${color === 'bg-gray-800' ? 'text-white' : 'text-gray-600'}`}>{percent}</span>
    </div>
  </div>
);

const BigStat = ({ number, label }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><Clock size={18} className="text-gray-400" /></div>
    <div>
      <div className="text-4xl font-light">{number}</div>
      <div className="text-[10px] uppercase text-gray-400 tracking-wider">{label}</div>
    </div>
  </div>
)

const TaskItem = ({ title, time, completed, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between opacity-90 cursor-pointer"
  >
    <div className="flex items-center gap-3">

      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        <Circle size={14} className="text-gray-400" />
      </div>

      <div>
        <p className="text-xs font-medium">{title}</p>
        <p className="text-[10px] text-gray-400">{time}</p>
      </div>

    </div>

    {completed
      ? <CheckCircle2 size={16} className="text-yellow-400" />
      : <div className="w-4 h-4 rounded-full border border-gray-600"></div>}
  </div>
);

const formatTime = (sec) => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
 

export default HeroSection;
