import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { TblUsersService } from 'src/modules/database/services/tbl_users.service';
import { StudentService } from 'src/modules/student/student.service';
import { tblUserDocument } from 'src/modules/database/schema';
import { Student } from 'src/modules/student/student.schema';
import { PolicyHandler } from 'src/common/interfaces/ipolicy-handler.interface';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';
@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
        // private usersService: UsersService,
        // private studentService: StudentService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const policyHandlers =
            this.reflector.get<PolicyHandler[]>(
                CHECK_POLICIES_KEY,
                context.getHandler(),
            ) || [];

        const { user } = context.switchToHttp().getRequest();
        const ability = await this.caslAbilityFactory.createForUser(user);
        // const userData = await this.usersService.findOne({_id: user._id});
        // const articleCheck = new Article();
        // articleCheck.isPublished = article.isPublished;
        // articleCheck.status = article.status;

        // if (user) {
        //     articleCheck.author =
        //         article?.author?._id.toString() || article.author.toString();
        // }
        return policyHandlers.every((handler) =>
            this.execPolicyHandler(handler, ability),
        );
    }

    private execPolicyHandler(
        handler: PolicyHandler,
        ability: AppAbility,
        // user: User,
    ) {
        if (typeof handler === 'function') {
            return handler(ability);
        }
        return handler.handle(ability);
    }
}