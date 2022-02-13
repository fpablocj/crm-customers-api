const Customer = require("../schemas/Customer")

const getCustomer = async (req, res)=>{
    try {
        const {search, limit} = req.query;
          
        const regex = new RegExp(search, "i");

        const customers = await Customer.find({ 
          $or: [{name: regex},{email: regex},{enterprise:regex}]
        }).limit(limit).sort({name: 'desc'});
    
        return res.status(200).json({
            ok: true,
            message: "",
            customers,
    
        });
        
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          ok:false,
          message:"Ocurrió un error con el servidor"
        })
        
      }
};
const createCustomer = async (req, res)=>{
    try {
        const { name, email, enterprise, phone } = req.body;

        const newCustomer = new Customer({ name, email, enterprise, phone })
        const customerSaved = await newCustomer.save()
        const customerExistsWithEmail = await Customer.exists({email: email});

        if (customerExistsWithEmail) 
        return res.status(404).json({
          ok:false,
          message:"El correo electrónico ya se encuentra registrado",
        });

        return res.status(200).json({
            ok: true,
            message: "Cliente creado con éxito",
            customer: customerSaved,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          ok:false,
          message:"Ocurrió un error con el servidor"
        })
      }
};
const updateCustomer = async (req, res)=>{
    try {
        const { id, name, email, enterprise, phone } = req.body;
    
        const userExists = await Customer.exists({_id: id})
        
        if (!userExists) 
        return res.status(404).json({
          ok:false,
          message:"No existe el cliente",
        });

        const customerExistsWithEmail = await Customer.exists({email: email});
        if (customerExistsWithEmail) 
        return res.status(404).json({
          ok:false,
          message:"El correo electrónico ya se encuentra registrado",
        });


        const customerUpdated = await Customer.findByIdAndUpdate(id,{
          $set: { name, email, enterprise, phone },
          },
          {new: true}
        );
    
        return res.status(200).json({
            ok: true,
            message: "Cliente actualizado con éxito",
            customer: customerUpdated,
    
        })
        
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          ok:false,
          message:"Ocurrió un error con el servidor"
        })
        
      }
};
const deleteCustomer = async (req, res) => {
    try {
      const {id} = req.body;
  
      const userExists = await Customer.exists({_id: id})
      
      if (!userExists) 
      return res.status(404).json({
        ok:false,
        message:"No existe el cliente"
      });
      const customerDeleted = await Customer.deleteOne({_id: id});
  
      return res.status(200).json({
          ok: true,
          message: "Cliente eliminado con éxito",
          customer: {_id: id, ...customerDeleted },
  
      })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        ok: false,
        message:"Ocurrió un error con el servidor"
      });
    }
  };

module.exports = {getCustomer, createCustomer, updateCustomer, deleteCustomer};