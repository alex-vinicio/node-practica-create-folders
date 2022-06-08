const fs = require("fs");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

module.exports = function gestionArchivos() {
  //var dirGeneral = "./";
  var dirGeneral = `${appDir}\\TAREA`;
  var months = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];
  if (!fs.existsSync(dirGeneral)) {
    fs.mkdirSync(dirGeneral);
  }

  if (fs.existsSync(dirGeneral)) {
    var pathYear = [];
    pathYear = generateYearsPath(dirGeneral);

    //create year
    pathYear.forEach((element) => {
      fs.mkdir(
        `${dirGeneral}\\${element.toString()}`,
        { recursive: true },
        (err) => {
          if (!err) {
            //create months
            for (let j = 0; j < months.length; j++) {
              fs.mkdir(
                `${dirGeneral}\\${element.toString()}\\${months[j]}`,
                { recursive: true },
                (err) => {
                  if (!err) {
                    //create days of month
                    for (
                      let index = 1;
                      index <= getDaysInMonth(j, element).length;
                      index++
                    ) {
                      let data = new Uint8Array(
                        Buffer.from(
                          `Archivo creado en =>${dirGeneral}\\${element.toString()}\\${
                            months[j]
                          }\\${index.toString()}.txt}!`
                        )
                      );
                      fs.writeFile(
                        `${dirGeneral}\\${element.toString()}\\${
                          months[j]
                        }\\${index.toString()}.txt`,
                        data,
                        (err) => {
                          if (err) {
                            console.log(err);
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          }
        }
      );
    });
  } else {
    console.log("El directorio general no existe");
  }
  console.log("Archivos creados exitosamente!");
};

function generateYearsPath(dirGeneral) {
  var dateNow = new Date();
  var year = dateNow.getFullYear();
  var yearStart = 2017; //asign year to start
  var dirMidiumLevel = [];
  while (yearStart <= year) {
    dirMidiumLevel.push(yearStart);
    yearStart++;
  }
  return dirMidiumLevel;
}
//bisiesto, en febrero tiene 29 dias y no 28
function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  var auxIndex = 1;
  while (date.getMonth() === month) {
    days.push(auxIndex);
    date.setDate(date.getDate() + 1);
    auxIndex++;
  }
  return days;
}
