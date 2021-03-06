import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { string } from 'joi';
import { RoleSchema } from '../role';

@modelOptions({
  schemaOptions: {
    _id: false,
    collection: 'account',
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
  },
})
export class AccountSchema extends Base<string> {
  @prop()
  public _id: string;

  @prop()
  public name: string;

  @prop()
  public email: string;

  @prop()
  public password: string;

  @prop({ ref: RoleSchema, type: String })
  public roles: Ref<RoleSchema>[];

  @prop()
  public created_at: Date;

  @prop()
  public updated_at: Date;

  @prop()
  public deleted_at: Date | null;
}
