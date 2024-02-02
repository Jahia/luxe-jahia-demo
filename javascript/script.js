window.addEventListener('DOMContentLoaded', event => {
    Array.from(document.getElementsByClassName('_backToParentPage')).map(elt => {
        elt.addEventListener('click', () => {
            history.back();
        });
        return true;
    });

    // Load alpine js
    // const script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = 'https://unpkg.com/alpinejs';
    // // Script.defer = true;
    // document.getElementsByTagName('head')[0].appendChild(script);
});
