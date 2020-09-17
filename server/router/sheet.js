const express = require('express');
const router = express.Router();
const creds = require("./credentials.json")
const GoogleSpreadSheet = require('google-spreadsheet');
const { promisify } = require("util");
const shortid = require('shortid');

router.put('/update', async (req, res) => {
    try{
        const doc = new GoogleSpreadSheet('1d9ArItxQZkzeehMxrgVLb2583nQ7N_Au1gOtxPYFJCk');
        await promisify(doc.useServiceAccountAuth)(creds);
      
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[0];  
        const rows = await promisify(sheet.getRows)()
        
        const row = rows.find(function (row) {
            return row.sid === req.body.sid;
        });
       
        const rowIndex = rows.findIndex(x => x.sid === row.sid);
        console.log(row.sid,rowIndex);
        if(rowIndex > -1){
            rows[rowIndex].sid = req.body.sid;
            rows[rowIndex].contatto = req.body.contatto;
            rows[rowIndex].codicearticolo = req.body.codicearticolo;
            rows[rowIndex].nome = req.body.nome;
            rows[rowIndex].altroinfo = req.body.altroinfo;

            consoele.log(rows[rowIndex]);
            await rows[rowIndex].save();
            
            res.send({ok: true});
        }  else {
            res.send({ok: false});
        }
    } catch (e) {
        res.send({e, ok: false});
    }
});

  router.post('/addrow', async (req, res) => {
        const row = {
            sid: shortid.generate(),
            nome: req.body.nome,
            contatto: req.body.contatto,
            codicearticolo: req.body.codicearticolo,
            altroinfo: req.body.altroinfo,
        };
        const doc = new GoogleSpreadSheet('1d9ArItxQZkzeehMxrgVLb2583nQ7N_Au1gOtxPYFJCk');
        try {
        await promisify(doc.useServiceAccountAuth)(creds);
        
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[0];  
        
        await promisify(sheet.addRow)(row);
        
        res.send({ok: true});
        
        } catch (e) {
            res.send({...e, ok: false});
        }
});

router.delete('/delete/:id', async (req, res) => {
    try{
        const {id} =  req.params;
        console.log(id);
        const doc = new GoogleSpreadSheet('1d9ArItxQZkzeehMxrgVLb2583nQ7N_Au1gOtxPYFJCk');
        await promisify(doc.useServiceAccountAuth)(creds);
      
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[0];  
        const rows = await promisify(sheet.getRows)()
        
        const row = rows.find(function (row) {
            return row.sid === id;
        });
    
        const rowIndex = rows.findIndex(x => x.sid ===row.sid);
        
        if(rowIndex > -1){
            rows[rowIndex].del();
            await rows[rowIndex].save();

            res.send({ok: true});
        }  else {
            res.send({...e, ok: false});
        }

    } catch (e) {
        res.send({...e, ok: false});
    }
});

router.get('/getrows', async (req, res) => {
    try{
        const doc = new GoogleSpreadSheet('1d9ArItxQZkzeehMxrgVLb2583nQ7N_Au1gOtxPYFJCk');
        await promisify(doc.useServiceAccountAuth)(creds);
      
        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[0];  
        const rows = await promisify(sheet.getRows)();
        
        res.send({ok: true, rows});
    } catch (e) {
        res.send({...e, ok: false});
    }
});

module.exports = router;