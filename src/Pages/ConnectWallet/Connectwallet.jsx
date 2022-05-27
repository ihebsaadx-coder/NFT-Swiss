import React, { useState, useEffect } from 'react'
import "../../Pages/Home/Home.css";

const { ethereum } = window;



const ConnectWallet = () => {
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
                                    Connect Your Wallet
                                </h1>
                                <p className="home-text">
                                    Connect with one of our available <span data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" className="mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">wallet</span> providers or create a new one.
                                    <div id="tooltip-bottom" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        A crypto wallet is an application or hardware device that allows individuals to store and retrieve digital items.
                                        <div className="tooltip-arrow" data-popper-arrow />
                                   
                            </div>
                                   
                                </p>

                                

                                <div className="home-btns">
                             
                                    {!currentAccount && (
                                        <button className='home-btn  home-btn--clr ' onClick={connectWallet}>
                                            Connect Wallet
                                        </button>)}
                          
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


                                        



 

        </>

    )
}

export default ConnectWallet
