import "./App.css";
import AppRouter from "./routes/AppRouter";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
function App() {
  return (
    <>
      <Navbar />
      <main className="container min-h-screen w-full mx-auto border">
        <AppRouter />
      </main>
      <Footer />
    </>
  );
}

export default App;
