import "./App.css";
import AppRouter from "./routes/AppRouter";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";  
function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
