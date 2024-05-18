import { useEffect } from "react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const loadThirdPartyScripts = () => {
  // Example: Load a third-party script
  const script = document.createElement("script");
  script.src = `https://${domain}/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js`;
  script.async = true;
  document.body.appendChild(script);
};

const AcceptCookies = () => {
  useEffect(() => {
    loadThirdPartyScripts();
  }, []);

  return <div></div>;
};

export default AcceptCookies;
