import React, { useState, useEffect}from 'react'
import "./Home.css";
import { Link } from "react-router-dom";

import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import ServiceCard from './Services'
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from "./constants";
const { ethereum } = window;



const Home = () => {
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

const connectWallet = async () => {
    try {
        if (!ethereum) return alert("Please install MetaMask.");

        const accounts = await ethereum.request({ method: "eth_requestAccounts", });

        setCurrentAccount(accounts[0]);
        window.location.reload();
    } catch (error) {
        console.log(error);

        throw new Error("No ethereum object");
    }
};
    useEffect(() => {
        checkIfWalletIsConnect();
  
    });
    

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: "\n@media (min-width: 640px)\n.sm\\:w-72 {\n    width: 18rem;\n}\n\n.p-3 {\n    padding: 0.75rem;\n}\n\n.rounded-xl {\n    border-radius: 0.75rem;\n}\n\n\n\n\n" }} />

            <div className="flex w-full justify-left items-center gradient-bg-welcome " >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="home-content">
                                <h1 className="home-title">
                                    NFT Marketplace
                                </h1>
                                <p className="home-text">
                                    Digital marketplace for crypto collectibles and non-fungible tokens.
                                    <br />
                                    Buy, Sell, and Explore exclusive digital assets.
                                </p>
                                <div className="home-btns">
                                    <Link to="/explore" className='home-btn home-btn--clr'>
                                        Explore
                                    </Link>
                                    <Link to="create-nft" className='home-btn home-btn--clr' >
                                        Create
                                    </Link>
                                    {!currentAccount && (
                                    <button  className='home-btn  home-btn--clr ' onClick={connectWallet}>
                                            Connect Wallet
                                        </button>)}
                                    <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10" style={{ width: '516px', paddingTop: '0px', paddingLeft: '244px', height: '200px' }}>

                                    <div className="p-3 flex justify-start items-start flex-col rounded-xl  w-full my-5 eth-card .white-glassmorphism ">
                                        <div className="flex justify-between flex-col w-full h-full">
                                            <div className="flex justify-between items-start">
                                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                                    <SiEthereum fontSize={21} color="#fff" />
                                                </div>
                                                <BsInfoCircle fontSize={17} color="#fff" />
                                            </div>
                                            <div>
                                                <p className="text-white font-light text-sm">
                                                    {shortenAddress(currentAccount)}
                                                </p>
                                                <p className="text-white font-semibold text-lg mt-1">
                                                    Ethereum
                </p>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                </div>
                             
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>




          

             <div className="flex w-full justify-left items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Services that we
          <br />
          continue to improve
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          The best choice for buying and selling NFT , with the
          various super friendly services we offer
        </p>
      </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security gurantee"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Best exchange rates"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fastest transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
      </div>
    </div>
  
            {/* <Services/> */}
            {/* <div className="container feature-container pb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="main-title main-title--border-top">
                            <h2 className='feature-head'>Get started creating &amp; selling your NFTs</h2>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 col-xl-3 feature-wrapper">
                        <div className="feature">
                            <span className="feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,7H18V6a3,3,0,0,0-3-3H5A3,3,0,0,0,2,6H2V18a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V10A3,3,0,0,0,19,7ZM5,5H15a1,1,0,0,1,1,1V7H5A1,1,0,0,1,5,5ZM20,15H19a1,1,0,0,1,0-2h1Zm0-4H19a3,3,0,0,0,0,6h1v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8.83A3,3,0,0,0,5,9H19a1,1,0,0,1,1,1Z"></path></svg>
                            </span>
                            <h3 className="feature-title">Set up your wallet</h3>
                            <p className="feature-text">Once you’ve set up your wallet of choice, preferable Meta Mask. Connect it to NFT marketplace by going to Explore tab.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="feature">
                            <span className="feature-icon feature-icon--green">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z"></path></svg>
                            </span>
                            <h3 className="feature-title">Create your collectibles</h3>
                            <p className="feature-text">Click Create and make your own collectibles. Add a name, description, collectible image &amp; price.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="feature">
                            <span className="feature-icon feature-icon--purple">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.71,6.29a1,1,0,0,0-1.42,0L20,7.59V2a1,1,0,0,0-2,0V7.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l3,3a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l3-3A1,1,0,0,0,22.71,6.29ZM19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h8a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21Z"></path></svg>
                            </span>
                            <h3 className="feature-title">Add your NFTs</h3>
                            <p className="feature-text">Upload your work that you have created, add a title and description, and image. Every time your NFT is sold, you get 0.5% of the price.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="feature feature--last">
                            <span className="feature-icon feature-icon--red">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,12a1,1,0,1,0,1-1A1,1,0,0,0,15,12Zm6.71-.71-5-5A1,1,0,0,0,16,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3H16a1,1,0,0,0,.71-.29l5-5A1,1,0,0,0,21.71,11.29ZM15.59,16H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H15.59l4,4Z"></path></svg>
                            </span>
                            <h3 className="feature-title">List them for sale</h3>
                            <p className="feature-text">
                                List your exclusive NFTs on the marketplace. Sell them for a fixed price. You choose how you want to sell your NFTs, and we help you sell them!</p>
                        </div>
                    </div>
                </div>
            </div> */}
          
        </>
        
    )
}

export default Home
