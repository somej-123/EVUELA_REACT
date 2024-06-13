// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  log:"test",
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;