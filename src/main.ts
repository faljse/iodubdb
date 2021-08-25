import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import * as sqlite from 'better-sqlite3';
const DatabaseConstructor = sqlite.default;
var db = new DatabaseConstructor("C:\\Users\\marti\\Documents\\iodub.db");

declare global {
    interface String {
        paddingLeft(paddingValue: string): string;
    }
  }
  

class Main {
    config = null;
    httpPort = 8000;

    constructor() {
        let app = express();
        app.use(bodyParser.json())
        app.use('/static', express.static('webroot'));

    
        app.get('/config', (req, res) => {
            res.type('json');
            res.send("asdf");
        })

         app.get('/buttons', async(req, res) => {
            res.type('json');
            let result = await db.prepare("select * from button").all();
            res.send(result);
        })

        app.post('/sendUDP', (req, res) => { 
            // let sendString = r.cmd.paddingLeft("    ")
            //     + "."+r.id.toString().paddingLeft("    ") 
            //     + "."+r.value.toString().paddingLeft("    ");
            //     + "\r\n"

            res.send();
        })
        app.listen(this.httpPort, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${this.httpPort}`);
        });
}
}
let main=new Main();
