export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  isRegistered: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  isEdited: boolean;
  isDeleted?: boolean;
} 