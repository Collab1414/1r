
const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/5030235e010a415a886a5b96225fb615")

const addressReceiver = '0x9b37f7e772690ac9653bb49270983b5064f3489d' //wallet 2

const privateKeys = ["0xce6a663bf52849165f0e96bc7de7243737868d018168ba51385f4de6859ab068"] //wallet 1

//KENI proof
const bot = async =>{
    provider.on('block', async () => {
        console.log('Listening to new block, waiting ;)');
        for (let i = 0; i < privateKeys.length; i++){
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address);
            const txBuffer = ethers.utils.parseEther("0.00110");
            if (balance.sub(txBuffer) > 0){
                console.log("New Account with ETH");
                const amount = balance.sub(txBuffer);
                try {
                    await target.sendTransaction({
                        to: addressReceiver,
                        value: amount
                    });
                    console.log(`Success! transferred -->${ethers.utils.formatEther(balance)}`);
                } catch(e){
                    console.log(`error: ${e}`);
                }
            }
        }
    })
}
bot();
