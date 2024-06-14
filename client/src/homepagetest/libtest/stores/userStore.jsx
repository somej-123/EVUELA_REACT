import { create } from 'zustand';
import { produce } from 'immer';

const useUserStore = create((set) => ({
  users: [],
  addUser: (user) => set(produce((state) => {
    state.users.push(user);
  }))
}));

export default useUserStore;