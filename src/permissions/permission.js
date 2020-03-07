import { permissions as accPermissions } from './accountSettings';

export const roles = {
  master_admin: {
    permissions: [
      ...accPermissions.master_admin,
      ...accPermissions.admin,
      ...accPermissions.staff,
      ...accPermissions.junior_staff
    ]
  },
  admin: {
    permissions: [
      ...accPermissions.admin,
      ...accPermissions.staff,
      ...accPermissions.junior_staff
    ]
  },
  staff: {
    permissions: [
      ...accPermissions.staff,
      ...accPermissions.junior_staff
    ]
  },
  junior_staff: {
    permissions: [...accPermissions.junior_staff]
  }
}
