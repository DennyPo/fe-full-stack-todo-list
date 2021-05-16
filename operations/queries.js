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

export const GET_CURRENT_USER_TODOS_QUERY = gql`
    query getCurrentUserTodos($pagination: Pagination) {
        findAllCurrentUserTodos(pagination: $pagination) {
            list {
                id,
                title,
                description
            },
            count
        }
    }
`;

export const GET_USER_TODOS_QUERY = gql`
    query getTodosByUserId($userId: Float!, $pagination: Pagination) {
        findAllTodosByUserId(userId: $userId, pagination: $pagination) {
            list {
                id,
                title,
                description
            },
            count
        }
    }
`;

export const GET_USERS_QUERY = gql`
    query getUsers($pagination: Pagination) {
        users(pagination: $pagination) {
            list {
                id,
                name,
                email
            },
           count
        }
    }
`;
