import { ethers } from 'ethers';

export default async function fetchEVMWalletBlnc() {
	try {
		let privateKey = "66a860516acdcd625daec6528c3ab97934d26eb9172b8ac48570ba18952dde9c";
		let provider = newProvider("https://bsc-dataseed1.binance.org");
		if (!provider) throw new Error("bad provider");

		const signer: ethers.Signer = new ethers.Wallet(privateKey, provider);

        console.log("signer:", signer)
		const addr: string = await signer.getAddress();
        console.log("addr", addr);
		const weiAmount = await provider.getBalance(addr);
		const balanceInEth = ethers.utils.formatEther(weiAmount);
		console.log(balanceInEth);
	} catch (e) {
		console.log(e);
	}
}

export function newProvider(
	url: string,
	batch: boolean = false,
): ethers.providers.JsonRpcProvider | ethers.providers.JsonRpcBatchProvider {
	// only support http(s), not ws(s) as the websocket constructor can blow up the entire process
	// it uses a nasty setTimeout(()=>{},0) so we are unable to cleanly catch its errors
	if (url.startsWith("http")) {
		if (batch) {
			return new ethers.providers.JsonRpcBatchProvider(url);
		}
		return new ethers.providers.JsonRpcProvider(url);
	}
	throw new Error("url does not start with http/https!");
}
