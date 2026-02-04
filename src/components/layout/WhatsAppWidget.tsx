'use client';

export function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/31652641106"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
        cursor: 'pointer',
        zIndex: 9999,
        transition: 'all 0.3s ease',
      }}
      className="whatsapp-widget"
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
      }}
      aria-label="Chat op WhatsApp"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 0C7.164 0 0 7.164 0 16c0 2.831.738 5.488 2.033 7.791L.696 29.696l6.114-1.604A15.877 15.877 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0z"
          fill="#fff"
        />
        <path
          d="M25.29 22.949c-.354.994-1.754 1.822-2.872 2.066-.764.163-1.762.293-5.119-.976-4.293-1.623-7.065-5.965-7.279-6.238-.205-.273-1.713-2.28-1.713-4.349 0-2.068 1.084-3.084 1.47-3.504.385-.421.842-.526 1.122-.526.28 0 .561.002.806.015.258.013.604-.098.945.721.354.849 1.203 2.936 1.309 3.148.105.211.176.457.036.73-.141.272-.21.442-.42.68-.209.24-.44.535-.63.719-.21.204-.428.424-.184.833.244.41 1.086 1.791 2.331 2.902 1.605 1.432 2.958 1.877 3.377 2.089.42.211.666.176.91-.105.245-.282.95-.957 1.203-1.377.244-.421.49-.35.826-.211.336.14 2.132 1.005 2.496 1.188.365.183.607.272.696.421.088.149.088.849-.266 1.842z"
          fill="#25D366"
        />
      </svg>
    </a>
  );
}
