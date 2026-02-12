
import React, { useEffect, useState } from 'react';
import { volleyballApi } from '../services/api';
import { League, Standing } from '../types';
import { Loader2, Trophy, ChevronDown, AlertCircle, Filter } from 'lucide-react';

const Standings: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | ''>('');
  const [selectedSeason, setSelectedSeason] = useState<number>(2026); // Set default to 2026 as requested
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingLeagues, setLoadingLeagues] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const availableSeasons = [2026, 2025, 2024, 2023, 2022];

  useEffect(() => {
    const fetchInitialLeagues = async () => {
      try {
        setLoadingLeagues(true);
        const data = await volleyballApi.getLeagues();
        setLeagues(data);
        if (data.length > 0) {
          // Attempt to find a popular league or just take the first
          const defaultLeague = data.find(l => l.name.includes('Nations League') || l.name.includes('SuperLega')) || data[0];
          setSelectedLeagueId(defaultLeague.id);
        }
      } catch (err) {
        setError('Failed to load leagues.');
      } finally {
        setLoadingLeagues(false);
      }
    };
    fetchInitialLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeagueId !== '') {
      const fetchStandings = async () => {
        try {
          setLoading(true);
          const data = await volleyballApi.getStandings(Number(selectedLeagueId), selectedSeason);
          setStandings(data);
          setError(null);
        } catch (err) {
          setError('Data unreachable for this selection.');
          setStandings([]);
        } finally {
          setLoading(false);
        }
      };
      fetchStandings();
    }
  }, [selectedLeagueId, selectedSeason]);

  if (loadingLeagues) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-6" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm text-center">
          Initializing 2026 Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 italic uppercase tracking-tighter">
            2026 <span className="text-red-600 underline decoration-red-200 underline-offset-8">Standings</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em] pt-2">Tracking the next generation of volleyball excellence.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-auto">
          {/* League Selector */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Competition</label>
            <div className="relative group">
              <select
                value={selectedLeagueId}
                onChange={(e) => setSelectedLeagueId(Number(e.target.value))}
                className="w-full md:w-64 pl-5 pr-10 py-4 bg-white border-2 border-gray-100 rounded-2xl appearance-none focus:ring-4 focus:ring-red-50 focus:border-red-600 outline-none transition-all font-bold text-gray-700 cursor-pointer shadow-sm group-hover:shadow-md text-sm italic"
              >
                <option value="" disabled>Choose League...</option>
                {leagues.map((league) => (
                  <option key={league.id} value={league.id}>
                    {league.country.name}: {league.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-red-600" />
            </div>
          </div>

          {/* Season Selector */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Season</label>
            <div className="relative group">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="w-full md:w-32 pl-5 pr-10 py-4 bg-white border-2 border-gray-100 rounded-2xl appearance-none focus:ring-4 focus:ring-red-50 focus:border-red-600 outline-none transition-all font-bold text-gray-700 cursor-pointer shadow-sm group-hover:shadow-md text-sm italic"
              >
                {availableSeasons.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-8 border-red-600 text-red-700 p-8 rounded-3xl flex items-center space-x-6 shadow-xl shadow-red-50">
          <AlertCircle className="w-10 h-10 flex-shrink-0" />
          <div>
            <p className="font-black uppercase italic text-lg">System Error</p>
            <p className="font-medium opacity-80">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-[3rem] p-40 flex flex-col items-center border border-gray-100 shadow-sm">
          <Loader2 className="w-16 h-16 text-red-600 animate-spin mb-8" />
          <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Fetching 2026 Data...</p>
        </div>
      ) : standings.length > 0 ? (
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-100 border border-gray-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] w-28">Rank</th>
                  <th className="px-8 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Club</th>
                  <th className="px-8 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] text-center">GP</th>
                  <th className="px-8 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] text-center">W</th>
                  <th className="px-8 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] text-center">L</th>
                  <th className="px-8 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] text-center">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {standings.map((standing, index) => (
                  <tr key={`${standing.team.id}-${index}`} className="group hover:bg-red-50/20 transition-all duration-300">
                    <td className="px-8 py-6">
                      <span className={`flex items-center justify-center w-12 h-12 rounded-2xl font-black text-lg italic transition-all group-hover:scale-110 ${
                        standing.position <= 3 
                          ? 'bg-red-600 text-white shadow-lg shadow-red-100' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {standing.position}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-6">
                        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-50 w-16 h-16 flex items-center justify-center transition-transform group-hover:rotate-3">
                          <img src={standing.team.logo} alt={standing.team.name} className="max-w-full max-h-full object-contain filter" />
                        </div>
                        <span className="font-black text-gray-900 uppercase italic tracking-tighter text-xl">{standing.team.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-black text-gray-400 text-xl italic">{standing.games.played}</td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center px-5 py-1.5 rounded-full text-[10px] font-black bg-green-50 text-green-700 border border-green-100 uppercase italic tracking-widest">
                        {standing.games.win.total} W
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center px-5 py-1.5 rounded-full text-[10px] font-black bg-red-50 text-red-700 border border-red-100 uppercase italic tracking-widest">
                        {standing.games.lose.total} L
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-3xl font-black text-red-600 italic tracking-tighter drop-shadow-sm">{standing.points}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-100 shadow-sm animate-in zoom-in duration-300">
          <div className="bg-gray-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 rotate-12">
            <Trophy className="w-12 h-12 text-gray-200" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">No 2026 Data Yet</h3>
          <p className="text-gray-400 mt-4 font-bold max-w-md mx-auto uppercase text-xs leading-loose tracking-widest">
            The 2026 season for this competition hasn't started or the results haven't been published to the global network. 
            <br />
            <span className="text-red-600">Switch to 2025 or 2024 to view confirmed results.</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Standings;
