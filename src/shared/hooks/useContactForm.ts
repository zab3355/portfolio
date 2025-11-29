// src/shared/hooks/useContactForm.ts
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { ContactFormData } from '../types/types';

const API_BASE = process.env.REACT_APP_API_URL || '';

export default function useContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const submitForm: SubmitHandler<ContactFormData> = async (data) => {
    // 1) Store in Firebase
    const messagesRef = ref(database, 'messages');
    await push(messagesRef, {
      ...data,
      timestamp: new Date().toISOString(),
    });

    // 2) Send to API (Docker: http://server:8080, dev: can be empty => relative)
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const msg = body?.message || 'Failed to send the message.';
      throw new Error(msg);
    }

    reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return {
    handleSubmit,
    control,
    errors,
    isValid,
    isSubmitting,
    submitted,
    submitForm,
  };
}
