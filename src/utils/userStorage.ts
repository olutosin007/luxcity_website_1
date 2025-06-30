export function getUser() {
  let id = localStorage.getItem('user_id');
  let name = localStorage.getItem('user_name');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('user_id', id);
  }
  return { id, name: name || '' };
}

export function setUserName(name: string) {
  localStorage.setItem('user_name', name);
} 