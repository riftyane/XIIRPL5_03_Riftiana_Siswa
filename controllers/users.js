const User = require('../models/user')

module.exports = {
    // get all users
    index: async(req, res) => {
        try {
            const users = await User.find()
            if(users.length > 0){
                res.status(200).json({
                    status: true,
                    data: users,
                    method: req.method,
                    url: req.url
                })
            
            }else{
                res.json({
                    status: false,
                    message: "Data masih kosong"
                })
        }
        } catch (error){
            res.status(400).json({success: false})
        }
      },
      // get a user
      show: async (req, res) => {
        try {
            const users = await User.findById(res.params.id, req.body)
            res.json({
                status: true,
                data: users,
                method: req.method,
                url: req.url,
                message: "Data berhasil didapat"
            })
        } catch (error) {
            res.status(400).json({success: false})
        }
    },
      store: async (req, res) => {
        try {
            const users = await User.create(req.body)
            res.status(200).json({
                status: true,
                data: users,
                method: req.method,
                url: req.url,
                message: "Data berhasil ditambahkan"
            })
        } catch (error) {
            res.status(400).json({success: false})
        }
      },
      update: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const users = await User.findByIdAndUpdate( id, body, {
                new: true,
                runValidators: true
            })
            res.json({
                status: true,
                data: users,
                method: req.method,
                url: req.url,
                message: "Data berhasil diubah"
            })
        } catch (error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                const duplicateKey = Object.keys(error.keyValue)[0];
                let errorMessage;
                switch (duplicateKey) {
                    case 'email':
                        errorMessage = 'Email sudah digunakan oleh pengguna lain';
                        break;
                    case 'nis':
                        errorMessage = 'NIS sudah digunakan oleh pengguna lain';
                        break;
                    case 'nama':
                        errorMessage = 'Nama sudah digunakan oleh pengguna lain';
                        break;
                    default:
                        errorMessage = 'Error! Ga tau error apa wkwkw';
                }
    
                res.status(400).json({
                    success: false,
                    message: errorMessage,
                });
            } else {
                console.log(error);
                res.status(400).json({ success: false });
            }
        }
       }, 
       delete: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.json({
                status: true,
                method: req.method,
                url: req.url,
                message: "Data berhasil dihapus"
            })
        }catch (error){
            console.log(error);
            res.status(400).json({ success: false });
        }
    }
}