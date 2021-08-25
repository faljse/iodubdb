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
            let result = await db.prepare("select * from button order by id").all();
            res.send(result);
        })

        app.get('/scene/:sequence_id', async(req, res) => {
            res.type('json');
            let sid = parseInt(req.params.sequence_id);
            let result = await db.prepare(`select * from scene where sequence_id = ? order by id`).all(sid);
            res.send(result);
        })

        app.get('/sequence', async(req, res) => {
            res.type('json');
            let result = await db.prepare("select * from sequence order by id").all();
            res.send(result);
        })

        app.get('/lights', async(req, res) => {
            res.type('json');
            let result = await db.prepare("select * from light order by id").all();
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
