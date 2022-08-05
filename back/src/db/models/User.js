import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ id: userId }).lean();
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async addFollowing({ userId, followingOid }) {
    const filter = { id: userId };
    const update = {
      $set: { followings: { following: followingOid } },
    };
    const option = { upsert: true, returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedUser;
  }

  static async addFollower({ followingId, userOid }) {
    const filter = { id: followingId };
    const update = {
      $set: { followers: { follower: userOid } },
    };
    const option = { upsert: true, returnOriginal: false };

    const updatedFollower = UserModel.findOneAndUpdate(filter, update, option);

    return updatedFollower;
  }

  static async deleteFollowing({ userId, followingOid }) {
    const filter = { id: userId };
    const update = {
      $pull: { followings: { following: followingOid } },
    };
    const option = { upsert: true, returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedUser;
  }

  static async deleteFollower({ followingId, userOid }) {
    const filter = { id: followingId };
    const update = {
      $pull: { followers: { follower: userOid } },
    };
    const option = { upsert: true, returnOriginal: false };

    const updatedFollower = UserModel.findOneAndUpdate(filter, update, option);

    return updatedFollower;
  }
}

export { User };
