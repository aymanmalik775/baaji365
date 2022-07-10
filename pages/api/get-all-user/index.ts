import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../../DB/conntection';
import User from '../../../DB/models/UserSchema';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDB();
  const catcher = (error: Error) => res.status(400).json({ error });
  const response = await User.find().catch(catcher);
  res.status(200).json({
    status: 'success',
    data: response
  });
};

export default handler;
