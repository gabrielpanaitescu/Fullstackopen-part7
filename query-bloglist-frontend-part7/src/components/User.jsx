const User = ({ user }) => (
  <tr key={user.id}>
    <td>{user.name}</td>
    <td>{user.blogs.length}</td>
  </tr>
);

export default User;
