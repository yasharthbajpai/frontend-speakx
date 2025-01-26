import "./App.css";
import SearchWithPagination from "./pages/SearchPagination";

function App() {
  return (
    <div className="min-h-screen bg-[#1B1F24] w-full"> {/* Dark background color matching the image */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1B1F24] border-b border-gray-800 z-10">
        <div className="w-full px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-100">Question Search</h1>
        </div>
      </nav>
      
      <main className="w-full px-4 pt-28 pb-8">
        <SearchWithPagination />
      </main>
    </div>
  );
}



export default App;
