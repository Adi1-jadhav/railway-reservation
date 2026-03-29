import React from 'react'
import { Plus, Edit, Trash2, Train } from 'lucide-react'

const AdminDashboard = () => {
  const mockTrains = [
    { id: 1, no: '42DN', name: 'Karakoram Express', type: 'Express', fare: 2500 },
    { id: 2, no: '16UP', name: 'Karachi Express', type: 'Business', fare: 4800 },
    { id: 3, no: '02DN', name: 'Khyber Mail', type: 'Passenger', fare: 1200 }
  ]

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Administrator Dashboard</h2>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add New Train
        </button>
      </div>

      <div className="glass-card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Train No</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Type</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Base Fare</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockTrains.map(train => (
              <tr key={train.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem' }}>{train.no}</td>
                <td style={{ padding: '1rem' }}>{train.name}</td>
                <td style={{ padding: '1rem' }}>{train.type}</td>
                <td style={{ padding: '1rem' }}>Rs. {train.fare}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginRight: '1rem' }}><Edit size={18} /></button>
                  <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard
