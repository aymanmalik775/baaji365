import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../../DB/conntection';
import User, { IUser } from '../../../DB/models/UserSchema';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDB();
  const catcher = (error: Error) => res.status(400).json({ error });
  const user: IUser = await User.create(req.body).catch(catcher);
  res.status(200).json({
    status: 'success',
    data: user
  });
};

export default handler;
