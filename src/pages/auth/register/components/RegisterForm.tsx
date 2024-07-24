import {Box, Button, FormControl, FormLabel, Heading, Input, Link, VStack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";

type RegisterForm = {
    userName: string;
    email: string;
    password: string
}

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<RegisterForm>()

    const onSubmit = (data: RegisterForm) => {
        console.log(data)
    };

    return (
        <Box p={4}  >
            <Heading as="h2" mb={4} fontSize="xl">
                Register
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" {...register('userName')} placeholder="Enter your username" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" {...register('email')} placeholder="Enter your email" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" {...register('password')} placeholder="Enter your password" />
                    </FormControl>
                    <Link href={'/password-request'}>
                        Forgot password?
                    </Link>
                    <Button
                        type="submit"
                        colorScheme="teal"
                        size="lg"
                        width="100%"
                    >
                        Register
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}
