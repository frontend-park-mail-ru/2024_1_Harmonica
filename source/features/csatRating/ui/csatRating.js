let stars = [];
for (let i = 1; i <= 5; ++i){
    const star = document.querySelector(`#csat-star-${i}`);
    stars.push(star);
}
let counter = 0;
for (let i = 1; i <= 5; ++i){
    const star = document.querySelector(`#csat-star-${i}`);
    star.addEventListener('click', () => {
        for (let j = i + 1; j <= 5; ++j){
            const unpickStars = document.querySelector(`#csat-star-${j}`);
            unpickStars.classList.add('star-unpick')
        }
        for (let j = 1; j <= i; ++j){
            const unpickStars = document.querySelector(`#csat-star-${j}`);
            unpickStars.classList.remove('star-unpick');
        }
        counter = i;
    });
}

const submitButton = document.querySelector('#csat-submit')
submitButton.addEventListener('click', async () => {
    let response;
    try {
        const addOptions = {
            method: 'POST',
            body: {
                rating: counter,
            },
        };
        response = await fetch('https://harmoniums.ru/api/v1/CSAT', {
            ...addOptions,
        });
    } catch (error) {
        console.log('Ojibka');
    }

})
