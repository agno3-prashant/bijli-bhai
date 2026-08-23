import { LegalLayout } from "@/components/layout/LegalLayout";

const Privacy = () => (
  <LegalLayout title="Privacy Policy">
    <p>
      BijliBhai is a local electrician coordination service for Kanpur,
      Shuklaganj, Unnao and nearby areas. This first-release website is designed
      to help visitors call or WhatsApp us.
    </p>
    <h2 className="font-display text-lg font-semibold text-ink">
      Information we receive
    </h2>
    <p>
      We do not require account creation. If you call or message us, we receive
      the phone number and the message content you send through your phone or
      WhatsApp. If you submit a review, we receive the name, mobile number,
      locality, service details and feedback you enter. Reviews stay private
      until BijliBhai approves them. Public reviews show only a first name,
      locality, service and review text — never your mobile number.
    </p>
    <h2 className="font-display text-lg font-semibold text-ink">How we use it</h2>
    <p>
      Contact details and service requests are used only to coordinate
      electrician visits and respond to your query. We do not sell personal data.
    </p>
    <h2 className="font-display text-lg font-semibold text-ink">Analytics</h2>
    <p>
      The website may record anonymous click events such as call or WhatsApp
      button taps to understand which pages convert. This does not require a
      login.
    </p>
    <h2 className="font-display text-lg font-semibold text-ink">Contact</h2>
    <p>
      For privacy questions, contact BijliBhai on the phone number listed on this
      website.
    </p>
  </LegalLayout>
);

export default Privacy;
