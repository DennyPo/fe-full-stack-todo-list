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

export const DELETE_TODO_MUTATION = gql`
    mutation deleteTodo($id: Float!) {
        deleteTodo(id: $id) {
            message
        }
    }
`;

export const UPDATE_TODO_MUTATION = gql`
    mutation updateTodo($updateTodoInput: UpdateTodoInput!) {
        updateTodo(updateTodoInput: $updateTodoInput) {
            id,
            title,
            description
        }
    }
`;
