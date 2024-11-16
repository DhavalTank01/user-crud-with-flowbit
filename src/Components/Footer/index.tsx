import { Footer as FlowbiteFooter } from "flowbite-react";
import URLS from "../../Routes";
import { Link } from "react-router-dom";

const Footer = () => (
  <FlowbiteFooter container className="mt-auto py-4">
    <FlowbiteFooter.Copyright by="CRUD App" year={new Date().getFullYear()} />
    <FlowbiteFooter.LinkGroup>
      <div className="flex gap-2">
        <Link
          to={URLS.PrivacyPolicy}
          className="text-gray-800 hover:text-blue-500"
        >
          Privacy Policy
        </Link>
        <Link
          to={URLS.TermsAndConditions}
          className="text-gray-800 hover:text-blue-500"
        >
          Terms of Service
        </Link>
      </div>
    </FlowbiteFooter.LinkGroup>
  </FlowbiteFooter>
);

export default Footer;
