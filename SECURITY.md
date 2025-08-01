# Security Features

## CAPTCHA Integration

This application uses Google reCAPTCHA v3 to protect forms from spam and automated submissions.

### Setup

1. Visit [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new reCAPTCHA v3 site
3. Add your domain(s) to the allowed domains list
4. Copy your site key and secret key
5. Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### Protected Forms

- **Booking Form** (`/booking`): Protected with action `booking_form_submit`
- **AI Design Generator** (`/design-generator`): Protected with action `design_generator_submit`

### Implementation Details

- Uses `react-google-recaptcha-v3` package
- reCAPTCHA v3 runs invisibly in the background
- Tokens are generated on form submission
- Backend verification should be implemented using the secret key
- Graceful fallback if reCAPTCHA is unavailable

### Backend Integration

To verify reCAPTCHA tokens on your backend:

```javascript
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
});

const result = await response.json();
if (result.success && result.score > 0.5) {
  // Token is valid, proceed with form processing
}
```