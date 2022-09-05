(function(){
    const title = document.querySelector('.page__title');

    const name = localStorage.getItem('name').toUpperCase();
    console.log(localStorage.getItem('name'));
    title.innerText = `
        ${name}
    `;
})();