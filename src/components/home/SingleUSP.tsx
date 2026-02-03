'use client';

export function SingleUSP() {
  return (
    <div 
      className="lg:hidden" 
      style={{ 
        background: 'white',
        padding: '20px',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <i 
          className="fas fa-shield-halved" 
          style={{ 
            fontSize: '20px', 
            color: '#1266BD',
          }} 
        />
        <span 
          style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#1e293b',
          }}
        >
          Garantie op alle producten
        </span>
      </div>
    </div>
  );
}
