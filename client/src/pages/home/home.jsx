import './home.css'
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();
  return (
  
<div id = "fullPage">
    <div id = "header">
          Look for English friendly restaurants
    </div>
    <div id = "clickExplore" onClick={() => navigate('/explore')}>
        Start Exploring
    </div>
    <div id = "clickLogin" onClick={() => navigate('/login')}>
        Login
    </div>
</div>
  );
}