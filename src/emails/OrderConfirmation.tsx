import * as React from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationEmailProps {
  customerName: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  customerName,
  orderNumber,
  items,
  subtotal,
  shipping,
  total,
  shippingAddress,
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
            background: #1266BD;
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
          .order-number {
            background: #f1f5f9;
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 24px;
          }
          .order-number span {
            font-size: 14px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .order-number strong {
            display: block;
            font-size: 20px;
            color: #1e293b;
            margin-top: 4px;
          }
          .section {
            margin-bottom: 32px;
          }
          .section h2 {
            font-size: 18px;
            color: #1e293b;
            margin: 0 0 16px;
            font-weight: 700;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
          }
          .items-table th {
            text-align: left;
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 8px 0;
            border-bottom: 2px solid #e2e8f0;
          }
          .items-table td {
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
          }
          .items-table .item-name {
            font-weight: 600;
            color: #1e293b;
          }
          .items-table .item-qty {
            color: #64748b;
          }
          .items-table .item-price {
            text-align: right;
            font-weight: 600;
          }
          .totals {
            background: #f8fafc;
            padding: 16px;
            border-radius: 8px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
          }
          .total-row.final {
            border-top: 2px solid #e2e8f0;
            margin-top: 8px;
            padding-top: 16px;
            font-size: 18px;
            font-weight: 700;
            color: #1e293b;
          }
          .address {
            background: #f8fafc;
            padding: 16px;
            border-radius: 8px;
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
          <h1>✅ Bestelling Bevestigd!</h1>
          <p>Bedankt voor je bestelling, {customerName}</p>
        </div>

        <div className="content">
          <div className="order-number">
            <span>Bestelnummer</span>
            <strong>{orderNumber}</strong>
          </div>

          <div className="section">
            <h2>📦 Bestelde Producten</h2>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Aantal</th>
                  <th style={{ textAlign: 'right' }}>Prijs</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="item-name">{item.name}</td>
                    <td className="item-qty">{item.quantity}x</td>
                    <td className="item-price">€{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="totals">
              <div className="total-row">
                <span>Subtotaal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Verzendkosten</span>
                <span>€{shipping.toFixed(2)}</span>
              </div>
              <div className="total-row final">
                <span>Totaal</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>🚚 Verzendadres</h2>
            <div className="address">
              <strong>{shippingAddress.name}</strong><br />
              {shippingAddress.street}<br />
              {shippingAddress.postalCode} {shippingAddress.city}<br />
              {shippingAddress.country}
            </div>
          </div>

          <div className="section">
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.8' }}>
              We gaan direct aan de slag met je bestelling! Je ontvangt een nieuwe email zodra je pakket is verzonden met de track & trace code.
            </p>
          </div>
        </div>

        <div className="footer">
          <p>
            Vragen over je bestelling?<br />
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
