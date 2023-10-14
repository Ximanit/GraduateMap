const User = require('./model/User')
const Roles = require('./model/Roles')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    validationResult
} = require('express-validator')
const {
    secret
} = require('./config')

const generateAccesToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {
        expiresIn: "24h"
    })
}

class authController {
    async registr(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Error at registration",
                    errors
                })
            }
            const {
                username,
                password
            } = req.body
            const candidate = await User.findOne({
                username
            })
            if (candidate) {
                return res.status(400).json({
                    message: "User with this name now have"
                })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Roles.findOne({
                value: "ADMIN"
            })
            const user = new User({
                username,
                password: hashPassword,
                roles: [userRole.value]
            })
            await user.save()
            return res.json({
                message: "User register sucsesfull"
            })
        } catch (error) {
            console.log(error)
        }
    }
    async login(req, res) {
        try {
            const {
                username,
                password
            } = req.body

            // // Проверка username с использованием регулярного выражения
            // const usernameRegex = /^([\w]+\.?)+(?<!\.)@(?!\.)[a-zа-я0-9ё\.-]+\.?[a-zа-яё]{2,}$/ui;
            // if (!usernameRegex.test(username)) {
            //     return res.status(400).json({
            //         message: "Некорректный формат логина"
            //     })
            // }

            // // Проверка пароля с использованием регулярного выражения
            // const passwordRegex = /^[a-zA-Z._0-9]+$/;
            // if (!passwordRegex.test(password)) {
            //     return res.status(400).json({
            //         message: "Пароль должен содержать только буквы a-z, A-Z, цифры 0-9, точку (.) и символ подчеркивания (_)"
            //     })
            // }

            const user = await User.findOne({
                username
            })

            if (!user) {
                return res.status(400).json({
                    message: `Пользователь с логином ${username} не найден`
                })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({
                    message: `Пароль не правильный`
                })
            }
            const name = user.name;
            const user_id = user._id;
            const roles = user.roles;
            const token = generateAccesToken(user._id, user.roles)
            return res.json({
                token: token,
                name: name,
                roles: roles,
                id: user_id,
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Ошибка при авторизации'
            })
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Error with login'
            })
        }
    }
    async getRoles(req, res) {
        try {
            const users = await Roles.find()
            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Error with login'
            })
        }
    }
    async upadate(req, res) {
        const {
            id,
            newRole
        } = req.body
        try {
            await User.findByIdAndUpdate(id, {
                roles: newRole
            });
            res.status(200).json({
                message: "User role update succesfully!"
            });
        } catch (err) {
            res.status(404).json({
                message: err.message
            });
        }
    }
    async addNewRole(req, res) {
        try {
            const {
                rolesName
            } = req.body
            const role = await Roles.findOne({
                rolesName
            })
            if (role) {
                return res.json({
                    message: `This role have now`
                })
            }
            const roles = new Roles({
                value: rolesName
            })
            await roles.save()
            res.status(200).json({
                message: 'New role add succesfully'
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Error with new roles'
            })
        }
    }
}

module.exports = new authController()