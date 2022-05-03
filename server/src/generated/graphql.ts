import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../context';
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
  userId: Scalars['ID'];
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
  userId: Scalars['ID'];
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
  registerGym?: Maybe<RegisterGymResponse>;
  removeClimbingUser?: Maybe<ClimbingUserResponse>;
  removeGym?: Maybe<RemoveGymResponse>;
  resetClimbingUser?: Maybe<ResetClimbingUserResponse>;
  unregisterGym?: Maybe<RegisterGymResponse>;
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
  userId: Scalars['ID'];
};

export type RegisterClimbingUserInput = {
  avatarImage: Scalars['String'];
  finishClimbingTime: Scalars['String'];
  gymId: Scalars['ID'];
  name: Scalars['String'];
  nickname: Scalars['String'];
  startClimbingTime: Scalars['String'];
  userId: Scalars['ID'];
};

export type RegisterGymResponse = {
  __typename?: 'RegisterGymResponse';
  message?: Maybe<Scalars['String']>;
  registerGyms?: Maybe<Array<Maybe<GymInfo>>>;
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ClimbingTime: ResolverTypeWrapper<ClimbingTime>;
  ClimbingUser: ResolverTypeWrapper<ClimbingUser>;
  ClimbingUserResponse: ResolverTypeWrapper<ClimbingUserResponse>;
  Creater: ResolverTypeWrapper<Creater>;
  CreaterInput: CreaterInput;
  EditClimbingTimeInput: EditClimbingTimeInput;
  Gym: ResolverTypeWrapper<Gym>;
  GymInfo: ResolverTypeWrapper<GymInfo>;
  GymInput: GymInput;
  Gyms: ResolverTypeWrapper<Gyms>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Me: ResolverTypeWrapper<Me>;
  MeResponse: ResolverTypeWrapper<MeResponse>;
  MutateStatus: MutateStatus;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterClimbingUserInput: RegisterClimbingUserInput;
  RegisterGymResponse: ResolverTypeWrapper<RegisterGymResponse>;
  RemoveGymResponse: ResolverTypeWrapper<RemoveGymResponse>;
  ResetClimbingUserResponse: ResolverTypeWrapper<ResetClimbingUserResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ClimbingTime: ClimbingTime;
  ClimbingUser: ClimbingUser;
  ClimbingUserResponse: ClimbingUserResponse;
  Creater: Creater;
  CreaterInput: CreaterInput;
  EditClimbingTimeInput: EditClimbingTimeInput;
  Gym: Gym;
  GymInfo: GymInfo;
  GymInput: GymInput;
  Gyms: Gyms;
  ID: Scalars['ID'];
  Me: Me;
  MeResponse: MeResponse;
  Mutation: {};
  Query: {};
  RegisterClimbingUserInput: RegisterClimbingUserInput;
  RegisterGymResponse: RegisterGymResponse;
  RemoveGymResponse: RemoveGymResponse;
  ResetClimbingUserResponse: ResetClimbingUserResponse;
  String: Scalars['String'];
  User: User;
  UserInput: UserInput;
};

export type ClimbingTimeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ClimbingTime'] = ResolversParentTypes['ClimbingTime']> = {
  finishClimbingTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gymId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startClimbingTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClimbingUserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ClimbingUser'] = ResolversParentTypes['ClimbingUser']> = {
  avatarImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  finishClimbingTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startClimbingTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClimbingUserResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ClimbingUserResponse'] = ResolversParentTypes['ClimbingUserResponse']> = {
  gym?: Resolver<Maybe<ResolversTypes['Gym']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutateStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreaterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Creater'] = ResolversParentTypes['Creater']> = {
  avatarImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GymResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Gym'] = ResolversParentTypes['Gym']> = {
  climbingUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['ClimbingUser']>>>, ParentType, ContextType>;
  creater?: Resolver<ResolversTypes['Creater'], ParentType, ContextType>;
  gymId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  place?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GymInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GymInfo'] = ResolversParentTypes['GymInfo']> = {
  gymId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  place?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GymsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Gyms'] = ResolversParentTypes['Gyms']> = {
  gyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gym']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = {
  avatarImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  climbingTime?: Resolver<Maybe<Array<Maybe<ResolversTypes['ClimbingTime']>>>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registerGyms?: Resolver<Array<ResolversTypes['GymInfo']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MeResponse'] = ResolversParentTypes['MeResponse']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutateStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addClimbingUser?: Resolver<Maybe<ResolversTypes['ClimbingUserResponse']>, ParentType, ContextType, RequireFields<MutationAddClimbingUserArgs, 'input'>>;
  addGyms?: Resolver<Maybe<ResolversTypes['Gym']>, ParentType, ContextType, RequireFields<MutationAddGymsArgs, 'CreaterInput' | 'name' | 'place'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'avatarImage' | 'nickname'>>;
  editClimbingUser?: Resolver<Maybe<ResolversTypes['ClimbingUserResponse']>, ParentType, ContextType, Partial<MutationEditClimbingUserArgs>>;
  editMe?: Resolver<Maybe<ResolversTypes['MeResponse']>, ParentType, ContextType, RequireFields<MutationEditMeArgs, 'input'>>;
  registerGym?: Resolver<Maybe<ResolversTypes['RegisterGymResponse']>, ParentType, ContextType, Partial<MutationRegisterGymArgs>>;
  removeClimbingUser?: Resolver<Maybe<ResolversTypes['ClimbingUserResponse']>, ParentType, ContextType, RequireFields<MutationRemoveClimbingUserArgs, 'gymId'>>;
  removeGym?: Resolver<Maybe<ResolversTypes['RemoveGymResponse']>, ParentType, ContextType, RequireFields<MutationRemoveGymArgs, 'gymId'>>;
  resetClimbingUser?: Resolver<Maybe<ResolversTypes['ResetClimbingUserResponse']>, ParentType, ContextType>;
  unregisterGym?: Resolver<Maybe<ResolversTypes['RegisterGymResponse']>, ParentType, ContextType, RequireFields<MutationUnregisterGymArgs, 'gymId'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  gym?: Resolver<Maybe<ResolversTypes['Gym']>, ParentType, ContextType, Partial<QueryGymArgs>>;
  gyms?: Resolver<Array<ResolversTypes['Gym']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
};

export type RegisterGymResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterGymResponse'] = ResolversParentTypes['RegisterGymResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registerGyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['GymInfo']>>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutateStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveGymResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RemoveGymResponse'] = ResolversParentTypes['RemoveGymResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutateStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetClimbingUserResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResetClimbingUserResponse'] = ResolversParentTypes['ResetClimbingUserResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutateStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatarImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  climbingTime?: Resolver<Maybe<Array<Maybe<ResolversTypes['ClimbingTime']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registerGyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['GymInfo']>>>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  ClimbingTime?: ClimbingTimeResolvers<ContextType>;
  ClimbingUser?: ClimbingUserResolvers<ContextType>;
  ClimbingUserResponse?: ClimbingUserResponseResolvers<ContextType>;
  Creater?: CreaterResolvers<ContextType>;
  Gym?: GymResolvers<ContextType>;
  GymInfo?: GymInfoResolvers<ContextType>;
  Gyms?: GymsResolvers<ContextType>;
  Me?: MeResolvers<ContextType>;
  MeResponse?: MeResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterGymResponse?: RegisterGymResponseResolvers<ContextType>;
  RemoveGymResponse?: RemoveGymResponseResolvers<ContextType>;
  ResetClimbingUserResponse?: ResetClimbingUserResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

