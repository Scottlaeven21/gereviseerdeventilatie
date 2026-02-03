interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
}: FormInputProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '8px',
        }}
      >
        {label}
        {required && <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: `2px solid ${error ? '#dc2626' : '#e5e7eb'}`,
          borderRadius: '8px',
          fontSize: '15px',
          color: '#1e293b',
          background: 'white',
          transition: 'border-color 0.2s',
          outline: 'none',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#1266BD';
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#e5e7eb';
        }}
      />
      {error && (
        <div style={{ fontSize: '13px', color: '#dc2626', marginTop: '6px' }}>
          {error}
        </div>
      )}
    </div>
  );
}
