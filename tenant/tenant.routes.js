const UserController = require('../controllers/userController')

const router = require('express').Router()

router.post('/:tenantDbName/addUser', UserController.addUser)
router.get('/:tenantDbName/allUser', UserController.getAllUser)
router.get('/:tenantDbName/showUser/:id', UserController.getOneUser)
router.put('/:tenantDbName/updateUser/:id', UserController.UpdateUser)
router.delete('/:tenantDbName/deleteUser/:id', UserController.DeleteUser)

module.exports = router