import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION= gql`
    mutation signUp ($signUpUserInput: CreateUserInput!) {
        signUp(signUpUserInput: $signUpUserInput) {
            id,
            email,
            name
        }
    }
`;
