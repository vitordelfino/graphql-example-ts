import {prop, Typegoose} from "typegoose";
import {Arg, Args, ArgsType, Ctx, Field, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import "reflect-metadata"

@ObjectType({ description: 'User model' })
@ArgsType()
export class User extends Typegoose {

    @prop()
    @Field(type => String, { nullable: false })
    name?: string;

    @prop()
    @Field(type => String, { nullable: false })
    email?: string

    @Field(type => String, { nullable: true })
    _id?: string
}

export const UserSchema = new User().getModelForClass(User, {
    schemaOptions: {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
});

@Resolver(of => User)
export class UserQuery {
    @Query(returns => User)
    async user(
        @Arg("id", type => String) _id: string,
        @Ctx() ctx: any
    ) {
        return await UserSchema.findById({_id})
    }

    @Query(returns => [User])
    async users() {
        return await UserSchema.find({})
    }
}

@Resolver(of => User)
export class UserMutation {

    @Mutation(returns => User)
    async user(
        @Args() user: User
    ) {
        return await new UserSchema(user).save();
    }
}
