import React, { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { User, CreditCard, ChevronRight, CheckCircle, Loader2 } from 'lucide-react'
import api from '../api/axios'

const Booking = () => {
  const { trainNumber } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Parse query params
  const searchParams = new URLSearchParams(location.search)
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const fare = searchParams.get('fare')

  const [passengerName, setPassengerName] = useState('')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  const [pnr, setPnr] = useState('')
  const [error, setError] = useState('')

  const handleBooking = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await api.post('/api/bookings', {
        trainNumber: trainNumber,
        source: from,
        destination: to,
        passengerName: passengerName,
        age: parseInt(age),
        status: 'BOOKED'
      })
      setPnr(response.data.pnr)
      setBooked(true)
    } catch (err) {
      setError(err.response?.data || 'Error processing booking')
    } finally {
      setLoading(false)
    }
  }

  if (booked) {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center' }} className="glass-card">
        <CheckCircle size={64} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
        <h2 style={{ marginBottom: '1rem' }}>Booking Successful!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Your ticket has been reserved successfully.</p>
        <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Your PNR Number</span>
          <h1 style={{ letterSpacing: '2px', color: 'var(--primary)' }}>{pnr}</h1>
        </div>
        <button className="btn-primary" onClick={() => navigate('/status')} style={{ width: '100%' }}>Check Status</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Complete Your Reservation</h2>
      {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <div className="glass-card">
        <form onSubmit={handleBooking}>
          <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
             <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Route Selection</div>
             <div style={{ fontWeight: 'bold' }}>{from} → {to}</div>
             <div style={{ fontSize: '1.1rem', color: 'var(--accent)', marginTop: '0.5rem' }}>PKR {fare}</div>
          </div>

          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Passenger Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
              <input 
                className="search-input" 
                placeholder="Passenger Name" 
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Age</label>
              <input 
                type="number" 
                className="search-input" 
                placeholder="Age" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required 
              />
            </div>
          </div>

          <h3 style={{ marginBottom: '1.5rem', marginTop: '2rem', fontSize: '1.1rem' }}>Payment Details (Mocked)</h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Card Number</label>
            <div style={{ position: 'relative' }}>
              <CreditCard size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input className="search-input" style={{ paddingLeft: '2.5rem' }} placeholder="0000 0000 0000 0000" required />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            disabled={loading}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <>Confirm Booking <ChevronRight size={20} /></>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Booking
