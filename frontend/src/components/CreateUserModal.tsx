import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { BiAddToQueue } from 'react-icons/bi'
import { BASE_URL } from '../App'
import { useToast } from '@chakra-ui/react'

export const CreateUserModal = ({ setUsers }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		role: "",
		description: "",
		gender: "",
	});
	const toast = useToast();
	const handleCreateUser = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/friends", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error);
			}

			toast({
				title: "Yayy! New BFF added!",
				description: "Friend created successfully",
				status: "success",
				duration: 2000,
				position: "top",
				isClosable: true,
			});
			onClose();
			setUsers((prev) => [...prev, data]);
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred",
				description: error.message,
				duration: 2000,
				position: "top",
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
			setInputs({
				name: "",
				role: "",
				description: "",
				gender: "",
			});
		}
	}
	return (<>
		<Button onClick={onOpen}>
			<BiAddToQueue size={20} />
		</Button>
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<form onSubmit={handleCreateUser}>
				<ModalContent>
					<ModalHeader> My new BFF 😎 </ModalHeader>
					<ModalCloseButton />

					<ModalBody pb={6}>
						<Flex alignItems={"center"} gap={4}>
							<FormControl>
								<FormLabel>Full Name</FormLabel>
								<Input placeholder='Tim Cook'
									value={inputs.name}
									onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Role</FormLabel>
								<Input placeholder='Software Engineer'
									value={inputs.role}
									onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
								/>
							</FormControl>
						</Flex>
						<FormControl mt={4}>
							<FormLabel>Gender</FormLabel>
							<RadioGroup mt={4}>
								<Flex gap={5}>
									<Radio value='male'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									> Male </Radio>
									<Radio value='female'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									> Female </Radio>
								</Flex>
							</RadioGroup>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Description</FormLabel>
							<Textarea
								resize={"none"}
								overflow={"hidden"}
								placeholder='Tim Cook is a software engineer at Apple Inc.'
								value={inputs.description}
								onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
							Add
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	</>)
}