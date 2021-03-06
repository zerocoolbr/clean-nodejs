import { injectable, inject } from 'tsyringe';
import {
  AddRole,
  DeleteRole,
  ListRoles,
  UpdateRole,
} from '../../../domain/usecases/role';
import { Controller, Delete, Get, Post, Put } from '../../decorators';
import { ok } from '../../helper';
import { validatorMiddleware } from '../../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../../protocols';
import {
  createRoleSchema,
  deleteRoleSchema,
  listRolesSchema,
  updateRoleSchema,
} from './schemas';

@injectable()
@Controller('/role')
export class RoleController extends BaseController {
  constructor(
    @inject('AddRole')
    private addAnRole: AddRole,
    @inject('DeleteRole')
    private deleteAnRole: DeleteRole,
    @inject('ListRoles')
    private listAllRoles: ListRoles,
    @inject('UpdateRole')
    private updateAnRole: UpdateRole
  ) {
    super();
  }

  @Get('/', [validatorMiddleware(listRolesSchema)])
  async listRoles(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.listAllRoles.list();

    return ok(response);
  }

  @Post('/', [validatorMiddleware(createRoleSchema)])
  async createRole(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addAnRole.add(req.body);

    return ok(response);
  }

  @Put('/', [validatorMiddleware(updateRoleSchema)])
  async updateRole(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.updateAnRole.update(req.body);

    return ok(response);
  }

  @Delete('/', [validatorMiddleware(deleteRoleSchema)])
  async deleteRole(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.deleteAnRole.delete(req.body);

    return ok({ success: response });
  }
}
