import express from "express"
import { addExpense, editExpense,getALLExpense,getExpense,deleteExpense} from "../controllers/expense.controllers.js"

const router = express.Router()


router.post("/add",addExpense)
router.patch("/edit/:id",editExpense)
router.delete("/delete/:id",deleteExpense)
router.get("/:id",getExpense)
router.get("/",getALLExpense)


export default router 