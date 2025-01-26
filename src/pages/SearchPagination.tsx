import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const SearchWithPagination = () => {
  interface Question {
    title: string;
    type: string;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchQuestions();
  }, [page, search, limit]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend-speakx.onrender.com/api/questions",
        {
          params: { page, limit, search },
        }
      );
      setQuestions(response.data.questions || []);
      setTotalPages(response.data.total);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching questions:", e);
      setError(e instanceof Error ? "Server Load" : "Server Load");
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (value: any) => {
    setLimit(Number(value));
    setPage(1);
  };

  const highlightText = (text: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };


  
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-8 border border-gray-800">
        {/* Search Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Search Questions</h2>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={handleSearchChange}
              className="flex-1 bg-gray-800 border-2 border-gray-700 rounded-lg focus:border-purple-500 
                        transition-colors h-12 px-4 text-gray-100 placeholder-gray-400"
            />
            <Select value={limit.toString()} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-32 bg-gray-800 border-2 border-gray-700 h-12 text-gray-100">
                {limit} per page
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border border-gray-700">
                <SelectItem value="5" className="text-gray-100 hover:bg-gray-700">5 per page</SelectItem>
                <SelectItem value="10" className="text-gray-100 hover:bg-gray-700">10 per page</SelectItem>
                <SelectItem value="15" className="text-gray-100 hover:bg-gray-700">15 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <Table className="min-h-[36rem]">
            <TableCaption className="text-sm text-gray-400 py-4 bg-gray-900">
              Showing page {questions.length === 0 ? 0 : page} of {Math.ceil(totalPages / limit)}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-900 border-b border-gray-700">
                <TableHead className="text-left font-bold text-gray-300 px-6 py-4">Title</TableHead>
                <TableHead className="text-right font-bold text-gray-300 px-6 py-4">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={2} className="p-6">
                    <Alert 
                      severity="warning" 
                      className="bg-red-900/50 text-red-200 border border-red-700 rounded-lg"
                    >
                      Heavy load.
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : loading ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Box className="flex flex-col items-center py-12 gap-3">
                      <CircularProgress size={40} className="text-purple-500" />
                      <span className="text-gray-400 font-medium">Loading results...</span>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : questions.length > 0 ? (
                questions.map((q, index) => (
                  <TableRow 
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <TableCell className="text-left px-6 py-4 text-gray-300">
                      {highlightText(q.title)}
                    </TableCell>
                    <TableCell className="text-right px-6 py-4">
                      <span className="px-3 py-1.5 bg-purple-900/50 text-purple-300 rounded-full text-sm font-medium">
                        {q.type}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-12 text-gray-400">
                    No questions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white 
                     disabled:bg-gray-800 disabled:text-gray-600 rounded-lg transition-colors"
          >
            Previous
          </Button>
          <span className="text-sm font-medium text-gray-300 bg-gray-800 px-4 py-2 rounded-lg">
            Page {questions.length === 0 ? 0 : page}
          </span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === Math.ceil(totalPages / limit)}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white 
                     disabled:bg-gray-800 disabled:text-gray-600 rounded-lg transition-colors"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};


export default SearchWithPagination;
