import {prop, Typegoose} from "typegoose";
import {Arg, Args, ArgsType, Ctx, Field, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import "reflect-metadata"

@ObjectType({ description: 'Task model' })
@ArgsType()
export class Task extends Typegoose {

    @prop()
    @Field(type => String, { nullable: false })
    description?: string;

    @prop()
    @Field(type => String, { nullable: false })
    user?: string;

    @Field(type => String, { nullable: true })
    _id?: string
}

export const TaskSchema = new Task().getModelForClass(Task, {
    schemaOptions: {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
});

@Resolver(of => Task)
export class TaskQuery {
    @Query(returns => Task)
    async task(
        @Arg("id", type => String) _id: string,
        @Ctx() ctx: any
    ) {
        return await TaskSchema.findById({_id})
    }

    @Query(returns => [Task])
    async tasks() {
        return await TaskSchema.find({})
    }
}

@Resolver(of => Task)
export class TaskMutation {

    @Mutation(returns => Task)
    async task(
        @Args() Task: Task
    ) {
        return await new TaskSchema(Task).save();
    }
}
