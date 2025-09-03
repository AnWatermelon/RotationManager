export interface Spot {
  id: string;
  name: string | undefined;
  owner: string | undefined;
}

export interface SpotContextType {
  spots: Spot[];
  dispatch: React.Dispatch<SpotAction>;
}

export interface SpotAction {
  type: 'set' | 'add' | 'remove' | 'update';
  payload?: Spot[] | Spot | { id: string; spot: Spot };
}
