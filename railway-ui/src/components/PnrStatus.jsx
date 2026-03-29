import React, { useState } from 'react'
import { Search, Ticket, XCircle, Loader2, AlertCircle } from 'lucide-react'
import api from '../api/axios'

const PnrStatus = () => {
  const [pnr, setPnr] = useState('')
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setBooking(null)
    try {
      const response = await api.get(`/api/bookings/${pnr}`)
      setBooking(response.data)
    } catch (err) {
      setError(err.response?.status === 404 ? 'PNR not found' : 'Error retrieving booking status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Check Reservation Status</h2>
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            className="search-input" 
            placeholder="Enter 10-digit PNR Number"
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            required 
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass-card" style={{ borderLeft: '4px solid var(--danger)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertCircle color="var(--danger)" />
          <span>{error}</span>
        </div>
      )}

      {booking && (
        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>PNR Number</span>
              <h3 style={{ color: 'var(--primary)' }}>{booking.pnr}</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Status</span>
              <h3 style={{ color: 'var(--accent)' }}>{booking.status}</h3>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Passenger</p>
              <p>{booking.passengerName}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Age</p>
              <p>{booking.age}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>From</p>
              <p>{booking.source}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>To</p>
              <p>{booking.destination}</p>
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1, background: 'var(--glass)', border: '1px solid var(--glass-border)' }}>Download Ticket</button>
            <button className="btn-primary" style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>Cancel Ticket</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PnrStatus
