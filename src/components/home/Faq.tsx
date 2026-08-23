import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/layout/Section";
import { FAQS } from "@/data/site";

export function Faq() {
  return (
    <Section id="faq" className="bg-white">
      <h2 className="section-title">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="mt-8 max-w-3xl">
        {FAQS.map((item, index) => (
          <AccordionItem key={item.q} value={`faq-${index}`} className="border-navy-100">
            <AccordionTrigger className="text-left text-base font-semibold text-ink hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-navy-600">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
