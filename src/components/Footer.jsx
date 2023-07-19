import React from "react";
import BriefCase from "../Svgs/BriefCase";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="flex w-full p-10 flex-col space-y-8 bg-footer">
            <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 space-x-0 md:space-x-10">
                <div className="flex flex-col flex-1 items-center text-center md:text-start md:items-start space-y-4">
                    {/* logo section */}
                    <div className="flex items-center space-x-2 ">
                        <BriefCase />
                        <p className="font-heading text-heading text-white">IGAP!</p>
                    </div>
                    <p className="font-text text-text">
                        We are taking action to help our freelancers, our clients, and the
                        people of Ukraine—and so can you.
                    </p>
                </div>
                <div className="flex flex-col space-y-4 flex-1 items-center text-center md:text-start md:items-start">
                    <p className="font-heading text-heading text-white">
                        Service Providers
                    </p>
                    <Link to="/" className="font-text text-text">
                        Martkeing & Communication
                    </Link>
                    <Link to="/" className="font-text text-text">
                        Design & Development
                    </Link>
                    <Link to="/" className="font-text text-text">
                        Human Research & Developement
                    </Link>
                    <Link to="/" className="font-text text-text">
                        Graphic Design
                    </Link>
                    <Link to="/" className="font-text text-text">
                        Finance Management
                    </Link>
                    <Link to="/" className="font-text text-text">
                        NFT market designer
                    </Link>
                    <Link to="/" className="font-text text-text">
                        Project Management
                    </Link>
                    <Link to="/" className="font-text text-text">
                        Business & Consulting
                    </Link>
                </div>
                <div className="flex flex-col flex-1 space-y-4 items-center text-center md:text-start md:items-start">
                    <p className="font-heading text-heading text-white">Contact</p>
                    <p className="font-text text-text">+(92) 307 3910 644</p>
                    <p className="font-text text-text">mrkamranxafar@gmail.com</p>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="rounded-full w-3 h-3 bg-border" />
                <div className="flex flex-1 h-1 bg-border" />
                <div className="rounded-full w-3 h-3 bg-border" />
            </div>
            <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 justify-between p-3 items-center text-center md:text-start md:items-start">
                <div className="flex flex-row space-x-3">
                    <p className="font-text text-text">@ 2023 IGAP Global Inc.</p>
                </div>
                <div className="flex flex-row space-x-4 text-white ">
                    <Link>
                        <Facebook />
                    </Link>
                    <Link>
                        <LinkedIn />
                    </Link>
                    <Link>
                        <Twitter />
                    </Link>
                    <Link>
                        <Instagram />
                    </Link>
                </div>
                <div className="flex flex-row space-x-4">
                    <p className="font-text text-text">Terms of Service</p>
                    <p className="font-text text-text">Provacy Policy</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
