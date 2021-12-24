import { Router } from "express";
import { test } from "./routes/test";

export const routes=  () =>{
    const app = Router()
    test(app)
    return app

}