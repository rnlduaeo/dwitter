import * as userRepository from '../data/auth.js';
import * as jwt from '../data/jwt.js';

const AUTH_ERROR = {
    'message': 'Authentication Error',
}

// function 앞에 async가 붙으면 return data가 다 promise 형태로 반환됨. tweetRepository.get().then을 쓰거나 또는 앞에 await을 붙여주면 됨. 
export async function signUp(req, res) {
    const userData = req.body;

    if (await userRepository.foundByUsername(userData.username)) {
        return res.status(409).json({ "message": `the username ${userData.username} already exists` });
    }

    const username = await userRepository.create(userData);

    const token = jwt.createJwt(username);

    return res.status(201).json({ 'username': username, 'token': token });
}

export async function signIn(req, res) {
    const userData = req.body;

    if (!await userRepository.foundByUsername(userData.username) || !await userRepository.isPasswordRight(userData)) {
        return res.status(404).json({ "message": "username or password is incorrect!" });
    }
    const foundUser = await userRepository.foundByUsername(userData.username);
    const token = jwt.createJwt(foundUser.username);
    return res.status(200).json({ 'username': foundUser.username, 'token': token });
}

export async function isAuth(req, res) {
    const userData = await userRepository.foundByUsername(req.username);
    const token = req.get('Authorization').split(' ')[1];
    if (!userData) {
        res.status(401).json(AUTH_ERROR);
    } else {
        res.status(200).json({username: userData.username, token: token});
    }

}




