import { Injectable } from '@nestjs/common';
import { BasicUserInfo, FriendsInfo, UserInfo } from './user.interface';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Finds user by username
  async findUser(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  findUserByUserId(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['friends'],
    });
  }

  async addFriendsToAUser(userId: number, friendsId: number[]) {
    const friends = await this.userRepository.findBy({ id: In(friendsId) });
    const user = await this.findUserByUserId(userId);
    user.friends = [...user.friends, ...friends];
    return this.userRepository.save(user);
  }

  async removeFriendsToAUser(userId: number, friendsId: number[]) {
    const user = await this.findUserByUserId(userId);
    user.friends = user.friends.filter((friend) =>
      friendsId.includes(friend.id),
    );
    return this.userRepository.save(user);
  }

  async updateUser(id: number, userInfo: UserInfo) {
    const { friends, ...userInformation } = userInfo;
    if (friends && friends.length > 0) {
      await this.addFriendsToAUser(id, friends);
    }
    return this.userRepository.update(id, userInformation);
  }

  async updateUserFriendList(id: number, friendInfo: FriendsInfo) {
    return this.removeFriendsToAUser(id, friendInfo.friends);
  }

  register(userInfo: BasicUserInfo) {
    const user = this.userRepository.create(userInfo);
    return this.userRepository.save(user);
  }
}