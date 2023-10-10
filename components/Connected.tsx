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
            <Text>mint NFT</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button>
      </VStack>
    </div>
  )
}

export default Connected