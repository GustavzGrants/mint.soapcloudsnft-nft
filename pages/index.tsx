import { useProgram, useClaimNFT, useClaimConditions, useProgramMetadata } from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";

require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Home: NextPage = () => {
  const { program } = useProgram("3omU8aCuj8rZKwEHBx39ciQAMtEDU1L12N68bPE2Kz7r", "nft-drop")
  const { mutateAsync: claim, isLoading } = useClaimNFT(program);
  const { data: conditions, isLoading: conditionsIsLoading } =
   useClaimConditions(program); 
  const { data: metadata, isLoading: metadataIsLoading } =
   useProgramMetadata(program); 

  return (
    <div className={styles.page}>
      <div className={styles.header}>
      <WalletMultiButtonDynamic />
      </div>
      <br />
      <div>
          <Image
            width={300}
            height={300}
            src="/soapcloudsgif.gif"
            className={styles.icon}
            alt="gif"
          />
        <h1 className={styles.h1}>Welcome to the mint page of SoapCloudNFT project  Price: 1 SOL</h1>
        {metadataIsLoading ? <p>...</p> : <p>{metadata?.description}</p>}
        <button className={styles.btn} disabled={isLoading} onClick={() => claim({amount: 1})}>
      CLAIM
    </button>
    {conditionsIsLoading ? <p>_/_</p> : 
    <p>{conditions?.totalAvailableSupply}/{conditions?.claimedSupply}</p>}
      </div>
      <div style={{
    }}></div>
    </div>
  );
};

export default Home;


