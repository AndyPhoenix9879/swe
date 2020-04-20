import { getRepository } from "typeorm";
import { User } from "../entity/User";
import UserDto from "src/dtos/userDto";

class UserService {
     private userRepository = getRepository(User);

     public getUserInfoByUID = async (userId: string) => {
          const user = await this.userRepository
                                 .findOne({
                                      where: { id: userId }
                                 });
          if (user) {
               user.password = "";
          }
          return user;
     }

     public getUserByEmail = async (userEmail: string) => {
          const user = await this.userRepository
                                 .findOne({
                                      email: userEmail
                                 });
          return user;
     }

     public insertUser = async (userData: UserDto, hashedPassword: string) => {
          const user = await this.userRepository
                                 .create({
                                      ...userData,
                                      password: hashedPassword
                                 })
                                 .save();
          return user;
     }

     public updateUserPassword = async (userId: string, password: string) => {
          const result = await this.userRepository
                                   .createQueryBuilder("user")
                                   .update(User)
                                   .set({
                                        password: password
                                   })
                                   .where(`id = :userId`, {
                                        userId: userId
                                   })
                                   .execute();
          return result;
     }
}

export default UserService;