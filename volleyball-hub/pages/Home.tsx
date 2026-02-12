
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, List, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-20 py-4">
      {/* Hero Section */}
      <section className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
        <img
          src="https://images.unsplash.com/photo-1592656094267-764a45159577?auto=format&fit=crop&q=80&w=1200"
          alt="Volleyball game"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/90 via-red-800/40 to-transparent flex flex-col justify-center px-8 md:px-20 text-white">
          <div className="bg-red-600 text-white text-xs font-black uppercase tracking-[0.3em] px-4 py-1 rounded-full w-fit mb-6 shadow-xl">
            Global Sports Network
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-tight uppercase italic">
            2026 <br /><span className="text-red-400">CHAMPIONSHIP.</span>
          </h1>
          <p className="text-xl md:text-2xl text-red-50 max-w-xl mb-10 leading-relaxed font-medium">
            Step into the future of volleyball. Tracking every serve, spike, and victory for the upcoming 2026 global season.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/matches"
              className="bg-white text-red-600 px-10 py-4 rounded-2xl font-black hover:bg-red-50 transition-all flex items-center space-x-3 shadow-2xl hover:scale-105 active:scale-95"
            >
              <span>EXPLORE MATCHES</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-3 gap-10">
        <Link to="/matches" className="group p-10 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 group-hover:rotate-6">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-3 uppercase italic">Live Matches</h3>
          <p className="text-gray-500 font-medium leading-relaxed">Real-time scheduling and results from the world's premier volleyball courts.</p>
        </Link>

        <Link to="/leagues" className="group p-10 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 group-hover:rotate-6">
            <List className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-3 uppercase italic">Global Leagues</h3>
          <p className="text-gray-500 font-medium leading-relaxed">A comprehensive database of leagues across every continent and category.</p>
        </Link>

        <Link to="/standings" className="group p-10 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 group-hover:rotate-6">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-3 uppercase italic">2026 Rankings</h3>
          <p className="text-gray-500 font-medium leading-relaxed">In-depth statistical breakdown of team performance for the elite 2026 season.</p>
        </Link>
      </section>
    </div>
  );
};

export default Home;
