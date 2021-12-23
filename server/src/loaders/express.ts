import express from 'express';
import { Router} from 'express';

export default ({ app }: { app: express.Application }) => {
    app.get('/', (req, res) => {
        console.log('Letsssgooo')
        res.json({Msg: 'Hi ARMA'})
      });
}