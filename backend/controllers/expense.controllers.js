import EXPENSE from "../model/expense.model.js";


export const addExpense = async (req, res) => {
    try {

        const { amount, date, description, category } = req.body

        if (!amount) {
            return res.status(400).json({ message: "amount is required" })
        }

        if (!date) {
            return res.status(400).json({ message: "date is required" })
        }

        if (!description) {
            return res.status(400).json({ message: "description is required" })
        }

        if (!category) {
            return res.status(400).json({ message: "category is required" })
        }


       const expense =  await EXPENSE.create({
            amount,
            date,
            description,
            category
        })

        return res.status(201).json({
            message: "expense is added", expense})

    } catch (error) {
        console.log("error while adding expense", error)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const editExpense = async(req,res) => {
    try {
        const id = req.params.id
        const {amount,date,description,category} = req.body

        if(!id){
            return res.status(400).json({message : "Id is required"})
        }

        const expense = await EXPENSE.findOne({_id : id})
        if(!expense){
            return res.status(400).json({message : "expense not found"})
        }

        const updatedExpense = await EXPENSE.findByIdAndUpdate(id,{$set : {amount : amount,date : date, description  : description, category}}, {new : true} )

        return res.status(200).json({message : "expense is updated successfully",expense : updatedExpense})

    } catch (error) {
        console.log("error while editing expense",error)
        return res.status(500).json({message : "Internal Server Error",error : error.message})
    }
}


export const deleteExpense = async(req,res) => {

    try {
        const id = req.params.id 

        if(!id){
            return res.status(400).json({message : "id is required"})
        }

        const expense = await EXPENSE.findOne({_id : id})
        if(!expense){
            return res.status(400).json({message : "expense not found"})
        }

        await expense.deleteOne({_id : id})

        return res.status(200).json({message : "expense deleted successfully"})
        

    } catch (error) {
        console.log("error while deleting expense",error)
        return res.status(500).json({message : "Internal Server Error",error : error.message})
    }

}


export const getExpense = async(req,res) => {

    try {
        const id = req.params.id 

        if(!id){
            return res.status(400).json({message : "id is required"})
        }

        const expense = await EXPENSE.findOne({_id : id})
        if(!expense){
            return res.status(404).json({message : "expense not found"})
        }

        return res.status(200).json({message : "expense found",expense : expense})

    } catch (error) {
        console.log("error while getting expense",error)
        return res.status(500).json({message : "Internal Server Error",error : error.message})
    }

}


export const getALLExpense = async(req,res) => {

    try {
        const expenses = await find({})
        return res.status(200).json({message : "all expenses successfully",expenses})
    } catch (error) {
        console.log("error while fetching all expense",error)
        return res.status(500).json({message : "Internal Serve Error",error : error.message})
    }
}



