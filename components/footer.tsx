import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
    const footerSections = [
        {
            title: "Summer League Organization",
            links: ["Summer League Trust", "Summer League Officials", "Summer League Careers"],
        },
        {
            title: "I AM Foundation Initiatives",
            links: ["I AM Foundation", "I AM Foundation Youth Camp"],
        },
        {
            title: "Shop",
            links: ["Summer League Shop", "Summer League Auctions"],
        },
    ];

    const socialLinks = ["facebook", "instagram", "youtube", "twitch"];

    return (
        <footer className="bg-border text-secondary p-8 mt-8">
            <div className="container mx-auto grid grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                    <div key={index}>
                        <h3 className="font-bold mb-2">{section.title}</h3>
                        <ul className="text-sm space-y-1">
                            {section.links.map((link, linkIndex) => (
                                <li key={linkIndex}>{link}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="container mx-auto mt-8 pt-8 border-t border-muted-foreground flex justify-between items-center">
                <p>&copy; 2024 I Am Foundation. All rights reserved.</p>
                <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                        <Link
                            key={social}
                            href={`https://${social}.com`}
                            className="text-2xl"
                        >
                            <span>{social[0].toUpperCase()}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;