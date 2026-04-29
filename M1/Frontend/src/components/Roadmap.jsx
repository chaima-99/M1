/*global  setTimeout */
/*global localStorage */
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  FileText, 
  Video,
  Target,
  Play,
  Book,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Zap,
  X,
  ExternalLink,
  User
} from 'lucide-react';

// Roadmap Component with 3D Milestones
const Roadmap = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userGoal, setUserGoal] = useState(null);

  // Generate roadmap based on stored user preferences
  useEffect(() => {
    const storedGoal = localStorage.getItem('userStudyGoal');
    if (storedGoal) {
      setUserGoal(JSON.parse(storedGoal));
    }

    // Simulate AI-generated roadmap
    setTimeout(() => {
      const goal = storedGoal ? JSON.parse(storedGoal) : null;
      const generatedRoadmap = generateRoadmap(goal);
      setMilestones(generatedRoadmap);
      setIsLoading(false);
    }, 2000);
  }, []);

  const generateRoadmap = (goalData) => {
    const topic = goalData?.topic || 'General Learning';
    const timeCommitment = goalData?.timeCommitment || 'self-paced';
    
    return [
      {
        id: 1,
        title: "Foundation & Setup",
        description: `Master the fundamentals of ${topic} and establish your learning environment`,
        status: "completed",
        estimatedTime: timeCommitment === '1week' ? "2-3 days" : 
                      timeCommitment === '2weeks' ? "1 week" : "1-2 weeks",
        difficulty: "Beginner",
        position: { x: 50, y: 20 },
        resources: [
          { type: "video", title: `${topic} Fundamentals`, url: "#", duration: "45 min" },
          { type: "article", title: "Getting Started Guide", url: "#", readTime: "15 min" },
          { type: "practice", title: "Basic Exercises", url: "#", exercises: 8 }
        ],
        skills: ["Basic Concepts", "Environment Setup", "Tool Familiarization"],
        xp: 150,
        color: "from-green-400 to-green-600"
      },
      {
        id: 2,
        title: "Core Concepts",
        description: `Deep dive into essential ${topic} principles and methodologies`,
        status: "in-progress",
        estimatedTime: timeCommitment === '1week' ? "1 week" : 
                      timeCommitment === '2weeks' ? "1-2 weeks" : "2-3 weeks",
        difficulty: "Intermediate",
        position: { x: 30, y: 40 },
        resources: [
          { type: "video", title: "Advanced Concepts", url: "#", duration: "2.5 hours" },
          { type: "article", title: "Best Practices", url: "#", readTime: "30 min" },
          { type: "project", title: "Practice Project", url: "#", complexity: "Intermediate" },
          { type: "quiz", title: "Knowledge Assessment", url: "#", questions: 25 }
        ],
        skills: ["Problem Solving", "Critical Thinking", "Pattern Recognition", "Analysis"],
        xp: 300,
        color: "from-blue-400 to-blue-600"
      },
      {
        id: 3,
        title: "Advanced Applications",
        description: `Apply ${topic} concepts to complex real-world scenarios`,
        status: "locked",
        estimatedTime: timeCommitment === '1week' ? "1-2 weeks" : 
                      timeCommitment === '2weeks' ? "2-3 weeks" : "3-4 weeks",
        difficulty: "Advanced",
        position: { x: 70, y: 60 },
        resources: [
          { type: "video", title: "Expert Masterclass", url: "#", duration: "4 hours" },
          { type: "article", title: "Industry Case Studies", url: "#", readTime: "45 min" },
          { type: "project", title: "Portfolio Project", url: "#", complexity: "Advanced" },
          { type: "mentorship", title: "Expert Consultation", url: "#", duration: "1 hour" }
        ],
        skills: ["Advanced Problem Solving", "System Design", "Optimization", "Innovation"],
        xp: 500,
        color: "from-purple-400 to-purple-600"
      },
      {
        id: 4,
        title: "Practical Mastery",
        description: `Build comprehensive projects demonstrating ${topic} expertise`,
        status: "locked",
        estimatedTime: timeCommitment === '1week' ? "1-2 weeks" : 
                      timeCommitment === '2weeks' ? "2-3 weeks" : "3-4 weeks",
        difficulty: "Expert",
        position: { x: 20, y: 80 },
        resources: [
          { type: "project", title: "Capstone Project", url: "#", complexity: "Expert" },
          { type: "video", title: "Industry Standards", url: "#", duration: "2 hours" },
          { type: "practice", title: "Expert Challenges", url: "#", exercises: 20 },
          { type: "portfolio", title: "Professional Showcase", url: "#", deliverables: 5 }
        ],
        skills: ["Project Management", "Quality Assurance", "Performance", "Documentation"],
        xp: 750,
        color: "from-orange-400 to-orange-600"
      },
      {
        id: 5,
        title: "Expertise & Leadership",
        description: `Become a ${topic} expert and mentor others in the community`,
        status: "locked",
        estimatedTime: timeCommitment === '1week' ? "2-3 weeks" : 
                      timeCommitment === '2weeks' ? "3-4 weeks" : "4-6 weeks",
        difficulty: "Master",
        position: { x: 80, y: 95 },
        resources: [
          { type: "video", title: "Leadership in Tech", url: "#", duration: "3 hours" },
          { type: "article", title: "Future Trends", url: "#", readTime: "60 min" },
          { type: "project", title: "Open Source Contribution", url: "#", complexity: "Master" },
          { type: "mentorship", title: "Become a Mentor", url: "#", commitment: "Ongoing" }
        ],
        skills: ["Expertise", "Leadership", "Mentoring", "Innovation", "Community Building"],
        xp: 1000,
        color: "from-red-400 to-red-600"
      }
    ];
  };

  const toggleMilestoneStatus = (milestoneId) => {
    setMilestones(prev => prev.map(milestone => {
      if (milestone.id === milestoneId && milestone.status !== 'locked') {
        const newStatus = milestone.status === 'completed' ? 'in-progress' : 'completed';
        return { ...milestone, status: newStatus };
      }
      return milestone;
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-8 h-8 text-white" />;
      case 'in-progress': return <Play className="w-6 h-6 text-white" />;
      case 'locked': return <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>;
      default: return <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>;
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={16} className="text-red-500" />;
      case 'article': return <FileText size={16} className="text-blue-500" />;
      case 'project': return <Target size={16} className="text-purple-500" />;
      case 'practice': return <Play size={16} className="text-green-500" />;
      case 'quiz': return <CheckCircle size={16} className="text-orange-500" />;
      case 'mentorship': return <User size={16} className="text-indigo-500" />;
      case 'portfolio': return <Star size={16} className="text-yellow-500" />;
      default: return <Book size={16} className="text-gray-500" />;
    }
  };

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const totalXP = milestones.filter(m => m.status === 'completed').reduce((sum, m) => sum + m.xp, 0);
  const progressPercentage = milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">AI is Creating Your Roadmap</h3>
          <p className="text-gray-600 mb-6">Analyzing your preferences and generating personalized content...</p>
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Progress</h3>
              <p className="text-2xl font-bold">{progressPercentage}%</p>
            </div>
            <Trophy className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Experience</h3>
              <p className="text-2xl font-bold">{totalXP}</p>
            </div>
            <Zap className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Completed</h3>
              <p className="text-2xl font-bold">{completedMilestones}/{milestones.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>
      </div>

      {/* 3D Roadmap Visualization */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
            <MapPin className="text-purple-600" />
            Your Learning Journey
          </h2>
          <p className="text-gray-600">Interactive roadmap with milestone achievements</p>
          {userGoal && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">Learning Goal: {userGoal.topic}</p>
              <p className="text-blue-600 text-sm">Time Commitment: {userGoal.timeCommitment === '1week' ? '1 Week' : userGoal.timeCommitment === '2weeks' ? '2 Weeks' : 'Self-paced'}</p>
            </div>
          )}
        </div>

        {/* 3D Milestone Map */}
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {milestones.map((milestone, index) => {
              if (index < milestones.length - 1) {
                const current = milestone.position;
                const next = milestones[index + 1].position;
                return (
                  <line
                    key={`line-${milestone.id}`}
                    x1={`${current.x}%`}
                    y1={`${current.y}%`}
                    x2={`${next.x}%`}
                    y2={`${next.y}%`}
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    strokeDasharray={milestone.status === 'completed' ? "none" : "10,5"}
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* 3D Milestone Circles */}
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ 
                left: `${milestone.position.x}%`, 
                top: `${milestone.position.y}%`,
                zIndex: 10
              }}
              onClick={() => setSelectedMilestone(milestone)}
            >
              {/* 3D Circle */}
              <div 
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${milestone.color} shadow-2xl transform transition-all duration-300 hover:scale-125 flex items-center justify-center relative group-hover:shadow-3xl`}
                style={{
                  boxShadow: `
                    0 20px 40px rgba(0,0,0,0.3),
                    inset 0 2px 4px rgba(255,255,255,0.4),
                    inset 0 -2px 4px rgba(0,0,0,0.2)
                  `
                }}
              >
                {getStatusIcon(milestone.status)}
                
                {/* Pulse effect for in-progress */}
                {milestone.status === 'in-progress' && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30"></div>
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-20"></div>
                  </>
                )}

                {/* Glow effect for completed */}
                {milestone.status === 'completed' && (
                  <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-pulse"></div>
                )}

                {/* Number badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border-2 border-purple-400 rounded-full flex items-center justify-center text-xs font-bold text-purple-600 shadow-lg">
                  {index + 1}
                </div>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                  {milestone.title}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone List */}
        <div className="mt-8 space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg`}>
                  {getStatusIcon(milestone.status)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{milestone.title}</h3>
                  <p className="text-sm text-gray-600">{milestone.estimatedTime} • {milestone.xp} XP</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  milestone.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  milestone.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  milestone.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                  milestone.difficulty === 'Expert' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {milestone.difficulty}
                </span>
                <button
                  onClick={() => setSelectedMilestone(milestone)}
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Detail Side Panel (Drawer) */}
      <div 
        className={`fixed top-16 bottom-0 right-0 w-full md:w-[450px] bg-white/80 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 transform transition-all duration-500 ease-in-out ${
          selectedMilestone ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedMilestone && (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${selectedMilestone.color} text-white relative`}>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                  {getStatusIcon(selectedMilestone.status)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedMilestone.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{selectedMilestone.difficulty} Level</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              <section>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-gray-700 leading-relaxed">{selectedMilestone.description}</p>
              </section>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg"><Clock className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <div className="text-[10px] text-blue-600 font-bold uppercase">Duration</div>
                    <div className="font-bold text-gray-800">{selectedMilestone.estimatedTime}</div>
                  </div>
                </div>
                <div className="bg-yellow-50/50 p-4 rounded-2xl border border-yellow-100 flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg"><Star className="w-5 h-5 text-yellow-600" /></div>
                  <div>
                    <div className="text-[10px] text-yellow-600 font-bold uppercase">Reward</div>
                    <div className="font-bold text-gray-800">{selectedMilestone.xp} XP</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <section>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Skills Gained</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMilestone.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Resources */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Learning Materials</h4>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">
                    {selectedMilestone.resources.length} ITEMS
                  </span>
                </div>
                <div className="space-y-3">
                  {selectedMilestone.resources.map((resource, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50/50 border border-gray-100 rounded-2xl hover:bg-white hover:border-purple-200 hover:shadow-md transition-all group cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-gray-800 text-sm truncate">{resource.title}</h5>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {resource.duration || resource.readTime || resource.exercises || resource.complexity || 'Educational Resource'}
                        </p>
                      </div>
                      <ExternalLink size={14} className="text-gray-300 group-hover:text-purple-600 transition-colors" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              {selectedMilestone.status !== 'locked' ? (
                <button
                  onClick={() => {
                    toggleMilestoneStatus(selectedMilestone.id);
                    setSelectedMilestone(null);
                  }}
                  className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    selectedMilestone.status === 'completed'
                      ? 'bg-gray-800 text-white hover:bg-gray-900'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {selectedMilestone.status === 'completed' ? 'MARK AS INCOMPLETE' : 'COMPLETE MILESTONE'}
                </button>
              ) : (
                <div className="text-center p-4 bg-gray-100 rounded-2xl border border-gray-200">
                  <p className="text-gray-500 text-xs font-bold uppercase flex items-center justify-center gap-2">
                    <Clock size={14} /> Finish previous milestones to unlock
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for mobile */}
      {selectedMilestone && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 md:hidden"
          onClick={() => setSelectedMilestone(null)}
        />
      )}
    </div>
  );
};

export default Roadmap;