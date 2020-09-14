import { Request, Response } from 'express';
import axios from 'axios';
import Dev from '../models/Dev';

export default {
  async index(request: Request, response: Response) {
    const { user } = request.headers;

    const loggedDev: any = await Dev.findById(user);

    const devs = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ],
    });

    return response.json(devs);
  },

  async store(request: Request, response: Response) {
    const { username } = request.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return response.json(userExists);
    };

    const githubResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const { name, bio, avatar_url: avatar } = githubResponse.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar,
    });

    return response.json(dev);
  },
};
