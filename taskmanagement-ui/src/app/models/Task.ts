import { User } from './User';
import { Status } from './Status';
import { Priority } from './Priority';

export class Task {
  assignmentId: number;
  assignmentIsDeleted: boolean;
  assignmentDescription: string;
  assignmentPhotoAttach: string;
  assignmentTitle: string;
  priorityAssignment: Priority;
  statusAssignment: Status;
  userAssignment: User;
  assignmentEndDate: string;
  assignmentStartDate: string;
}
