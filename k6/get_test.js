import http from 'k6/http';

export let options = {
    vus: 1,
    duration: '10s',
};

export default function () {

    var url = "http://localhost:5064/api/todos";
    
    var res = http.get(url);
    console.log('Response Code was ' + String(res.status) + ' / Response Time: ' + String(res.timings.duration) + ' ms');
    
}
