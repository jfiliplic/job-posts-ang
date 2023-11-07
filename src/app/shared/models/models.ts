export interface JobPost {
  id: string;
  title: string;
  description: string;
  notes: string;
  openAt: Date;
  closeAt: Date;
  defaultAssignmentId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  interviewTypes: InterviewType[];
}

interface InterviewType {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface ModalJobPost {
    title: string;
    openAt: string;
    closeAt: string;
    interviewTypes: number;
    description: string;
    notes: string;
  }
