function createMenu() {
    const category = [{
        name: 'Смартфони та телефони', link: '#', sub: '1', level: '1', class: 'menu-items'
    },
    { name: 'Телевізори, аудіо та фото', link: '#', sub: '1', level: '1', class: 'menu-items' },
    { name: 'Навушники і акустика', link: '#', sub: '1', level: '1', class: 'menu-items' },
    { name: 'Планшети, ноутбуки та ПК', link: '#', sub: '1', level: '1', class: 'menu-items' },
    { name: 'Apple', link: '#', sub: '1', level: '1', class: 'menu-items' },
    ];
    const menu = document.getElementsByClassName('nav-menu')[0];
    const content = document.createElement('ul');
    content.className = 'nav-content__categories';
    category.forEach(element => {
        let categoryList = document.createElement('li');
        categoryList.setAttribute('data-name',element.name);
        categoryList.setAttribute('data-link',element.link);
        categoryList.setAttribute('data-sub',element.sub);
        categoryList.setAttribute('data-level',element.level);
        categoryList.setAttribute('data-class',element.class);
        let a = document.createElement('a');
        a.title = element.name;
        a.href='#';
        let aDiv= document.createElement('div');
        aDiv.class= 'nav-content-icon';
        let aP= document.createElement('p');
        aP.class = 'item-title';
        aP.innerHTML=element.name;
        a.appendChild(aDiv).appendChild(aP);
        let div = document.createElement('div');
        categoryList.appendChild(a,div);
        content.appendChild(categoryList);

    });
    menu.appendChild(content);



}

document.body.onload = createMenu;