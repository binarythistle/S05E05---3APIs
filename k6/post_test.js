import http from 'k6/http';

export let options = {
    vus: 1,
    //duration: '10s',
    iterations: 1000
};

export default function () {
    var url = 'http://localhost:5064/api/todos';
    

    var payload = JSON.stringify({ name: 'k6 load test' });

    var params = {
        headers: {
            'Content-Type': 'application/json'
            
        }
    };

    var res = http.post(url, payload, params);
    console.log('Response Code was ' + String(res.status) + ' / Response Time: ' + String(res.timings.duration) + ' ms');
}