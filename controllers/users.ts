import { Request } from 'express';

const DB = [];

const addUser = (req, res, next) => {
    const { body } = req;

    // TODO
    // add usuario no banco
    DB.push(body.user);

    return res.status(201).data({ success: true });
}

export default { addUser };
