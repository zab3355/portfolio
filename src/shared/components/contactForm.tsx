import {
  Alert,
  Box,
  Button,
  ButtonProps,
  Grid,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { Controller } from 'react-hook-form';
import useContactForm from '../hooks/useContactForm';
import { contactForm, contactText } from '../constants/constants';
import { useState } from 'react';
import { ContactFormData } from '../types/types';

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins',
  fontWeight: 700,
  fontSize: '2.5rem',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.custom.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.custom.primary.main,
    },
  },
  '& label.Mui-focused': {
    color: theme.palette.custom.primary.main,
  },
}));

const SendMessageButton = styled(Button)<ButtonProps>(({ theme }) => ({
  float: 'right',
  backgroundColor: theme.palette.custom.primary.main,
  color: theme.palette.custom.base.white,
  padding: theme.spacing(1, 3),
  border: '2px solid transparent',
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: theme.palette.custom.primary.main,
  },
}));


const SectionDivider = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 32,
  position: 'relative',
  paddingLeft: 80,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: theme.palette.custom.primary.main,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 12,
    width: 150,
    height: 2,
    backgroundColor: theme.palette.custom.primary.main,
  },
}));

export default function ContactForm() {
  const {
    handleSubmit,
    control,
    errors,
    isValid,
    isSubmitting,
    submitted,
    submitForm,
  } = useContactForm();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (data: ContactFormData) => {
    setError(null);
    try {
      await submitForm(data);
      setSuccess(true);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : contactForm.errorMessage;
      setError(msg);
    }
  };

  const snackbarSx = isMobile
    ? { width: '90vw', left: '50%', transform: 'translateX(-50%)', bottom: 16 }
    : { minWidth: 400 };

  return (
    <StyledContainer>
      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid item xs={12}>
          <Title>{contactText.title}</Title>
          <SectionDivider />
          <Description>{contactText.about}</Description>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Enter Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message ?? ''}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Enter Email Address"
                      variant="outlined"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message ?? ''}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: 'Subject is required' }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Enter Subject"
                      variant="outlined"
                      fullWidth
                      error={!!errors.subject}
                      helperText={errors.subject?.message ?? ''}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="message"
                  control={control}
                  rules={{ required: 'Message is required' }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Enter Message"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.message}
                      helperText={errors.message?.message ?? ''}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <SendMessageButton
                    type="submit"
                    variant="contained"
                    disabled={!isValid || isSubmitting}
                    fullWidth={isMobile}
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </SendMessageButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Snackbar
        open={success || submitted}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={snackbarSx}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
          onClose={() => setSuccess(false)}
        >
          {contactForm.successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={snackbarSx}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
}

