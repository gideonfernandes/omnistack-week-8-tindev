import { Request, Response } from 'express';
import Dev from '../models/Dev';

export default {
  async store(request: Request, response: Response) {
    const { user } = request.headers;
    const { devId } = request.params;

    const loggedDev: any = await Dev.findById(user);
    const targetDev: any = await Dev.findById(devId);

    if (!targetDev) {
      return response.status(400).json({ error: 'Dev not exists.' });
    };

    if (!loggedDev) {
      return response.status(401)
        .json({ error: 'Only valid logged devs can do this.' });
    };
   
    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();
    return response.json(loggedDev);
  },
};
