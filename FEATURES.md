# Features Documentation

## Booking System

### Artist Selection

The booking form includes an artist selection dropdown that determines email routing for consultation requests.

#### Current Artists

- **Artist 1**: Routes to `artist1@thestationink.com`
- **Artist 2**: Routes to `artist2@thestationink.com`

#### Configuration

Artist configuration is located in `src/components/booking/BookingForm.tsx`:

```typescript
const artists = [
  { value: "artist1", label: "Artist 1", email: "artist1@thestationink.com" },
  { value: "artist2", label: "Artist 2", email: "artist2@thestationink.com" },
];
```

#### Adding New Artists

To add additional artists:

1. Add new entries to the `artists` array
2. Update the email addresses as needed
3. The form will automatically include new options in the dropdown

#### Email Routing

- Form submissions log the selected artist's email address
- Backend integration should use this email for routing consultation requests
- Fallback email: `contact@thestationink.com` if artist selection fails

### Form Fields

The booking form collects:

- **Name**: Customer's full name (required, min 2 characters)
- **Email**: Customer's contact email (required, valid email format)
- **Artist**: Preferred artist selection (required)
- **Description**: Detailed tattoo description (required, min 10 characters)
- **Placement**: Body placement location (required, min 2 characters)
- **Size**: Approximate dimensions (required)
- **Reference Image**: Optional image upload

### Security

- Protected by Google reCAPTCHA v3
- Form validation using Zod schema
- Client-side validation with error messages
- CAPTCHA token verification ready for backend integration

## AI Design Generator

### Features

- **Description Input**: Detailed tattoo concept description
- **Style Selection**: Choose from 8 tattoo styles (Traditional, Realism, Blackwork, etc.)
- **Reference Image**: Required image upload for AI processing
- **AI Generation**: Integration with Google AI for design creation

### Security

- Protected by Google reCAPTCHA v3
- Form validation for all required fields
- Image file validation and processing
- Error handling for AI generation failures

### Supported Tattoo Styles

1. Traditional
2. Realism
3. Blackwork
4. Geometric
5. Fine Line
6. Watercolor
7. Japanese
8. Tribal