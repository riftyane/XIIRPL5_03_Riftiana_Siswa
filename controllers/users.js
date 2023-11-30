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
            const users = await User.findByIdAndUpdate( req.body, {
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
            res.status(400).json({success: false})
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
            res.status(400).json({sucsess: false})
        }
    }
}