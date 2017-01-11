let profile = [
    {
        photo: 'https://randomuser.me/api/portraits/women/85.jpg',
        name: 'Claudia Corn',
        age: 26,
    },
    {
        photo: 'https://randomuser.me/api/portraits/women/81.jpg',
        name: 'Alex Sheila',
        age: 23,
    },
    {
        photo: 'https://randomuser.me/api/portraits/women/82.jpg',
        name: 'Lioness Lady',
        age: 27,
    },
];

window.addEventListener('load', function () {
    console.log('Is this thing on?');
    let button = document.querySelector('#get');

    button.addEventListener('click', function () {
        console.log('do things')
        //showProfile(profile[i]);
    });

    for (let i = 0; i < profile.length; i++) {
        showProfile(profile[i]);
    }
});

function showProfile(profile) {
    let child = document.createElement('li');
    let parent = document.querySelector('.new ul');

    let template = document.querySelector('#profile-template');

    child.innerHTML = Mustache.render(template.innerHTML, {
        photo: profile.photo,
        name: profile.name,
        age: profile.age,
    });
}