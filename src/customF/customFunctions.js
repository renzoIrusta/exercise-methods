const fs   = require('fs');

module.exports = {

    leoJson: (path) => JSON.parse(fs.readFileSync(path, 'utf-8')),
    
    escriboJson: (arr, path) => {
        arr = JSON.stringify(arr, null, 1);
        fs.writeFileSync(path, arr)
    },
    
    createId: (arr) => {
        let contador = 1;
        arr.forEach( (x) => {
           if (x.id == contador) { 
               contador++
            } 
        });
        return contador
    }

}