import { gql } from "@apollo/client";

export const LOG_IN_QUERY = gql`
    query login($loginUserInput: CreateUserInput!) {
        login(loginUserInput: $loginUserInput) {
            accessToken,
            refreshToken
        }
    }
`;

export const GET_CURRENT_USER_QUERY = gql`
    query currentUser {
        currentUser {
            id,
            email
        }
    }
`;
