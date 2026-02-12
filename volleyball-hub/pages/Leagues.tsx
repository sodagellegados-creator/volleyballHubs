
import React, { useEffect, useState } from 'react';
import { volleyballApi } from '../services/api';
import { League } from '../types';
import { Loader2, Search, Globe, AlertCircle } from 'lucide-react';

const Leagues: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        const data = await volleyballApi.getLeagues();
        setLeagues(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch leagues. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const filteredLeagues = leagues.filter(league => 
    league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    league.country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-6" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Mapping Global Leagues...</p>
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
      <div className="md:flex md:items-center md:justify-between space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-black text-gray-900 italic uppercase">Pro Leagues</h1>
          <p className="text-gray-400 font-bold mt-2 uppercase text-sm tracking-wider">Access the elite circuits across {leagues.length} competitions.</p>
        </div>
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by name or region..."
            className="pl-12 pr-6 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-red-100 focus:border-red-600 w-full transition-all outline-none font-bold text-gray-700 placeholder:text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredLeagues.map((league) => (
          <div key={league.id} className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col h-full">
            <div className="p-8 flex flex-col items-center text-center space-y-6 flex-grow">
              <div className="w-32 h-32 bg-gray-50 rounded-[2rem] p-6 flex items-center justify-center group-hover:bg-red-50 transition-colors duration-300 shadow-inner">
                <img 
                  src={league.logo} 
                  alt={league.name} 
                  className="max-w-full max-h-full object-contain filter drop-shadow-md" 
                  onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100/100?grayscale')}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-900 uppercase italic line-clamp-1">{league.name}</h3>
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  {league.country.flag ? (
                    <img src={league.country.flag} alt={league.country.name} className="w-5 h-3.5 object-cover rounded-sm shadow-sm" />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}
                  <span className="text-xs font-black uppercase tracking-widest">{league.country.name}</span>
                </div>
              </div>
            </div>
            <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">#{league.id}</span>
              <span className="px-4 py-1.5 bg-white border-2 border-gray-100 rounded-xl text-[10px] font-black uppercase text-red-600 tracking-wider">
                {league.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredLeagues.length === 0 && (
        <div className="text-center py-20 bg-gray-50/50 rounded-[2rem]">
          <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest">No leagues matched your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Leagues;
