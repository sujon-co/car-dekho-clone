import { NextApiRequest, NextApiResponse } from 'next';
import DBConnect from 'server/database';
import Car from 'server/model/Car';

DBConnect();

const carHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === 'POST') {
        try {
            const car = await Car.create(body);
            res.status(201).json({
                success: true,
                data: car,
                message: 'Car created successfully',
            });
        } catch (error) {
            const { message } = error as Error;
            res.status(201).json({
                success: false,
                data: null,
                message,
            });
        }
    } else if (method === 'GET') {
        try {
            const cars = await Car.find({});
            res.status(200).json({
                success: true,
                data: cars,
                message: '',
            });
        } catch (error) {
            const { message } = error as Error;
            res.status(200).json({
                success: false,
                data: null,
                message,
            });
        }
    }
};

export default carHandler;