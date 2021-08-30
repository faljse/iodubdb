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

         app.get('/button', async(req, res) => {
            res.type('json');
            let result = await db.prepare("select * from button order by id").all();
            res.send(result);
        })

        app.put('/button', async(req, res) => {
            res.type('json');
            let result = await db.prepare("insert into button(id, name, input) values(?,?,?)").run(req.body.id, req.body.name, req.body.input);
            res.send(result);
        })

        app.patch('/button/:id', async(req, res) => {
            res.type('json');
            console.log("asdf")
            console.log("a" + req.body.field +"b");
            let result = await db.prepare(`update button set ${req.body.field} = ? WHERE id=?`).run(req.body.value, req.params.id);
            res.send(result);
        })


        app.delete('/button/:id', async(req, res) => {
            res.type('json');
            let result = await db.prepare("delete from button where id = ?").run(parseInt(req.params.id));
            res.send(result);
        })

        app.get('/scene/:sequence_id', async(req, res) => {
            res.type('json');
            let result = await db.prepare(`select * from scene where sequence_id = ? order by id`).all(parseInt(req.params.sequence_id));
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
