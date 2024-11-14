import { create } from 'zustand';
import { SortPropertyEnum } from '../constants';

interface State {
  activeId: string;
  setActiveId: (activeId: string) => void;
}

export const useSortStore = create<State>((set) => ({
  activeId: SortPropertyEnum.RATING_DESC,
  setActiveId: (activeId) => set({ activeId }),
}));
