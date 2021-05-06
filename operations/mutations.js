import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
    mutation signUp ($signUpUserInput: CreateUserInput!) {
        signUp(signUpUserInput: $signUpUserInput) {
            id,
            email,
            name
        }
    }
`;

export const CREATE_TODO_MUTATION = gql`
    mutation createTodo ($createTodoInput: CreateTodoInput!) {
        createTodo(createTodoInput: $createTodoInput) {
            id,
            userId,
            title,
            description
        }
    }
`;
