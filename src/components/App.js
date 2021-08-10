import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json';
import Navbar from './Navbar';
import Main from './Main';

function App() {

  const [account, setAccount] = useState('');
  const [socialNetwork, setSocialNetwork] = useState({});
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];
    if (networkData) {
      const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, networkData.address);
      setSocialNetwork(socialNetwork);
      const postCount = await socialNetwork.methods.postCount().call();
      setPostCount(postCount);
      // Load Posts
      const posts = [];
      for (let i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call();
        posts.push(post);
      }
      setPosts([...posts]);
      setLoading(false);
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.');
    }
  }

  useEffect(() => {
    async function fetchData() {
      await loadWeb3();
      await loadBlockchainData();
    }
    fetchData();
  }, []);

  const createPost = (content) => {
    setLoading(true);
    socialNetwork.methods.createPost(content).send({ from: account })
      .once('receipt', (receipt) => {
        setLoading(false);
      })
  }

  return (
    <div>
      <Navbar account={account} />
      { loading
        ? <div id="loading" className="text-center mt-5"><p>Loading...</p></div>
        : <Main
            posts={posts}
            createPost={createPost}
          />
      }
    </div>
  );
}

export default App;
