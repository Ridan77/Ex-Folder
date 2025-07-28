const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

import { About } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { BookDetails } from "./pages/BookDetails.jsx";

export function RootCmp() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <nav className="app-nav">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </nav>
      </section>
    </Router>
  );
}
