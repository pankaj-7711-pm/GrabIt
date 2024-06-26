import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const OtpModal = ({ children,email,otp,verified }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [enteredOtp, setEnteredOtp] = useState();

    const handlePinChange=(value) => {
        setEnteredOtp(value);
    }

    const handleSubmit = () => {
        if (enteredOtp == otp) {
            verified();
            onClose();
            toast({
              title: "Email Verification Successfull",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
        }
        else {
            toast({
              title: "OTP Did not matched",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
        }
    }
  return (
    <>
      <span onClick={onOpen} style={{ cursor: "pointer" }}>
        {children}
      </span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter OTP sent to {email}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <PinInput otp onChange={handlePinChange}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Button className='mt-4 mb-2' onClick={handleSubmit}>
                Enter
            </Button>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default OtpModal
