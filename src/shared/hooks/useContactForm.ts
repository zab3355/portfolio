import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ref, push, set } from 'firebase/database';
import { ContactFormData } from '../types/types';
import { database } from '../../firebase/firebaseConfig';

const useContactForm = () => {
  const { handleSubmit, control, formState: { errors, isValid } } = useForm<ContactFormData>({ mode: 'onChange' });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      
      // Get a reference to the "contactForms" path in your database
      const contactFormsRef = ref(database, 'contactForms');

      // Push a new entry with the form data
      const newContactRef = push(contactFormsRef);
      
      // Set the data for the new entry
      await set(newContactRef, {
        name: data.name,
        email: data._replyto,
        subject: data.subject,
        message: data.message,
      });

      setSubmitted(true); // Update the submitted state
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return {
    handleSubmit,
    control,
    errors,
    isValid,
    submitted,
    onSubmit,
  };
};

export default useContactForm;
