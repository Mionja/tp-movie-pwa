import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movie from '../pages/Movie';
import Auth from '../pages/Auth';

const Routing: React.FC = () => {
    return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
    );
}
export default Routing;