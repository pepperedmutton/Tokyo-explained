import './home.css'
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();
  return (
  
<div id = "Home">
    <div id = "clickExplore" onClick={() => navigate('/explore')}>
        Start Exploring
    </div>
</div>
  );
}