let express = require("express")
let request = require("request")
const app = express()
const PORT = 5510
const PATH = __dirname

app.use(express.static(PATH));
app.listen(PORT, () => {
    console.log(`Weather Bucket app listening on port ${PORT}!`)
    console.log(`Path is : ${PATH} !`)
})
app.get('/', (req,res) => {
    res.sendFile("/index.html")
})