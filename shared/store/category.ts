import { create } from 'zustand';

interface State {
  activeId: number;
  setActiveId: (activeId: number) => void; // функция, которая будет обновлять этот активный id
}

export const useCategoryStore = create<State>((set) => ({
  activeId: 1,
  setActiveId: (activeId) => set({ activeId }),
}));
