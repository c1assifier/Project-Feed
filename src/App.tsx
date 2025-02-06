import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Feed } from './components/Feed/Feed';
import { PostId } from './components/Post/PostId';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeSwitcher/ThemeProvider';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { CreatePost } from './components/CreatePost/CreatePost';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const resetSearch = () => {
    setSearchTerm("");
  };

  return (
    <ThemeProvider>
      <HashRouter>
        <Header onSearch={handleSearch} resetSearch={resetSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <Feed 
                searchTerm={searchTerm}
                resetSearch={resetSearch}
              />
            }
          />
          <Route
            path="/post/:postid"
            element={<PostId />}
          />
          <Route 
            path="/create"
            element={<CreatePost />} 
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
