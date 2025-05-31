import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Controller } from 'react-hook-form';
import useContactForm from '../../shared/hooks/useContactForm';
import { contactText } from '../../shared/constants/constants';

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '2rem',
});

const FormSection = styled(Box)({
  flex: 1,
  paddingRight: '2rem',             
});
 
const ImageSection = styled(Box)({
  flex: 1,
  display: 'block',
  alignSelf: 'flex-start',
});

const ContactTitleText = styled(Typography)(() => ({
 fontFamily: 'Poppins', 
 fontWeight: '700', 
 justifyContent: 'left', 
 display: 'flex', 
 fontSize: '42px',
}));

const ContactDescriptionText = styled(Typography)(() => ({
  justifyContent: 'left', 
  fontSize: '16px',
  fontWeight: '400',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
 }));

const ContactForm = () => {
  const { handleSubmit, control, errors, isValid, submitted, onSubmit } = useContactForm();

    return (
      <div>
          <FormContainer>
          <ImageSection>
<ContactTitleText>
  {contactText.title}
</ContactTitleText>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '14px',
          marginBottom: '40px',
        }}
      >

        <Box
          sx={{
            position: 'absolute',
            left: '3%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#e45447',
          }}
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            width: '150px',
            height: '2px',
            left: '3%',
            backgroundColor: '#e45447',
          }}
        >
        </Box>
      </Box>
      <ContactDescriptionText>{contactText.about}</ContactDescriptionText>

    </ImageSection>
            <FormSection>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
      name="name"
      control={control}
      defaultValue=""
      rules={{ required: 'Name is required' }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Enter Name"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.name}
          helperText={errors.name ? (errors.name.message as string) : ""}
        />
      )}
    />
    <Controller
      name="_replyto"
      control={control}
      defaultValue=""
      rules={{
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: 'Invalid email address',
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Enter Email Address"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors._replyto}
          helperText={errors._replyto ? (errors._replyto.message as string) : ""}
        />
      )}
    />
    <Controller
      name="subject"
      control={control}
      defaultValue=""
      rules={{ required: 'Subject is required' }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Enter Subject"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.subject}
          helperText={errors.subject ? (errors.subject.message as string) : ""}
        />
      )}
    />
    <Controller
      name="message"
      control={control}
      defaultValue=""
      rules={{ required: 'Message is required' }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Enter Message"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={4}
          error={!!errors.message}
          helperText={errors.message ? (errors.message.message as string) : ""}
        />
      )}
    />
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={!isValid}
      style={{ marginTop: '1rem', float: 'right' }}
    >
      Send Message
    </Button>
  </form>
  {submitted && <Snackbar open={submitted} autoHideDuration={6000}><Alert
severity="success"
variant="filled"
sx={{ width: '100%' }}
>
This is a success Alert inside a Snackbar!
</Alert></Snackbar>}
</FormSection> 
</FormContainer>
</div>
);
};
export default ContactForm;