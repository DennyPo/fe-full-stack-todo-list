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
            email,
            name
        }
    }
`;

export const GET_NEW_ACCESS_TOKEN_QUERY = gql`
    query refreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            accessToken
        }
    }
`;

export const GET_CURRENT_USER_TODOS = gql`
    query getCurrentUserTodos {
        findAllCurrentUserTodos {
            id,
            userId,
            title,
            description
        }
    }
`;
