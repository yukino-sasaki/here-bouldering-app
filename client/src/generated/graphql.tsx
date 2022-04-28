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

export type ClimbingTime = {
  __typename?: 'ClimbingTime';
  finishClimbingTime?: Maybe<Scalars['String']>;
  gymId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  startClimbingTime?: Maybe<Scalars['String']>;
};

export type ClimbingUser = {
  __typename?: 'ClimbingUser';
  avatarImage: Scalars['String'];
  finishClimbingTime?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
  registerGyms?: Maybe<Array<Maybe<GymInfo>>>;
  startClimbingTime?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type ClimbingUserResponse = {
  __typename?: 'ClimbingUserResponse';
  gym?: Maybe<Gym>;
  message: Scalars['String'];
  status: MutateStatus;
};

export type Creater = {
  __typename?: 'Creater';
  avatarImage?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
  userId: Scalars['ID'];
};

export type CreaterInput = {
  avatarImage: Scalars['String'];
  nickname: Scalars['String'];
  userId: Scalars['String'];
};

export type EditClimbingTimeInput = {
  finishClimbingTime?: InputMaybe<Scalars['String']>;
  gymId?: InputMaybe<Scalars['ID']>;
  startClimbingTime?: InputMaybe<Scalars['String']>;
};

export type Gym = {
  __typename?: 'Gym';
  climbingUser?: Maybe<Array<Maybe<ClimbingUser>>>;
  creater: Creater;
  gymId: Scalars['ID'];
  name: Scalars['String'];
  place: Scalars['String'];
};

export type GymInfo = {
  __typename?: 'GymInfo';
  gymId: Scalars['ID'];
  name: Scalars['String'];
  place: Scalars['String'];
};

export type GymInput = {
  gymId: Scalars['ID'];
  name: Scalars['String'];
  place: Scalars['String'];
};

export type Gyms = {
  __typename?: 'Gyms';
  gyms?: Maybe<Array<Maybe<Gym>>>;
};

export type Me = {
  __typename?: 'Me';
  avatarImage: Scalars['String'];
  climbingTime?: Maybe<Array<Maybe<ClimbingTime>>>;
  nickname: Scalars['String'];
  registerGyms: Array<GymInfo>;
  userId: Scalars['String'];
};

export type MeResponse = {
  __typename?: 'MeResponse';
  me?: Maybe<User>;
  message?: Maybe<Scalars['String']>;
  status: MutateStatus;
};

export enum MutateStatus {
  Error = 'error',
  Success = 'success',
  Warning = 'warning'
}

export type Mutation = {
  __typename?: 'Mutation';
  addClimbingUser?: Maybe<ClimbingUserResponse>;
  addGyms?: Maybe<Gym>;
  createUser: User;
  editClimbingUser?: Maybe<ClimbingUserResponse>;
  editMe?: Maybe<MeResponse>;
  registerGym?: Maybe<MeResponse>;
  removeClimbingUser?: Maybe<ClimbingUserResponse>;
  removeGym?: Maybe<RemoveGymResponse>;
  resetClimbingUser?: Maybe<ResetClimbingUserResponse>;
  unregisterGym?: Maybe<MeResponse>;
};


export type MutationAddClimbingUserArgs = {
  input: RegisterClimbingUserInput;
};


export type MutationAddGymsArgs = {
  CreaterInput: CreaterInput;
  name: Scalars['String'];
  place: Scalars['String'];
};


export type MutationCreateUserArgs = {
  avatarImage: Scalars['String'];
  nickname: Scalars['String'];
};


export type MutationEditClimbingUserArgs = {
  input?: InputMaybe<EditClimbingTimeInput>;
};


export type MutationEditMeArgs = {
  input: UserInput;
};


export type MutationRegisterGymArgs = {
  GymInput?: InputMaybe<GymInput>;
};


export type MutationRemoveClimbingUserArgs = {
  gymId: Scalars['ID'];
};


export type MutationRemoveGymArgs = {
  gymId: Scalars['ID'];
};


export type MutationUnregisterGymArgs = {
  gymId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  gym?: Maybe<Gym>;
  gyms: Array<Gym>;
  me?: Maybe<Me>;
  user?: Maybe<User>;
};


export type QueryGymArgs = {
  gymId?: InputMaybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};

export type RegisterClimbingUserInput = {
  avatarImage: Scalars['String'];
  finishClimbingTime: Scalars['String'];
  gymId: Scalars['ID'];
  nickname: Scalars['String'];
  startClimbingTime: Scalars['String'];
  userId: Scalars['ID'];
};

export type RegisterGymResponse = {
  __typename?: 'RegisterGymResponse';
  message?: Maybe<Scalars['String']>;
  registerGyms?: Maybe<Array<Maybe<Gym>>>;
  status: MutateStatus;
};

export type RemoveGymResponse = {
  __typename?: 'RemoveGymResponse';
  message?: Maybe<Scalars['String']>;
  status: MutateStatus;
};

export type ResetClimbingUserResponse = {
  __typename?: 'ResetClimbingUserResponse';
  message?: Maybe<Scalars['String']>;
  status: MutateStatus;
};

export type User = {
  __typename?: 'User';
  avatarImage: Scalars['String'];
  climbingTime?: Maybe<Array<Maybe<ClimbingTime>>>;
  email?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
  registerGyms?: Maybe<Array<Maybe<GymInfo>>>;
  userId: Scalars['ID'];
};

export type UserInput = {
  avatarImage: Scalars['String'];
  nickname: Scalars['String'];
};

export type AddClimbingUserMutationVariables = Exact<{
  input: RegisterClimbingUserInput;
}>;


export type AddClimbingUserMutation = { __typename?: 'Mutation', addClimbingUser?: { __typename?: 'ClimbingUserResponse', status: MutateStatus, message: string, gym?: { __typename?: 'Gym', gymId: string, climbingUser?: Array<{ __typename?: 'ClimbingUser', userId: string, avatarImage: string, nickname: string, startClimbingTime?: string | null, finishClimbingTime?: string | null } | null> | null } | null } | null };

export type AddGymsMutationVariables = Exact<{
  name: Scalars['String'];
  place: Scalars['String'];
  CreaterInput: CreaterInput;
}>;


export type AddGymsMutation = { __typename?: 'Mutation', addGyms?: { __typename?: 'Gym', gymId: string, name: string, place: string, creater: { __typename?: 'Creater', userId: string, nickname: string, avatarImage?: string | null }, climbingUser?: Array<{ __typename?: 'ClimbingUser', userId: string } | null> | null } | null };

export type CreateUserMutationVariables = Exact<{
  nickname: Scalars['String'];
  avatarImage: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', userId: string, nickname: string, avatarImage: string } };

export type RegisterGymMutationVariables = Exact<{
  GymInput?: InputMaybe<GymInput>;
}>;


export type RegisterGymMutation = { __typename?: 'Mutation', registerGym?: { __typename?: 'MeResponse', message?: string | null, status: MutateStatus, me?: { __typename?: 'User', userId: string, nickname: string, avatarImage: string, email?: string | null, climbingTime?: Array<{ __typename?: 'ClimbingTime', finishClimbingTime?: string | null, startClimbingTime?: string | null } | null> | null, registerGyms?: Array<{ __typename?: 'GymInfo', name: string, place: string, gymId: string } | null> | null } | null } | null };

export type RemoveGymMutationVariables = Exact<{
  gymId: Scalars['ID'];
}>;


export type RemoveGymMutation = { __typename?: 'Mutation', removeGym?: { __typename?: 'RemoveGymResponse', status: MutateStatus, message?: string | null } | null };

export type UnregisterGymMutationVariables = Exact<{
  gymId: Scalars['ID'];
}>;


export type UnregisterGymMutation = { __typename?: 'Mutation', unregisterGym?: { __typename?: 'MeResponse', status: MutateStatus, message?: string | null, me?: { __typename?: 'User', userId: string, registerGyms?: Array<{ __typename?: 'GymInfo', gymId: string } | null> | null } | null } | null };

export type GymQueryVariables = Exact<{
  gymId?: InputMaybe<Scalars['ID']>;
}>;


export type GymQuery = { __typename?: 'Query', gym?: { __typename?: 'Gym', gymId: string, name: string, place: string, creater: { __typename?: 'Creater', nickname: string, avatarImage?: string | null }, climbingUser?: Array<{ __typename?: 'ClimbingUser', userId: string, nickname: string, avatarImage: string, finishClimbingTime?: string | null, startClimbingTime?: string | null } | null> | null } | null };

export type GymsQueryVariables = Exact<{ [key: string]: never; }>;


export type GymsQuery = { __typename?: 'Query', gyms: Array<{ __typename?: 'Gym', gymId: string, name: string, place: string, creater: { __typename?: 'Creater', userId: string, nickname: string, avatarImage?: string | null } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', userId: string, avatarImage: string, nickname: string, climbingTime?: Array<{ __typename?: 'ClimbingTime', gymId?: string | null, finishClimbingTime?: string | null, startClimbingTime?: string | null } | null> | null, registerGyms: Array<{ __typename?: 'GymInfo', name: string, place: string, gymId: string }> } | null };


export const AddClimbingUserDocument = gql`
    mutation AddClimbingUser($input: RegisterClimbingUserInput!) {
  addClimbingUser(input: $input) {
    status
    message
    gym {
      gymId
      climbingUser {
        userId
        avatarImage
        nickname
        startClimbingTime
        finishClimbingTime
      }
    }
  }
}
    `;
export type AddClimbingUserMutationFn = Apollo.MutationFunction<AddClimbingUserMutation, AddClimbingUserMutationVariables>;

/**
 * __useAddClimbingUserMutation__
 *
 * To run a mutation, you first call `useAddClimbingUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddClimbingUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addClimbingUserMutation, { data, loading, error }] = useAddClimbingUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddClimbingUserMutation(baseOptions?: Apollo.MutationHookOptions<AddClimbingUserMutation, AddClimbingUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddClimbingUserMutation, AddClimbingUserMutationVariables>(AddClimbingUserDocument, options);
      }
export type AddClimbingUserMutationHookResult = ReturnType<typeof useAddClimbingUserMutation>;
export type AddClimbingUserMutationResult = Apollo.MutationResult<AddClimbingUserMutation>;
export type AddClimbingUserMutationOptions = Apollo.BaseMutationOptions<AddClimbingUserMutation, AddClimbingUserMutationVariables>;
export const AddGymsDocument = gql`
    mutation AddGyms($name: String!, $place: String!, $CreaterInput: CreaterInput!) {
  addGyms(name: $name, place: $place, CreaterInput: $CreaterInput) {
    gymId
    name
    place
    creater {
      userId
      nickname
      avatarImage
    }
    climbingUser {
      userId
    }
  }
}
    `;
export type AddGymsMutationFn = Apollo.MutationFunction<AddGymsMutation, AddGymsMutationVariables>;

/**
 * __useAddGymsMutation__
 *
 * To run a mutation, you first call `useAddGymsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGymsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGymsMutation, { data, loading, error }] = useAddGymsMutation({
 *   variables: {
 *      name: // value for 'name'
 *      place: // value for 'place'
 *      CreaterInput: // value for 'CreaterInput'
 *   },
 * });
 */
export function useAddGymsMutation(baseOptions?: Apollo.MutationHookOptions<AddGymsMutation, AddGymsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddGymsMutation, AddGymsMutationVariables>(AddGymsDocument, options);
      }
export type AddGymsMutationHookResult = ReturnType<typeof useAddGymsMutation>;
export type AddGymsMutationResult = Apollo.MutationResult<AddGymsMutation>;
export type AddGymsMutationOptions = Apollo.BaseMutationOptions<AddGymsMutation, AddGymsMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($nickname: String!, $avatarImage: String!) {
  createUser(nickname: $nickname, avatarImage: $avatarImage) {
    userId
    nickname
    avatarImage
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
export const RegisterGymDocument = gql`
    mutation RegisterGym($GymInput: GymInput) {
  registerGym(GymInput: $GymInput) {
    me {
      userId
      nickname
      avatarImage
      climbingTime {
        finishClimbingTime
        startClimbingTime
      }
      email
      registerGyms {
        name
        place
        gymId
      }
    }
    message
    status
  }
}
    `;
export type RegisterGymMutationFn = Apollo.MutationFunction<RegisterGymMutation, RegisterGymMutationVariables>;

/**
 * __useRegisterGymMutation__
 *
 * To run a mutation, you first call `useRegisterGymMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterGymMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerGymMutation, { data, loading, error }] = useRegisterGymMutation({
 *   variables: {
 *      GymInput: // value for 'GymInput'
 *   },
 * });
 */
export function useRegisterGymMutation(baseOptions?: Apollo.MutationHookOptions<RegisterGymMutation, RegisterGymMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterGymMutation, RegisterGymMutationVariables>(RegisterGymDocument, options);
      }
export type RegisterGymMutationHookResult = ReturnType<typeof useRegisterGymMutation>;
export type RegisterGymMutationResult = Apollo.MutationResult<RegisterGymMutation>;
export type RegisterGymMutationOptions = Apollo.BaseMutationOptions<RegisterGymMutation, RegisterGymMutationVariables>;
export const RemoveGymDocument = gql`
    mutation RemoveGym($gymId: ID!) {
  removeGym(gymId: $gymId) {
    status
    message
  }
}
    `;
export type RemoveGymMutationFn = Apollo.MutationFunction<RemoveGymMutation, RemoveGymMutationVariables>;

/**
 * __useRemoveGymMutation__
 *
 * To run a mutation, you first call `useRemoveGymMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveGymMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeGymMutation, { data, loading, error }] = useRemoveGymMutation({
 *   variables: {
 *      gymId: // value for 'gymId'
 *   },
 * });
 */
export function useRemoveGymMutation(baseOptions?: Apollo.MutationHookOptions<RemoveGymMutation, RemoveGymMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveGymMutation, RemoveGymMutationVariables>(RemoveGymDocument, options);
      }
export type RemoveGymMutationHookResult = ReturnType<typeof useRemoveGymMutation>;
export type RemoveGymMutationResult = Apollo.MutationResult<RemoveGymMutation>;
export type RemoveGymMutationOptions = Apollo.BaseMutationOptions<RemoveGymMutation, RemoveGymMutationVariables>;
export const UnregisterGymDocument = gql`
    mutation UnregisterGym($gymId: ID!) {
  unregisterGym(gymId: $gymId) {
    status
    message
    me {
      userId
      registerGyms {
        gymId
      }
    }
  }
}
    `;
export type UnregisterGymMutationFn = Apollo.MutationFunction<UnregisterGymMutation, UnregisterGymMutationVariables>;

/**
 * __useUnregisterGymMutation__
 *
 * To run a mutation, you first call `useUnregisterGymMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnregisterGymMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unregisterGymMutation, { data, loading, error }] = useUnregisterGymMutation({
 *   variables: {
 *      gymId: // value for 'gymId'
 *   },
 * });
 */
export function useUnregisterGymMutation(baseOptions?: Apollo.MutationHookOptions<UnregisterGymMutation, UnregisterGymMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnregisterGymMutation, UnregisterGymMutationVariables>(UnregisterGymDocument, options);
      }
export type UnregisterGymMutationHookResult = ReturnType<typeof useUnregisterGymMutation>;
export type UnregisterGymMutationResult = Apollo.MutationResult<UnregisterGymMutation>;
export type UnregisterGymMutationOptions = Apollo.BaseMutationOptions<UnregisterGymMutation, UnregisterGymMutationVariables>;
export const GymDocument = gql`
    query Gym($gymId: ID) {
  gym(gymId: $gymId) {
    gymId
    name
    place
    creater {
      nickname
      avatarImage
    }
    climbingUser {
      userId
      nickname
      avatarImage
      finishClimbingTime
      startClimbingTime
    }
  }
}
    `;

/**
 * __useGymQuery__
 *
 * To run a query within a React component, call `useGymQuery` and pass it any options that fit your needs.
 * When your component renders, `useGymQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGymQuery({
 *   variables: {
 *      gymId: // value for 'gymId'
 *   },
 * });
 */
export function useGymQuery(baseOptions?: Apollo.QueryHookOptions<GymQuery, GymQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GymQuery, GymQueryVariables>(GymDocument, options);
      }
export function useGymLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GymQuery, GymQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GymQuery, GymQueryVariables>(GymDocument, options);
        }
export type GymQueryHookResult = ReturnType<typeof useGymQuery>;
export type GymLazyQueryHookResult = ReturnType<typeof useGymLazyQuery>;
export type GymQueryResult = Apollo.QueryResult<GymQuery, GymQueryVariables>;
export const GymsDocument = gql`
    query Gyms {
  gyms {
    creater {
      userId
      nickname
      avatarImage
    }
    gymId
    name
    place
  }
}
    `;

/**
 * __useGymsQuery__
 *
 * To run a query within a React component, call `useGymsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGymsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGymsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGymsQuery(baseOptions?: Apollo.QueryHookOptions<GymsQuery, GymsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GymsQuery, GymsQueryVariables>(GymsDocument, options);
      }
export function useGymsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GymsQuery, GymsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GymsQuery, GymsQueryVariables>(GymsDocument, options);
        }
export type GymsQueryHookResult = ReturnType<typeof useGymsQuery>;
export type GymsLazyQueryHookResult = ReturnType<typeof useGymsLazyQuery>;
export type GymsQueryResult = Apollo.QueryResult<GymsQuery, GymsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    userId
    avatarImage
    nickname
    climbingTime {
      gymId
      finishClimbingTime
      startClimbingTime
    }
    registerGyms {
      name
      place
      gymId
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