import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/common/enums/action.enum';
import { IPolicyHandler } from 'src/common/interfaces/ipolicy-handler.interface';
import { Student } from 'src/modules/student/student.schema'; 

export class ReadStudentPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Student);
  }
}
