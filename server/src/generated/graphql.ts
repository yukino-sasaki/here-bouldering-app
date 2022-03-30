import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  name: Scalars['String'];
  userId: Scalars['ID'];
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
};

export type Mutation = {
  __typename?: 'Mutation';
  addClimbingUser?: Maybe<AddClimbingUserResponse>;
  createUser?: Maybe<User>;
  editMe?: Maybe<EditMeResponse>;
  registerGym?: Maybe<RegisterGymResponse>;
  removeClimbingUser?: Maybe<RemoveClimbingUserResponse>;
  removeGym?: Maybe<RemoveGymResponse>;
};


export type MutationAddClimbingUserArgs = {
  userId: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationRemoveClimbingUserArgs = {
  userId: Scalars['ID'];
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

export type User = {
  __typename?: 'User';
  avatarImage?: Maybe<Scalars['String']>;
  finishClimbingTime?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  startClimbingTime?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddClimbingUserResponse: ResolverTypeWrapper<AddClimbingUserResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateUserInput: CreateUserInput;
  EditMeResponse: ResolverTypeWrapper<EditMeResponse>;
  Gym: ResolverTypeWrapper<Gym>;
  Gyms: ResolverTypeWrapper<Gyms>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Me: ResolverTypeWrapper<Me>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterGymResponse: ResolverTypeWrapper<RegisterGymResponse>;
  RemoveClimbingUserResponse: ResolverTypeWrapper<RemoveClimbingUserResponse>;
  RemoveGymResponse: ResolverTypeWrapper<RemoveGymResponse>;
  ResetClimbingUserResponse: ResolverTypeWrapper<ResetClimbingUserResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddClimbingUserResponse: AddClimbingUserResponse;
  Boolean: Scalars['Boolean'];
  CreateUserInput: CreateUserInput;
  EditMeResponse: EditMeResponse;
  Gym: Gym;
  Gyms: Gyms;
  ID: Scalars['ID'];
  Me: Me;
  Mutation: {};
  Query: {};
  RegisterGymResponse: RegisterGymResponse;
  RemoveClimbingUserResponse: RemoveClimbingUserResponse;
  RemoveGymResponse: RemoveGymResponse;
  ResetClimbingUserResponse: ResetClimbingUserResponse;
  String: Scalars['String'];
  User: User;
};

export type AddClimbingUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddClimbingUserResponse'] = ResolversParentTypes['AddClimbingUserResponse']> = {
  climbingUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditMeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditMeResponse'] = ResolversParentTypes['EditMeResponse']> = {
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GymResolvers<ContextType = any, ParentType extends ResolversParentTypes['Gym'] = ResolversParentTypes['Gym']> = {
  climbingUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  creater?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  gymId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GymsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Gyms'] = ResolversParentTypes['Gyms']> = {
  gyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gym']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = {
  avatarImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finishClimbingTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registerGyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gym']>>>, ParentType, ContextType>;
  startClimbingTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addClimbingUser?: Resolver<Maybe<ResolversTypes['AddClimbingUserResponse']>, ParentType, ContextType, RequireFields<MutationAddClimbingUserArgs, 'userId'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  editMe?: Resolver<Maybe<ResolversTypes['EditMeResponse']>, ParentType, ContextType>;
  registerGym?: Resolver<Maybe<ResolversTypes['RegisterGymResponse']>, ParentType, ContextType>;
  removeClimbingUser?: Resolver<Maybe<ResolversTypes['RemoveClimbingUserResponse']>, ParentType, ContextType, RequireFields<MutationRemoveClimbingUserArgs, 'userId'>>;
  removeGym?: Resolver<Maybe<ResolversTypes['RemoveGymResponse']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  gym?: Resolver<Maybe<ResolversTypes['Gym']>, ParentType, ContextType, Partial<QueryGymArgs>>;
  gyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gym']>>>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
};

export type RegisterGymResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterGymResponse'] = ResolversParentTypes['RegisterGymResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registerGyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gym']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveClimbingUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveClimbingUserResponse'] = ResolversParentTypes['RemoveClimbingUserResponse']> = {
  climbingUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveGymResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveGymResponse'] = ResolversParentTypes['RemoveGymResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registerGyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gym']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetClimbingUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetClimbingUserResponse'] = ResolversParentTypes['ResetClimbingUserResponse']> = {
  climbingUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatarImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finishClimbingTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startClimbingTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddClimbingUserResponse?: AddClimbingUserResponseResolvers<ContextType>;
  EditMeResponse?: EditMeResponseResolvers<ContextType>;
  Gym?: GymResolvers<ContextType>;
  Gyms?: GymsResolvers<ContextType>;
  Me?: MeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterGymResponse?: RegisterGymResponseResolvers<ContextType>;
  RemoveClimbingUserResponse?: RemoveClimbingUserResponseResolvers<ContextType>;
  RemoveGymResponse?: RemoveGymResponseResolvers<ContextType>;
  ResetClimbingUserResponse?: ResetClimbingUserResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

