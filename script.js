function Fibo(n) {
  if (n == 0) {
    return 0;
  } else {
    if (n == 1) {
      return 1;
    } else {
      return Fibo(n - 1) + Fibo(n - 2);
    }
  }
}

let result = JSON.parse(localStorage.getItem('result')) || [];

for (const item of result) {
  document.getElementById(
    'result-list',
  ).innerHTML += `<li>The Fibonnaci Of <strong>${item.input}</strong> is <strong>${item.output}</strong> at: ${item.date}</li>`;
}

function AffFibo() {
  document.getElementById('spinner').classList.add('d-none');
  document.getElementById('error-msg').classList.add('d-none');
  document.getElementById('42-error').classList.add('d-none');
  document.form1.FibN.value = '';
  var n = Number(document.form1.textN.value);

  if (!n) return;

  if (n != 42 && n >= 50) {
    document.getElementById('textN').classList.add('error');
    document.getElementById('error-msg').classList.remove('d-none');
    return;
  } else document.getElementById('textN').classList.remove('error');

  // Show the spinner
  document.getElementById('spinner').classList.remove('d-none');

  // Server simulation & setTimeout for LOADER
  setTimeout(() => {
    try {
      fetch('http://localhost:5050/getFibonacciResults', { method: 'POST', body: { n: n } });
    } catch (error) {
      console.log(error);
    }

    if (n == 42) {
      document.getElementById('42-error').classList.remove('d-none');
    } else {
      if (document.form1.saveCalc.checked) {
        result.push({
          input: n,
          output: Fibo(n),
          date: new Date().toUTCString(),
        });
        localStorage.setItem('result', JSON.stringify(result));
      }

      document.form1.FibN.value = Fibo(n);

      document.getElementById('result-list').innerHTML = '';
      for (const item of result) {
        document.getElementById(
          'result-list',
        ).innerHTML += `<li>The Fibonnaci Of <strong>${item.input}</strong> is <strong>${item.output}</strong> at: ${item.date}</li>`;
      }
    }

    document.getElementById('spinner').classList.add('d-none');
  }, 1000);

// Server - func fetServerFibo
let result = JSON.parse(localStorage.getItem('result')) || [];

async function getServerFibo(url) {
  try {

    const resp = await fetch('http://localhost:5050/fibonacci/'+ n);
    console.log('Response in try', resp);
  
    if (resp.status == '400'){
      const result = await resp.text();
      console.log('Result form get data:', result);
      return result;
    } else {
      const result = await resp.json();
      console.log('Result from get data:', result.result);
      return result.result;
    } 
  } catch(err) {
    console.log('Error fetching data:', result);
  }
};
  
getServerFibo();

}

fetch("http://localhost:5050/getFibonnaciResults").then(resp => resp.json()); 

document.getElementById('sort').onchange = e => {
  switch (e.target.value) {
    case 'number-asc':
      result.sort((a, b) => a.input - b.input);
      break;

    case 'number-desc':
      result.sort((a, b) => b.input - a.input);
      break;

    case 'date-asc':
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;

    case 'date-desc':
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;

    default:
      break;
  }

  document.getElementById('result-list').innerHTML = '';
  for (const item of result) {
    document.getElementById(
      'result-list',
    ).innerHTML += `<li>The Fibonnaci Of <strong>${item.input}</strong> is <strong>${item.output}</strong> at: ${item.date}</li>`;
  }
};



