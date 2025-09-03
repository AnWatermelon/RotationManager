import * as React from 'react';
import { createContext, useContext, useReducer, useEffect } from 'react';
import type { Spot, SpotContextType, SpotAction } from '../AppModel.d';

const initialSpots: Spot[] = [];

function spotReducer(state: Spot[], action: SpotAction): Spot[] {
  switch (action.type) {
    case 'set':
      return Array.isArray(action.payload) ? action.payload as Spot[] : state;
    case 'add':
      return action.payload && !Array.isArray(action.payload)
        ? [...state, action.payload as Spot]
        : state;
    case 'remove':
      return action.payload && !Array.isArray(action.payload)
        ? state.filter(spot => spot.id !== (action.payload as Spot).id)
        : state;
    case 'update':
      if (
        action.payload &&
        typeof action.payload === 'object' &&
        'id' in action.payload &&
        'spot' in action.payload
      ) {
        const { id, spot } = action.payload as { id: string; spot: Spot };
        return state.map(s => (s.id === id ? spot : s));
      }
      return state;
    default:
      return state;
  }
}

const SpotContext = createContext<SpotContextType | undefined>(undefined);

export const useSpotContext = () => {
  const ctx = useContext(SpotContext);
  if (!ctx) throw new Error('useSpotContext must be used within a SpotProvider');
  return ctx;
};

export const SpotProvider = ({ children }: { children: React.ReactNode }) => {
  const [spots, dispatch] = useReducer(spotReducer, initialSpots);

  return (
    <SpotContext.Provider value={{ spots, dispatch }}>
      {children}
    </SpotContext.Provider>
  );
};
