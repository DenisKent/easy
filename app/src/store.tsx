import create from "zustand";

type State = {
  user: { isLoggedIn: boolean; name?: string };
  login: (user: { name: string }) => void;
  logout: () => void;
};

const useStore = create<State>((set) => ({
  user: { isLoggedIn: false },
  login: (user: { name: string }) => {
    set(() => ({ user: { name: user.name, isLoggedIn: true } }));
  },
  logout: () => {
    set(() => ({ user: { isLoggedIn: false } }));
  }
}));

export default useStore;
