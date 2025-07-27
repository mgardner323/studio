import { BookingForm } from "@/components/booking/BookingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Contact & Booking</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Ready to start your next tattoo journey? Fill out the form below or contact us directly. We look forward to hearing from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Request a Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Please provide as much detail as possible. This will help us understand your vision and prepare for our consultation. Note that a deposit is required to secure your appointment.
              </p>
              <BookingForm />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Studio Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-accent" />
                <span>123 Inkwell Lane, Riverside, CA 92501</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-accent" />
                <span>(951) 555-1234</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-accent" />
                <span>contact@thestationink.com</span>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-accent mt-1" />
                <div>
                    <h4 className="font-semibold text-foreground">Hours of Operation</h4>
                    <p>Tuesday - Saturday: 11am - 7pm</p>
                    <p>Sunday & Monday: Closed</p>
                    <p className="text-sm mt-1">(By Appointment Only)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Before You Book</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
                <p><strong>Deposits:</strong> A non-refundable deposit is required to book an appointment. This goes toward the final cost of your tattoo.</p>
                <p><strong>Cancellations:</strong> Please provide at least 48 hours notice if you need to reschedule. Cancellations within 48 hours may forfeit the deposit.</p>
                <p><strong>Pricing:</strong> Our hourly rate is $150 with a shop minimum of $100.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
