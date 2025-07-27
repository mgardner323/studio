import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How much does a tattoo cost?",
    answer: "Our pricing is based on an hourly rate of $150. The final cost depends on the size, complexity, and placement of the tattoo. We have a shop minimum of $100. For a more accurate quote, please book a consultation.",
  },
  {
    question: "Do I need to pay a deposit?",
    answer: "Yes, a non-refundable deposit is required to secure your appointment. The deposit amount goes toward the final cost of your tattoo. This ensures that our artists' time is valued and compensated.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require at least 48 hours notice to reschedule or cancel an appointment. If you cancel or reschedule within 48 hours of your appointment, your deposit will be forfeited. We understand emergencies happen, so please communicate with us.",
  },
  {
    question: "Does it hurt to get a tattoo?",
    answer: "Pain is subjective and varies from person to person and depends on the tattoo's location. Some areas are more sensitive than others. We do our best to make the experience as comfortable as possible. Eating a good meal and staying hydrated before your appointment can help.",
  },
  {
    question: "How should I prepare for my appointment?",
    answer: "Get a good night's sleep, eat a healthy meal a few hours before, and stay hydrated. Avoid alcohol and blood-thinning medications for at least 24 hours prior. Wear comfortable clothing that allows easy access to the area being tattooed.",
  },
  {
    question: "What is the aftercare process?",
    answer: "We will provide you with detailed aftercare instructions after your session. Generally, this involves keeping the tattoo clean with unscented soap, applying a thin layer of recommended ointment, and protecting it from sun exposure and soaking in water (like pools or baths) for the first few weeks.",
  },
  {
    question: "Do you do cover-up tattoos?",
    answer: "Yes, we do cover-ups. This process requires a mandatory consultation to assess the existing tattoo and discuss the possibilities for the new design. Cover-ups can be more complex and may require more sessions.",
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Frequently Asked Questions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have questions? We've got answers. Here are some common things clients ask about.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
