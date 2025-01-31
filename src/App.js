import "./App.css";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <>
      {/* Navbar  */}
      <main className="container pt-10 min-h-screen w-full mx-auto">
        <AppRouter />
      </main>
      {/* Footer */}
    </>
  );
}

export default App;
