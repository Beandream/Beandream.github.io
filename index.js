import {list} from './repoList.js'
list.forEach(l => {
    var span = document.createElement('SPAN');
    var btn = document.createElement("BUTTON");
    var description = document.createElement("P");
    span.className = 'span'
    description.innerHTML = `${l.description}`;
    description.className = 'desc';
    btn.innerHTML = `${l.name}`;
    btn.className = 'navBtn';
    btn.onclick = function(){window.open(`https://${l.url}`)};
    span.appendChild(btn);
    span.appendChild(description);
    document.body.appendChild(span);
})