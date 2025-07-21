import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Mainroutes from "./routes/Mainroutes";

const App = () => {
  return (
    <div className="app min-h-screen bg-black font-['Audiowide']">
      <Navbar />
      <Mainroutes />
      <Footer />
    </div>
  );
};

export default App;
