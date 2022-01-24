const app = require('./app')

const port = 3000


app.listen(process.env.PORT || port, () => console.log(`App running on http://localhost:${port}`))