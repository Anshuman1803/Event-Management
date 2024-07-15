import { useSelector } from 'react-redux';
import './App.css';
import { Header } from './components/Header/Header';
import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';
function App() {
  const { role } = useSelector((state) => state.EventManagement);
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {
        (role !== "organizer" && role === "audience") && <Header />
      }
      <AppRouter />
    </>
  );
}

export default App;
