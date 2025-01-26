import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = () => {
  return (
    <div
      className=" mt-10 md:py-10 bg-[#f6f5f4] w-full
          rounded-3xl
          
          "
    >
      <div className=" p-10 md:p-4 md:px-20">
        <div className="text-3xl md:text-6xl font-bold text-black">
          Have questions ?
        </div>
        <div className="  font-semibold text-3xl md:text-7xl text-gradient bg-gradient-to-r from-emerald-600 to-blue-300 bg-clip-text text-transparent">
          Get answers.
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              What technologies are used in this project?
            </AccordionTrigger>
            <AccordionContent className="text-left">
              I have used React.js, JavaScript, TypeScript, ShadCN UI, Axios,
              Material-UI (for loading indicators). For backend I have used
              Express.js (Node.js), gRPC for communication with the database,
              and MongoDB Atlas as the database.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Why did I use ShadCN UI over other UI libraries?
            </AccordionTrigger>
            <AccordionContent className="text-left">
              ShadCN UI provides TailwindCSS-based styling, making it easy to
              customize. A component-first approach with accessibility and
              design consistency. ShadCN UI provides lightweight, crazy and good
              looking customizable UI components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              How is data fetched from the backend to the frontend?
            </AccordionTrigger>
            <AccordionContent className="text-left">
              The React frontend sends an HTTP GET request to the Express server
              using Axios with query parameters (page, limit, search). Express
              forwards the request to the gRPC client. The gRPC client
              communicates with the gRPC server, which queries the MongoDB Atlas
              database. The MongoDB server responds with the filtered and
              paginated data. The gRPC server sends the response back to
              Express. Express sends the processed data back to the frontend.
              The frontend updates the state and displays the data in a table.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              What is the role of pagination in this application?
            </AccordionTrigger>
            <AccordionContent className="text-left">
              Pagination allows retrieving a subset of the data at a time,
              improving performance by reducing the data transferred and
              processed on the frontend. The user can navigate between pages
              using the "Previous" and "Next" buttons.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              How did I implement search functionality in this application?
            </AccordionTrigger>
            <AccordionContent className="text-left">
              The frontend sends the search query as a parameter in the API
              request. The backend constructs a regex-based MongoDB query,
              filtering the title field for partial matches. The filtered
              results are paginated and returned to the frontend.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">
              How does the frontend highlight search results?
            </AccordionTrigger>
            <AccordionContent className="text-left">
              The frontend uses a regex-based function to wrap matched search
              terms with a span that applies a yellow background.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-left">
              How is API call optimization handled?
            </AccordionTrigger>
            <AccordionContent className="text-left">
              The useEffect hook is used to trigger data fetching when
              dependencies (page, search, limit) change, reducing unnecessary
              API calls.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQS;
