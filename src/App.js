import Page1 from "./components/page1/page1.component.jsx";
import Page2 from "./components/page2/page2.component.jsx";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/allEmployees" element={<Page2 />} />
      </Routes>
    </>
  );
};

export default App;
