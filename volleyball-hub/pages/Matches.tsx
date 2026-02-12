
import React, { useEffect, useState } from 'react';
import { volleyballApi } from '../services/api';
import { Game } from '../types';
import { Calendar, AlertCircle, Loader2 } from 'lucide-react';

const Matches: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        const data = await volleyballApi.getGames(today);
        setGames(data);
        setError(null);
      } catch (err) {
        setError('Failed to load upcoming matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-6" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Synchronizing Matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-100 text-red-700 p-8 rounded-3xl flex items-center space-x-6 max-w-2xl mx-auto my-10 shadow-lg">
        <AlertCircle className="w-10 h-10 flex-shrink-0" />
        <p className="font-bold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 italic uppercase">Today's Slate</h1>
          <p className="text-gray-400 font-bold mt-2 flex items-center uppercase text-sm tracking-wider">
            <Calendar className="w-4 h-4 mr-2 text-red-600" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="bg-red-600 text-white px-6 py-2 rounded-2xl font-black text-sm shadow-xl shadow-red-200 uppercase tracking-tighter">
          {games.length} Fixtures
        </div>
      </div>

      {games.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Calendar className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 uppercase italic">Empty Court</h3>
          <p className="text-gray-400 mt-3 font-medium max-w-sm mx-auto">There are no professional matches scheduled for today. Check back tomorrow for the next spike.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-50/50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-1 rounded-lg shadow-sm">
                    <img src={game.league.logo} alt={game.league.name} className="w-6 h-6 object-contain" />
                  </div>
                  <span className="text-sm font-black text-gray-500 uppercase tracking-tight">{game.league.name}</span>
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                  game.status.short === 'FT' ? 'bg-gray-900 text-white' : 'bg-red-600 text-white shadow-lg shadow-red-100'
                }`}>
                  {game.status.long}
                </span>
              </div>
              
              <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Home Team */}
                <div className="flex flex-col items-center text-center space-y-4 w-full md:w-1/3 group">
                  <div className="w-24 h-24 bg-gray-50 rounded-full p-5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <img src={game.teams.home.logo} alt={game.teams.home.name} className="w-full h-full object-contain filter drop-shadow-md" />
                  </div>
                  <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter line-clamp-1">{game.teams.home.name}</h4>
                </div>

                {/* Score / Time */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                  {game.status.short === 'NS' ? (
                    <div className="text-center">
                      <div className="text-xs font-black text-gray-300 mb-2 tracking-[0.4em] uppercase">Versus</div>
                      <p className="text-3xl font-black text-red-600 bg-red-50 px-6 py-2 rounded-2xl italic">{game.time}</p>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-8">
                      <span className="text-6xl font-black text-gray-900 italic tracking-tighter">{game.scores.home ?? 0}</span>
                      <div className="h-1 w-8 bg-gray-200 rounded-full"></div>
                      <span className="text-6xl font-black text-gray-900 italic tracking-tighter">{game.scores.away ?? 0}</span>
                    </div>
                  )}
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center text-center space-y-4 w-full md:w-1/3 group">
                  <div className="w-24 h-24 bg-gray-50 rounded-full p-5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <img src={game.teams.away.logo} alt={game.teams.away.name} className="w-full h-full object-contain filter drop-shadow-md" />
                  </div>
                  <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter line-clamp-1">{game.teams.away.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
