import React, {  useEffect,useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import {  shortenAddress2 } from "../../../src/Pages/Home/constants";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import "../../styles/main.css";
import logo from "./logo.png";
import homepage from "../../Pages/Home/Home.jsx"
import { Link } from "react-router-dom";
const { ethereum } = window;






// as = { Link } to = "/explore"
const Topbar = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);


            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };
  
    useEffect(() => {
        checkIfWalletIsConnect();
        var menuButton = document.querySelector(".menu-button");

        menuButton.addEventListener("click", function (event) {
            event.preventDefault();
            var parent = document.querySelector(".menu-container");
            if (parent.classList.contains("open")) {
                parent.classList.remove("open");
            } else {
                parent.classList.add("open");
            }
        });
    }, [])

    const [toggleMenu, setToggleMenu] = React.useState(false);

    return (
        
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <Link to="/">
                    <img src={logo} alt="logo" className="w-32 cursor-pointer" href={homepage} />
                </Link>
            
            </div>


            <style dangerouslySetInnerHTML={{ __html: "a{color:white;text-decoration: none;}" }} />
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                <li className="mx-4 cursor-pointer undefined">
                <Link to="/" >
                    Home
                </Link>
                </li>

                <li className="mx-4 cursor-pointer undefined">
                    <Link as={Link}  to="/explore">
                 
                        Explore
               
                </Link>
                </li>
                
            
                <li className="mx-4 cursor-pointer undefined">
                    <Link as={Link}  to="/create-nft">
                
                        Create NFT
                           
                </Link>
                </li>
                
                {/* {!currentAccount && (
                    <li >
                        <Link as={Link} to="/my-collection">

                            MYCollection

                        </Link>

                    </li>
                   )} */}
                {!currentAccount ? <div className="menu-container">
                    <button className="menu-button"><AiOutlineUser fontSize={28} /><span className="title"> {shortenAddress2(currentAccount)}</span></button>
                    <div className="menu-dropdown ">
                        <div className="content">
                            <ul>
                                <li >
                                    <Link as={Link} to="/Connectwallet">

                                        Connect Wallet

                                    </Link>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div> : 
                    <div className="menu-container">
                    <button className="menu-button"><AiOutlineUser fontSize={28} /><span className="title"> {shortenAddress2(currentAccount)}</span></button>
                    <div className="menu-dropdown ">
                            <div className="content">
                                <ul>
                                <li >
                                    <Link as={Link} to="/my-collection">

                                        MYCollection

                                    </Link>

                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>
}

            
            </ul>




            <div className="flex relative">
                {!toggleMenu && (
                    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                )}
                {toggleMenu && (
                    <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                )}
                {toggleMenu && (
                    <ul
                        className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                    >
                        <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /> 
                        <Link to="/" >
                            Home
                        </Link>
                        <br/>
                             <Link as={Link}  to="/explore">
                 
                        Explore
               
                            </Link>
                            <br />
                            <Link as={Link}  to="/my-collection">
                      
                            MYCollection
                               
                         </Link>
                            <br />
                        <Link as={Link}  to="/create-nft">
                        Create NFT
                        </Link>

                </li>
                     
                    </ul>
                )}
            </div>



           
            
          
        </nav>



    );
    

};

export default Topbar;


