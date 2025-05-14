import './Topbar.css';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ title = "Look for English friendly restaurants" }) {
  const navigate = useNavigate();

  return (
    <div className="topbar" onClick={()=>navigate('/')}>
      <div className="topbar-title">{title}</div>
      <div className="topbar-buttons">
        <button onClick={(e) => {
          e.stopPropagation();
          navigate('/login');
        }}>Login</button>
        <button onClick={(e) => {
          e.stopPropagation();
          navigate('/signup');
        }}>Sign Up</button>
      </div>
    </div>
  );
}
