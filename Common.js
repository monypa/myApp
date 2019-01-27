'use strict';

export function testFunction() {
  return 'OK';
}

export function loadDisciplines(data) {
  let res = [];
  let i=0, j=0;

  let disciplines = data.filter(word => word.key.substr(0,10) == 'Discipline');

  for (i = 0; i < disciplines.length; i++) {
    let disciplineId = disciplines[i].key.substr(10,disciplines[i].key.length-10);
    let disciplineName = JSON.parse(JSON.parse(JSON.stringify(disciplines[i])).value).name;

    let arr = [];
    let subDisciplines = data.filter(word => word.key.substr(0,13 + disciplineId.length + 1) == 'SubDiscipline' + disciplineId + '_');
    for (j = 0; j < subDisciplines.length; j++) {
      let subDisciplineName = JSON.parse(JSON.parse(JSON.stringify(subDisciplines[j])).value).name;
      arr[j] = subDisciplineName;
    }
    res[i] = {key: disciplines[i].key, title: disciplineName, data: arr}
  }

/*
  res = [
    {title: disciplines[0].key, data: ['S11', 'S12', 'S13']},
    {title: 'D2', data: ['S21', 'S22']},
  ]
*/
  return res;

  //return 'Load Disciplines: ' + disciplines.length;
}
