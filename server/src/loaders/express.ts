import express from 'express';
import { Router} from 'express';

export default ({ app }: { app: express.Application }) => {
    app.get('/', (req:any, res:any) => {
        console.log('Letsssgooo')
        res.json({Msg: 'Hi ARMA'})
      });
}