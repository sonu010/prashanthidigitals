"use client";
import { useState, useCallback } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
  showError?: boolean;
}

/**
 * Phone input with +91 prefix for Indian numbers.
 * Validates 10-digit Indian mobile numbers.
 * Strips non-digits on input, stores only digits.
 */
export default function PhoneInput({
  value,
  onChange,
  required = false,
  className = "",
  placeholder = "9988776655",
  label,
  showError = true,
}: PhoneInputProps) {
  const [touched, setTouched] = useState(false);

  // Strip any non-digits and limit to 10 chars
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
      onChange(digits);
    },
    [onChange]
  );

  const isValid = !value || /^[6-9]\d{9}$/.test(value);
  const showValidationError = showError && touched && value && !isValid;
  const isEmpty = touched && required && !value;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && "*"}
        </label>
      )}
      <div className="flex">
        <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-600 font-medium">
          +91
        </span>
        <input
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          required={required}
          maxLength={10}
          placeholder={placeholder}
          className={`flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none ${
            showValidationError || isEmpty ? "border-red-400 focus:ring-red-400" : ""
          } ${className}`}
        />
      </div>
      {showValidationError && (
        <p className="text-red-500 text-xs mt-1">
          Enter a valid 10-digit Indian mobile number
        </p>
      )}
      {isEmpty && (
        <p className="text-red-500 text-xs mt-1">Phone number is required</p>
      )}
    </div>
  );
}
