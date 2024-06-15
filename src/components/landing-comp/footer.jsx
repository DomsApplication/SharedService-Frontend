import { siteConfig } from "@/utils/site-config";

const Footer = () => {
  return (
    <div className="flex justify-center items-center h-16 lg:h-20 p-1 border-t   shadow-md shadow-secondary w-full ">
      <footer>
        <p>
          Copyright &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
