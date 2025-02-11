import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center py-6">
      <p>
        © 2025 <Link href={"/auth"}>Bliveprofile</Link>
      </p>
    </footer>
  );
};

export default Footer;
