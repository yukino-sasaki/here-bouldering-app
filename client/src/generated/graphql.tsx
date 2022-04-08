import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddClimbingUserResponse = {
  __typename?: 'AddClimbingUserResponse';
  climbingUser?: Maybe<Array<Maybe<User>>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateUserInput = {
  avatarImage: Scalars['String'];
  nickname: Scalars['String'];
};

export type EditMeResponse = {
  __typename?: 'EditMeResponse';
  me?: Maybe<Me>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Gym = {
  __typename?: 'Gym';
  climbingUser?: Maybe<Array<Maybe<User>>>;
  creater?: Maybe<User>;
  gymId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
};

export type Gyms = {
  __typename?: 'Gyms';
  gyms?: Maybe<Array<Maybe<Gym>>>;
};

export type Me = {
  __typename?: 'Me';
  avatarImage?: Maybe<Scalars['String']>;
  finishClimbingTime?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  registerGyms?: Maybe<Array<Maybe<Gym>>>;
  startClimbingTime?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addClimbingUser?: Maybe<AddClimbingUserResponse>;
  addGyms?: Maybe<Gym>;
  createUser?: Maybe<User>;
  editMe?: Maybe<EditMeResponse>;
  registerGym?: Maybe<RegisterGymResponse>;
  removeClimbingUser?: Maybe<RemoveClimbingUserResponse>;
  removeGym?: Maybe<RemoveGymResponse>;
  test?: Maybe<Test>;
};


export type MutationAddClimbingUserArgs = {
  userId: Scalars['ID'];
};


export type MutationAddGymsArgs = {
  creater?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  place?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  avatarImage: Scalars['String'];
  nickname: Scalars['String'];
};


export type MutationRemoveClimbingUserArgs = {
  userId: Scalars['ID'];
};


export type MutationTestArgs = {
  context?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  gym?: Maybe<Gym>;
  gyms?: Maybe<Array<Maybe<Gym>>>;
  me?: Maybe<Me>;
  user?: Maybe<User>;
};


export type QueryGymArgs = {
  gymId?: InputMaybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};

export type RegisterGymResponse = {
  __typename?: 'RegisterGymResponse';
  message?: Maybe<Scalars['String']>;
  registerGyms?: Maybe<Array<Maybe<Gym>>>;
  success: Scalars['Boolean'];
};

export type RemoveClimbingUserResponse = {
  __typename?: 'RemoveClimbingUserResponse';
  climbingUser?: Maybe<Array<Maybe<User>>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type RemoveGymResponse = {
  __typename?: 'RemoveGymResponse';
  message?: Maybe<Scalars['String']>;
  registerGyms?: Maybe<Array<Maybe<Gym>>>;
  success: Scalars['Boolean'];
};

export type ResetClimbingUserResponse = {
  __typename?: 'ResetClimbingUserResponse';
  climbingUser?: Maybe<Array<Maybe<User>>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Test = {
  __typename?: 'Test';
  context?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatarImage?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  finishClimbingTime?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  registerGym?: Maybe<Gym>;
  startClimbingTime?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type CreateUserMutationVariables = Exact<{
  nickname: Scalars['String'];
  avatarImage: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', userId?: string | null, nickname?: string | null, avatarImage?: string | null, startClimbingTime?: string | null, finishClimbingTime?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', userId?: string | null, avatarImage?: string | null, nickname?: string | null, finishClimbingTime?: string | null, startClimbingTime?: string | null, registerGyms?: Array<{ __typename?: 'Gym', name?: string | null } | null> | null } | null };


export const CreateUserDocument = gql`
    mutation CreateUser($nickname: String!, $avatarImage: String!) {
  createUser(nickname: $nickname, avatarImage: $avatarImage) {
    userId
    nickname
    avatarImage
    startClimbingTime
    finishClimbingTime
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      nickname: // value for 'nickname'
 *      avatarImage: // value for 'avatarImage'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    userId
    avatarImage
    nickname
    finishClimbingTime
    startClimbingTime
    registerGyms {
      name
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;