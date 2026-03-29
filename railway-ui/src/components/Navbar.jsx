import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Train, User, Lock, LogOut } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <nav className="glass-card" style={{ margin: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '1rem' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 'bold' }}>
        <Train color="#6366f1" />
        <span>PakRail Online</span>
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
        <Link to="/status" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>PNR Status</Link>
        
        {token ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <User size={18} color="var(--primary)" />
              <span>{username}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lock size={16} /> Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
