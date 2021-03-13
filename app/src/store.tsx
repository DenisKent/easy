import create from "zustand";

type State = {
  user: { isLoggedIn: boolean; id?: string; name?: string; google_id?: string; email?: string };
  login: (user: { name: string; id: string; google_id?: string; email?: string }) => void;
  logout: () => void;
};

const useStore = create<State>((set) => ({
  user: { isLoggedIn: false },
  login: (user) => {
    set(() => ({ user: { ...user, isLoggedIn: true } }));
  },
  logout: () => {
    set(() => ({ user: { isLoggedIn: false } }));
  }
}));

export default useStore;
