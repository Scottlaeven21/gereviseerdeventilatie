export function Logo({ height = 50 }: { height?: number }) {
  return (
    <svg
      width={height * 8}
      height={height}
      viewBox="0 0 400 50"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Gereviseerde - Blue */}
      <text
        x="0"
        y="35"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="#1266BD"
        letterSpacing="-0.5"
      >
        Gereviseerde
      </text>
      
      {/* Ventilatie - Light Blue */}
      <text
        x="200"
        y="35"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="#29AAE3"
        letterSpacing="-0.5"
      >
        Ventilatie
      </text>
    </svg>
  );
}
