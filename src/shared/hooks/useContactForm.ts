import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { ContactFormData } from '../types/types';
import emailjs from '@emailjs/browser';

const API_BASE = process.env.REACT_APP_API_URL || '';

const EMAILJS_SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID  || '';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY  || '';

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

    // 2) Send email notification via EmailJS (if configured with real credentials)
    const emailjsReady = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
      && !EMAILJS_SERVICE_ID.startsWith('your_')
      && !EMAILJS_TEMPLATE_ID.startsWith('your_')
      && !EMAILJS_PUBLIC_KEY.startsWith('your_');
    if (emailjsReady) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name:  data.name,
            from_email: data.email,
            subject:    data.subject,
            message:    data.message,
          },
          { publicKey: EMAILJS_PUBLIC_KEY }
        );
      } catch (err) {
        console.warn('EmailJS notification failed (non-fatal):', err);
      }
    }

    // 3) Send to backend API (only if API_BASE is configured — skipped on localhost)
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          console.warn('Backend API contact endpoint failed:', body?.message || res.status);
        }
      } catch (err) {
        console.warn('Backend API contact endpoint unreachable:', err);
      }
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
