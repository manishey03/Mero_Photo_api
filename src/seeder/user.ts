import UserModel from '../modules/user/model/user.model';

//
import { UserRole } from '../modules/user/type';
import { hashPassword } from '../utils/password.utils';

/**
 * FOR CREATE ADMIN:
 */
export async function createAdminUser() {
  const isAdminExist = await UserModel.countDocuments({ email: 'admin@gmail.com' });
  const isPhotographerExist = await UserModel.countDocuments({ email: 'photographer@gmail.com' });
  const isUserExist = await UserModel.countDocuments({ email: 'user@gmail.com' });
  if (isAdminExist && isPhotographerExist && isUserExist) return;

  const password = await hashPassword('Pass@123');
  //
  await UserModel.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@gmail.com',
    password,
    role: UserRole.ADMIN,
  });

  await UserModel.create({
    firstName: 'Photographer',
    lastName: 'User',
    email: 'photographer@gmail.com',
    password,
    role: UserRole.PHOTOGRAPHER,
  });

  await UserModel.create({
    firstName: 'User',
    lastName: 'Surname',
    email: 'user@gmail.com',
    password,
    role: UserRole.USER,
  });
}
