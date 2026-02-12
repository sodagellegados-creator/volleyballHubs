
import { ApiResponse, Game, League, Standing } from '../types';

const BASE_URL = 'https://v1.volleyball.api-sports.io';
const API_KEY = '2ea22701c6fd5d8c5c636413441849bd';

const headers = {
  'x-apisports-key': API_KEY,
  'Content-Type': 'application/json',
};

export const volleyballApi = {
  async getGames(date: string): Promise<Game[]> {
    try {
      const response = await fetch(`${BASE_URL}/games?date=${date}`, { headers });
      if (!response.ok) throw new Error('Failed to fetch games');
      const data: ApiResponse<Game[]> = await response.json();
      return data.response || [];
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  },

  async getLeagues(): Promise<League[]> {
    try {
      const response = await fetch(`${BASE_URL}/leagues`, { headers });
      if (!response.ok) throw new Error('Failed to fetch leagues');
      const data: ApiResponse<League[]> = await response.json();
      return data.response || [];
    } catch (error) {
      console.error('Error fetching leagues:', error);
      throw error;
    }
  },

  async getStandings(leagueId: number, season: number): Promise<Standing[]> {
    try {
      const response = await fetch(`${BASE_URL}/standings?league=${leagueId}&season=${season}`, { headers });
      if (!response.ok) throw new Error('Failed to fetch standings');
      const data: ApiResponse<any> = await response.json();
      
      // The API often returns an array of groups, each being an array of standings.
      // We flatten or take the first group.
      if (Array.isArray(data.response) && data.response.length > 0) {
        // If it's a double-nested array (groups)
        if (Array.isArray(data.response[0])) {
          return data.response[0];
        }
        // If it's a single array (less common for this endpoint but possible)
        return data.response;
      }
      return [];
    } catch (error) {
      console.error('Error fetching standings:', error);
      throw error;
    }
  }
};
