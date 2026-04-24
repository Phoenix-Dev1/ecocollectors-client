import api from "../api/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (inputs) => {
    try {
      const res = await api.post("/auth/login", inputs);
      setCurrentUser(res.data);
      return res.data.role;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      setCurrentUser(null);
      localStorage.removeItem("user");
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
