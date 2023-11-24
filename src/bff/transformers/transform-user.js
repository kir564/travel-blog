export const transformUser = ({
  id,
  login,
  password,
  registered_at,
  role_id,
}) => ({
  id,
  login,
  password,
  registeredAt: registered_at,
  roleId: role_id,
});
