import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, ArrowRight, Train as TrainIcon, Loader2 } from 'lucide-react'
import api from '../api/axios'

const Home = () => {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [trains, setTrains] = useState([])
  const [searched, setSearched] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSearched(true)
    try {
      const response = await api.get(`/api/trains/search?source=${source}&destination=${destination}`)
      setTrains(response.data)
    } catch (err) {
      console.error('Search error', err)
      setTrains([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #6366f1, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Reserve Your Journey
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Fast, secure, and easy railway ticket booking for Pakistan Railway network.
      </p>

      <form onSubmit={handleSearch} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>From</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              className="search-input" 
              style={{ paddingLeft: '2.5rem' }} 
              placeholder="Source Station"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>To</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent)' }} />
            <input 
              className="search-input" 
              style={{ paddingLeft: '2.5rem' }} 
              placeholder="Destination Station"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Date</label>
          <div style={{ position: 'relative' }}>
            <Calendar size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="date" className="search-input" style={{ paddingLeft: '2.5rem' }} required />
          </div>
        </div>
        <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }} disabled={loading}>
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
        </button>
      </form>

      {searched && (
        <div style={{ marginTop: '3rem', textAlign: 'left' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Available Trains</h2>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <Loader2 size={40} className="animate-spin" style={{ color: 'var(--primary)' }} />
            </div>
          ) : trains.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {trains.map((route, idx) => (
                <div key={idx} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                      <TrainIcon size={24} color="white" />
                    </div>
                    <div>
                      <h3 style={{ marginBottom: '0.25rem' }}>{route.train.name}</h3>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem' }}>
                        <span>#{route.train.trainNumber}</span>
                        <span>{route.sourceStation.name} → {route.destinationStation.name}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent)' }}>PKR {route.fare}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Economy Class</div>
                    </div>
                    <button 
                      className="btn-primary" 
                      onClick={() => navigate(`/book/${route.train.trainNumber}?from=${route.sourceStation.name}&to=${route.destinationStation.name}&fare=${route.fare}`)}
                    >
                      Book Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
               <p style={{ color: 'var(--text-secondary)' }}>No trains found for this route. Try another search.</p>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '0.5rem' }}>Advance Booking</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Book up to 60 days in advance for any class.</p>
        </div>
        <div className="glass-card">
          <h3 style={{ marginBottom: '0.5rem' }}>E-Tickets</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Digital tickets delivered instantly to your dashboard.</p>
        </div>
        <div className="glass-card">
          <h3 style={{ marginBottom: '0.5rem' }}>Easy Refund</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Transparent cancellation and quick refund process.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
