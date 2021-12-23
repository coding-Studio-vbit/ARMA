const express = require('express');
const port = process.env.PORT || 6000 ;

async function startServer() {
    const app = express();
    await require('./loaders').default({ expressApp: app });
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
}
startServer();