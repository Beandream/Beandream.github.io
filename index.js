import {list} from './repoList.js'
var listElement = document.createElement('DVI');
listElement.className = 'listDiv'

list.forEach(l => {
    var span = document.createElement('SPAN');
    var btn = document.createElement("BUTTON");
    var description = document.createElement("P");
    span.className = 'span'
    description.innerHTML = `${l.description}`;
    description.className = 'desc';
    btn.innerHTML = `${l.name}`;
    btn.className = 'navBtn';

    let info = document.createElement('P');
    info.innerHTML = `${l.info}`;
    info.className = 'info hid'

    btn.onclick = function(){window.open(`https://${l.url}`)};
    span.onclick = function(e){
        e.path.forEach(p => {
            if (p.tagName == 'SPAN') {
                p.getElementsByClassName("info")[0].classList.toggle('hid');
            }
        })
    };
    span.appendChild(btn);
    span.appendChild(description);
    span.appendChild(info);
    listElement.appendChild(span);
})
document.body.appendChild(listElement);