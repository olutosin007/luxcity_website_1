import { openDB } from 'idb';
import { Comment } from '../types/comment';

const DB_NAME = 'blog_comments';
const STORE = 'comments';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('postId', 'postId');
      }
    },
  });
}

export async function addComment(comment: Comment) {
  const db = await getDB();
  await db.put(STORE, comment);
}

export async function getComments(postId: string): Promise<Comment[]> {
  const db = await getDB();
  return (await db.getAllFromIndex(STORE, 'postId', postId)).filter(c => !c.isDeleted);
}

export async function updateComment(comment: Comment) {
  const db = await getDB();
  await db.put(STORE, comment);
}

export async function deleteComment(id: string) {
  const db = await getDB();
  const comment = await db.get(STORE, id);
  if (comment) {
    comment.isDeleted = true;
    await db.put(STORE, comment);
  }
} 