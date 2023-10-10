import { useConnection } from '@solana/wallet-adapter-react';
import { FC, useState, useEffect } from 'react';
import { PublicKey } from "@solana/web3.js"
import { Metaplex } from "@metaplex-foundation/js"
import {
    Button,
    HStack,
    Text,
    Image,
} from "@chakra-ui/react"


const CandyMachineNFTs: FC = () => {
    const { connection } = useConnection();

    const [candyMachineAddress, setCandyMachineAddress] = useState("6DiJS6qSKSWwrPgiqxzKYLqsXTha2Nmwi7kPZzhQvm89")
    const [candyMachineData, setCandyMachineData]: any = useState(null)
    const [pageItems, setPageItems]: any = useState(null)
    const [page, setPage] = useState(1)
    const metaplex = Metaplex.make(connection)

    const fetchCandyMachine = async () => {

        // Set page to 1 - we wanna be at the first page whenever we fetch a new Candy Machine
        setPage(1)

        // fetch candymachine data
        try {
            const candyMachine = await metaplex
                .candyMachinesV2()
                .findByAddress({ address: new PublicKey(candyMachineAddress) })

            setCandyMachineData(candyMachine)
        } catch (e) {
            alert("Please submit a valid CMv2 address.")
        }
    }

    const getPage = async (page: number, perPage: number) => {
        const pageItems = candyMachineData.items.slice(
            (page - 1) * perPage,
            page * perPage
        )

        // fetch metadata of NFTs for page
        let nftData = []
        for (let i = 0; i < pageItems.length; i++) {
            let fetchResult = await fetch(pageItems[i].uri)
            let json = await fetchResult.json()
            nftData.push(json)
        }

        // set state
        console.log(nftData)
        setPageItems(nftData)
    }

    const prev = async () => {
        if (page - 1 < 1) {
            setPage(1)
        } else {
            setPage(page - 1)
        }
    }

    // next page
    const next = async () => {
        setPage(page + 1)
    }

    useEffect(() => {
        fetchCandyMachine()
    }, [])

    // fetch metadata for NFTs when page or candy machine changes
    useEffect(() => {
        if (!candyMachineData) {
            return
        }
        getPage(page, 3)
    }, [candyMachineData, page])

    return (
        <>
            <HStack spacing={10}>
                {pageItems && pageItems.map((nft: any) => (
                    <Image src={nft.image} alt={nft.name} height="60" />
                ))}
            </HStack>
            <HStack spacing={5}>
                {page > 1 && (
                    <Button bgColor="accent" color="white" maxW="380px" onClick={prev}>
                        <Text>prev</Text>
                    </Button>
                )}

                {page < 3 && (
                    <Button bgColor="accent" color="white" maxW="380px" onClick={next}>
                        <Text>next</Text>
                    </Button>
                )}

            </HStack>
        </>
    );
};

export default CandyMachineNFTs;