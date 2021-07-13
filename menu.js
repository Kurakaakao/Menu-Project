// Taulukko normaalisti tuodaan backendiltä/palvelimelta, mutta testin luomisessa käytetään staattista taulukkoa

let menu = [
{
    id: 1,
    title: "Harmonize",
    length: "3:52",
    category: "cat1",
    img: "img/harmonize.jpg",
    desc: "This is an item solely created for testing purposes.",
},
{
    id: 2,
    title: "Genocider",
    length: "3:52",
    category: "cat2",
    img: "img/genocider.png",
    desc: "This is an item solely created for testing purposes.",
},
{
    id: 3,
    title: "Hardcore Syndrome 3",
    length: "5:28",
    category: "cat3",
    img: "img/syndrome.jpg",
    desc: "This is an item solely created for testing purposes.",
},
{
    id: 4,
    title: "Yatsuzaki Hardcore Volume 7",
    length: "2:26",
    category: "cat1",
    img: "img/yatsuzaki7.jpg",
    desc: "This is an item solely created for testing purposes.",
},
{
    id: 5,
    title: "Massive Circlez 8",
    length: "4:42",
    category: "cat1",
    img: "img/circlez8.jpg",
    desc: "This is an item solely created for testing purposes.",
},
{
    id: 6,
    title: "Megaton Kick",
    length: "2:58",
    category: "cat2",
    img: "img/megatonkick.png",
    desc: "This is an item solely created for testing purposes.",
},
{
    id: 7,
    title: "Cyaegha",
    length: "6:40",
    category: "cat4",
    img: "img/cyaegha.jpg",
    desc: "This is an item solely created for testing purposes.",
}
];

const sect = document.querySelector(".section-center");

const containerButtons = document.querySelector(".btn-container");

// Loads items
window.addEventListener("DOMContentLoaded", function() {
    showMenuItems(menu);
    const buttonCategories = menu.reduce(function(values, item) {
        if (!values.includes(item.category)) {                      // Jos values-muuttujaan EI KUULU item.category eli taulukon Objektin objekti nimeltä category !includes = excludes
            values.push(item.category);                             // Työnnetään taulukkoon puuttuva category objekti
        }
        return values;
    },
    ["all"] // All-nappia ei tarvitse dynaamisesti määritellä, sillä all-valinta on staattinen.
    ); 
    const categoryBtns = buttonCategories.map(function(category) {
        return `<button class="filter-btn" type="button" data-category=${category}>${category}</button>`
    }).join("");  
    containerButtons.innerHTML = categoryBtns;
    
    const filterBtns = document.querySelectorAll(".filter-btn");
    
    filterBtns.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            const objectCategory = e.currentTarget.dataset.category;  // Referoidaan data-id osioon napeissa suodattamaan tuloksia
            const menuCategory = menu.filter(function(menuItem) {     // Suodatetaan päätaulukosta tuloksia
                if (menuItem.category === objectCategory) {           // Jos päätaulukon kategoria vastaa nappien data-id kategoriaa, palautetaan kyseinen objekti
                    return menuItem;
                }
            });
            if (objectCategory === "all") {                           // Jos nappulaa "all" painetaan, palautetaan koko taulukko
                showMenuItems(menu);
            }
            else {                                                    // Jos all ei paineta, toteutetaan tuotteiden printtausfunktio suodatetuilla tuloksilla
                showMenuItems(menuCategory);
            }
        });
    });
});

function showMenuItems(menuItems) {
    let showMenu = menuItems.map(function(item) {
        return `<article class="menu-item">
            <img src=${item.img} alt=${item.title} class="photo">
            <div class="item-info">
                <header>
                    <h4>${item.title}</h4>
                    <h4 class="price">${item.length}</h4>
                </header>
                <p class="item-text">${item.desc}</p>
            </div>
            </article>`;    
        });
    showMenu = showMenu.join("");  // Yhdistetään taulukon HTML entryt ilman välilyöntejä
    //console.log(showMenu)
    sect.innerHTML = showMenu      // Tulostaa dynaamisesti HTML taulukot index.html:ään
}
