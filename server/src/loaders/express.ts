import express from 'express';
import { routes } from '../api';
import { Router } from 'express';
export const initializeExpress = async ({ app }: { app: express.Application }) => {
    app.get('/', (req, res) => {
        console.log('Letsssgooo')
        res.json({Msg: 'Hi ARMA'})
      });
    app.use('/api', routes())
    
}