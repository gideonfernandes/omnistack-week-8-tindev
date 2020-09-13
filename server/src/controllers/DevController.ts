import { Request, Response } from 'express';
import axios from 'axios';
import Dev from '../models/Dev';

export default {
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
  }
};
