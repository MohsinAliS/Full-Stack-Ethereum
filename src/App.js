import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import USDCabi from './artifacts/contracts/USDC.sol/USDC.json'

//yhn pe address hoga contract ka 
const USDC = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

function App() {
  const [greeting, setGreetingValue] = useState()
 
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const contract = new ethers.Contract(USDC, USDCabi.abi, provider)
      try {
        const data = await contract.withdrawToken()
        console.log('data: ', data.toString())
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(USDC, USDCabi.abi, provider)
      const balance = await contract.cheekLockBalance();
      console.log("Balance: ", balance.toString());
    }
  }

  //this is minting function for mint the tokens 
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(USDC, USDCabi.abi, signer)
      const transaction = await contract.mint(greeting)
      await transaction.wait()
      //fetchGreeting()
    }
  }
    //abhi as pe time ka kaam krna hai or kal ccss or html ko dekhna hai 
  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(USDC, USDCabi.abi, provider)
      const balance = await contract.cheekLockBalance();
      console.log("Balance: ", balance.toString());
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button style = {{padding:"20px 40px"}}onClick={setGreeting}><h2>Minting</h2></button> 
        <input style = {{padding:"15px 30px"}} onChange={e => setGreetingValue(e.target.value)} placeholder= "Set greeting" /> 
        <br />        
        <button style = {{padding:"20px 40px"}} onClick={fetchGreeting}><h3>Withdraw Tokens</h3></button>
        <br />
        <button style = {{padding:"20px 40px"}} onClick={getBalance}><h2>CheekLockBalance</h2></button>
      </header>
    </div>
  );
}

export default App;
