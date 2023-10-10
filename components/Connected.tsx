import { FC, useCallback} from "react"
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import toast from 'react-hot-toast';
import CandyMachineNFTs from "./CandyMachineNFTs"
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { generateSigner, transactionBuilder, publicKey, some } from '@metaplex-foundation/umi';
import { fetchCandyMachine, mintV2, mplCandyMachine, safeFetchCandyGuard } from "@metaplex-foundation/mpl-candy-machine";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { clusterApiUrl } from '@solana/web3.js';

const Connected: FC = () => {

  const { connection } = useConnection()
  const { publicKey } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      console.log('error', 'Wallet not connected!');
      toast("Wallet not connected")
      return
    }
    toast("button clicked")
  }, [])

  return (
    <div>
      <VStack spacing={20}>
        <Container>
          <VStack spacing={8}>
            <Heading
              color="white"
              as="h1"
              size="2xl"
              noOfLines={1}
              textAlign="center"
            >
              Mint a DOG NFT
            </Heading>

          </VStack>
        </Container>

        <CandyMachineNFTs />

        <Button bgColor="accent" color="white" maxW="380px" onClick={onClick}>
          <HStack>
            <Text>mint buildoor</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button>
      </VStack>
    </div>
  )
}

export default Connected