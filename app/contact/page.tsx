import { ArrowUpRight, MapPin } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="page-width enquiry-layout">
        <div className="enquiry-intro">
          <span className="eyebrow">LET’S BUILD SOMETHING LASTING</span>
          <h1>
            Your vision.
            <br />
            Our next
            <br />
            <em>conversation.</em>
          </h1>
          <p>
            Every considered project starts with understanding. Share a few
            details, and let’s find the right way forward.
          </p>
          <div className="contact-methods">
            <a href="tel:+919945356557">
              <span>CALL US</span>+91 99453 56557
              <ArrowUpRight size={18} />
            </a>
            <a
              href="https://wa.me/919945356557"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>WHATSAPP</span>Start a conversation
              <ArrowUpRight size={18} />
            </a>
            <a href="mailto:enquiry@urbexaprojects.com">
              <span>EMAIL</span>enquiry@urbexaprojects.com
              <ArrowUpRight size={18} />
            </a>
            <p>
              <MapPin size={16} />
              Bengaluru, Karnataka
            </p>
          </div>
        </div>
        <EnquiryForm />
      </div>
    </div>
  );
}
