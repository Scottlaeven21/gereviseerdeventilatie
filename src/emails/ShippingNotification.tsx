import * as React from 'react';

interface ShippingNotificationEmailProps {
  customerName: string;
  orderNumber: string;
  trackingCode: string;
  carrier: string;
  trackingUrl?: string;
}

export const ShippingNotificationEmail: React.FC<ShippingNotificationEmailProps> = ({
  customerName,
  orderNumber,
  trackingCode,
  carrier,
  trackingUrl,
}) => (
  <html>
    <head>
      <style>
        {`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 32px 24px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .header p {
            margin: 8px 0 0;
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 32px 24px;
          }
          .tracking-box {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 2px solid #86efac;
            padding: 24px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 24px;
          }
          .tracking-box h2 {
            margin: 0 0 8px;
            font-size: 16px;
            color: #166534;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .tracking-code {
            font-size: 24px;
            font-weight: 700;
            color: #15803d;
            margin: 8px 0 16px;
            font-family: 'Courier New', monospace;
          }
          .carrier {
            font-size: 14px;
            color: #166534;
            margin-bottom: 16px;
          }
          .track-button {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 12px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 700;
            margin-top: 8px;
          }
          .order-info {
            background: #f8fafc;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 24px;
          }
          .order-info p {
            margin: 8px 0;
            font-size: 14px;
            color: #64748b;
          }
          .order-info strong {
            color: #1e293b;
          }
          .section {
            margin-bottom: 24px;
          }
          .section p {
            color: #64748b;
            font-size: 14px;
            line-height: 1.8;
          }
          .footer {
            background: #f8fafc;
            padding: 24px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
          }
          .footer a {
            color: #1266BD;
            text-decoration: none;
          }
        `}
      </style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>🚚 Je Pakket is Onderweg!</h1>
          <p>Goed nieuws, {customerName}!</p>
        </div>

        <div className="content">
          <div className="tracking-box">
            <h2>📦 Track & Trace Code</h2>
            <div className="tracking-code">{trackingCode}</div>
            <div className="carrier">Vervoerder: {carrier}</div>
            {trackingUrl && (
              <a href={trackingUrl} className="track-button">
                📍 Volg Je Pakket
              </a>
            )}
          </div>

          <div className="order-info">
            <p><strong>Bestelnummer:</strong> {orderNumber}</p>
            <p><strong>Status:</strong> Verzonden</p>
          </div>

          <div className="section">
            <p>
              Je bestelling is succesvol verzonden en is nu onderweg! Je kunt je pakket volgen met de bovenstaande track & trace code.
            </p>
            <p>
              De levertijd is afhankelijk van de vervoerder, maar je pakket zou binnen 2-5 werkdagen moeten aankomen.
            </p>
          </div>

          <div className="section">
            <p style={{ fontWeight: '600', color: '#1e293b' }}>
              ⚠️ Let op bij aflevering:
            </p>
            <p>
              • Zorg dat er iemand thuis is om het pakket in ontvangst te nemen<br />
              • Controleer het pakket op beschadigingen bij ontvangst<br />
              • Neem direct contact met ons op bij problemen
            </p>
          </div>
        </div>

        <div className="footer">
          <p>
            Vragen over je verzending?<br />
            Neem contact op via <a href="mailto:contact@laevenitservices.nl">contact@laevenitservices.nl</a>
          </p>
          <p style={{ marginTop: '16px' }}>
            <a href="https://gereviseerdeventilatie.nl">www.gereviseerdeventilatie.nl</a>
          </p>
        </div>
      </div>
    </body>
  </html>
);
