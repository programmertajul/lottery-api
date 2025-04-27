const router = require('express').Router();
const userController = require('../controller/users');


/**
 * get allusersBy id
 */

router.get('/:userId', userController.getUserById);

/**
 * update userby id
 */

router.put('/:userId', userController.putUserById);


/**
 * update userby id
 */

router.patch('/:userId', userController.patchUserById);


/**
 * update userby id
 */

router.delete('/:userId', userController.deleteUserById);



router.get('/', userController.getUsers);


router.post('/', userController.postUser);






module.exports = router;
