  // 登入頁
export enum Routes {
  'login' = '/',
}

// Dashboard
export enum DashboardRoutes {
  'sheep' = '/dashboard/sheep',
  'friend' = '/dashboard/friend',
  // 個人資料
  'profile' = '/dashboard/profile',
  'profileEmailVerify' = '/dashboard/profile/emailVerify',

  'createAccount' = '/dashboard/createAccount',

  // 管理員
  'admin' = '/dashboard/admin',
  'adminDistrict' = '/dashboard/admin/district',
  'adminSerialNumber' = '/dashboard/admin/serialNumber',
  'adminUsers' = '/dashboard/admin/users'
}
