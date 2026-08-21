import { LegalLayout } from "@/components/layout/LegalLayout";

const Terms = () => (
  <LegalLayout title="Terms of Service">
    <p>
      By using the BijliBhai website, calling, or messaging us, you agree to
      these terms. BijliBhai coordinates local electrician requests in Kanpur,
      Shuklaganj, Unnao and nearby areas depending on electrician availability.
    </p>
    <h2 className="font-display text-lg font-semibold text-ink">Service scope</h2>
    <p>
      This website is a lead and coordination channel. A request does not
      guarantee an electrician at a specific time. Availability depends on local
      electrician capacity and the time of your request.
    </p>
    <h2 className="font-display text-lg font-semibold text-ink">Pricing</h2>
    <p>
      Starting labour prices shown on the website are indicative. Parts and
      material are usually extra. Expected cost is shared before work starts
      wherever reasonably possible.
    </p>
    <h2 className="font-display text-lg font-semibold text-ink">Safety</h2>
    <p>
      Do not touch exposed wires. If there is immediate fire or danger, contact
      appropriate emergency assistance first. BijliBhai is not an emergency
      dispatch or government service.
    </p>
    <h2 className="font-display text-lg font-semibold text-ink">Liability</h2>
    <p>
      Workmanship and materials are discussed directly at the time of service.
      Website content is for information and lead generation, not a binding
      quote until confirmed on call or WhatsApp.
    </p>
  </LegalLayout>
);

export default Terms;
